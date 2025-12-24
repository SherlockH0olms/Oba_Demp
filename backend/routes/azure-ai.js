const express = require('express');
const router = express.Router();
const { analyzeMessage, analyzeWithDelay } = require('../services/ai-analyzer');

// POST - Analyze message with mock Azure AI
router.post('/analyze', async (req, res) => {
    try {
        const { message } = req.body;

        if (!message) {
            return res.status(400).json({ error: 'Message is required' });
        }

        // Use async version for realistic delay
        const analysis = await analyzeWithDelay(message);

        res.json({
            success: true,
            message,
            analysis,
            processingTime: Math.floor(Math.random() * 300 + 200) + 'ms',
            model: 'azure-custom-nlp-v2-demo'
        });
    } catch (error) {
        console.error('Azure AI analysis error:', error);
        res.status(500).json({ error: 'AI analysis failed' });
    }
});

// POST - Batch analyze multiple messages
router.post('/analyze-batch', async (req, res) => {
    try {
        const { messages } = req.body;

        if (!messages || !Array.isArray(messages)) {
            return res.status(400).json({ error: 'Messages array is required' });
        }

        const results = await Promise.all(
            messages.map(async (msg) => ({
                message: msg,
                analysis: await analyzeWithDelay(msg)
            }))
        );

        res.json({
            success: true,
            count: results.length,
            results
        });
    } catch (error) {
        console.error('Batch analysis error:', error);
        res.status(500).json({ error: 'Batch analysis failed' });
    }
});

// GET - Model info
router.get('/model-info', (req, res) => {
    res.json({
        modelName: 'Azure Custom NLP v2 (Demo)',
        capabilities: [
            'Sentiment Analysis (Azerbaijani)',
            'Category Classification',
            'Keyword Extraction',
            'Priority Assignment',
            'Department Routing'
        ],
        languages: ['az', 'tr', 'ru', 'en'],
        version: '2.0.0-demo',
        lastUpdated: '2024-12-01'
    });
});

module.exports = router;
