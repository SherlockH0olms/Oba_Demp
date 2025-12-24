import { create } from 'zustand';
import type { Feedback, DashboardStats, CallCenterTicket, CallCenterStats } from '../types';
import { feedbacksApi, callCenterApi } from '../services/api';

interface FeedbackStore {
    feedbacks: Feedback[];
    stats: DashboardStats | null;
    loading: boolean;
    error: string | null;

    // Actions
    fetchFeedbacks: () => Promise<void>;
    fetchStats: () => Promise<void>;
    addFeedback: (feedback: Feedback) => void;
    updateFeedback: (feedback: Feedback) => void;
}

export const useFeedbackStore = create<FeedbackStore>((set, get) => ({
    feedbacks: [],
    stats: null,
    loading: false,
    error: null,

    fetchFeedbacks: async () => {
        set({ loading: true, error: null });
        try {
            const response = await feedbacksApi.getAll();
            set({ feedbacks: response.data, loading: false });
        } catch (error) {
            set({ error: 'Failed to fetch feedbacks', loading: false });
        }
    },

    fetchStats: async () => {
        try {
            const response = await feedbacksApi.getStats();
            set({ stats: response.data });
        } catch (error) {
            console.error('Failed to fetch stats:', error);
        }
    },

    addFeedback: (feedback) => {
        set((state) => ({
            feedbacks: [feedback, ...state.feedbacks],
        }));
    },

    updateFeedback: (updatedFeedback) => {
        set((state) => ({
            feedbacks: state.feedbacks.map((f) =>
                f.id === updatedFeedback.id ? updatedFeedback : f
            ),
        }));
    },
}));

// Call Center Store
interface CallCenterStore {
    tickets: CallCenterTicket[];
    stats: CallCenterStats | null;
    loading: boolean;
    error: string | null;

    fetchTickets: () => Promise<void>;
    fetchStats: () => Promise<void>;
    addTicket: (ticket: CallCenterTicket) => void;
    updateTicket: (ticket: CallCenterTicket) => void;
}

export const useCallCenterStore = create<CallCenterStore>((set) => ({
    tickets: [],
    stats: null,
    loading: false,
    error: null,

    fetchTickets: async () => {
        set({ loading: true, error: null });
        try {
            const response = await callCenterApi.getTickets();
            set({ tickets: response.data, loading: false });
        } catch (error) {
            set({ error: 'Failed to fetch tickets', loading: false });
        }
    },

    fetchStats: async () => {
        try {
            const response = await callCenterApi.getStats();
            set({ stats: response.data });
        } catch (error) {
            console.error('Failed to fetch call center stats:', error);
        }
    },

    addTicket: (ticket) => {
        set((state) => ({
            tickets: [ticket, ...state.tickets],
        }));
    },

    updateTicket: (updatedTicket) => {
        set((state) => ({
            tickets: state.tickets.map((t) =>
                t.id === updatedTicket.id ? updatedTicket : t
            ),
        }));
    },
}));
