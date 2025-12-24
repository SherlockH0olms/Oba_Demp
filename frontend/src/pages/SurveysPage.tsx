import { useState } from 'react';
import {
    Box,
    Card,
    CardContent,
    Typography,
    Button,
    Grid,
    Chip,
    IconButton,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    LinearProgress,
    Snackbar,
    Alert,
    alpha,
    useTheme,
} from '@mui/material';
import {
    Add as AddIcon,
    PlayArrow as ActivateIcon,
    Pause as PauseIcon,
    BarChart as ResultsIcon,
    Schedule as ScheduleIcon,
    Delete as DeleteIcon,
} from '@mui/icons-material';
import type { Survey } from '../types';

const statusColors: Record<string, 'default' | 'primary' | 'success' | 'warning' | 'error'> = {
    draft: 'default',
    scheduled: 'primary',
    active: 'success',
    paused: 'warning',
    completed: 'error',
};

const statusLabels: Record<string, string> = {
    draft: 'Qaralama',
    scheduled: 'Planlaşdırılıb',
    active: 'Aktiv',
    paused: 'Dayandırılıb',
    completed: 'Tamamlandı',
};

// Mock surveys for demo
const initialMockSurveys: Survey[] = [
    {
        id: 'S001',
        title: 'Müştəri Məmnuniyyəti Anketi',
        description: 'OBA marketlərdə xidmət keyfiyyətini qiymətləndirmək üçün həftəlik anket',
        questions: [
            { text: 'Ümumi xidmətdən nə dərəcədə razısınız?', type: 'rating' },
            { text: 'Kassada gözləmə müddəti qənaətbəxş idi?', type: 'choice' },
            { text: 'Təklifiniz varmı?', type: 'text' },
        ],
        status: 'active',
        createdAt: '2024-12-01',
        startDate: '2024-12-15',
        endDate: '2024-12-31',
        responses: 234,
        sentTo: 500,
    },
    {
        id: 'S002',
        title: 'Məhsul Keyfiyyəti Anketi',
        description: 'Təzə məhsulların keyfiyyəti haqqında müştəri rəyləri',
        questions: [
            { text: 'Meyvə və tərəvəzlər təzə idi?', type: 'rating' },
            { text: 'Ən çox hansı şöbəni bəyənisiniz?', type: 'choice' },
        ],
        status: 'active',
        createdAt: '2024-12-10',
        startDate: '2024-12-18',
        endDate: '2025-01-15',
        responses: 89,
        sentTo: 300,
    },
    {
        id: 'S003',
        title: 'Yeni İl Aksiyası Rəyi',
        description: 'Yeni il aksiyaları haqqında müştəri fikirləri',
        questions: [
            { text: 'Aksiya qiymətlərini necə dəyərləndirirsiniz?', type: 'rating' },
            { text: 'Hansı aksiya daha maraqlı idi?', type: 'choice' },
            { text: 'Gələcək aksiyalar üçün təklifiniz?', type: 'text' },
        ],
        status: 'scheduled',
        createdAt: '2024-12-20',
        startDate: '2024-12-25',
        endDate: '2025-01-10',
        responses: 0,
        sentTo: 1000,
    },
    {
        id: 'S004',
        title: 'Mağaza Atmosferi',
        description: 'Mağazanın atmosferi və rahatlığı haqqında',
        questions: [
            { text: 'Mağaza təmiz idi?', type: 'rating' },
            { text: 'Naviqasiya asan idi?', type: 'choice' },
        ],
        status: 'paused',
        createdAt: '2024-11-15',
        startDate: '2024-11-20',
        endDate: '2024-12-20',
        responses: 156,
        sentTo: 400,
    },
    {
        id: 'S005',
        title: 'İşçi Xidməti Anketi',
        description: 'İşçilərin müştərilərə münasibəti',
        questions: [
            { text: 'İşçilər yardımsevər idi?', type: 'rating' },
        ],
        status: 'completed',
        createdAt: '2024-10-01',
        startDate: '2024-10-15',
        endDate: '2024-11-15',
        responses: 423,
        sentTo: 600,
    },
];

