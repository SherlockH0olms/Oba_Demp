import { useState } from 'react';
import {
    Box,
    Typography,
    Button,
    Container,
    Grid,
    Card,
    CardContent,
    TextField,
    Chip,
    Avatar,
    IconButton,
    useTheme,
    alpha,
    Snackbar,
    Alert,
} from '@mui/material';
import {
    WhatsApp as WhatsAppIcon,
    Telegram as TelegramIcon,
    Psychology as AIIcon,
    Speed as SpeedIcon,
    Assessment as AnalyticsIcon,
    Support as SupportIcon,
    ArrowForward as ArrowIcon,
    KeyboardArrowDown as ScrollIcon,
    CheckCircle as CheckIcon,
    LocationOn as LocationIcon,
    Email as EmailIcon,
    Phone as PhoneIcon,
} from '@mui/icons-material';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const MotionBox = motion(Box);
const MotionCard = motion(Card);

// Feature data
const features = [
    {
        icon: <WhatsAppIcon sx={{ fontSize: 40 }} />,
        title: 'WhatsApp İnteqrasiya',
        description: 'QR kod skan edərək müştərilər dərhal rəy göndərə bilər. Mesajlar real-time qəbul edilir.',
        color: '#25D366',
    },
    {
        icon: <TelegramIcon sx={{ fontSize: 40 }} />,
        title: 'Telegram Bot',
        description: 'Telegram istifadəçiləri üçün bot inteqrasiyası. Çoxkanallı müştəri rəyi toplama.',
        color: '#0088cc',
    },
    {
        icon: <AIIcon sx={{ fontSize: 40 }} />,
        title: 'AI Sentiment Analizi',
        description: 'Azure AI ilə avtomatik sentiment təyini. Müsbət, neytral və mənfi rəylərin analizi.',
        color: '#9c27b0',
    },
    {
        icon: <SpeedIcon sx={{ fontSize: 40 }} />,
        title: 'Real-Time Dashboard',
        description: 'Canlı statistika və göstəricilər. Ani bildirişlər və təcili rəylərə sürətli cavab.',
        color: '#f44336',
    },
    {
        icon: <AnalyticsIcon sx={{ fontSize: 40 }} />,
        title: 'Ətraflı Analitika',
        description: 'Günlük trend, departament statistikası, kateqoriya paylanması və daha çox.',
        color: '#2196f3',
    },
    {
        icon: <SupportIcon sx={{ fontSize: 40 }} />,
        title: 'Call Center Panel',
        description: 'Kritik rəylər avtomatik Call Center-ə yönləndirilir. Tiket sistemi və qeyd əlavəsi.',
        color: '#ff9800',
    },
];

// Testimonials
const testimonials = [
    {
        text: 'OBA CRM sistemi bizim müştəri xidmətimizi tamamilə dəyişdi. WhatsApp inteqrasiyası sayəsində geri dönüşləri real vaxtda alırıq.',
        name: 'Leyla Məmmədova',
        role: 'OBA Market Müdiri',
        avatar: 'L',
    },
    {
        text: 'AI analizi həqiqətən işləyir. Müştərilərin şikayətləri avtomatik olaraq prioritetləndirilir və biz daha sürətli cavab verə bilirik.',
        name: 'Elvin Həsənov',
        role: 'Call Center Meneceri',
        avatar: 'E',
    },
    {
        text: 'Dashboard real-time məlumat verir. İndi hansı marketdə problem olduğunu dərhal görə bilirik.',
        name: 'Rəşad Quliyev',
        role: 'Regional Menecer',
        avatar: 'R',
    },
];

// Market locations
const locations = [
    { id: 'M001', name: 'OBA 28 May', address: 'Bakı şəhəri' },
    { id: 'M002', name: 'OBA Nərimanov', address: 'Bakı şəhəri' },
    { id: 'M003', name: 'OBA Xətai', address: 'Bakı şəhəri' },
    { id: 'M004', name: 'OBA Gənclik', address: 'Bakı şəhəri' },
    { id: 'M005', name: 'OBA Sumqayıt', address: 'Sumqayıt şəhəri' },
];

// Stats
const stats = [
    { label: 'Marketlər', value: '20+' },
    { label: 'Gündəlik Rəy', value: '500+' },
    { label: 'Cavab Vaxtı', value: '<3 dəq' },
    { label: 'Məmnuniyyət', value: '94%' },
];

