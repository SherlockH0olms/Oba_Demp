import { useState } from 'react';
import {
    Box,
    Card,
    CardContent,
    Typography,
    TextField,
    Button,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Alert,
    Chip,
    Grid,
    Divider,
    alpha,
    useTheme,
    CircularProgress,
} from '@mui/material';
import { Send as SendIcon, Psychology as AIIcon } from '@mui/icons-material';
import type { AIAnalysis } from '../types';

const sampleMessages = [
    "Bugün aldığım çörək çox təzə idi, təşəkkür!",
    "Kassada çox gözlədim, xahiş edirəm kassir sayını artırın",
    "Qiymətlər yüksəkdir, endirim etmək olar?",
    "Xidmət əladır, davam edin!",
    "Məhsul yarımçıq gəldi, əvəz edə bilərəmmi?",
    "Satıcılar çox kobud davrandı, qəbul edilməzdir!",
    "Onlayn sifariş sistemi olsa yaxşı olar",
    "Kredit kartı ilə ödəniş problemi yaşadım",
    "Park yeri çatışmır",
    "Organik məhsul seçimi genişləndirin",
];

const markets = [
    { id: 'M001', name: 'OBA 28 May' },
    { id: 'M002', name: 'OBA Nərimanov' },
    { id: 'M003', name: 'OBA Xətai' },
    { id: 'M004', name: 'OBA Gənclik' },
    { id: 'M005', name: 'OBA Sumqayıt' },
];

// Client-side mock AI analysis
function mockAnalyzeMessage(text: string): AIAnalysis {
    const lowerText = text.toLowerCase();

    // Determine sentiment
    const positiveWords = ['təşəkkür', 'əla', 'gözəl', 'yaxşı', 'təzə', 'keyfiyyət', 'davam', 'razı', 'mükəmməl'];
    const negativeWords = ['pis', 'kobud', 'gözlədim', 'problem', 'şikayət', 'yarımçıq', 'qəbul edilməz', 'narahat', 'xəta'];

    let positiveScore = positiveWords.filter(w => lowerText.includes(w)).length;
    let negativeScore = negativeWords.filter(w => lowerText.includes(w)).length;

    let sentiment: 'positive' | 'neutral' | 'negative' = 'neutral';
    if (positiveScore > negativeScore) sentiment = 'positive';
    else if (negativeScore > positiveScore) sentiment = 'negative';

    // Determine category and department
    let category = 'general_feedback';
    let department = 'Müştəri Xidmətləri';

    if (lowerText.includes('kassa') || lowerText.includes('ödəniş') || lowerText.includes('kredit')) {
        category = 'service_complaint';
        department = 'Kassa';
    } else if (lowerText.includes('məhsul') || lowerText.includes('çörək') || lowerText.includes('təzə') || lowerText.includes('yarımçıq')) {
        category = sentiment === 'positive' ? 'product_praise' : 'product_complaint';
        department = 'Məhsul';
    } else if (lowerText.includes('qiymət') || lowerText.includes('endirim')) {
        category = 'pricing_feedback';
        department = 'Marketinq';
    } else if (lowerText.includes('satıcı') || lowerText.includes('işçi') || lowerText.includes('kobud')) {
        category = sentiment === 'positive' ? 'staff_praise' : 'staff_complaint';
        department = 'HR';
    } else if (lowerText.includes('onlayn') || lowerText.includes('sistem')) {
        category = 'suggestion';
        department = 'İT';
    } else if (lowerText.includes('park') || lowerText.includes('yer')) {
        category = 'facility_complaint';
        department = 'İnzibati';
    }

    // Determine priority
    let priority: 'low' | 'medium' | 'high' = 'low';
    if (sentiment === 'negative') {
        priority = negativeScore >= 2 ? 'high' : 'medium';
    }

    // Extract keywords
    const words = text.split(/\s+/).filter(w => w.length > 3);
    const keywords = words.slice(0, 5);

    // Suggested action and auto response
    let suggestedAction = 'Qeydə alın';
    let autoResponse = '';

    if (sentiment === 'positive') {
        suggestedAction = 'Təşəkkür mesajı göndərin';
        autoResponse = 'Hörmətli müştərimiz, müsbət rəyiniz üçün təşəkkür edirik! Sizə xidmət etməkdən məmnunuq. 🙏';
    } else if (sentiment === 'negative' && priority === 'high') {
        suggestedAction = 'Dərhal Call Center-ə yönləndirin';
        autoResponse = 'Hörmətli müştərimiz, narazılığınız üçün üzr istəyirik. Mütəxəssisimiz tezliklə sizinlə əlaqə saxlayacaq. 📞';
    } else if (sentiment === 'negative') {
        suggestedAction = 'Departamenta bildirilsin';
        autoResponse = 'Hörmətli müştərimiz, rəyiniz üçün təşəkkür edirik. Problemi araşdırıb sizə geri dönəcəyik. 📝';
    } else {
        autoResponse = 'Hörmətli müştərimiz, rəyiniz üçün təşəkkür edirik. Fikrinizi nəzərə alacağıq! 👍';
    }

    return {
        sentiment,
        category,
        priority,
        keywords,
        confidence: 0.85 + Math.random() * 0.12,
        department,
        suggestedAction,
        sendToCallCenter: priority === 'high',
    };
}

