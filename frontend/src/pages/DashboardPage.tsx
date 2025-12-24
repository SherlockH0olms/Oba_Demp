import { useEffect, useState } from 'react';
import { Box, Grid, Alert, Snackbar, Typography } from '@mui/material';
import KPICards from '../components/Dashboard/KPICards';
import InteractiveSentimentChart from '../components/Charts/InteractiveSentimentChart';
import CategoryPieChart from '../components/Dashboard/CategoryPieChart';
import FeedbackTable from '../components/Dashboard/FeedbackTable';
import { useFeedbackStore } from '../store/feedbackStore';
import { socketService } from '../services/socket';
import type { Feedback, DashboardStats } from '../types';

// Default mock stats for demo
const mockStats: DashboardStats = {
    kpi: {
        total: 127,
        thisWeek: 34,
        resolved: 98,
        pending: 29,
        callCenter: 12,
    },
    sentiment: {
        positive: 65,
        neutral: 38,
        negative: 24,
    },
    categories: {
        'Məhsul Keyfiyyəti': 42,
        'Müştəri Xidməti': 35,
        'Qiymət Siyasəti': 22,
        'Mağaza Təmizliyi': 18,
        'Kassir Xidməti': 15,
    },
    departments: {
        'Müştəri Xidmətləri': 45,
        'Məhsul': 32,
        'Kassa': 22,
        'İT': 15,
        'Marketinq': 13,
    },
    dailyTrend: generateMockTrend(),
};

// Generate consistent mock trend data
function generateMockTrend() {
    const data = [
        { date: '2024-12-16', positive: 8, neutral: 4, negative: 2, total: 14 },
        { date: '2024-12-17', positive: 12, neutral: 6, negative: 3, total: 21 },
        { date: '2024-12-18', positive: 9, neutral: 5, negative: 4, total: 18 },
        { date: '2024-12-19', positive: 15, neutral: 7, negative: 2, total: 24 },
        { date: '2024-12-20', positive: 11, neutral: 4, negative: 5, total: 20 },
        { date: '2024-12-21', positive: 7, neutral: 3, negative: 3, total: 13 },
        { date: '2024-12-22', positive: 13, neutral: 9, negative: 5, total: 27 },
    ];
    return data;
}

export default function DashboardPage() {
    const { feedbacks, stats, fetchFeedbacks, fetchStats, addFeedback } = useFeedbackStore();
    const [notification, setNotification] = useState<string | null>(null);

    // Use store stats or fall back to mock
    const displayStats = stats?.kpi?.total ? stats : mockStats;

    useEffect(() => {
        fetchFeedbacks();
        fetchStats();

        // Connect WebSocket
        socketService.connect();

        // Listen for real-time updates
        const unsubscribe = socketService.on('new_feedback', (feedback: Feedback) => {
            addFeedback(feedback);
            fetchStats();

            if (feedback.aiAnalysis.sendToCallCenter) {
                setNotification(`⚠️ Kritik rəy: ${feedback.customer.name} - "${feedback.text.substring(0, 50)}..."`);
            } else {
                setNotification(`📬 Yeni rəy: ${feedback.customer.name}`);
            }
        });

        return () => {
            unsubscribe();
        };
    }, []);

    return (
        <Box>
            <Typography variant="h5" gutterBottom fontWeight={600}>
                📊 Dashboard
            </Typography>

            {/* KPI Cards */}
            <KPICards
                total={displayStats.kpi.total}
                thisWeek={displayStats.kpi.thisWeek}
                resolved={displayStats.kpi.resolved}
                callCenter={displayStats.kpi.callCenter}
            />

            {/* Charts */}
            <Grid container spacing={3} sx={{ mt: 0 }}>
                <Grid item xs={12} md={7}>
                    <InteractiveSentimentChart data={displayStats.dailyTrend} />
                </Grid>
                <Grid item xs={12} md={5}>
                    <CategoryPieChart categories={displayStats.categories} />
                </Grid>
            </Grid>

            {/* Feedback Table */}
            <Box sx={{ mt: 3 }}>
                <FeedbackTable feedbacks={feedbacks} />
            </Box>

            {/* Notification */}
            <Snackbar
                open={!!notification}
                autoHideDuration={5000}
                onClose={() => setNotification(null)}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            >
                <Alert
                    onClose={() => setNotification(null)}
                    severity={notification?.includes('Kritik') ? 'error' : 'info'}
                    variant="filled"
                >
                    {notification}
                </Alert>
            </Snackbar>
        </Box>
    );
}
