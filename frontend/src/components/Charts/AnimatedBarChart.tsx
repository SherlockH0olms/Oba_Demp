import { useState, useMemo } from 'react';
import { Card, CardContent, Typography, Box, useTheme, alpha } from '@mui/material';
import { motion } from 'framer-motion';

interface BarData {
    label: string;
    value: number;
    color?: string;
}

interface AnimatedBarChartProps {
    data: BarData[];
    title?: string;
    height?: number;
}

export default function AnimatedBarChart({
    data,
    title = 'Statistika',
    height = 200
}: AnimatedBarChartProps) {
    const theme = useTheme();
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

    const maxValue = useMemo(() => {
        return Math.max(...data.map(d => d.value), 1);
    }, [data]);

    const normalizedData = useMemo(() => {
        return data.map((d, i) => ({
            ...d,
            normalized: d.value / maxValue,
            index: i,
        }));
    }, [data, maxValue]);

    const barVariants = {
        hidden: { scaleY: 0 },
        visible: (i: number) => ({
            scaleY: 1,
            transition: {
                delay: i * 0.05,
                type: 'spring' as const,
                stiffness: 80,
                damping: 12,
            },
        }),
    };

    const defaultColors = [
        theme.palette.primary.main,
        theme.palette.secondary.main,
        theme.palette.success.main,
        theme.palette.warning.main,
        theme.palette.error.main,
        theme.palette.info.main,
    ];

    return (
        <Card>
            <CardContent>
                <Typography variant="h6" gutterBottom fontWeight={600}>
                    {title}
                </Typography>

                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'flex-end',
                        gap: '4px',
                        height,
                        mt: 2,
                        px: 1,
                    }}
                >
                    {normalizedData.map((item, index) => {
                        const isHovered = hoveredIndex === index;
                        const barColor = item.color || defaultColors[index % defaultColors.length];

                        return (
                            <Box
                                key={item.label}
                                sx={{
                                    flex: 1,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    height: '100%',
                                }}
                            >
                                {/* Value label on hover */}
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{
                                        opacity: isHovered ? 1 : 0,
                                        y: isHovered ? 0 : 10,
                                    }}
                                    style={{ marginBottom: 4 }}
                                >
                                    <Typography
                                        variant="caption"
                                        sx={{
                                            fontWeight: 600,
                                            color: barColor,
                                        }}
                                    >
                                        {item.value}
                                    </Typography>
                                </motion.div>

                                {/* Bar container */}
                                <Box
                                    sx={{
                                        flex: 1,
                                        width: '100%',
                                        display: 'flex',
                                        alignItems: 'flex-end',
                                    }}
                                    onMouseEnter={() => setHoveredIndex(index)}
                                    onMouseLeave={() => setHoveredIndex(null)}
                                >
                                    <motion.div
                                        custom={index}
                                        variants={barVariants}
                                        initial="hidden"
                                        animate="visible"
                                        whileHover={{ scale: 1.05 }}
                                        style={{
                                            width: '100%',
                                            height: `${item.normalized * 100}%`,
                                            minHeight: 4,
                                            background: isHovered
                                                ? barColor
                                                : `linear-gradient(180deg, ${barColor}, ${alpha(barColor, 0.6)})`,
                                            borderRadius: '6px 6px 0 0',
                                            transformOrigin: 'bottom',
                                            cursor: 'pointer',
                                            boxShadow: isHovered
                                                ? `0 -4px 16px ${alpha(barColor, 0.4)}`
                                                : 'none',
                                            transition: 'box-shadow 0.2s, background 0.2s',
                                        }}
                                    />
                                </Box>

                                {/* Label */}
                                <Typography
                                    variant="caption"
                                    sx={{
                                        mt: 1,
                                        color: isHovered ? barColor : 'text.secondary',
                                        fontWeight: isHovered ? 600 : 400,
                                        transition: 'all 0.2s',
                                        fontSize: 10,
                                        textAlign: 'center',
                                        whiteSpace: 'nowrap',
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis',
                                        maxWidth: '100%',
                                    }}
                                >
                                    {item.label}
                                </Typography>
                            </Box>
                        );
                    })}
                </Box>
            </CardContent>
        </Card>
    );
}