export default function SurveysPage() {
    const theme = useTheme();
    const [surveys, setSurveys] = useState<Survey[]>(initialMockSurveys);
    const [createOpen, setCreateOpen] = useState(false);
    const [resultsOpen, setResultsOpen] = useState<Survey | null>(null);
    const [snackbar, setSnackbar] = useState<{ open: boolean; message: string; severity: 'success' | 'info' | 'warning' }>({ open: false, message: '', severity: 'info' });
    const [newSurvey, setNewSurvey] = useState({
        title: '',
        description: '',
        questionCount: 3,
    });

    const handleCreate = () => {
        if (!newSurvey.title.trim()) return;

        const survey: Survey = {
            id: `S${Date.now()}`,
            title: newSurvey.title,
            description: newSurvey.description,
            questions: Array.from({ length: newSurvey.questionCount }, (_, i) => ({
                text: `Sual ${i + 1}`,
                type: i === 0 ? 'rating' : i === 1 ? 'choice' : 'text',
            })),
            status: 'draft',
            createdAt: new Date().toISOString().split('T')[0],
            startDate: new Date().toISOString().split('T')[0],
            endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
            responses: 0,
            sentTo: 0,
        };

        setSurveys(prev => [survey, ...prev]);
        setCreateOpen(false);
        setNewSurvey({ title: '', description: '', questionCount: 3 });
        setSnackbar({ open: true, message: '✅ Yeni anket yaradıldı!', severity: 'success' });
    };

    const handleActivate = (id: string) => {
        setSurveys(prev => prev.map(s =>
            s.id === id ? { ...s, status: 'active' as const, sentTo: Math.floor(Math.random() * 500) + 200 } : s
        ));
        setSnackbar({ open: true, message: '🚀 Anket aktivləşdirildi!', severity: 'success' });
    };

    const handlePause = (id: string) => {
        setSurveys(prev => prev.map(s =>
            s.id === id ? { ...s, status: 'paused' as const } : s
        ));
        setSnackbar({ open: true, message: '⏸️ Anket dayandırıldı', severity: 'warning' });
    };

    const handleDelete = (id: string) => {
        setSurveys(prev => prev.filter(s => s.id !== id));
        setSnackbar({ open: true, message: '🗑️ Anket silindi', severity: 'info' });
    };

    const activeSurveys = surveys.filter(s => s.status === 'active');
    const otherSurveys = surveys.filter(s => s.status !== 'active');

    return (
        <Box>
            {/* Header */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="h5" fontWeight={600}>📋 Anket İdarəetmə</Typography>
                <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    onClick={() => setCreateOpen(true)}
                >
                    Yeni Anket
                </Button>
            </Box>

            {/* Active Surveys */}
            <Typography variant="h6" gutterBottom fontWeight={600}>📊 Aktiv Anketlər ({activeSurveys.length})</Typography>
            <Grid container spacing={3} sx={{ mb: 4 }}>
                {activeSurveys.map((survey) => (
                    <Grid item xs={12} md={6} key={survey.id}>
                        <Card sx={{
                            border: `2px solid ${theme.palette.success.main}`,
                            bgcolor: alpha(theme.palette.success.main, 0.03),
                        }}>
                            <CardContent>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                                    <Typography variant="h6" fontWeight={600}>{survey.title}</Typography>
                                    <Chip
                                        label={statusLabels[survey.status]}
                                        color={statusColors[survey.status]}
                                        size="small"
                                    />
                                </Box>

                                <Typography variant="body2" color="text.secondary" gutterBottom>
                                    {survey.description}
                                </Typography>

                                <Box sx={{ my: 2 }}>
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                                        <Typography variant="caption">Cavab nisbəti</Typography>
                                        <Typography variant="caption" fontWeight={600}>
                                            {survey.responses} / {survey.sentTo} ({((survey.responses / survey.sentTo) * 100).toFixed(0)}%)
                                        </Typography>
                                    </Box>
                                    <LinearProgress
                                        variant="determinate"
                                        value={(survey.responses / survey.sentTo) * 100}
                                        sx={{ height: 8, borderRadius: 4 }}
                                        color="success"
                                    />
                                </Box>

                                <Typography variant="caption" color="text.secondary" display="block" gutterBottom>
                                    📅 {survey.startDate} - {survey.endDate}
                                </Typography>

                                <Box sx={{ display: 'flex', gap: 1, mt: 2 }}>
                                    <Button size="small" startIcon={<ResultsIcon />} onClick={() => setResultsOpen(survey)}>
                                        Nəticələr
                                    </Button>
                                    <IconButton size="small" color="warning" onClick={() => handlePause(survey.id)} title="Dayandır">
                                        <PauseIcon />
                                    </IconButton>
                                </Box>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}

                {activeSurveys.length === 0 && (
                    <Grid item xs={12}>
                        <Typography color="text.secondary" sx={{ fontStyle: 'italic' }}>
                            Aktiv anket yoxdur. Yeni anket yaradın!
                        </Typography>
                    </Grid>
                )}
            </Grid>

            {/* Other Surveys */}
            <Typography variant="h6" gutterBottom fontWeight={600}>📋 Digər Anketlər ({otherSurveys.length})</Typography>
            <Grid container spacing={2}>
                {otherSurveys.map((survey) => (
                    <Grid item xs={12} md={6} lg={4} key={survey.id}>
                        <Card sx={{
                            transition: 'all 0.2s',
                            '&:hover': {
                                boxShadow: 3,
                                transform: 'translateY(-2px)',
                            },
                        }}>
                            <CardContent>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                                    <Typography variant="subtitle1" fontWeight={600}>{survey.title}</Typography>
                                    <Chip
                                        label={statusLabels[survey.status]}
                                        color={statusColors[survey.status]}
                                        size="small"
                                    />
                                </Box>

                                <Typography variant="body2" color="text.secondary" gutterBottom>
                                    {survey.responses} cavab toplandı
                                </Typography>

                                <Typography variant="caption" color="text.secondary" display="block">
                                    📝 {survey.questions.length} sual
                                </Typography>

                                <Box sx={{ display: 'flex', gap: 1, mt: 2 }}>
                                    {survey.status !== 'completed' && (
                                        <IconButton size="small" color="success" onClick={() => handleActivate(survey.id)} title="Aktivləşdir">
                                            <ActivateIcon />
                                        </IconButton>
                                    )}
                                    <IconButton size="small" color="primary" title="Planla">
                                        <ScheduleIcon />
                                    </IconButton>
                                    <IconButton size="small" color="error" onClick={() => handleDelete(survey.id)} title="Sil">
                                        <DeleteIcon />
                                    </IconButton>
                                </Box>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>

            {/* Create Dialog */}
            <Dialog open={createOpen} onClose={() => setCreateOpen(false)} maxWidth="sm" fullWidth>
                <DialogTitle>➕ Yeni Anket Yarat</DialogTitle>
                <DialogContent>
                    <TextField
                        fullWidth
                        label="Anket Adı"
                        placeholder="məs. Müştəri Məmnuniyyəti Anketi"
                        value={newSurvey.title}
                        onChange={(e) => setNewSurvey({ ...newSurvey, title: e.target.value })}
                        sx={{ mt: 2, mb: 2 }}
                    />
                    <TextField
                        fullWidth
                        label="Təsvir"
                        placeholder="Anketin məqsədi..."
                        multiline
                        rows={2}
                        value={newSurvey.description}
                        onChange={(e) => setNewSurvey({ ...newSurvey, description: e.target.value })}
                        sx={{ mb: 2 }}
                    />
                    <FormControl fullWidth>
                        <InputLabel>Sual Sayı</InputLabel>
                        <Select
                            value={newSurvey.questionCount}
                            label="Sual Sayı"
                            onChange={(e) => setNewSurvey({ ...newSurvey, questionCount: e.target.value as number })}
                        >
                            {[1, 2, 3, 4, 5].map((n) => (
                                <MenuItem key={n} value={n}>{n} sual</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setCreateOpen(false)}>Ləğv Et</Button>
                    <Button onClick={handleCreate} variant="contained" disabled={!newSurvey.title.trim()}>
                        Yarat
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Results Dialog */}
            <Dialog open={!!resultsOpen} onClose={() => setResultsOpen(null)} maxWidth="sm" fullWidth>
                <DialogTitle>📊 {resultsOpen?.title} - Nəticələr</DialogTitle>
                <DialogContent>
                    <Box sx={{ p: 2 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={6}>
                                <Card sx={{ bgcolor: alpha(theme.palette.primary.main, 0.08), p: 2, textAlign: 'center' }}>
                                    <Typography variant="h3" color="primary" fontWeight={700}>{resultsOpen?.responses}</Typography>
                                    <Typography variant="body2" color="text.secondary">Cavab</Typography>
                                </Card>
                            </Grid>
                            <Grid item xs={6}>
                                <Card sx={{ bgcolor: alpha(theme.palette.success.main, 0.08), p: 2, textAlign: 'center' }}>
                                    <Typography variant="h3" color="success.main" fontWeight={700}>
                                        {resultsOpen?.sentTo ? ((resultsOpen?.responses / resultsOpen?.sentTo) * 100).toFixed(0) : 0}%
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">Cavab Faizi</Typography>
                                </Card>
                            </Grid>
                        </Grid>

                        <Box sx={{ mt: 3 }}>
                            <Typography variant="subtitle2" gutterBottom>Suallar:</Typography>
                            {resultsOpen?.questions.map((q, i) => (
                                <Box key={i} sx={{ p: 1.5, bgcolor: 'grey.50', borderRadius: 1, mb: 1 }}>
                                    <Typography variant="body2">
                                        {i + 1}. {q.text}
                                    </Typography>
                                    <Chip label={q.type} size="small" sx={{ mt: 0.5 }} />
                                </Box>
                            ))}
                        </Box>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setResultsOpen(null)}>Bağla</Button>
                </DialogActions>
            </Dialog>

            {/* Snackbar */}
            <Snackbar
                open={snackbar.open}
                autoHideDuration={3000}
                onClose={() => setSnackbar({ ...snackbar, open: false })}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            >
                <Alert severity={snackbar.severity} onClose={() => setSnackbar({ ...snackbar, open: false })}>
                    {snackbar.message}
                </Alert>
            </Snackbar>
        </Box>
    );
}
