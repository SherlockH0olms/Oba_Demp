import { Card, CardContent, Typography, Box, alpha, useTheme } from '@mui/material';
import {
    Feedback as FeedbackIcon,
    DateRange as WeekIcon,
    CheckCircle as ResolvedIcon,
    SupportAgent as CallCenterIcon,
} from '@mui/icons-material';

interface KPICardsProps {
    total: number;
    thisWeek: number;
    resolved: number;
    callCenter: number;
}

export default function KPICards({ total, thisWeek, resolved, callCenter }: KPICardsProps) {
    const theme = useTheme();

    const cards = [
        {
            title: 'Ümumi Rəylər',
            value: total,
            icon: <FeedbackIcon />,
            color: theme.palette.primary.main,
            bgColor: alpha(theme.palette.primary.main, 0.1),
        },
        {
            title: 'Bu Həftə',
            value: thisWeek,
            icon: <WeekIcon />,
            color: theme.palette.info.main,
            bgColor: alpha(theme.palette.info.main, 0.1),
        },
        {
            title: 'Həll Olunub',
            value: resolved,
            icon: <ResolvedIcon />,
            color: theme.palette.success.main,
            bgColor: alpha(theme.palette.success.main, 0.1),
        },
        {
            title: 'Call Center',
            value: callCenter,
            icon: <CallCenterIcon />,
            color: theme.palette.error.main,
            bgColor: alpha(theme.palette.error.main, 0.1),
        },
    ];

    return (
        <Box
            sx={{
                display: 'grid',
                gridTemplateColumns: {
                    xs: '1fr',
                    sm: 'repeat(2, 1fr)',
                    md: 'repeat(4, 1fr)',
                },
                gap: 3,
            }}
        >
            {cards.map((card) => (
                <Card key={card.title}>
                    <CardContent sx={{ p: 3 }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                            <Box>
                                <Typography variant="body2" color="text.secondary" gutterBottom>
                                    {card.title}
                                </Typography>
                                <Typography variant="h4" fontWeight={700} color={card.color}>
                                    {card.value.toLocaleString()}
                                </Typography>
                            </Box>
                            <Box
                                sx={{
                                    p: 1.5,
                                    borderRadius: 2,
                                    bgcolor: card.bgColor,
                                    color: card.color,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}
                            >
                                {card.icon}
                            </Box>
                        </Box>
                    </CardContent>
                </Card>
            ))}
        </Box>
    );
}
