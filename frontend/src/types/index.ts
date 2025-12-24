// TypeScript Types for OBA CRM

export interface Customer {
    id?: string;
    name: string;
    phone?: string;
    chatId?: string;
}

export interface AIAnalysis {
    sentiment: 'positive' | 'neutral' | 'negative';
    confidence: number;
    category: string;
    priority: 'high' | 'medium' | 'low';
    keywords: string[];
    department: string;
    sendToCallCenter: boolean;
    suggestedAction: string;
}

export interface Feedback {
    id: string;
    text: string;
    customer: Customer;
    marketId: string;
    marketName?: string;
    timestamp: string;
    source?: 'whatsapp' | 'telegram';
    aiAnalysis: AIAnalysis;
    status: 'pending' | 'in_progress' | 'resolved';
}

export interface CallCenterTicket {
    id: string;
    feedbackId: string;
    customer: Customer;
    message: string;
    priority: 'high' | 'medium' | 'low';
    category: string;
    department: string;
    suggestedAction: string;
    status: 'open' | 'in_progress' | 'resolved';
    assignedTo: string | null;
    notes: TicketNote[];
    createdAt: string;
    updatedAt: string;
}

export interface TicketNote {
    id: string;
    text: string;
    author: string;
    type?: string;
    createdAt: string;
}

export interface Survey {
    id: string;
    title: string;
    description: string;
    questions: SurveyQuestion[];
    status: 'draft' | 'scheduled' | 'active' | 'paused' | 'completed';
    sentTo: number;
    responses: number;
    startDate: string;
    endDate: string;
    scheduledDate?: string;
    createdAt: string;
}

export interface SurveyQuestion {
    id: number;
    text: string;
    type: 'rating' | 'choice' | 'text' | 'yesno';
    options?: string[];
}

export interface Market {
    id: string;
    name: string;
    location: string;
    whatsappUrl: string;
    telegramUrl: string;
    qrImageUrl: string;
}

export interface DashboardStats {
    kpi: {
        total: number;
        thisWeek: number;
        resolved: number;
        callCenter: number;
        pending: number;
    };
    sentiment: {
        positive: number;
        neutral: number;
        negative: number;
    };
    categories: Record<string, number>;
    departments: Record<string, number>;
    dailyTrend: DailyTrend[];
}

export interface DailyTrend {
    date: string;
    total: number;
    positive: number;
    neutral: number;
    negative: number;
}

export interface CallCenterStats {
    total: number;
    open: number;
    inProgress: number;
    resolved: number;
    high: number;
    medium: number;
    low: number;
    averageResponseTime: string;
    resolutionRate: string;
    todayCalls: number;
}
