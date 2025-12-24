import { useState } from 'react';
import {
    Box,
    Card,
    CardContent,
    Typography,
    Grid,
    Chip,
    Button,
    IconButton,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Alert,
    Divider,
    List,
    ListItem,
    ListItemText,
    alpha,
    useTheme,
    Snackbar,
} from '@mui/material';
import {
    Phone as PhoneIcon,
    Message as MessageIcon,
    CheckCircle as ResolveIcon,
    AccessTime as TimeIcon,
} from '@mui/icons-material';
import type { CallCenterTicket } from '../types';

const priorityColors: Record<string, 'error' | 'warning' | 'success'> = {
    high: 'error',
    medium: 'warning',
    low: 'success',
};

const priorityLabels: Record<string, string> = {
    high: 'Yüksək',
    medium: 'Orta',
    low: 'Aşağı',
};

// Mock tickets for demo
const initialMockTickets: CallCenterTicket[] = [
    {
        id: 'T001',
        feedbackId: 'FB001',
        customer: { id: 'C001', name: 'Anar Məmmədov', phone: '+994501112233' },
        message: 'Kassada 30 dəqiqə gözlədim! Bu qəbul edilməzdir. Dərhal cavab istəyirəm!',
        priority: 'high',
        status: 'open',
        assignedTo: null,
        notes: [],
        createdAt: new Date(Date.now() - 600000).toISOString(),
        updatedAt: new Date().toISOString(),
    },
    {
        id: 'T002',
        feedbackId: 'FB002',
        customer: { id: 'C002', name: 'Leyla Əliyeva', phone: '+994502223344' },
        message: 'Məhsul yarımçıq satıldı, əvəz edilmədi. Çox narazıyam!',
        priority: 'high',
        status: 'in_progress',
        assignedTo: 'Operator 1',
        notes: [
            { id: 'N1', text: 'Müştəri ilə əlaqə saxlandı', author: 'Operator 1', createdAt: new Date(Date.now() - 300000).toISOString() }
        ],
        createdAt: new Date(Date.now() - 1800000).toISOString(),
        updatedAt: new Date().toISOString(),
    },
    {
        id: 'T003',
        feedbackId: 'FB003',
        customer: { id: 'C003', name: 'Tural Hüseynov', phone: '+994503334455' },
        message: 'Xidmət keyfiyyəti aşağı düşüb, bu yaxınlarda bir neçə problem yaşadım.',
        priority: 'medium',
        status: 'open',
        assignedTo: null,
        notes: [],
        createdAt: new Date(Date.now() - 3600000).toISOString(),
        updatedAt: new Date().toISOString(),
    },
    {
        id: 'T004',
        feedbackId: 'FB004',
        customer: { id: 'C004', name: 'Nigar Rəhimova', phone: '+994504445566' },
        message: 'Kredit kartı ilə ödəniş qəbul edilmədi, başqa mağazaya getmək məcburiyyətindəyəm.',
        priority: 'medium',
        status: 'in_progress',
        assignedTo: 'Operator 2',
        notes: [],
        createdAt: new Date(Date.now() - 7200000).toISOString(),
        updatedAt: new Date().toISOString(),
    },
    {
        id: 'T005',
        feedbackId: 'FB005',
        customer: { id: 'C005', name: 'Rəşad Quliyev', phone: '+994505556677' },
        message: 'Qiymətlər barədə sualım var, bizimlə əlaqə saxlayarda bilərsiniz?',
        priority: 'low',
        status: 'open',
        assignedTo: null,
        notes: [],
        createdAt: new Date(Date.now() - 10800000).toISOString(),
        updatedAt: new Date().toISOString(),
    },
];

