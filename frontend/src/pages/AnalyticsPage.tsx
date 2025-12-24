import { useEffect, useState } from 'react';
import { Box, Card, CardContent, Typography, Grid, useTheme, alpha } from '@mui/material';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
    Legend,
} from 'recharts';
import { feedbacksApi } from '../services/api';
import type { DashboardStats } from '../types';

// Default mock data for demo
const defaultMockStats: DashboardStats = {
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
        'Məhsul': 42,
        'Xidmət': 35,
        'Qiymət': 22,
        'Təmizlik': 15,
        'Digər': 13,
    },
    departments: {
        'Müştəri Xidmətləri': 45,
        'Məhsul': 32,
        'Kassa': 22,
        'İT': 15,
        'Marketinq': 13,
    },
    dailyTrend: [
        { date: '2024-12-16', positive: 8, neutral: 4, negative: 2, total: 14 },
        { date: '2024-12-17', positive: 12, neutral: 6, negative: 3, total: 21 },
        { date: '2024-12-18', positive: 9, neutral: 5, negative: 4, total: 18 },
        { date: '2024-12-19', positive: 15, neutral: 7, negative: 2, total: 24 },
        { date: '2024-12-20', positive: 11, neutral: 4, negative: 5, total: 20 },
        { date: '2024-12-21', positive: 7, neutral: 3, negative: 3, total: 13 },
        { date: '2024-12-22', positive: 13, neutral: 9, negative: 5, total: 27 },
    ],
};

