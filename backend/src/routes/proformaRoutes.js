const express = require('express');
const router = express.Router();
const Proforma = require('../models/Proforma');

// Get all proformas
router.get('/', async (req, res) => {
    try {
        const proformas = await Proforma.find().sort({ createdAt: -1 });
        res.json(proformas);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get single proforma
router.get('/:id', async (req, res) => {
    try {
        const proforma = await Proforma.findById(req.params.id);
        if (!proforma) {
            return res.status(404).json({ message: 'Proforma not found' });
        }
        res.json(proforma);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Create new proforma
router.post('/', async (req, res) => {
    try {
        const newProforma = new Proforma(req.body);
        const savedProforma = await newProforma.save();
        res.status(201).json(savedProforma);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Update proforma
router.put('/:id', async (req, res) => {
    try {
        const proforma = await Proforma.findByIdAndUpdate(
            req.params.id,
            { ...req.body, updatedAt: Date.now() },
            { new: true, runValidators: true }
        );
        if (!proforma) {
            return res.status(404).json({ message: 'Proforma not found' });
        }
        res.json(proforma);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Delete proforma
router.delete('/:id', async (req, res) => {
    try {
        const proforma = await Proforma.findByIdAndDelete(req.params.id);
        if (!proforma) {
            return res.status(404).json({ message: 'Proforma not found' });
        }
        res.json({ message: 'Proforma deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
