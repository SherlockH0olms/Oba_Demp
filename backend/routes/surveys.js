const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const { surveys: mockSurveys } = require('../data/mock-data');

// In-memory surveys
let surveys = [...mockSurveys];

// GET all surveys
router.get('/', (req, res) => {
    const { status } = req.query;

    let result = [...surveys];

    if (status) {
        result = result.filter(s => s.status === status);
    }

    // Sort by date (newest first)
    result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    res.json(result);
});

// GET single survey
router.get('/:id', (req, res) => {
    const survey = surveys.find(s => s.id === req.params.id);
    if (!survey) {
        return res.status(404).json({ error: 'Survey not found' });
    }
    res.json(survey);
});

// POST create new survey
router.post('/', (req, res) => {
    const { title, description, questions, startDate, endDate } = req.body;

    const newSurvey = {
        id: uuidv4(),
        title,
        description,
        questions: questions.map((q, idx) => ({
            id: idx + 1,
            ...q
        })),
        status: 'draft',
        sentTo: 0,
        responses: 0,
        startDate,
        endDate,
        createdAt: new Date().toISOString()
    };

    surveys.unshift(newSurvey);

    res.status(201).json(newSurvey);
});

// PUT update survey
router.put('/:id', (req, res) => {
    const index = surveys.findIndex(s => s.id === req.params.id);
    if (index === -1) {
        return res.status(404).json({ error: 'Survey not found' });
    }

    surveys[index] = { ...surveys[index], ...req.body };

    res.json(surveys[index]);
});

// POST schedule survey
router.post('/:id/schedule', (req, res) => {
    const index = surveys.findIndex(s => s.id === req.params.id);
    if (index === -1) {
        return res.status(404).json({ error: 'Survey not found' });
    }

    const { scheduledDate, targetCount } = req.body;

    surveys[index].status = 'scheduled';
    surveys[index].scheduledDate = scheduledDate;
    surveys[index].targetCount = targetCount || 100;

    // Simulate scheduling
    console.log(`[Survey Scheduled] ${surveys[index].title} for ${scheduledDate}`);

    res.json({
        success: true,
        message: `Anket ${scheduledDate} tarixinə planlaşdırıldı`,
        survey: surveys[index]
    });
});

// POST activate survey (start sending)
router.post('/:id/activate', (req, res) => {
    const index = surveys.findIndex(s => s.id === req.params.id);
    if (index === -1) {
        return res.status(404).json({ error: 'Survey not found' });
    }

    surveys[index].status = 'active';
    surveys[index].sentTo = Math.floor(Math.random() * 100) + 50;

    // Emit notification
    const io = req.app.get('io');
    if (io) {
        io.emit('survey_activated', surveys[index]);
    }

    res.json({
        success: true,
        message: 'Anket aktivləşdirildi',
        survey: surveys[index]
    });
});

// POST pause survey
router.post('/:id/pause', (req, res) => {
    const index = surveys.findIndex(s => s.id === req.params.id);
    if (index === -1) {
        return res.status(404).json({ error: 'Survey not found' });
    }

    surveys[index].status = 'paused';

    res.json({
        success: true,
        message: 'Anket dayandırıldı',
        survey: surveys[index]
    });
});

// GET survey results
router.get('/:id/results', (req, res) => {
    const survey = surveys.find(s => s.id === req.params.id);
    if (!survey) {
        return res.status(404).json({ error: 'Survey not found' });
    }

    // Generate mock results
    const results = {
        surveyId: survey.id,
        title: survey.title,
        sentTo: survey.sentTo,
        responses: survey.responses,
        responseRate: ((survey.responses / survey.sentTo) * 100).toFixed(1) + '%',
        questionResults: survey.questions.map(q => {
            if (q.type === 'rating') {
                return {
                    questionId: q.id,
                    question: q.text,
                    type: 'rating',
                    average: (Math.random() * 2 + 3).toFixed(1),
                    distribution: {
                        5: Math.floor(Math.random() * 30) + 20,
                        4: Math.floor(Math.random() * 25) + 15,
                        3: Math.floor(Math.random() * 20) + 10,
                        2: Math.floor(Math.random() * 10) + 5,
                        1: Math.floor(Math.random() * 5) + 1
                    }
                };
            } else if (q.type === 'yesno') {
                return {
                    questionId: q.id,
                    question: q.text,
                    type: 'yesno',
                    yes: Math.floor(Math.random() * 40) + 50,
                    no: Math.floor(Math.random() * 20) + 10
                };
            } else {
                return {
                    questionId: q.id,
                    question: q.text,
                    type: 'text',
                    sampleResponses: [
                        'Çox yaxşı xidmət',
                        'Daha çox endirim istəyirik',
                        'Online sifariş olsa əla olar'
                    ]
                };
            }
        })
    };

    res.json(results);
});

// DELETE survey
router.delete('/:id', (req, res) => {
    const index = surveys.findIndex(s => s.id === req.params.id);
    if (index === -1) {
        return res.status(404).json({ error: 'Survey not found' });
    }

    surveys.splice(index, 1);

    res.json({ success: true, message: 'Anket silindi' });
});

module.exports = router;
