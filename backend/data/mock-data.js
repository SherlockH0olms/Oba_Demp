// Mock Data for OBA CRM Demo
const { v4: uuidv4 } = require('uuid');

// OBA Market Locations
const markets = [
    { id: 'M001', name: 'OBA 28 May', location: 'Bakı, 28 May metrosu', phone: '994501234567' },
    { id: 'M002', name: 'OBA Nərimanov', location: 'Bakı, Nərimanov rayonu', phone: '994501234568' },
    { id: 'M003', name: 'OBA Xətai', location: 'Bakı, Xətai rayonu', phone: '994501234569' },
    { id: 'M004', name: 'OBA Gənclik', location: 'Bakı, Gənclik metrosu', phone: '994501234570' },
    { id: 'M005', name: 'OBA Sumqayıt', location: 'Sumqayıt şəhəri', phone: '994501234571' }
];

// Sample customer messages in Azerbaijani
const sampleMessages = [
    {
        id: uuidv4(),
        text: "Bugün aldığım çörək çox təzə idi, təşəkkür!",
        customer: { name: "Əli Məmmədov", phone: "+994501112233" },
        marketId: "M001",
        timestamp: new Date(Date.now() - 1000 * 60 * 5).toISOString(),
        aiAnalysis: {
            sentiment: "positive",
            confidence: 0.92,
            category: "product_praise",
            priority: "low",
            keywords: ["çörək", "təzə", "təşəkkür"],
            department: "Products",
            sendToCallCenter: false,
            suggestedAction: "Müsbət rəy qeydə alındı"
        },
        status: "resolved"
    },
    {
        id: uuidv4(),
        text: "Kassada çox gözlədim, xahiş edirəm kassir sayını artırın",
        customer: { name: "Leyla Hüseynova", phone: "+994502223344" },
        marketId: "M002",
        timestamp: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
        aiAnalysis: {
            sentiment: "negative",
            confidence: 0.87,
            category: "service_complaint",
            priority: "high",
            keywords: ["kassa", "gözləmək", "çox"],
            department: "Operations",
            sendToCallCenter: true,
            suggestedAction: "Kassa sayını artırın"
        },
        status: "pending"
    },
    {
        id: uuidv4(),
        text: "Qiymətlər yüksəkdir, endirim etmək olar?",
        customer: { name: "Fuad Səfərov", phone: "+994503334455" },
        marketId: "M001",
        timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
        aiAnalysis: {
            sentiment: "neutral",
            confidence: 0.78,
            category: "pricing_feedback",
            priority: "medium",
            keywords: ["qiymət", "yüksək", "endirim"],
            department: "Marketing",
            sendToCallCenter: false,
            suggestedAction: "Endirim kampaniyaları haqqında məlumat verin"
        },
        status: "in_progress"
    },
    {
        id: uuidv4(),
        text: "Xidmət əladır, davam edin!",
        customer: { name: "Nigar Əliyeva", phone: "+994504445566" },
        marketId: "M003",
        timestamp: new Date(Date.now() - 1000 * 60 * 45).toISOString(),
        aiAnalysis: {
            sentiment: "positive",
            confidence: 0.95,
            category: "service_praise",
            priority: "low",
            keywords: ["xidmət", "əla", "davam"],
            department: "Service",
            sendToCallCenter: false,
            suggestedAction: "Müsbət rəy komandaya çatdırıldı"
        },
        status: "resolved"
    },
    {
        id: uuidv4(),
        text: "Məhsul yarımçıq gəldi, əvəz edə bilərəmmi?",
        customer: { name: "Rəşad Quliyev", phone: "+994505556677" },
        marketId: "M004",
        timestamp: new Date(Date.now() - 1000 * 60 * 60).toISOString(),
        aiAnalysis: {
            sentiment: "negative",
            confidence: 0.89,
            category: "product_complaint",
            priority: "high",
            keywords: ["məhsul", "yarımçıq", "əvəz"],
            department: "Products",
            sendToCallCenter: true,
            suggestedAction: "Məhsulu dərhal əvəz edin"
        },
        status: "pending"
    },
    {
        id: uuidv4(),
        text: "Onlayn sifariş sistemi olsa yaxşı olar",
        customer: { name: "Səbinə Kazımova", phone: "+994506667788" },
        marketId: "M002",
        timestamp: new Date(Date.now() - 1000 * 60 * 90).toISOString(),
        aiAnalysis: {
            sentiment: "neutral",
            confidence: 0.82,
            category: "suggestion",
            priority: "medium",
            keywords: ["onlayn", "sifariş", "sistem"],
            department: "IT",
            sendToCallCenter: false,
            suggestedAction: "Təklif rəhbərliyə göndərildi"
        },
        status: "in_progress"
    },
    {
        id: uuidv4(),
        text: "24/7 açıq marketiniz varmı?",
        customer: { name: "Tural Həsənov", phone: "+994507778899" },
        marketId: "M001",
        timestamp: new Date(Date.now() - 1000 * 60 * 120).toISOString(),
        aiAnalysis: {
            sentiment: "neutral",
            confidence: 0.75,
            category: "inquiry",
            priority: "low",
            keywords: ["24/7", "açıq", "market"],
            department: "Service",
            sendToCallCenter: false,
            suggestedAction: "İş saatları haqqında məlumat verin"
        },
        status: "resolved"
    },
    {
        id: uuidv4(),
        text: "Kredit kartı ilə ödəniş problemi yaşadım",
        customer: { name: "Aynur Rəhimova", phone: "+994508889900" },
        marketId: "M003",
        timestamp: new Date(Date.now() - 1000 * 60 * 150).toISOString(),
        aiAnalysis: {
            sentiment: "negative",
            confidence: 0.91,
            category: "technical_issue",
            priority: "high",
            keywords: ["kredit kartı", "ödəniş", "problem"],
            department: "IT",
            sendToCallCenter: true,
            suggestedAction: "Texniki dəstək göndərin"
        },
        status: "pending"
    },
    {
        id: uuidv4(),
        text: "Çox peşəkar komanda, minnətdaram",
        customer: { name: "Vüsal Əhmədov", phone: "+994509990011" },
        marketId: "M005",
        timestamp: new Date(Date.now() - 1000 * 60 * 180).toISOString(),
        aiAnalysis: {
            sentiment: "positive",
            confidence: 0.94,
            category: "staff_praise",
            priority: "low",
            keywords: ["peşəkar", "komanda", "minnətdar"],
            department: "HR",
            sendToCallCenter: false,
            suggestedAction: "Müsbət rəy işçilərə çatdırıldı"
        },
        status: "resolved"
    },
    {
        id: uuidv4(),
        text: "Park yeri çatışmır, dayanacaq problemi var",
        customer: { name: "Elçin Nəsirov", phone: "+994551112233" },
        marketId: "M002",
        timestamp: new Date(Date.now() - 1000 * 60 * 210).toISOString(),
        aiAnalysis: {
            sentiment: "negative",
            confidence: 0.85,
            category: "facility_complaint",
            priority: "medium",
            keywords: ["park", "yeri", "çatışmır"],
            department: "Facilities",
            sendToCallCenter: false,
            suggestedAction: "Parking sahəsini genişləndirin"
        },
        status: "in_progress"
    },
    {
        id: uuidv4(),
        text: "Təmizlik çox yaxşıdır, market çox səliqəlidir",
        customer: { name: "Günel Məmmədova", phone: "+994552223344" },
        marketId: "M004",
        timestamp: new Date(Date.now() - 1000 * 60 * 240).toISOString(),
        aiAnalysis: {
            sentiment: "positive",
            confidence: 0.93,
            category: "facility_praise",
            priority: "low",
            keywords: ["təmizlik", "yaxşı", "səliqəli"],
            department: "Facilities",
            sendToCallCenter: false,
            suggestedAction: "Müsbət rəy qeydə alındı"
        },
        status: "resolved"
    },
    {
        id: uuidv4(),
        text: "Satıcılar çox kobud davrandı, qəbul edilməzdir!",
        customer: { name: "Orxan Hüseynov", phone: "+994553334455" },
        marketId: "M001",
        timestamp: new Date(Date.now() - 1000 * 60 * 10).toISOString(),
        aiAnalysis: {
            sentiment: "negative",
            confidence: 0.96,
            category: "staff_complaint",
            priority: "high",
            keywords: ["satıcı", "kobud", "qəbul edilməz"],
            department: "HR",
            sendToCallCenter: true,
            suggestedAction: "Dərhal araşdırma aparın"
        },
        status: "pending"
    },
    {
        id: uuidv4(),
        text: "Organik məhsul seçimi genişləndirin, daha çox bio məhsul istəyirik",
        customer: { name: "Naila Əzizova", phone: "+994554445566" },
        marketId: "M003",
        timestamp: new Date(Date.now() - 1000 * 60 * 300).toISOString(),
        aiAnalysis: {
            sentiment: "neutral",
            confidence: 0.80,
            category: "suggestion",
            priority: "medium",
            keywords: ["organik", "bio", "məhsul"],
            department: "Products",
            sendToCallCenter: false,
            suggestedAction: "Təklif Products departamentinə göndərildi"
        },
        status: "in_progress"
    },
    {
        id: uuidv4(),
        text: "Mobil tətbiq nə vaxt hazır olacaq?",
        customer: { name: "Ayxan Əliyev", phone: "+994555556677" },
        marketId: "M005",
        timestamp: new Date(Date.now() - 1000 * 60 * 360).toISOString(),
        aiAnalysis: {
            sentiment: "neutral",
            confidence: 0.77,
            category: "inquiry",
            priority: "low",
            keywords: ["mobil", "tətbiq", "hazır"],
            department: "IT",
            sendToCallCenter: false,
            suggestedAction: "Mobil tətbiq planları haqqında məlumat verin"
        },
        status: "resolved"
    },
    {
        id: uuidv4(),
        text: "VIP müştəri kartı üçün necə müraciət edim?",
        customer: { name: "Rəna Qasımova", phone: "+994556667788" },
        marketId: "M002",
        timestamp: new Date(Date.now() - 1000 * 60 * 420).toISOString(),
        aiAnalysis: {
            sentiment: "neutral",
            confidence: 0.79,
            category: "inquiry",
            priority: "low",
            keywords: ["VIP", "kart", "müraciət"],
            department: "Marketing",
            sendToCallCenter: false,
            suggestedAction: "VIP kart proqramı haqqında məlumat verin"
        },
        status: "resolved"
    }
];

