const express = require('express');
const router = express.Router();

// Mock data for testing without database
let mockProformas = [
    {
        _id: '507f1f77bcf86cd799439021',
        nivSelections: [
            {
                lastLastYearNIVSource: 'Source A',
                lastLastYearNIVLocalAmount: 10000,
                lastYearNIVSource: 'Source B',
                lastYearNIVLocalAmount: 15000,
                thisYearNIVSource: 'Source C',
                thisYearNIVLocalAmount: 20000,
                specificYearNIVSource: 'Source D',
                specificYearNIVLocalAmount: 12000,
                halfYearNIVSource: 'Source E',
                halfYearNIVLocalAmount: 8000
            }
        ],
        summary: {
            totalAmount: 65000,
            status: 'Active'
        },
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    }
];

// Get all proformas
router.get('/', (req, res) => {
    res.json(mockProformas);
});

// Get single proforma
router.get('/:id', (req, res) => {
    const proforma = mockProformas.find(p => p._id === req.params.id);
    if (!proforma) {
        return res.status(404).json({ message: 'Proforma not found' });
    }
    res.json(proforma);
});

// Create new proforma
router.post('/', (req, res) => {
    const newProforma = {
        _id: Date.now().toString(),
        ...req.body,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    };
    mockProformas.push(newProforma);
    res.status(201).json(newProforma);
});

// Update proforma
router.put('/:id', (req, res) => {
    const proformaIndex = mockProformas.findIndex(p => p._id === req.params.id);
    if (proformaIndex === -1) {
        return res.status(404).json({ message: 'Proforma not found' });
    }
    mockProformas[proformaIndex] = {
        ...mockProformas[proformaIndex],
        ...req.body,
        updatedAt: new Date().toISOString()
    };
    res.json(mockProformas[proformaIndex]);
});

// Delete proforma
router.delete('/:id', (req, res) => {
    const proformaIndex = mockProformas.findIndex(p => p._id === req.params.id);
    if (proformaIndex === -1) {
        return res.status(404).json({ message: 'Proforma not found' });
    }
    mockProformas.splice(proformaIndex, 1);
    res.json({ message: 'Proforma deleted successfully' });
});

module.exports = router;