export default function AnalyticsPage() {
    const theme = useTheme();
    const [stats, setStats] = useState<DashboardStats>(defaultMockStats);

    useEffect(() => {
        loadStats();
    }, []);

    const loadStats = async () => {
        try {
            const response = await feedbacksApi.getStats();
            if (response.data && response.data.kpi) {
                setStats(response.data);
            }
        } catch (error) {
            console.error('Failed to load stats, using mock data:', error);
        }
    };

    const sentimentData = [
        { name: 'Müsbət', value: stats?.sentiment?.positive || 0, color: theme.palette.success.main },
        { name: 'Neytral', value: stats?.sentiment?.neutral || 0, color: theme.palette.warning.main },
        { name: 'Mənfi', value: stats?.sentiment?.negative || 0, color: theme.palette.error.main },
    ];

    const departmentData = Object.entries(stats?.departments || {}).map(([name, value]) => ({
        name,
        value,
    }));

    const formatDate = (dateStr: string) => {
        const date = new Date(dateStr);
        return date.toLocaleDateString('az-AZ', { day: 'numeric', month: 'short' });
    };

    return (
        <Box>
            <Typography variant="h5" gutterBottom fontWeight={600}>📊 Analitika Dashboard</Typography>

            <Grid container spacing={3}>
                {/* Sentiment Overview */}
                <Grid item xs={12} md={6}>
                    <Card sx={{
                        background: `linear-gradient(135deg, ${alpha(theme.palette.success.main, 0.05)}, ${alpha(theme.palette.background.paper, 1)})`,
                    }}>
                        <CardContent>
                            <Typography variant="h6" gutterBottom fontWeight={600}>😊 Sentiment Paylanması</Typography>
                            <Box sx={{ height: 300 }}>
                                <ResponsiveContainer>
                                    <PieChart>
                                        <Pie
                                            data={sentimentData}
                                            cx="50%"
                                            cy="50%"
                                            innerRadius={60}
                                            outerRadius={100}
                                            paddingAngle={3}
                                            dataKey="value"
                                            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                                        >
                                            {sentimentData.map((entry, index) => (
                                                <Cell
                                                    key={`cell-${index}`}
                                                    fill={entry.color}
                                                    stroke={theme.palette.background.paper}
                                                    strokeWidth={2}
                                                />
                                            ))}
                                        </Pie>
                                        <Tooltip
                                            formatter={(value: number) => [`${value} rəy`, '']}
                                            contentStyle={{
                                                borderRadius: 8,
                                                boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                                                border: 'none'
                                            }}
                                        />
                                        <Legend />
                                    </PieChart>
                                </ResponsiveContainer>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>

                {/* Department Distribution */}
                <Grid item xs={12} md={6}>
                    <Card sx={{
                        background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.05)}, ${alpha(theme.palette.background.paper, 1)})`,
                    }}>
                        <CardContent>
                            <Typography variant="h6" gutterBottom fontWeight={600}>🏢 Departament Paylanması</Typography>
                            <Box sx={{ height: 300 }}>
                                <ResponsiveContainer>
                                    <BarChart data={departmentData} layout="vertical" margin={{ left: 20 }}>
                                        <CartesianGrid strokeDasharray="3 3" stroke={alpha(theme.palette.divider, 0.5)} />
                                        <XAxis type="number" />
                                        <YAxis
                                            dataKey="name"
                                            type="category"
                                            tick={{ fontSize: 12, fill: theme.palette.text.secondary }}
                                            width={120}
                                        />
                                        <Tooltip
                                            formatter={(value: number) => [`${value} rəy`, '']}
                                            contentStyle={{
                                                borderRadius: 8,
                                                boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                                                border: 'none'
                                            }}
                                        />
                                        <Bar
                                            dataKey="value"
                                            fill={theme.palette.primary.main}
                                            radius={[0, 6, 6, 0]}
                                            background={{ fill: alpha(theme.palette.primary.main, 0.1) }}
                                        />
                                    </BarChart>
                                </ResponsiveContainer>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>

                {/* Daily Trend */}
                <Grid item xs={12}>
                    <Card sx={{
                        background: `linear-gradient(135deg, ${alpha(theme.palette.info.main, 0.03)}, ${alpha(theme.palette.background.paper, 1)})`,
                    }}>
                        <CardContent>
                            <Typography variant="h6" gutterBottom fontWeight={600}>📈 Günlük Trend</Typography>
                            <Box sx={{ height: 300 }}>
                                <ResponsiveContainer>
                                    <BarChart data={stats.dailyTrend}>
                                        <CartesianGrid strokeDasharray="3 3" stroke={alpha(theme.palette.divider, 0.5)} />
                                        <XAxis
                                            dataKey="date"
                                            tickFormatter={formatDate}
                                            tick={{ fontSize: 12, fill: theme.palette.text.secondary }}
                                        />
                                        <YAxis tick={{ fill: theme.palette.text.secondary }} />
                                        <Tooltip
                                            labelFormatter={formatDate}
                                            contentStyle={{
                                                borderRadius: 8,
                                                boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                                                border: 'none'
                                            }}
                                        />
                                        <Legend />
                                        <Bar
                                            dataKey="positive"
                                            name="😊 Müsbət"
                                            fill={theme.palette.success.main}
                                            stackId="a"
                                            radius={[0, 0, 0, 0]}
                                        />
                                        <Bar
                                            dataKey="neutral"
                                            name="😐 Neytral"
                                            fill={theme.palette.warning.main}
                                            stackId="a"
                                        />
                                        <Bar
                                            dataKey="negative"
                                            name="☹️ Mənfi"
                                            fill={theme.palette.error.main}
                                            stackId="a"
                                            radius={[4, 4, 0, 0]}
                                        />
                                    </BarChart>
                                </ResponsiveContainer>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>

                {/* KPI Summary */}
                <Grid item xs={12}>
                    <Card sx={{
                        background: `linear-gradient(135deg, ${alpha(theme.palette.secondary.main, 0.05)}, ${alpha(theme.palette.background.paper, 1)})`,
                    }}>
                        <CardContent>
                            <Typography variant="h6" gutterBottom fontWeight={600}>📋 KPI Xülasəsi</Typography>
                            <Grid container spacing={2}>
                                <Grid item xs={6} md={2}>
                                    <Box sx={{
                                        textAlign: 'center',
                                        p: 2,
                                        borderRadius: 2,
                                        bgcolor: alpha(theme.palette.primary.main, 0.08),
                                    }}>
                                        <Typography variant="h3" color="primary" fontWeight={700}>{stats.kpi.total}</Typography>
                                        <Typography variant="body2" color="text.secondary">Ümumi Rəy</Typography>
                                    </Box>
                                </Grid>
                                <Grid item xs={6} md={2}>
                                    <Box sx={{
                                        textAlign: 'center',
                                        p: 2,
                                        borderRadius: 2,
                                        bgcolor: alpha(theme.palette.success.main, 0.08),
                                    }}>
                                        <Typography variant="h3" color="success.main" fontWeight={700}>{stats.kpi.resolved}</Typography>
                                        <Typography variant="body2" color="text.secondary">Həll Olunub</Typography>
                                    </Box>
                                </Grid>
                                <Grid item xs={6} md={2}>
                                    <Box sx={{
                                        textAlign: 'center',
                                        p: 2,
                                        borderRadius: 2,
                                        bgcolor: alpha(theme.palette.warning.main, 0.08),
                                    }}>
                                        <Typography variant="h3" color="warning.main" fontWeight={700}>{stats.kpi.pending}</Typography>
                                        <Typography variant="body2" color="text.secondary">Gözləyir</Typography>
                                    </Box>
                                </Grid>
                                <Grid item xs={6} md={2}>
                                    <Box sx={{
                                        textAlign: 'center',
                                        p: 2,
                                        borderRadius: 2,
                                        bgcolor: alpha(theme.palette.error.main, 0.08),
                                    }}>
                                        <Typography variant="h3" color="error.main" fontWeight={700}>{stats.kpi.callCenter}</Typography>
                                        <Typography variant="body2" color="text.secondary">Call Center</Typography>
                                    </Box>
                                </Grid>
                                <Grid item xs={6} md={2}>
                                    <Box sx={{
                                        textAlign: 'center',
                                        p: 2,
                                        borderRadius: 2,
                                        bgcolor: alpha(theme.palette.info.main, 0.08),
                                    }}>
                                        <Typography variant="h3" color="info.main" fontWeight={700}>
                                            {stats.kpi.total ? ((stats.kpi.resolved / stats.kpi.total) * 100).toFixed(0) : 0}%
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">Həll Faizi</Typography>
                                    </Box>
                                </Grid>
                                <Grid item xs={6} md={2}>
                                    <Box sx={{
                                        textAlign: 'center',
                                        p: 2,
                                        borderRadius: 2,
                                        bgcolor: alpha(theme.palette.secondary.main, 0.08),
                                    }}>
                                        <Typography variant="h3" color="secondary.main" fontWeight={700}>{stats.kpi.thisWeek}</Typography>
                                        <Typography variant="body2" color="text.secondary">Bu Həftə</Typography>
                                    </Box>
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Box>
    );
}