// Surveys data
const surveys = [
    {
        id: uuidv4(),
        title: "Dekabr Məhsul Məmnuniyyəti",
        description: "Aylıq məhsul keyfiyyəti sorğusu",
        status: "active",
        questions: [
            { id: 1, text: "Məhsul keyfiyyətini necə qiymətləndirirsiniz?", type: "rating" },
            { id: 2, text: "Hansı məhsul kateqoriyasını ən çox bəyənirsiniz?", type: "choice" },
            { id: 3, text: "Təklifləriniz varmı?", type: "text" }
        ],
        sentTo: 156,
        responses: 89,
        startDate: "2024-12-01",
        endDate: "2024-12-31",
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 20).toISOString()
    },
    {
        id: uuidv4(),
        title: "Noyabr Xidmət Qiymətləndirməsi",
        description: "Xidmət keyfiyyəti sorğusu",
        status: "completed",
        questions: [
            { id: 1, text: "Xidmət səviyyəsini necə qiymətləndirirsiniz?", type: "rating" },
            { id: 2, text: "İşçilərimiz nə dərəcədə köməkçi idi?", type: "rating" },
            { id: 3, text: "Yenidən gələrsinizmi?", type: "yesno" }
        ],
        sentTo: 234,
        responses: 198,
        startDate: "2024-11-01",
        endDate: "2024-11-30",
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 50).toISOString()
    },
    {
        id: uuidv4(),
        title: "Oktyabr Qiymət Sorğusu",
        description: "Qiymət siyasəti sorğusu",
        status: "completed",
        questions: [
            { id: 1, text: "Qiymətlərimiz rəqiblərlə müqayisədə necədir?", type: "choice" },
            { id: 2, text: "Hansı məhsulların qiymətini endirməliyik?", type: "text" }
        ],
        sentTo: 187,
        responses: 142,
        startDate: "2024-10-01",
        endDate: "2024-10-31",
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 80).toISOString()
    }
];

