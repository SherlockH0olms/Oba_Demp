import { useState, useMemo } from 'react';
import { Card, CardContent, Typography, Box, useTheme, alpha } from '@mui/material';
import { motion } from 'framer-motion';
import type { DailyTrend } from '../../types';

interface InteractiveSentimentChartProps {
    data: DailyTrend[];
}

export default function InteractiveSentimentChart({ data = [] }: InteractiveSentimentChartProps) {
    const theme = useTheme();
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

    const chartHeight = 160;
    const chartWidth = 360;
    const padding = { top: 30, bottom: 35, left: 10, right: 10 };

    // Prepare chart data
    const chartData = useMemo(() => {
        if (!Array.isArray(data) || !data.length) return [];
        return data.map((d, i) => ({
            ...d,
            total: d.positive + d.neutral + d.negative,
            index: i,
        }));
    }, [data]);

    const maxValue = useMemo(() => {
        if (!chartData.length) return 1;
        return Math.max(...chartData.map(d => d.total)) || 1;
    }, [chartData]);

    const getY = (value: number) => {
        const range = maxValue;
        const normalized = value / range;
        return chartHeight - padding.bottom - normalized * (chartHeight - padding.top - padding.bottom);
    };

    const getX = (index: number) => {
        if (chartData.length <= 1) return padding.left;
        return padding.left + (index / (chartData.length - 1)) * (chartWidth - padding.left - padding.right);
    };

    // Generate smooth curve path
    const generatePath = (dataKey: 'positive' | 'negative' | 'neutral') => {
        if (chartData.length < 2) return '';

        const points = chartData.map((d, i) => ({
            x: getX(i),
            y: getY(d[dataKey])
        }));

        let path = `M ${points[0].x} ${points[0].y}`;

        for (let i = 0; i < points.length - 1; i++) {
            const p0 = points[i - 1] || points[i];
            const p1 = points[i];
            const p2 = points[i + 1];
            const p3 = points[i + 2] || p2;

            const tension = 0.35;
            const cp1x = p1.x + (p2.x - p0.x) * tension;
            const cp1y = p1.y + (p2.y - p0.y) * tension;
            const cp2x = p2.x - (p3.x - p1.x) * tension;
            const cp2y = p2.y - (p3.y - p1.y) * tension;

            path += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${p2.x} ${p2.y}`;
        }

        return path;
    };

    const formatDate = (dateStr: string) => {
        const date = new Date(dateStr);
        return date.toLocaleDateString('az-AZ', { day: 'numeric', month: 'short' });
    };

    const sentimentColors = {
        positive: theme.palette.success.main,
        neutral: theme.palette.warning.main,
        negative: theme.palette.error.main,
    };

    if (!chartData.length) {
        return (
            <Card sx={{ height: '100%' }}>
                <CardContent>
                    <Typography variant="h6">📈 Sentiment Trendi</Typography>
                    <Typography color="text.secondary">Məlumat yoxdur</Typography>
                </CardContent>
            </Card>
        );
    }

    return (
        <Card
            sx={{
                height: '100%',
                background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.02)}, ${alpha(theme.palette.secondary.main, 0.02)})`,
            }}
        >
            <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                    <Typography variant="h6" fontWeight={600}>
                        📈 Sentiment Trendi
                    </Typography>

                    {/* Legend */}
                    <Box sx={{ display: 'flex', gap: 2 }}>
                        {Object.entries(sentimentColors).map(([key, color]) => (
                            <Box key={key} sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                <Box sx={{ width: 12, height: 3, borderRadius: 2, bgcolor: color }} />
                                <Typography variant="caption" color="text.secondary">
                                    {key === 'positive' ? 'Müsbət' : key === 'neutral' ? 'Neytral' : 'Mənfi'}
                                </Typography>
                            </Box>
                        ))}
                    </Box>
                </Box>

                <Box sx={{ position: 'relative' }}>
                    <svg
                        viewBox={`0 0 ${chartWidth} ${chartHeight}`}
                        style={{ width: '100%', height: 200, cursor: 'crosshair' }}
                        onMouseMove={(e) => {
                            const rect = e.currentTarget.getBoundingClientRect();
                            const x = e.clientX - rect.left;
                            const relativeX = (x / rect.width) * chartWidth;

                            let closestIndex = 0;
                            let closestDist = Infinity;
                            chartData.forEach((_, i) => {
                                const dist = Math.abs(getX(i) - relativeX);
                                if (dist < closestDist) {
                                    closestDist = dist;
                                    closestIndex = i;
                                }
                            });
                            setHoveredIndex(closestIndex);
                        }}
                        onMouseLeave={() => setHoveredIndex(null)}
                    >
                        <defs>
                            {Object.entries(sentimentColors).map(([key, color]) => (
                                <linearGradient key={key} id={`gradient-${key}`} x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="0%" stopColor={color} stopOpacity={0.3} />
                                    <stop offset="100%" stopColor={color} stopOpacity={0.02} />
                                </linearGradient>
                            ))}
                            <filter id="glow">
                                <feGaussianBlur stdDeviation="2" result="blur" />
                                <feMerge>
                                    <feMergeNode in="blur" />
                                    <feMergeNode in="SourceGraphic" />
                                </feMerge>
                            </filter>
                        </defs>

                        {/* Vertical dashed lines */}
                        {chartData.map((_, i) => (
                            <line
                                key={i}
                                x1={getX(i)}
                                y1={padding.top}
                                x2={getX(i)}
                                y2={chartHeight - padding.bottom}
                                stroke={theme.palette.divider}
                                strokeWidth={1}
                                strokeDasharray="3 5"
                                opacity={hoveredIndex === i ? 0.8 : 0.3}
                            />
                        ))}

                        {/* Area fills and lines for each sentiment */}
                        {(['positive', 'neutral', 'negative'] as const).map((sentiment) => (
                            <g key={sentiment}>
                                {/* Line */}
                                <motion.path
                                    d={generatePath(sentiment)}
                                    fill="none"
                                    stroke={sentimentColors[sentiment]}
                                    strokeWidth={2.5}
                                    strokeLinecap="round"
                                    initial={{ pathLength: 0 }}
                                    animate={{ pathLength: 1 }}
                                    transition={{ duration: 1.5, ease: 'easeOut' }}
                                />
                            </g>
                        ))}

                        {/* Hover points */}
                        {hoveredIndex !== null && chartData[hoveredIndex] && (
                            <g>
                                {(['positive', 'neutral', 'negative'] as const).map((sentiment) => (
                                    <motion.circle
                                        key={sentiment}
                                        cx={getX(hoveredIndex)}
                                        cy={getY(chartData[hoveredIndex][sentiment])}
                                        r={6}
                                        fill={theme.palette.background.paper}
                                        stroke={sentimentColors[sentiment]}
                                        strokeWidth={3}
                                        filter="url(#glow)"
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        transition={{ type: 'spring', stiffness: 300 }}
                                    />
                                ))}
                            </g>
                        )}

                        {/* X-axis labels */}
                        {chartData.map((d, i) => (
                            <text
                                key={i}
                                x={getX(i)}
                                y={chartHeight - 8}
                                textAnchor="middle"
                                fill={theme.palette.text.secondary}
                                fontSize={11}
                                fontFamily="Inter, sans-serif"
                            >
                                {formatDate(d.date)}
                            </text>
                        ))}
                    </svg>

                    {/* Floating tooltip */}
                    {hoveredIndex !== null && chartData[hoveredIndex] && (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            style={{
                                position: 'absolute',
                                left: `${(getX(hoveredIndex) / chartWidth) * 100}%`,
                                top: 0,
                                transform: 'translateX(-50%)',
                                pointerEvents: 'none',
                            }}
                        >
                            <Box
                                sx={{
                                    bgcolor: theme.palette.mode === 'dark' ? 'background.paper' : 'grey.900',
                                    color: theme.palette.mode === 'dark' ? 'text.primary' : 'white',
                                    px: 2,
                                    py: 1,
                                    borderRadius: 2,
                                    boxShadow: 4,
                                }}
                            >
                                <Typography variant="caption" display="block" sx={{ opacity: 0.7 }}>
                                    {formatDate(chartData[hoveredIndex].date)}
                                </Typography>
                                <Box sx={{ display: 'flex', gap: 1.5, mt: 0.5 }}>
                                    <Typography variant="body2" sx={{ color: sentimentColors.positive }}>
                                        😊 {chartData[hoveredIndex].positive}
                                    </Typography>
                                    <Typography variant="body2" sx={{ color: sentimentColors.neutral }}>
                                        😐 {chartData[hoveredIndex].neutral}
                                    </Typography>
                                    <Typography variant="body2" sx={{ color: sentimentColors.negative }}>
                                        ☹️ {chartData[hoveredIndex].negative}
                                    </Typography>
                                </Box>
                            </Box>
                        </motion.div>
                    )}
                </Box>
            </CardContent>
        </Card>
    );
}