export default function SimulatorPage() {
    const theme = useTheme();
    const [message, setMessage] = useState('');
    const [customerName, setCustomerName] = useState('Test Müştəri');
    const [marketId, setMarketId] = useState('M001');
    const [channel, setChannel] = useState<'whatsapp' | 'telegram'>('whatsapp');
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<{ success: boolean; analysis?: AIAnalysis; autoResponse?: string } | null>(null);

    const handleSend = async () => {
        if (!message.trim()) return;

        setLoading(true);
        setResult(null);

        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 500));

        // Use client-side mock analysis
        const analysis = mockAnalyzeMessage(message);

        setResult({
            success: true,
            analysis,
            autoResponse: analysis.sendToCallCenter
                ? 'Hörmətli müştərimiz, narazılığınız üçün üzr istəyirik. Mütəxəssisimiz tezliklə sizinlə əlaqə saxlayacaq. 📞'
                : 'Hörmətli müştərimiz, rəyiniz üçün təşəkkür edirik! 🙏',
        });

        setLoading(false);
    };

    const handleTestAI = async () => {
        if (!message.trim()) return;

        setLoading(true);
        setResult(null);

        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 800 + Math.random() * 400));

        const analysis = mockAnalyzeMessage(message);

        setResult({
            success: true,
            analysis,
        });

        setLoading(false);
    };

    const sentimentEmoji: Record<string, string> = {
        positive: '😊',
        neutral: '😐',
        negative: '☹️',
    };

    const sentimentLabels: Record<string, string> = {
        positive: 'Müsbət',
        neutral: 'Neytral',
        negative: 'Mənfi',
    };

    const priorityColors: Record<string, 'success' | 'warning' | 'error'> = {
        low: 'success',
        medium: 'warning',
        high: 'error',
    };

    const priorityLabels: Record<string, string> = {
        low: 'AŞAĞI',
        medium: 'ORTA',
        high: 'YÜKSƏK',
    };

    return (
        <Box>
            <Typography variant="h5" gutterBottom fontWeight={600}>🤖 Mesaj Simulyatoru</Typography>
            <Typography variant="body2" color="text.secondary" gutterBottom>
                Müştəri mesajı simulyasiya edin və AI analizini görün
            </Typography>

            <Grid container spacing={3} sx={{ mt: 1 }}>
                {/* Input Section */}
                <Grid item xs={12} md={6}>
                    <Card sx={{
                        background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.03)}, ${alpha(theme.palette.background.paper, 1)})`,
                    }}>
                        <CardContent>
                            <Typography variant="h6" gutterBottom fontWeight={600}>📝 Mesaj Göndər</Typography>

                            <TextField
                                fullWidth
                                label="Müştəri Adı"
                                value={customerName}
                                onChange={(e) => setCustomerName(e.target.value)}
                                sx={{ mb: 2 }}
                            />

                            <FormControl fullWidth sx={{ mb: 2 }}>
                                <InputLabel>Market</InputLabel>
                                <Select
                                    value={marketId}
                                    label="Market"
                                    onChange={(e) => setMarketId(e.target.value)}
                                >
                                    {markets.map((m) => (
                                        <MenuItem key={m.id} value={m.id}>{m.name}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>

                            <FormControl fullWidth sx={{ mb: 2 }}>
                                <InputLabel>Kanal</InputLabel>
                                <Select
                                    value={channel}
                                    label="Kanal"
                                    onChange={(e) => setChannel(e.target.value as 'whatsapp' | 'telegram')}
                                >
                                    <MenuItem value="whatsapp">💬 WhatsApp</MenuItem>
                                    <MenuItem value="telegram">✈️ Telegram</MenuItem>
                                </Select>
                            </FormControl>

                            <TextField
                                fullWidth
                                multiline
                                rows={3}
                                label="Mesaj"
                                placeholder="Müştəri mesajını yazın..."
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                sx={{ mb: 2 }}
                            />

                            <Box sx={{ display: 'flex', gap: 2 }}>
                                <Button
                                    variant="contained"
                                    startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <SendIcon />}
                                    onClick={handleSend}
                                    disabled={loading || !message.trim()}
                                >
                                    Göndər
                                </Button>
                                <Button
                                    variant="outlined"
                                    startIcon={loading ? <CircularProgress size={20} /> : <AIIcon />}
                                    onClick={handleTestAI}
                                    disabled={loading || !message.trim()}
                                >
                                    Yalnız AI Test
                                </Button>
                            </Box>

                            <Divider sx={{ my: 2 }} />

                            <Typography variant="subtitle2" gutterBottom>Nümunə Mesajlar (klikləyin):</Typography>
                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                                {sampleMessages.map((msg, idx) => (
                                    <Chip
                                        key={idx}
                                        label={msg.substring(0, 30) + '...'}
                                        size="small"
                                        onClick={() => setMessage(msg)}
                                        sx={{
                                            cursor: 'pointer',
                                            '&:hover': {
                                                bgcolor: alpha(theme.palette.primary.main, 0.1),
                                            },
                                        }}
                                    />
                                ))}
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>

                {/* Result Section */}
                <Grid item xs={12} md={6}>
                    <Card sx={{
                        height: '100%',
                        background: result?.success
                            ? `linear-gradient(135deg, ${alpha(
                                result.analysis?.sentiment === 'positive'
                                    ? theme.palette.success.main
                                    : result.analysis?.sentiment === 'negative'
                                        ? theme.palette.error.main
                                        : theme.palette.warning.main, 0.03)}, ${alpha(theme.palette.background.paper, 1)})`
                            : undefined,
                    }}>
                        <CardContent>
                            <Typography variant="h6" gutterBottom fontWeight={600}>🧠 AI Analiz Nəticəsi</Typography>

                            {loading && (
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, p: 3 }}>
                                    <CircularProgress size={32} />
                                    <Typography>Analiz edilir...</Typography>
                                </Box>
                            )}

                            {result && !loading && (
                                <>
                                    {result.success ? (
                                        <Box>
                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
                                                <Typography variant="h1">
                                                    {sentimentEmoji[result.analysis?.sentiment || 'neutral']}
                                                </Typography>
                                                <Box>
                                                    <Typography variant="h5" fontWeight={600}>
                                                        {sentimentLabels[result.analysis?.sentiment || 'neutral']} Rəy
                                                    </Typography>
                                                    <Typography variant="body2" color="text.secondary">
                                                        Güvən: {((result.analysis?.confidence || 0) * 100).toFixed(0)}%
                                                    </Typography>
                                                </Box>
                                            </Box>

                                            <Divider sx={{ mb: 2 }} />

                                            <Grid container spacing={2}>
                                                <Grid item xs={6}>
                                                    <Typography variant="caption" color="text.secondary">Prioritet</Typography>
                                                    <Box>
                                                        <Chip
                                                            label={priorityLabels[result.analysis?.priority || 'low']}
                                                            color={priorityColors[result.analysis?.priority || 'low']}
                                                            size="small"
                                                            sx={{ fontWeight: 600 }}
                                                        />
                                                    </Box>
                                                </Grid>
                                                <Grid item xs={6}>
                                                    <Typography variant="caption" color="text.secondary">Departament</Typography>
                                                    <Typography variant="body2" fontWeight={500}>{result.analysis?.department}</Typography>
                                                </Grid>
                                                <Grid item xs={6}>
                                                    <Typography variant="caption" color="text.secondary">Kateqoriya</Typography>
                                                    <Typography variant="body2">{result.analysis?.category}</Typography>
                                                </Grid>
                                                <Grid item xs={6}>
                                                    <Typography variant="caption" color="text.secondary">Call Center</Typography>
                                                    <Typography variant="body2" fontWeight={500}>
                                                        {result.analysis?.sendToCallCenter ? '✅ Bəli' : '❌ Xeyr'}
                                                    </Typography>
                                                </Grid>
                                            </Grid>

                                            <Box sx={{ mt: 2 }}>
                                                <Typography variant="caption" color="text.secondary">Açar Sözlər</Typography>
                                                <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap', mt: 0.5 }}>
                                                    {result.analysis?.keywords?.map((kw, idx) => (
                                                        <Chip key={idx} label={kw} size="small" variant="outlined" />
                                                    ))}
                                                </Box>
                                            </Box>

                                            <Box sx={{ mt: 2 }}>
                                                <Typography variant="caption" color="text.secondary">Təklif Olunan Əməliyyat</Typography>
                                                <Typography variant="body2" fontWeight={500}>{result.analysis?.suggestedAction}</Typography>
                                            </Box>

                                            {result.autoResponse && (
                                                <Alert severity="success" sx={{ mt: 2 }}>
                                                    <Typography variant="subtitle2">Avtomatik Cavab:</Typography>
                                                    <Typography variant="body2">{result.autoResponse}</Typography>
                                                </Alert>
                                            )}
                                        </Box>
                                    ) : (
                                        <Alert severity="error">Xəta baş verdi. Yenidən cəhd edin.</Alert>
                                    )}
                                </>
                            )}

                            {!result && !loading && (
                                <Box sx={{ p: 3, textAlign: 'center' }}>
                                    <Typography variant="h4" sx={{ mb: 2, opacity: 0.3 }}>🤖</Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        Mesaj göndərdikdən sonra AI analizi burada görünəcək
                                    </Typography>
                                </Box>
                            )}
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Box>
    );
}