export default function CallCenterPage() {
    const theme = useTheme();
    const [tickets, setTickets] = useState<CallCenterTicket[]>(initialMockTickets);
    const [selectedTicket, setSelectedTicket] = useState<CallCenterTicket | null>(null);
    const [noteText, setNoteText] = useState('');
    const [snackbar, setSnackbar] = useState<{ open: boolean; message: string; severity: 'success' | 'info' | 'error' }>({ open: false, message: '', severity: 'info' });

    const handleCall = (ticket: CallCenterTicket) => {
        // Simulate call - update ticket status
        setTickets(prev => prev.map(t =>
            t.id === ticket.id
                ? { ...t, status: 'in_progress' as const, assignedTo: 'Operator 1' }
                : t
        ));
        setSnackbar({ open: true, message: `📞 ${ticket.customer.name} ilə zəng simulyasiya edildi!`, severity: 'info' });
    };

    const handleResolve = (ticket: CallCenterTicket) => {
        // Remove from list (resolved)
        setTickets(prev => prev.filter(t => t.id !== ticket.id));
        setSnackbar({ open: true, message: `✅ ${ticket.customer.name} tiketi həll olundu!`, severity: 'success' });
    };

    const handleAddNote = () => {
        if (!selectedTicket || !noteText.trim()) return;

        const newNote = {
            id: `N${Date.now()}`,
            text: noteText,
            author: 'Operator 1',
            createdAt: new Date().toISOString(),
        };

        setTickets(prev => prev.map(t =>
            t.id === selectedTicket.id
                ? { ...t, notes: [...t.notes, newNote] }
                : t
        ));

        // Update selected ticket in dialog
        setSelectedTicket(prev => prev ? { ...prev, notes: [...prev.notes, newNote] } : null);
        setNoteText('');
        setSnackbar({ open: true, message: '📝 Qeyd əlavə olundu!', severity: 'success' });
    };

    const groupedTickets = {
        high: tickets.filter(t => t.priority === 'high'),
        medium: tickets.filter(t => t.priority === 'medium'),
        low: tickets.filter(t => t.priority === 'low'),
    };

    const totalOpen = tickets.length;

    return (
        <Box>
            <Typography variant="h5" gutterBottom fontWeight={600}>📞 Call Center Panel</Typography>

            {/* Stats Overview */}
            <Grid container spacing={2} sx={{ mb: 3 }}>
                <Grid item xs={6} md={3}>
                    <Card sx={{ bgcolor: alpha(theme.palette.error.main, 0.08) }}>
                        <CardContent sx={{ textAlign: 'center', py: 2 }}>
                            <Typography variant="h3" color="error.main" fontWeight={700}>
                                {totalOpen}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">Açıq Tiketlər</Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={6} md={3}>
                    <Card sx={{ bgcolor: alpha(theme.palette.primary.main, 0.08) }}>
                        <CardContent sx={{ textAlign: 'center', py: 2 }}>
                            <Typography variant="h3" color="primary.main" fontWeight={700}>28</Typography>
                            <Typography variant="body2" color="text.secondary">Bu Gün Zənglər</Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={6} md={3}>
                    <Card sx={{ bgcolor: alpha(theme.palette.success.main, 0.08) }}>
                        <CardContent sx={{ textAlign: 'center', py: 2 }}>
                            <Typography variant="h3" color="success.main" fontWeight={700}>94%</Typography>
                            <Typography variant="body2" color="text.secondary">Həll Faizi</Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={6} md={3}>
                    <Card sx={{ bgcolor: alpha(theme.palette.info.main, 0.08) }}>
                        <CardContent sx={{ textAlign: 'center', py: 2 }}>
                            <Typography variant="h3" color="info.main" fontWeight={700}>2.5</Typography>
                            <Typography variant="body2" color="text.secondary">Ort. Cavab (dəq)</Typography>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>

            {/* High Priority Alert */}
            {groupedTickets.high.length > 0 && (
                <Alert severity="error" sx={{ mb: 3 }}>
                    ⚠️ {groupedTickets.high.length} yüksək prioritetli tiket dərhal diqqət tələb edir!
                </Alert>
            )}

            {/* Priority Sections */}
            {(['high', 'medium', 'low'] as const).map((priority) => (
                <Box key={priority} sx={{ mb: 3 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                        <Chip
                            label={`${priorityLabels[priority]} Prioritet (${groupedTickets[priority].length})`}
                            color={priorityColors[priority]}
                            size="small"
                        />
                    </Box>

                    <Grid container spacing={2}>
                        {groupedTickets[priority].map((ticket) => (
                            <Grid item xs={12} md={6} lg={4} key={ticket.id}>
                                <Card
                                    sx={{
                                        border: priority === 'high' ? `2px solid ${theme.palette.error.main}` : '1px solid',
                                        borderColor: priority === 'high' ? 'error.main' : 'divider',
                                        bgcolor: priority === 'high' ? alpha(theme.palette.error.main, 0.03) : 'background.paper',
                                        transition: 'all 0.2s',
                                        '&:hover': {
                                            boxShadow: 4,
                                            transform: 'translateY(-2px)',
                                        },
                                    }}
                                >
                                    <CardContent>
                                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                                            <Typography variant="subtitle1" fontWeight={600}>
                                                {ticket.customer.name}
                                            </Typography>
                                            <Chip
                                                label={ticket.status === 'in_progress' ? 'Davam edir' : 'Yeni'}
                                                size="small"
                                                color={ticket.status === 'in_progress' ? 'warning' : 'default'}
                                            />
                                        </Box>

                                        <Typography variant="body2" color="text.secondary" sx={{ mb: 2, minHeight: 40 }}>
                                            {ticket.message}
                                        </Typography>

                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mb: 2 }}>
                                            <TimeIcon fontSize="small" color="action" />
                                            <Typography variant="caption" color="text.secondary">
                                                {new Date(ticket.createdAt).toLocaleString('az-AZ')}
                                            </Typography>
                                        </Box>

                                        {ticket.assignedTo && (
                                            <Typography variant="caption" color="primary" display="block" sx={{ mb: 1 }}>
                                                👤 {ticket.assignedTo}
                                            </Typography>
                                        )}

                                        <Divider sx={{ mb: 2 }} />

                                        <Box sx={{ display: 'flex', gap: 1 }}>
                                            <Button
                                                size="small"
                                                variant="contained"
                                                color="primary"
                                                startIcon={<PhoneIcon />}
                                                onClick={() => handleCall(ticket)}
                                            >
                                                Zəng Et
                                            </Button>
                                            <IconButton
                                                size="small"
                                                color="info"
                                                onClick={() => setSelectedTicket(ticket)}
                                                title="Qeyd əlavə et"
                                            >
                                                <MessageIcon />
                                            </IconButton>
                                            <IconButton
                                                size="small"
                                                color="success"
                                                onClick={() => handleResolve(ticket)}
                                                title="Həll et"
                                            >
                                                <ResolveIcon />
                                            </IconButton>
                                        </Box>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}

                        {groupedTickets[priority].length === 0 && (
                            <Grid item xs={12}>
                                <Typography variant="body2" color="text.secondary" sx={{ p: 2, fontStyle: 'italic' }}>
                                    Bu prioritetdə tiket yoxdur ✓
                                </Typography>
                            </Grid>
                        )}
                    </Grid>
                </Box>
            ))}

            {/* Ticket Detail Dialog */}
            <Dialog open={!!selectedTicket} onClose={() => setSelectedTicket(null)} maxWidth="sm" fullWidth>
                <DialogTitle>
                    📋 Tiket Detalları - {selectedTicket?.customer.name}
                </DialogTitle>
                <DialogContent>
                    <Alert severity="info" sx={{ mb: 2 }}>
                        📞 {selectedTicket?.customer.phone}
                    </Alert>

                    <Typography variant="body1" sx={{ mb: 2, p: 2, bgcolor: 'grey.50', borderRadius: 1 }}>
                        "{selectedTicket?.message}"
                    </Typography>

                    <Typography variant="subtitle2" gutterBottom>💬 Qeydlər ({selectedTicket?.notes.length || 0}):</Typography>
                    {selectedTicket?.notes.length === 0 ? (
                        <Typography variant="body2" color="text.secondary" sx={{ fontStyle: 'italic', mb: 2 }}>
                            Hələ qeyd yoxdur
                        </Typography>
                    ) : (
                        <List dense sx={{ bgcolor: 'grey.50', borderRadius: 1, mb: 2 }}>
                            {selectedTicket?.notes.map((note) => (
                                <ListItem key={note.id}>
                                    <ListItemText
                                        primary={note.text}
                                        secondary={`${note.author} - ${new Date(note.createdAt).toLocaleString('az-AZ')}`}
                                    />
                                </ListItem>
                            ))}
                        </List>
                    )}

                    <TextField
                        fullWidth
                        multiline
                        rows={2}
                        placeholder="Yeni qeyd əlavə edin..."
                        value={noteText}
                        onChange={(e) => setNoteText(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setSelectedTicket(null)}>Bağla</Button>
                    <Button onClick={handleAddNote} variant="contained" disabled={!noteText.trim()}>
                        Qeyd Əlavə Et
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Snackbar for notifications */}
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
