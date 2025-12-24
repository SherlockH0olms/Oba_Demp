const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const { sampleMessages } = require('../data/mock-data');

// In-memory storage (initialized with sample data)
let feedbacks = [...sampleMessages];

// GET all feedbacks
router.get('/', (req, res) => {
    const { status, priority, department, limit } = req.query;

    let result = [...feedbacks];

    // Filter by status
    if (status) {
        result = result.filter(f => f.status === status);
    }

    // Filter by priority
    if (priority) {
        result = result.filter(f => f.aiAnalysis.priority === priority);
    }

    // Filter by department
    if (department) {
        result = result.filter(f => f.aiAnalysis.department === department);
    }

    // Sort by timestamp (newest first)
    result.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

    // Limit results
    if (limit) {
        result = result.slice(0, parseInt(limit));
    }

    res.json(result);
});

// GET single feedback
router.get('/:id', (req, res) => {
    const feedback = feedbacks.find(f => f.id === req.params.id);
    if (!feedback) {
        return res.status(404).json({ error: 'Feedback not found' });
    }
    res.json(feedback);
});

// POST new feedback
router.post('/', (req, res) => {
    const { text, customer, marketId, aiAnalysis } = req.body;

    const newFeedback = {
        id: uuidv4(),
        text,
        customer,
        marketId,
        timestamp: new Date().toISOString(),
        aiAnalysis,
        status: aiAnalysis.sendToCallCenter ? 'pending' : 'in_progress'
    };

    feedbacks.unshift(newFeedback);

    // Emit to connected clients
    const io = req.app.get('io');
    if (io) {
        io.emit('new_feedback', newFeedback);
    }

    res.status(201).json(newFeedback);
});

// PUT update feedback status
router.put('/:id', (req, res) => {
    const index = feedbacks.findIndex(f => f.id === req.params.id);
    if (index === -1) {
        return res.status(404).json({ error: 'Feedback not found' });
    }

    feedbacks[index] = { ...feedbacks[index], ...req.body };

    // Emit update
    const io = req.app.get('io');
    if (io) {
        io.emit('feedback_updated', feedbacks[index]);
    }

    res.json(feedbacks[index]);
});

// GET statistics
router.get('/stats/summary', (req, res) => {
    const now = new Date();
    const weekAgo = new Date(now - 7 * 24 * 60 * 60 * 1000);

    const total = feedbacks.length;
    const thisWeek = feedbacks.filter(f => new Date(f.timestamp) >= weekAgo).length;
    const resolved = feedbacks.filter(f => f.status === 'resolved').length;
    const callCenter = feedbacks.filter(f => f.aiAnalysis.sendToCallCenter).length;
    const pending = feedbacks.filter(f => f.status === 'pending').length;

    // Sentiment breakdown
    const sentimentStats = {
        positive: feedbacks.filter(f => f.aiAnalysis.sentiment === 'positive').length,
        neutral: feedbacks.filter(f => f.aiAnalysis.sentiment === 'neutral').length,
        negative: feedbacks.filter(f => f.aiAnalysis.sentiment === 'negative').length
    };

    // Category breakdown
    const categoryStats = {};
    feedbacks.forEach(f => {
        const cat = f.aiAnalysis.category;
        categoryStats[cat] = (categoryStats[cat] || 0) + 1;
    });

    // Department breakdown
    const departmentStats = {};
    feedbacks.forEach(f => {
        const dept = f.aiAnalysis.department;
        departmentStats[dept] = (departmentStats[dept] || 0) + 1;
    });

    // Daily trend (last 7 days)
    const dailyTrend = [];
    for (let i = 6; i >= 0; i--) {
        const date = new Date(now - i * 24 * 60 * 60 * 1000);
        const dateStr = date.toISOString().split('T')[0];
        const dayFeedbacks = feedbacks.filter(f => f.timestamp.startsWith(dateStr));

        dailyTrend.push({
            date: dateStr,
            total: dayFeedbacks.length,
            positive: dayFeedbacks.filter(f => f.aiAnalysis.sentiment === 'positive').length,
            neutral: dayFeedbacks.filter(f => f.aiAnalysis.sentiment === 'neutral').length,
            negative: dayFeedbacks.filter(f => f.aiAnalysis.sentiment === 'negative').length
        });
    }

    res.json({
        kpi: {
            total,
            thisWeek,
            resolved,
            callCenter,
            pending
        },
        sentiment: sentimentStats,
        categories: categoryStats,
        departments: departmentStats,
        dailyTrend
    });
});

module.exports = router;
