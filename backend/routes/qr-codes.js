const express = require('express');
const router = express.Router();
const { markets } = require('../data/mock-data');

// GET all QR codes info
router.get('/', (req, res) => {
    const qrCodes = markets.map(market => ({
        id: market.id,
        name: market.name,
        location: market.location,
        whatsappUrl: `https://wa.me/${market.phone}?text=FEEDBACK_${market.id}`,
        telegramUrl: `https://t.me/oba_feedback_bot?start=${market.id}`,
        qrImageUrl: `/qr-codes/${market.id}.png`
    }));

    res.json(qrCodes);
});

// GET single QR code
router.get('/:id', (req, res) => {
    const market = markets.find(m => m.id === req.params.id);

    if (!market) {
        return res.status(404).json({ error: 'Market not found' });
    }

    res.json({
        id: market.id,
        name: market.name,
        location: market.location,
        whatsappUrl: `https://wa.me/${market.phone}?text=FEEDBACK_${market.id}`,
        telegramUrl: `https://t.me/oba_feedback_bot?start=${market.id}`,
        qrImageUrl: `/qr-codes/${market.id}.png`
    });
});

module.exports = router;