// AI Response mappings for common message patterns
const aiPatterns = [
    { keywords: ["təşəkkür", "sağol", "əla", "yaxşı", "gözəl", "mükəmməl"], sentiment: "positive", priority: "low" },
    { keywords: ["pis", "kobud", "narazı", "şikayət", "qəbul edilməz", "biabırçı"], sentiment: "negative", priority: "high" },
    { keywords: ["gözləmək", "növbə", "ləng", "uzun"], sentiment: "negative", priority: "high" },
    { keywords: ["endirim", "qiymət", "bahalı", "yüksək"], sentiment: "neutral", priority: "medium" },
    { keywords: ["problem", "xəta", "işləmir", "qırıq"], sentiment: "negative", priority: "high" },
    { keywords: ["təklif", "olsa", "yaxşı olar", "gərək"], sentiment: "neutral", priority: "medium" },
    { keywords: ["nə vaxt", "harada", "necə"], sentiment: "neutral", priority: "low" }
];

// Categories mapping
const categories = {
    product_praise: "Məhsul Təriflər",
    product_complaint: "Məhsul Şikayətləri",
    service_praise: "Xidmət Təriflər",
    service_complaint: "Xidmət Şikayətləri",
    staff_praise: "İşçi Təriflər",
    staff_complaint: "İşçi Şikayətləri",
    pricing_feedback: "Qiymət Rəyi",
    facility_complaint: "İmkan Şikayətləri",
    facility_praise: "İmkan Təriflər",
    technical_issue: "Texniki Problem",
    suggestion: "Təklif",
    inquiry: "Sual"
};

// Departments
const departments = [
    "Products", "Service", "Operations", "Marketing", "HR", "IT", "Facilities", "CallCenter"
];

module.exports = {
    markets,
    sampleMessages,
    surveys,
    aiPatterns,
    categories,
    departments
};
