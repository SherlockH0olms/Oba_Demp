const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const { analyzeWithDelay } = require('../services/ai-analyzer');
const { markets } = require('../data/mock-data');

// WhatsApp Webhook - Mock incoming messages
router.post('/', async (req, res) => {
    try {
        const { message, phone, marketId } = req.body;

        // Find market info
        const market = markets.find(m => m.id === marketId) || markets[0];

        // Simulate AI analysis
        const aiAnalysis = await analyzeWithDelay(message);

        // Create feedback object
        const feedback = {
            id: uuidv4(),
            text: message,
            customer: {
                name: req.body.customerName || 'Anonim Müştəri',
                phone: phone || '+994XXXXXXXXX'
            },
            marketId: market.id,
            marketName: market.name,
            timestamp: new Date().toISOString(),
            source: 'whatsapp',
            aiAnalysis,
            status: aiAnalysis.sendToCallCenter ? 'pending' : 'in_progress'
        };

        // Emit real-time update
        const io = req.app.get('io');
        if (io) {
            io.emit('new_feedback', feedback);

            if (aiAnalysis.sendToCallCenter) {
                io.emit('call_center_alert', {
                    type: 'high_priority',
                    feedback
                });
            }
        }

        // Simulate auto-response to customer
        const autoResponse = generateAutoResponse(aiAnalysis);

        res.json({
            success: true,
            messageId: feedback.id,
            aiAnalysis,
            autoResponse
        });
    } catch (error) {
        console.error('WhatsApp webhook error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Simulate message sending to WhatsApp
router.post('/send', (req, res) => {
    const { phone, message, type } = req.body;

    // Mock sending - just log and return success
    console.log(`[WhatsApp Send] To: ${phone}, Type: ${type}, Message: ${message.substring(0, 50)}...`);

    res.json({
        success: true,
        messageId: uuidv4(),
        timestamp: new Date().toISOString(),
        status: 'sent'
    });
});

// Generate auto-response based on AI analysis
function generateAutoResponse(aiAnalysis) {
    const responses = {
        positive: "Dəyərli müştərimiz, müsbət rəyiniz üçün təşəkkür edirik! OBA ailəsi olaraq sizə ən yaxşı xidməti göstərməyə davam edəcəyik. 🙏",
        negative: "Hörmətli müştərimiz, narazılığınız üçün üzr istəyirik. Rəyiniz qeydə alındı və ən qısa zamanda sizinlə əlaqə saxlanılacaq. 📞",
        neutral: "Dəyərli müştərimiz, rəyiniz üçün təşəkkür edirik! Fikirləriniz bizim üçün çox qiymətlidir. OBA-da sizi yenidən görmək arzusu ilə! 💚"
    };

    return responses[aiAnalysis.sentiment] || responses.neutral;
}

module.exports = router;
