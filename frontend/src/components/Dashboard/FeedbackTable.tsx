import {
    Card,
    CardContent,
    Typography,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Chip,
    IconButton,
    Box,
    Tooltip,
    alpha,
    useTheme,
} from '@mui/material';
import {
    Visibility as ViewIcon,
    Phone as PhoneIcon,
} from '@mui/icons-material';
import type { Feedback } from '../../types';

interface FeedbackTableProps {
    feedbacks: Feedback[];
    onView?: (feedback: Feedback) => void;
}

const sentimentEmoji: Record<string, string> = {
    positive: '😊',
    neutral: '😐',
    negative: '☹️',
};

const statusColors: Record<string, 'success' | 'warning' | 'error' | 'default'> = {
    resolved: 'success',
    in_progress: 'warning',
    pending: 'error',
};

const statusLabels: Record<string, string> = {
    resolved: 'Həll olundu',
    in_progress: 'Davam edir',
    pending: 'Gözləyir',
};

// Mock data for demo
const mockFeedbacks: Feedback[] = [
    {
        id: 'FB001',
        text: 'Bugün aldığım çörək çox təzə idi, təşəkkür edirəm! Hər zaman belə keyfiyyət saxlayın.',
        customer: { id: 'C001', name: 'Anar Məmmədov', phone: '+994501112233' },
        source: 'whatsapp',
        marketId: 'M001',
        timestamp: new Date().toISOString(),
        status: 'resolved',
        aiAnalysis: {
            sentiment: 'positive',
            category: 'product_praise',
            priority: 'low',
            keywords: ['təzə', 'çörək', 'keyfiyyət'],
            confidence: 0.92,
            department: 'Məhsul',
            suggestedAction: 'Təşəkkür mesajı göndər',
            sendToCallCenter: false,
        },
    },
    {
        id: 'FB002',
        text: 'Kassada 20 dəqiqə gözlədim, bu qəbulolunmazdır! Daha çox kassir lazımdır.',
        customer: { id: 'C002', name: 'Leyla Əliyeva', phone: '+994502223344' },
        source: 'telegram',
        marketId: 'M002',
        timestamp: new Date(Date.now() - 3600000).toISOString(),
        status: 'in_progress',
        aiAnalysis: {
            sentiment: 'negative',
            category: 'service_complaint',
            priority: 'high',
            keywords: ['gözlədim', 'kassir', 'qəbulolunmaz'],
            confidence: 0.88,
            department: 'Kassa',
            suggestedAction: 'Dərhal cavab tələb olunur',
            sendToCallCenter: true,
        },
    },
    {
        id: 'FB003',
        text: 'Qiymətlər bir az yüksəkdir, endirim aksiyaları olsa yaxşı olar.',
        customer: { id: 'C003', name: 'Tural Hüseynov', phone: '+994503334455' },
        source: 'whatsapp',
        marketId: 'M003',
        timestamp: new Date(Date.now() - 7200000).toISOString(),
        status: 'pending',
        aiAnalysis: {
            sentiment: 'neutral',
            category: 'pricing_feedback',
            priority: 'medium',
            keywords: ['qiymət', 'endirim', 'aksiya'],
            confidence: 0.85,
            department: 'Marketinq',
            suggestedAction: 'Marketinq şöbəsinə yönləndir',
            sendToCallCenter: false,
        },
    },
    {
        id: 'FB004',
        text: 'İşçilər çox öxşar və yardımsevərdir. Xüsusilə Aysel xanıma təşəkkür!',
        customer: { id: 'C004', name: 'Nigar Rəhimova', phone: '+994504445566' },
        source: 'whatsapp',
        marketId: 'M001',
        timestamp: new Date(Date.now() - 10800000).toISOString(),
        status: 'resolved',
        aiAnalysis: {
            sentiment: 'positive',
            category: 'staff_praise',
            priority: 'low',
            keywords: ['yardımsevər', 'işçi', 'təşəkkür'],
            confidence: 0.95,
            department: 'HR',
            suggestedAction: 'İşçini mükafatlandır',
            sendToCallCenter: false,
        },
    },
    {
        id: 'FB005',
        text: 'Məhsul yarımçıq satıldı, paketi açık gəldi. Əvəz olunmadı!',
        customer: { id: 'C005', name: 'Rəşad Quliyev', phone: '+994505556677' },
        source: 'telegram',
        marketId: 'M004',
        timestamp: new Date(Date.now() - 14400000).toISOString(),
        status: 'in_progress',
        aiAnalysis: {
            sentiment: 'negative',
            category: 'product_complaint',
            priority: 'high',
            keywords: ['yarımçıq', 'açık', 'əvəz'],
            confidence: 0.91,
            department: 'Məhsul',
            suggestedAction: 'Təcili əlaqə saxla',
            sendToCallCenter: true,
        },
    },
    {
        id: 'FB006',
        text: 'Onlayn sifariş sistemi çox rahat olardı. Bu imkanı əlavə edin.',
        customer: { id: 'C006', name: 'Səbinə Məmədova', phone: '+994506667788' },
        source: 'whatsapp',
        marketId: 'M002',
        timestamp: new Date(Date.now() - 18000000).toISOString(),
        status: 'pending',
        aiAnalysis: {
            sentiment: 'neutral',
            category: 'suggestion',
            priority: 'low',
            keywords: ['onlayn', 'sifariş', 'sistem'],
            confidence: 0.87,
            department: 'İT',
            suggestedAction: 'İT şöbəsinə təklif kimi göndər',
            sendToCallCenter: false,
        },
    },
];

