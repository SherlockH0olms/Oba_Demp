import { Card, CardContent, Typography, Box, useTheme } from '@mui/material';
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Legend,
} from 'recharts';
import type { DailyTrend } from '../../types';

interface SentimentChartProps {
    data: DailyTrend[];
}

export default function SentimentChart({ data }: SentimentChartProps) {
    const theme = useTheme();

    const formatDate = (dateStr: string) => {
        const date = new Date(dateStr);
        return date.toLocaleDateString('az-AZ', { day: 'numeric', month: 'short' });
    };

    const chartData = data.map(item => ({
        ...item,
        date: formatDate(item.date),
    }));

    return (
        <Card sx={{ height: '100%' }}>
            <CardContent>
                <Typography variant="h6" gutterBottom>
                    📈 Sentiment Trendi (Son 7 Gün)
                </Typography>
                <Box sx={{ width: '100%', height: 300 }}>
                    <ResponsiveContainer>
                        <LineChart data={chartData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" stroke={theme.palette.divider} />
                            <XAxis
                                dataKey="date"
                                tick={{ fontSize: 12 }}
                                stroke={theme.palette.text.secondary}
                            />
                            <YAxis
                                tick={{ fontSize: 12 }}
                                stroke={theme.palette.text.secondary}
                            />
                            <Tooltip
                                contentStyle={{
                                    backgroundColor: theme.palette.background.paper,
                                    border: `1px solid ${theme.palette.divider}`,
                                    borderRadius: 8,
                                }}
                            />
                            <Legend />
                            <Line
                                type="monotone"
                                dataKey="positive"
                                name="Müsbət"
                                stroke={theme.palette.success.main}
                                strokeWidth={2}
                                dot={{ fill: theme.palette.success.main, strokeWidth: 2 }}
                            />
                            <Line
                                type="monotone"
                                dataKey="neutral"
                                name="Neytral"
                                stroke={theme.palette.warning.main}
                                strokeWidth={2}
                                dot={{ fill: theme.palette.warning.main, strokeWidth: 2 }}
                            />
                            <Line
                                type="monotone"
                                dataKey="negative"
                                name="Mənfi"
                                stroke={theme.palette.error.main}
                                strokeWidth={2}
                                dot={{ fill: theme.palette.error.main, strokeWidth: 2 }}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </Box>
            </CardContent>
        </Card>
    );
}
