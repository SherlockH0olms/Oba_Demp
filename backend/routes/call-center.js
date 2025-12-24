const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const { sampleMessages } = require('../data/mock-data');

// In-memory tickets (initialized from high-priority feedbacks)
let tickets = sampleMessages
    .filter(m => m.aiAnalysis.sendToCallCenter)
    .map(m => ({
        id: uuidv4(),
        feedbackId: m.id,
        customer: m.customer,
        message: m.text,
        priority: m.aiAnalysis.priority,
        category: m.aiAnalysis.category,
        department: m.aiAnalysis.department,
        suggestedAction: m.aiAnalysis.suggestedAction,
        status: 'open',
        assignedTo: null,
        notes: [],
        createdAt: m.timestamp,
        updatedAt: m.timestamp
    }));

// GET all tickets
router.get('/tickets', (req, res) => {
    const { status, priority } = req.query;

    let result = [...tickets];

    if (status) {
        result = result.filter(t => t.status === status);
    }

    if (priority) {
        result = result.filter(t => t.priority === priority);
    }

    // Sort by priority (high first) then by date
    const priorityOrder = { high: 0, medium: 1, low: 2 };
    result.sort((a, b) => {
        const priorityDiff = priorityOrder[a.priority] - priorityOrder[b.priority];
        if (priorityDiff !== 0) return priorityDiff;
        return new Date(b.createdAt) - new Date(a.createdAt);
    });

    res.json(result);
});

// GET single ticket
router.get('/tickets/:id', (req, res) => {
    const ticket = tickets.find(t => t.id === req.params.id);
    if (!ticket) {
        return res.status(404).json({ error: 'Ticket not found' });
    }
    res.json(ticket);
});

// PUT update ticket
router.put('/tickets/:id', (req, res) => {
    const index = tickets.findIndex(t => t.id === req.params.id);
    if (index === -1) {
        return res.status(404).json({ error: 'Ticket not found' });
    }

    tickets[index] = {
        ...tickets[index],
        ...req.body,
        updatedAt: new Date().toISOString()
    };

    // Emit update
    const io = req.app.get('io');
    if (io) {
        io.emit('ticket_updated', tickets[index]);
    }

    res.json(tickets[index]);
});

// POST add note to ticket
router.post('/tickets/:id/notes', (req, res) => {
    const index = tickets.findIndex(t => t.id === req.params.id);
    if (index === -1) {
        return res.status(404).json({ error: 'Ticket not found' });
    }

    const note = {
        id: uuidv4(),
        text: req.body.text,
        author: req.body.author || 'Operator',
        createdAt: new Date().toISOString()
    };

    tickets[index].notes.push(note);
    tickets[index].updatedAt = new Date().toISOString();

    res.json(tickets[index]);
});

// POST create new ticket
router.post('/tickets', (req, res) => {
    const newTicket = {
        id: uuidv4(),
        ...req.body,
        status: 'open',
        assignedTo: null,
        notes: [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    };

    tickets.unshift(newTicket);

    // Emit new ticket
    const io = req.app.get('io');
    if (io) {
        io.emit('new_ticket', newTicket);
    }

    res.status(201).json(newTicket);
});

// POST simulate call action
router.post('/tickets/:id/call', (req, res) => {
    const index = tickets.findIndex(t => t.id === req.params.id);
    if (index === -1) {
        return res.status(404).json({ error: 'Ticket not found' });
    }

    // Add call note
    const callNote = {
        id: uuidv4(),
        text: `Zəng edildi: ${new Date().toLocaleTimeString('az-AZ')}`,
        author: req.body.operator || 'Call Center',
        type: 'call',
        createdAt: new Date().toISOString()
    };

    tickets[index].notes.push(callNote);
    tickets[index].status = 'in_progress';
    tickets[index].updatedAt = new Date().toISOString();

    res.json({
        success: true,
        message: 'Zəng simulyasiya edildi',
        ticket: tickets[index]
    });
});

// GET statistics
router.get('/stats', (req, res) => {
    const stats = {
        total: tickets.length,
        open: tickets.filter(t => t.status === 'open').length,
        inProgress: tickets.filter(t => t.status === 'in_progress').length,
        resolved: tickets.filter(t => t.status === 'resolved').length,
        high: tickets.filter(t => t.priority === 'high').length,
        medium: tickets.filter(t => t.priority === 'medium').length,
        low: tickets.filter(t => t.priority === 'low').length,
        averageResponseTime: '2.5 dəqiqə',
        resolutionRate: '94%',
        todayCalls: Math.floor(Math.random() * 20) + 10
    };

    res.json(stats);
});

module.exports = router;