export default function FeedbackTable({ feedbacks = [], onView }: FeedbackTableProps) {
    const theme = useTheme();

    // Use mock data if feedbacks is empty or undefined
    const displayFeedbacks = Array.isArray(feedbacks) && feedbacks.length > 0 ? feedbacks : mockFeedbacks;

    const formatDate = (dateStr: string) => {
        const date = new Date(dateStr);
        return date.toLocaleDateString('az-AZ', {
            day: '2-digit',
            month: '2-digit',
            year: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    return (
        <Card sx={{
            background: `linear-gradient(135deg, ${alpha(theme.palette.info.main, 0.03)}, ${alpha(theme.palette.background.paper, 1)})`,
        }}>
            <CardContent>
                <Typography variant="h6" gutterBottom fontWeight={600}>
                    📋 Son Rəylər
                </Typography>
                <TableContainer>
                    <Table size="small">
                        <TableHead>
                            <TableRow>
                                <TableCell>Tarix</TableCell>
                                <TableCell>Müştəri</TableCell>
                                <TableCell>Mesaj</TableCell>
                                <TableCell align="center">Sentiment</TableCell>
                                <TableCell>Departament</TableCell>
                                <TableCell>Status</TableCell>
                                <TableCell align="center">Əməliyyat</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {displayFeedbacks.slice(0, 10).map((feedback) => (
                                <TableRow
                                    key={feedback.id}
                                    hover
                                    sx={{
                                        '&:hover': {
                                            bgcolor: alpha(theme.palette.primary.main, 0.04),
                                        },
                                    }}
                                >
                                    <TableCell sx={{ whiteSpace: 'nowrap' }}>
                                        {formatDate(feedback.timestamp)}
                                    </TableCell>
                                    <TableCell>
                                        <Typography variant="body2" fontWeight={500}>
                                            {feedback.customer.name}
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Tooltip title={feedback.text}>
                                            <Typography
                                                variant="body2"
                                                sx={{
                                                    maxWidth: 200,
                                                    overflow: 'hidden',
                                                    textOverflow: 'ellipsis',
                                                    whiteSpace: 'nowrap',
                                                }}
                                            >
                                                {feedback.text}
                                            </Typography>
                                        </Tooltip>
                                    </TableCell>
                                    <TableCell align="center">
                                        <Typography variant="h5">
                                            {sentimentEmoji[feedback.aiAnalysis.sentiment]}
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Chip
                                            label={feedback.aiAnalysis.department}
                                            size="small"
                                            variant="outlined"
                                            sx={{ borderRadius: 1 }}
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <Chip
                                            label={statusLabels[feedback.status]}
                                            size="small"
                                            color={statusColors[feedback.status]}
                                            sx={{ borderRadius: 1 }}
                                        />
                                    </TableCell>
                                    <TableCell align="center">
                                        <Box sx={{ display: 'flex', gap: 0.5, justifyContent: 'center' }}>
                                            <IconButton size="small" onClick={() => onView?.(feedback)}>
                                                <ViewIcon fontSize="small" />
                                            </IconButton>
                                            {feedback.aiAnalysis.sendToCallCenter && (
                                                <IconButton size="small" color="error">
                                                    <PhoneIcon fontSize="small" />
                                                </IconButton>
                                            )}
                                        </Box>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </CardContent>
        </Card>
    );
}
