const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const { analyzeWithDelay } = require('../services/ai-analyzer');
const { markets } = require('../data/mock-data');

// Telegram Webhook - Mock incoming messages
router.post('/', async (req, res) => {
    try {
        const { message, chatId, username, marketId } = req.body;

        // Find market info
        const market = markets.find(m => m.id === marketId) || markets[0];

        // Simulate AI analysis
        const aiAnalysis = await analyzeWithDelay(message);

        // Create feedback object
        const feedback = {
            id: uuidv4(),
            text: message,
            customer: {
                name: username || 'Telegram User',
                chatId: chatId
            },
            marketId: market.id,
            marketName: market.name,
            timestamp: new Date().toISOString(),
            source: 'telegram',
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

        // Simulate auto-response
        const autoResponse = generateTelegramResponse(aiAnalysis);

        res.json({
            success: true,
            messageId: feedback.id,
            aiAnalysis,
            autoResponse
        });
    } catch (error) {
        console.error('Telegram webhook error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Simulate sending message to Telegram
router.post('/send', (req, res) => {
    const { chatId, message, parseMode } = req.body;

    console.log(`[Telegram Send] To: ${chatId}, Message: ${message.substring(0, 50)}...`);

    res.json({
        success: true,
        messageId: uuidv4(),
        timestamp: new Date().toISOString(),
        status: 'sent'
    });
});

// Generate Telegram-specific auto-response
function generateTelegramResponse(aiAnalysis) {
    const responses = {
        positive: "✅ Dəyərli müştərimiz, müsbət rəyiniz üçün təşəkkür edirik!\n\n💚 OBA ailəsi olaraq sizə ən yaxşı xidməti göstərməyə davam edəcəyik.",
        negative: "⚠️ Hörmətli müştərimiz, narazılığınız üçün üzr istəyirik.\n\n📞 Rəyiniz qeydə alındı və ən qısa zamanda sizinlə əlaqə saxlanılacaq.",
        neutral: "📝 Dəyərli müştərimiz, rəyiniz üçün təşəkkür edirik!\n\n💚 OBA-da sizi yenidən görmək arzusu ilə!"
    };

    return responses[aiAnalysis.sentiment] || responses.neutral;
}

module.exports = router;
