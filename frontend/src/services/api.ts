import axios from 'axios';
import type { Feedback, CallCenterTicket, Survey, Market, DashboardStats, CallCenterStats } from '../types';

const API_BASE = '/api';

const api = axios.create({
    baseURL: API_BASE,
    timeout: 10000,
});

// Feedbacks API
export const feedbacksApi = {
    getAll: (params?: { status?: string; priority?: string; department?: string; limit?: number }) =>
        api.get<Feedback[]>('/feedbacks', { params }),

    getById: (id: string) =>
        api.get<Feedback>(`/feedbacks/${id}`),

    create: (data: Partial<Feedback>) =>
        api.post<Feedback>('/feedbacks', data),

    update: (id: string, data: Partial<Feedback>) =>
        api.put<Feedback>(`/feedbacks/${id}`, data),

    getStats: () =>
        api.get<DashboardStats>('/feedbacks/stats/summary'),
};

// WhatsApp API
export const whatsappApi = {
    sendMessage: (params: { message: string; phone?: string; customerName?: string; marketId?: string }) =>
        api.post('/webhook/whatsapp', params),

    send: (params: { phone: string; message: string; type?: string }) =>
        api.post('/webhook/whatsapp/send', params),
};

// Telegram API
export const telegramApi = {
    sendMessage: (params: { message: string; chatId?: string; username?: string; marketId?: string }) =>
        api.post('/webhook/telegram', params),
};

// Azure AI API
export const aiApi = {
    analyze: (message: string) =>
        api.post('/ai/analyze', { message }),

    analyzeBatch: (messages: string[]) =>
        api.post('/ai/analyze-batch', { messages }),

    getModelInfo: () =>
        api.get('/ai/model-info'),
};

// Call Center API
export const callCenterApi = {
    getTickets: (params?: { status?: string; priority?: string }) =>
        api.get<CallCenterTicket[]>('/call-center/tickets', { params }),

    getTicket: (id: string) =>
        api.get<CallCenterTicket>(`/call-center/tickets/${id}`),

    updateTicket: (id: string, data: Partial<CallCenterTicket>) =>
        api.put<CallCenterTicket>(`/call-center/tickets/${id}`, data),

    createTicket: (data: Partial<CallCenterTicket>) =>
        api.post<CallCenterTicket>('/call-center/tickets', data),

    addNote: (id: string, text: string, author?: string) =>
        api.post(`/call-center/tickets/${id}/notes`, { text, author }),

    simulateCall: (id: string, operator?: string) =>
        api.post(`/call-center/tickets/${id}/call`, { operator }),

    getStats: () =>
        api.get<CallCenterStats>('/call-center/stats'),
};

// Surveys API
export const surveysApi = {
    getAll: (params?: { status?: string }) =>
        api.get<Survey[]>('/surveys', { params }),

    getById: (id: string) =>
        api.get<Survey>(`/surveys/${id}`),

    create: (data: Partial<Survey>) =>
        api.post<Survey>('/surveys', data),

    update: (id: string, data: Partial<Survey>) =>
        api.put<Survey>(`/surveys/${id}`, data),

    schedule: (id: string, scheduledDate: string, targetCount?: number) =>
        api.post(`/surveys/${id}/schedule`, { scheduledDate, targetCount }),

    activate: (id: string) =>
        api.post(`/surveys/${id}/activate`),

    pause: (id: string) =>
        api.post(`/surveys/${id}/pause`),

    getResults: (id: string) =>
        api.get(`/surveys/${id}/results`),

    delete: (id: string) =>
        api.delete(`/surveys/${id}`),
};

// QR Codes API
export const qrCodesApi = {
    getAll: () =>
        api.get<Market[]>('/qr-codes'),

    getById: (id: string) =>
        api.get<Market>(`/qr-codes/${id}`),
};

export default api;
