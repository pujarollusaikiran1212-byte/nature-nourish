<template>
  <div class="proforma-details">
    <h2>Proforma Details</h2>
    
    <div v-if="loading" class="loading">Loading...</div>
    <div v-else-if="error" class="error">{{ error }}</div>
    
    <div v-else>
      <!-- NIV Selections Table -->
      <div v-if="proformaData && proformaData.nivSelections" class="niv-selections">
        <h3>NIV Selections</h3>
        <table class="data-table">
          <thead>
            <tr>
              <th v-if="nivSelectionsColumnsVisible.lastLastYearNIVSource">Last Last Year NIV Source</th>
              <th v-if="nivSelectionsColumnsVisible.lastLastYearAmount">Last Last Year Amount</th>
              <th v-if="nivSelectionsColumnsVisible.lastYearNIVSource">Last Year NIV Source</th>
              <th v-if="nivSelectionsColumnsVisible.lastYearAmount">Last Year Amount</th>
              <th v-if="nivSelectionsColumnsVisible.thisYearNIVSource">This Year NIV Source</th>
              <th v-if="nivSelectionsColumnsVisible.thisYearAmount">This Year Amount</th>
              <th v-if="nivSelectionsColumnsVisible.specificYearNIVSource">Specific Year NIV Source</th>
              <th v-if="nivSelectionsColumnsVisible.specificYearAmount">Specific Year Amount</th>
              <th v-if="nivSelectionsColumnsVisible.halfYearNIVSource">Half Year NIV Source</th>
              <th v-if="nivSelectionsColumnsVisible.halfYearAmount">Half Year Amount</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(row, index) in proformaData.nivSelections" :key="index">
              <td v-if="nivSelectionsColumnsVisible.lastLastYearNIVSource">{{ row.lastLastYearNIVSource }}</td>
              <td v-if="nivSelectionsColumnsVisible.lastLastYearAmount">{{ formatCurrency(row.lastLastYearNIVLocalAmount) }}</td>
              <td v-if="nivSelectionsColumnsVisible.lastYearNIVSource">{{ row.lastYearNIVSource }}</td>
              <td v-if="nivSelectionsColumnsVisible.lastYearAmount">{{ formatCurrency(row.lastYearNIVLocalAmount) }}</td>
              <td v-if="nivSelectionsColumnsVisible.thisYearNIVSource">{{ row.thisYearNIVSource }}</td>
              <td v-if="nivSelectionsColumnsVisible.thisYearAmount">{{ formatCurrency(row.thisYearNIVLocalAmount) }}</td>
              <td v-if="nivSelectionsColumnsVisible.specificYearNIVSource">{{ row.specificYearNIVSource }}</td>
              <td v-if="nivSelectionsColumnsVisible.specificYearAmount">{{ formatCurrency(row.specificYearNIVLocalAmount) }}</td>
              <td v-if="nivSelectionsColumnsVisible.halfYearNIVSource">{{ row.halfYearNIVSource }}</td>
              <td v-if="nivSelectionsColumnsVisible.halfYearAmount">{{ formatCurrency(row.halfYearNIVLocalAmount) }}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Summary Section -->
      <div v-if="proformaData && proformaData.summary" class="summary">
        <h3>Summary</h3>
        <div class="summary-grid">
          <div class="summary-item">
            <label>Total Amount:</label>
            <span>{{ formatCurrency(proformaData.summary.totalAmount) }}</span>
          </div>
          <div class="summary-item">
            <label>Status:</label>
            <span>{{ proformaData.summary.status }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProformaDetails',
  props: {
    proformaId: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      proformaData: null,
      loading: true,
      error: null
    };
  },
  computed: {
    nivSelectionsColumnsVisible() {
      const data = this.proformaData?.nivSelections || [];
      return {
        lastLastYearNIVSource: data.some((row) => row.lastLastYearNIVSource),
        lastLastYearAmount: data.some((row) => row.lastLastYearNIVLocalAmount),
        lastYearNIVSource: data.some((row) => row.lastYearNIVSource),
        lastYearAmount: data.some((row) => row.lastYearNIVLocalAmount),
        thisYearNIVSource: data.some((row) => row.thisYearNIVSource),
        thisYearAmount: data.some((row) => row.thisYearNIVLocalAmount),
        specificYearNIVSource: data.some((row) => row.specificYearNIVSource),
        specificYearAmount: data.some((row) => row.specificYearNIVLocalAmount),
        halfYearNIVSource: data.some((row) => row.halfYearNIVSource),
        halfYearAmount: data.some((row) => row.halfYearNIVLocalAmount)
      };
    }
  },
  mounted() {
    this.fetchProformaDetails();
  },
  methods: {
    async fetchProformaDetails() {
      this.loading = true;
      this.error = null;
      
      try {
        const response = await fetch(`http://localhost:5000/api/proformas/${this.proformaId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch proforma details');
        }
        this.proformaData = await response.json();
      } catch (err) {
        this.error = err.message;
      } finally {
        this.loading = false;
      }
    },
    formatCurrency(amount) {
      if (amount === null || amount === undefined) return '-';
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
      }).format(amount);
    }
  }
};
</script>

<style scoped>
.proforma-details {
  padding: 20px;
}

.loading {
  text-align: center;
  padding: 20px;
  color: #666;
}

.error {
  color: red;
  padding: 10px;
  background-color: #ffe6e6;
  border-radius: 4px;
}

.data-table {
  width: 100%;
  border-collapse: collapse;
  margin: 20px 0;
}

.data-table th,
.data-table td {
  padding: 12px;
  text-align: left;
  border-bottom: 1px solid #ddd;
}

.data-table th {
  background-color: #f5f5f5;
  font-weight: 600;
}

.data-table tr:hover {
  background-color: #f9f9f9;
}

.summary {
  margin-top: 30px;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
}

.summary-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 15px;
  margin-top: 15px;
}

.summary-item {
  display: flex;
  flex-direction: column;
}

.summary-item label {
  font-weight: 600;
  color: #666;
  margin-bottom: 5px;
}

.summary-item span {
  font-size: 1.2em;
  color: #333;
}
</style>
