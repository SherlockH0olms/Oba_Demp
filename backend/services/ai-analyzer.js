// AI Analyzer Service - Mock Azure AI

const analyzeMessage = (message) => {
    const text = message.toLowerCase();

    // Sentiment keywords (Azerbaijani)
    const positiveWords = ['təşəkkür', 'sağol', 'əla', 'yaxşı', 'gözəl', 'mükəmməl', 'super', 'maraqlı', 'minnətdar', 'razı', 'sevindim', 'peşəkar', 'səliqəli'];
    const negativeWords = ['pis', 'kobud', 'narazı', 'şikayət', 'qəbul edilməz', 'biabırçı', 'berbad', 'xoşagəlməz', 'problem', 'xəta', 'gözlədim', 'ləng', 'yarımçıq', 'çatışmır'];

    // Calculate sentiment
    let positiveScore = 0;
    let negativeScore = 0;

    positiveWords.forEach(word => {
        if (text.includes(word)) positiveScore += 1;
    });

    negativeWords.forEach(word => {
        if (text.includes(word)) negativeScore += 1;
    });

    let sentiment = 'neutral';
    let confidence = 0.75;

    if (positiveScore > negativeScore) {
        sentiment = 'positive';
        confidence = Math.min(0.7 + (positiveScore * 0.1), 0.98);
    } else if (negativeScore > positiveScore) {
        sentiment = 'negative';
        confidence = Math.min(0.7 + (negativeScore * 0.1), 0.98);
    }

    // Detect category
    const categoryPatterns = {
        product_complaint: ['məhsul', 'yarımçıq', 'qırıq', 'köhnə', 'süt', 'çörək'],
        product_praise: ['məhsul', 'təzə', 'keyfiyyət'],
        service_complaint: ['kassa', 'gözləmək', 'ləng', 'növbə', 'xidmət'],
        service_praise: ['xidmət', 'əla', 'yaxşı'],
        staff_complaint: ['satıcı', 'işçi', 'kobud', 'davranış'],
        staff_praise: ['satıcı', 'işçi', 'peşəkar', 'köməkçi'],
        pricing_feedback: ['qiymət', 'bahalı', 'endirim', 'ucuz'],
        facility_complaint: ['park', 'dayanacaq', 'təmizlik'],
        facility_praise: ['təmiz', 'səliqəli', 'rahat'],
        technical_issue: ['kart', 'ödəniş', 'problem', 'işləmir', 'xəta'],
        suggestion: ['olsa', 'gərək', 'yaxşı olar', 'təklif'],
        inquiry: ['nə vaxt', 'harada', 'necə', 'varmı']
    };

    let category = 'general_feedback';
    for (const [cat, keywords] of Object.entries(categoryPatterns)) {
        if (keywords.some(kw => text.includes(kw))) {
            category = cat;
            break;
        }
    }

    // Department mapping
    const departmentMap = {
        product_complaint: 'Products',
        product_praise: 'Products',
        service_complaint: 'Operations',
        service_praise: 'Service',
        staff_complaint: 'HR',
        staff_praise: 'HR',
        pricing_feedback: 'Marketing',
        facility_complaint: 'Facilities',
        facility_praise: 'Facilities',
        technical_issue: 'IT',
        suggestion: 'Management',
        inquiry: 'Service',
        general_feedback: 'Service'
    };

    // Extract keywords
    const allKeywords = [...positiveWords, ...negativeWords, 'kassa', 'park', 'qiymət', 'məhsul', 'xidmət', 'ödəniş'];
    const foundKeywords = allKeywords.filter(kw => text.includes(kw));

    // Priority calculation
    const criticalWords = ['şikayət', 'kobud', 'problem', 'qəbul edilməz', 'biabırçı', 'yarımçıq'];
    const hasCritical = criticalWords.some(word => text.includes(word));

    let priority = 'low';
    let sendToCallCenter = false;

    if (sentiment === 'negative' && hasCritical) {
        priority = 'high';
        sendToCallCenter = true;
    } else if (sentiment === 'negative') {
        priority = 'medium';
    } else if (category.includes('complaint')) {
        priority = 'medium';
    }

    // Suggested actions
    const actionMap = {
        product_complaint: 'Məhsulu yoxlayın və əvəz edin',
        service_complaint: 'Xidmət keyfiyyətini artırın',
        staff_complaint: 'İşçi ilə görüş keçirin',
        pricing_feedback: 'Qiymət siyasətini nəzərdən keçirin',
        facility_complaint: 'İnfrastruktur problemini həll edin',
        technical_issue: 'Texniki dəstək göndərin',
        suggestion: 'Təklifi rəhbərliyə çatdırın',
        inquiry: 'Müştəriyə məlumat verin',
        product_praise: 'Müsbət rəy qeydə alındı',
        service_praise: 'Müsbət rəy komandaya çatdırıldı',
        staff_praise: 'Müsbət rəy HR-a göndərildi',
        facility_praise: 'Müsbət rəy qeydə alındı',
        general_feedback: 'Rəy qeydə alındı'
    };

    return {
        sentiment,
        confidence: parseFloat(confidence.toFixed(2)),
        category,
        priority,
        keywords: foundKeywords.slice(0, 5),
        department: departmentMap[category] || 'Service',
        sendToCallCenter,
        suggestedAction: actionMap[category] || 'Rəy qeydə alındı'
    };
};

// Simulate processing delay (like real AI API)
const analyzeWithDelay = (message) => {
    return new Promise((resolve) => {
        const delay = Math.random() * 500 + 200; // 200-700ms delay
        setTimeout(() => {
            resolve(analyzeMessage(message));
        }, delay);
    });
};

module.exports = { analyzeMessage, analyzeWithDelay };