export default function LandingPage() {
    const theme = useTheme();
    const navigate = useNavigate();
    const { scrollYProgress } = useScroll();
    const y = useTransform(scrollYProgress, [0, 1], [0, -50]);

    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const [snackbar, setSnackbar] = useState({ open: false, message: '' });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (email && name) {
            setSubmitted(true);
            setSnackbar({ open: true, message: '✅ Müraciətiniz qəbul edildi! Tezliklə sizinlə əlaqə saxlayacağıq.' });
        }
    };

    return (
        <Box sx={{ bgcolor: '#09090b', minHeight: '100vh', color: 'white', overflow: 'hidden' }}>
            {/* Hero Section */}
            <Box
                sx={{
                    minHeight: '100vh',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'relative',
                    background: `radial-gradient(ellipse at center, ${alpha('#0079da', 0.15)} 0%, transparent 70%)`,
                    px: 2,
                }}
            >
                {/* Animated background */}
                <Box
                    sx={{
                        position: 'absolute',
                        inset: 0,
                        background: `linear-gradient(180deg, transparent, ${alpha('#09090b', 0.8)})`,
                        pointerEvents: 'none',
                    }}
                />

                <MotionBox
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: 'easeOut' }}
                    sx={{ textAlign: 'center', position: 'relative', zIndex: 1 }}
                >
                    {/* Logo */}
                    <MotionBox
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                        sx={{
                            width: 80,
                            height: 80,
                            borderRadius: 3,
                            bgcolor: '#0079da',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            mx: 'auto',
                            mb: 4,
                            boxShadow: `0 0 60px ${alpha('#0079da', 0.5)}`,
                        }}
                    >
                        <Typography variant="h3" fontWeight={800}>O</Typography>
                    </MotionBox>

                    <Typography
                        variant="h2"
                        sx={{
                            fontWeight: 800,
                            fontSize: { xs: '2.5rem', md: '4rem' },
                            lineHeight: 1.1,
                            mb: 3,
                        }}
                    >
                        Müştəri Rəylərini
                        <br />
                        <Box
                            component="span"
                            sx={{
                                background: 'linear-gradient(90deg, #60a5fa, #34d399)',
                                backgroundClip: 'text',
                                WebkitBackgroundClip: 'text',
                                color: 'transparent',
                            }}
                        >
                            AI ilə İdarə Edin
                        </Box>
                    </Typography>

                    <Typography
                        variant="h6"
                        sx={{
                            color: alpha('#fff', 0.6),
                            maxWidth: 600,
                            mx: 'auto',
                            mb: 4,
                            fontWeight: 400,
                            lineHeight: 1.6,
                        }}
                    >
                        WhatsApp və Telegram vasitəsilə real-zamanlı müştəri rəylərini toplayın,
                        AI analizi ilə prosesi avtomatlaşdırın.
                    </Typography>

                    {/* CTA Buttons */}
                    <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
                        <Button
                            variant="contained"
                            size="large"
                            endIcon={<ArrowIcon />}
                            onClick={() => navigate('/')}
                            sx={{
                                px: 4,
                                py: 1.5,
                                borderRadius: 3,
                                background: 'linear-gradient(90deg, #0079da, #0056b3)',
                                boxShadow: `0 8px 30px ${alpha('#0079da', 0.4)}`,
                                '&:hover': {
                                    transform: 'translateY(-2px)',
                                    boxShadow: `0 12px 40px ${alpha('#0079da', 0.5)}`,
                                },
                                transition: 'all 0.3s',
                            }}
                        >
                            Demo-ya Daxil Ol
                        </Button>
                        <Button
                            variant="outlined"
                            size="large"
                            sx={{
                                px: 4,
                                py: 1.5,
                                borderRadius: 3,
                                borderColor: alpha('#fff', 0.2),
                                color: 'white',
                                '&:hover': {
                                    borderColor: alpha('#fff', 0.4),
                                    bgcolor: alpha('#fff', 0.05),
                                },
                            }}
                            onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}
                        >
                            Ətraflı
                        </Button>
                    </Box>
                </MotionBox>

                {/* Scroll indicator */}
                <MotionBox
                    animate={{ y: [0, 10, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    sx={{
                        position: 'absolute',
                        bottom: 40,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: 1,
                    }}
                >
                    <Typography variant="caption" sx={{ color: alpha('#fff', 0.4), letterSpacing: 2 }}>
                        SCROLL
                    </Typography>
                    <ScrollIcon sx={{ color: alpha('#fff', 0.4) }} />
                </MotionBox>
            </Box>

            {/* Features Section */}
            <Box id="features" sx={{ py: 12, bgcolor: '#0f0f10' }}>
                <Container maxWidth="lg">
                    <MotionBox
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        sx={{ textAlign: 'center', mb: 8 }}
                    >
                        <Chip
                            label="XÜSUSİYYƏTLƏR"
                            sx={{
                                bgcolor: alpha('#0079da', 0.1),
                                color: '#60a5fa',
                                border: `1px solid ${alpha('#0079da', 0.3)}`,
                                mb: 3,
                            }}
                        />
                        <Typography variant="h3" fontWeight={700} sx={{ mb: 2 }}>
                            Güclü İmkanlar
                        </Typography>
                        <Typography variant="body1" sx={{ color: alpha('#fff', 0.6), maxWidth: 500, mx: 'auto' }}>
                            Müştəri rəylərini toplamaq, analiz etmək və cavab vermək üçün lazım olan hər şey.
                        </Typography>
                    </MotionBox>

                    <Grid container spacing={3}>
                        {features.map((feature, index) => (
                            <Grid item xs={12} sm={6} md={4} key={feature.title}>
                                <MotionCard
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                    whileHover={{ y: -8, scale: 1.02 }}
                                    sx={{
                                        bgcolor: '#18181b',
                                        border: `1px solid ${alpha('#fff', 0.1)}`,
                                        borderRadius: 4,
                                        height: '100%',
                                        '&:hover': {
                                            borderColor: alpha(feature.color, 0.5),
                                            boxShadow: `0 20px 40px ${alpha(feature.color, 0.15)}`,
                                        },
                                        transition: 'all 0.3s',
                                    }}
                                >
                                    <CardContent sx={{ p: 4 }}>
                                        <Box
                                            sx={{
                                                width: 64,
                                                height: 64,
                                                borderRadius: 3,
                                                bgcolor: alpha(feature.color, 0.1),
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                mb: 3,
                                                color: feature.color,
                                            }}
                                        >
                                            {feature.icon}
                                        </Box>
                                        <Typography variant="h6" fontWeight={600} sx={{ mb: 1.5, color: 'white' }}>
                                            {feature.title}
                                        </Typography>
                                        <Typography variant="body2" sx={{ color: alpha('#fff', 0.6), lineHeight: 1.7 }}>
                                            {feature.description}
                                        </Typography>
                                    </CardContent>
                                </MotionCard>
                            </Grid>
                        ))}
                    </Grid>
                </Container>
            </Box>

            {/* Stats Section */}
            <Box sx={{ py: 10, bgcolor: '#09090b' }}>
                <Container maxWidth="lg">
                    <Grid container spacing={4}>
                        {stats.map((stat, index) => (
                            <Grid item xs={6} md={3} key={stat.label}>
                                <MotionBox
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                    sx={{ textAlign: 'center' }}
                                >
                                    <Typography
                                        variant="h2"
                                        sx={{
                                            fontWeight: 800,
                                            background: 'linear-gradient(90deg, #60a5fa, #34d399)',
                                            backgroundClip: 'text',
                                            WebkitBackgroundClip: 'text',
                                            color: 'transparent',
                                        }}
                                    >
                                        {stat.value}
                                    </Typography>
                                    <Typography variant="body2" sx={{ color: alpha('#fff', 0.5), mt: 1 }}>
                                        {stat.label}
                                    </Typography>
                                </MotionBox>
                            </Grid>
                        ))}
                    </Grid>
                </Container>
            </Box>

            {/* Testimonials Section */}
            <Box sx={{ py: 12, bgcolor: '#0f0f10' }}>
                <Container maxWidth="lg">
                    <MotionBox
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        sx={{ textAlign: 'center', mb: 8 }}
                    >
                        <Chip
                            label="MÜŞTƏRİ RƏYLƏRİ"
                            sx={{
                                bgcolor: alpha('#34d399', 0.1),
                                color: '#34d399',
                                border: `1px solid ${alpha('#34d399', 0.3)}`,
                                mb: 3,
                            }}
                        />
                        <Typography variant="h3" fontWeight={700}>
                            Komandamız Nə Deyir?
                        </Typography>
                    </MotionBox>

                    <Grid container spacing={4}>
                        {testimonials.map((testimonial, index) => (
                            <Grid item xs={12} md={4} key={testimonial.name}>
                                <MotionCard
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                    whileHover={{ y: -5 }}
                                    sx={{
                                        bgcolor: '#18181b',
                                        border: `1px solid ${alpha('#fff', 0.1)}`,
                                        borderRadius: 4,
                                        height: '100%',
                                    }}
                                >
                                    <CardContent sx={{ p: 4 }}>
                                        <Typography
                                            variant="body1"
                                            sx={{
                                                color: alpha('#fff', 0.7),
                                                mb: 3,
                                                lineHeight: 1.8,
                                                fontStyle: 'italic',
                                            }}
                                        >
                                            "{testimonial.text}"
                                        </Typography>
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                            <Avatar
                                                sx={{
                                                    bgcolor: alpha('#34d399', 0.2),
                                                    color: '#34d399',
                                                }}
                                            >
                                                {testimonial.avatar}
                                            </Avatar>
                                            <Box>
                                                <Typography variant="subtitle2" fontWeight={600} sx={{ color: 'white' }}>
                                                    {testimonial.name}
                                                </Typography>
                                                <Typography variant="caption" sx={{ color: alpha('#fff', 0.5) }}>
                                                    {testimonial.role}
                                                </Typography>
                                            </Box>
                                        </Box>
                                    </CardContent>
                                </MotionCard>
                            </Grid>
                        ))}
                    </Grid>
                </Container>
            </Box>

            {/* Locations Section */}
            <Box sx={{ py: 12, bgcolor: '#09090b' }}>
                <Container maxWidth="lg">
                    <MotionBox
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        sx={{ textAlign: 'center', mb: 8 }}
                    >
                        <Chip
                            label="FİLİALLARIMIZ"
                            sx={{
                                bgcolor: alpha('#f44336', 0.1),
                                color: '#f44336',
                                border: `1px solid ${alpha('#f44336', 0.3)}`,
                                mb: 3,
                            }}
                        />
                        <Typography variant="h3" fontWeight={700} sx={{ mb: 2 }}>
                            Bütün Azərbaycan Ərazisində
                        </Typography>
                        <Typography variant="body1" sx={{ color: alpha('#fff', 0.6) }}>
                            OBA CRM sistemi bütün marketlərimizdə aktiv istifadə olunur.
                        </Typography>
                    </MotionBox>

                    <Grid container spacing={3} justifyContent="center">
                        {locations.map((location, index) => (
                            <Grid item xs={6} sm={4} md={2.4} key={location.id}>
                                <MotionBox
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.05 }}
                                    whileHover={{ scale: 1.05 }}
                                    sx={{
                                        p: 3,
                                        bgcolor: '#18181b',
                                        borderRadius: 3,
                                        border: `1px solid ${alpha('#fff', 0.1)}`,
                                        textAlign: 'center',
                                        cursor: 'pointer',
                                        '&:hover': {
                                            borderColor: '#34d399',
                                        },
                                    }}
                                >
                                    <LocationIcon sx={{ color: '#34d399', mb: 1 }} />
                                    <Typography variant="subtitle2" fontWeight={600} sx={{ color: 'white' }}>
                                        {location.name}
                                    </Typography>
                                    <Typography variant="caption" sx={{ color: alpha('#fff', 0.5) }}>
                                        {location.address}
                                    </Typography>
                                    <Chip
                                        label={location.id}
                                        size="small"
                                        sx={{
                                            mt: 1,
                                            bgcolor: alpha('#34d399', 0.1),
                                            color: '#34d399',
                                            fontSize: 10,
                                        }}
                                    />
                                </MotionBox>
                            </Grid>
                        ))}
                    </Grid>
                </Container>
            </Box>

            {/* Contact Section */}
            <Box
                id="contact"
                sx={{
                    py: 12,
                    bgcolor: '#0f0f10',
                    background: `radial-gradient(ellipse at bottom, ${alpha('#34d399', 0.1)} 0%, transparent 60%)`,
                }}
            >
                <Container maxWidth="sm">
                    <MotionBox
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        sx={{ textAlign: 'center', mb: 6 }}
                    >
                        <Chip
                            label="ƏLAQƏ"
                            sx={{
                                bgcolor: alpha('#0079da', 0.1),
                                color: '#60a5fa',
                                border: `1px solid ${alpha('#0079da', 0.3)}`,
                                mb: 3,
                            }}
                        />
                        <Typography variant="h3" fontWeight={700} sx={{ mb: 2 }}>
                            Bizimlə Əlaqə Saxlayın
                        </Typography>
                        <Typography variant="body1" sx={{ color: alpha('#fff', 0.6) }}>
                            Sualınız var? Demo istəyirsiniz? Formu doldurun, sizinlə əlaqə saxlayaq.
                        </Typography>
                    </MotionBox>

                    {!submitted ? (
                        <MotionCard
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            sx={{
                                bgcolor: '#18181b',
                                border: `1px solid ${alpha('#fff', 0.1)}`,
                                borderRadius: 4,
                            }}
                        >
                            <CardContent sx={{ p: 4 }}>
                                <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                                    <TextField
                                        fullWidth
                                        label="Ad və Soyad"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        required
                                        sx={{
                                            '& .MuiOutlinedInput-root': {
                                                color: 'white',
                                                '& fieldset': { borderColor: alpha('#fff', 0.2) },
                                                '&:hover fieldset': { borderColor: alpha('#fff', 0.4) },
                                            },
                                            '& .MuiInputLabel-root': { color: alpha('#fff', 0.5) },
                                        }}
                                    />
                                    <TextField
                                        fullWidth
                                        label="Email"
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                        sx={{
                                            '& .MuiOutlinedInput-root': {
                                                color: 'white',
                                                '& fieldset': { borderColor: alpha('#fff', 0.2) },
                                                '&:hover fieldset': { borderColor: alpha('#fff', 0.4) },
                                            },
                                            '& .MuiInputLabel-root': { color: alpha('#fff', 0.5) },
                                        }}
                                    />
                                    <Button
                                        type="submit"
                                        variant="contained"
                                        size="large"
                                        fullWidth
                                        sx={{
                                            py: 1.5,
                                            borderRadius: 2,
                                            background: 'linear-gradient(90deg, #0079da, #34d399)',
                                            fontWeight: 600,
                                            '&:hover': {
                                                background: 'linear-gradient(90deg, #0056b3, #2ebd87)',
                                            },
                                        }}
                                    >
                                        Göndər
                                    </Button>
                                </Box>
                            </CardContent>
                        </MotionCard>
                    ) : (
                        <MotionBox
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            sx={{
                                textAlign: 'center',
                                p: 6,
                                bgcolor: alpha('#34d399', 0.1),
                                borderRadius: 4,
                                border: `1px solid ${alpha('#34d399', 0.3)}`,
                            }}
                        >
                            <CheckIcon sx={{ fontSize: 64, color: '#34d399', mb: 2 }} />
                            <Typography variant="h5" fontWeight={600} sx={{ mb: 1 }}>
                                Təşəkkür edirik!
                            </Typography>
                            <Typography variant="body1" sx={{ color: alpha('#fff', 0.7) }}>
                                Müraciətiniz qəbul edildi. Tezliklə sizinlə əlaqə saxlayacağıq.
                            </Typography>
                        </MotionBox>
                    )}
                </Container>
            </Box>

            {/* Footer */}
            <Box sx={{ py: 6, bgcolor: '#09090b', borderTop: `1px solid ${alpha('#fff', 0.1)}` }}>
                <Container maxWidth="lg">
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                            <Box
                                sx={{
                                    width: 40,
                                    height: 40,
                                    borderRadius: 2,
                                    bgcolor: '#0079da',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}
                            >
                                <Typography fontWeight={700}>O</Typography>
                            </Box>
                            <Typography variant="body2" sx={{ color: alpha('#fff', 0.5) }}>
                                © 2024 OBA CRM. Bütün hüquqlar qorunur.
                            </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', gap: 2 }}>
                            <IconButton size="small" sx={{ color: alpha('#fff', 0.5), '&:hover': { color: '#25D366' } }}>
                                <WhatsAppIcon />
                            </IconButton>
                            <IconButton size="small" sx={{ color: alpha('#fff', 0.5), '&:hover': { color: '#0088cc' } }}>
                                <TelegramIcon />
                            </IconButton>
                            <IconButton size="small" sx={{ color: alpha('#fff', 0.5), '&:hover': { color: '#60a5fa' } }}>
                                <EmailIcon />
                            </IconButton>
                        </Box>
                    </Box>
                </Container>
            </Box>

            {/* Snackbar */}
            <Snackbar
                open={snackbar.open}
                autoHideDuration={5000}
                onClose={() => setSnackbar({ ...snackbar, open: false })}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            >
                <Alert severity="success" onClose={() => setSnackbar({ ...snackbar, open: false })}>
                    {snackbar.message}
                </Alert>
            </Snackbar>
        </Box>
    );
}
