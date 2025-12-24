// Priority Calculator Service

const calculatePriority = (sentiment, keywords, category) => {
    let priorityScore = 0;

    // Sentiment based scoring
    switch (sentiment) {
        case 'negative':
            priorityScore += 50;
            break;
        case 'neutral':
            priorityScore += 25;
            break;
        case 'positive':
            priorityScore += 10;
            break;
    }

    // Critical keywords (Azerbaijani)
    const criticalKeywords = ['şikayət', 'kobud', 'problem', 'qəbul edilməz', 'biabırçı', 'dərhal', 'təcili'];
    const mediumKeywords = ['narazı', 'gözləmək', 'ləng', 'bahalı', 'yarımçıq'];

    if (keywords.some(kw => criticalKeywords.includes(kw))) {
        priorityScore += 30;
    } else if (keywords.some(kw => mediumKeywords.includes(kw))) {
        priorityScore += 15;
    }

    // Category based scoring
    const highPriorityCategories = ['staff_complaint', 'technical_issue', 'product_complaint'];
    const mediumPriorityCategories = ['service_complaint', 'facility_complaint', 'pricing_feedback'];

    if (highPriorityCategories.includes(category)) {
        priorityScore += 20;
    } else if (mediumPriorityCategories.includes(category)) {
        priorityScore += 10;
    }

    // Determine priority level and call center routing
    let priority, sendToCallCenter;

    if (priorityScore >= 70) {
        priority = 'high';
        sendToCallCenter = true;
    } else if (priorityScore >= 40) {
        priority = 'medium';
        sendToCallCenter = false;
    } else {
        priority = 'low';
        sendToCallCenter = false;
    }

    return {
        priority,
        score: priorityScore,
        sendToCallCenter
    };
};

const getDepartmentForCategory = (category) => {
    const mapping = {
        product_praise: 'Products',
        product_complaint: 'Products',
        service_praise: 'Service',
        service_complaint: 'Operations',
        staff_praise: 'HR',
        staff_complaint: 'HR',
        pricing_feedback: 'Marketing',
        facility_praise: 'Facilities',
        facility_complaint: 'Facilities',
        technical_issue: 'IT',
        suggestion: 'Management',
        inquiry: 'Service',
        general_feedback: 'Service'
    };

    return mapping[category] || 'Service';
};

module.exports = { calculatePriority, getDepartmentForCategory };
