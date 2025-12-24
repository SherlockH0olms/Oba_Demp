import { useState } from 'react';
import {
    Box,
    Typography,
    Button,
    TextField,
    Card,
    CardContent,
    Checkbox,
    FormControlLabel,
    IconButton,
    InputAdornment,
    Alert,
    CircularProgress,
    alpha,
} from '@mui/material';
import {
    Visibility as VisibilityIcon,
    VisibilityOff as VisibilityOffIcon,
    ArrowBack as ArrowBackIcon,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const MotionBox = motion(Box);
const MotionCard = motion(Card);

export default function LoginPage() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        remember: false,
    });
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Demo validation - accept demo@oba.az / Demo2025!
        if (formData.email === 'demo@oba.az' && formData.password === 'Demo2025!') {
            // Store token
            if (formData.remember) {
                localStorage.setItem('auth_token', 'demo_token_' + Date.now());
            } else {
                sessionStorage.setItem('auth_token', 'demo_token_' + Date.now());
            }
            // Redirect to dashboard
            navigate('/');
        } else if (!formData.email || !formData.password) {
            setError('Email və şifrə daxil edilməlidir');
        } else {
            setError('Email və ya şifrə yanlışdır. Demo məlumatları istifadə edin.');
        }

        setIsLoading(false);
    };

    return (
        <Box
            sx={{
                minHeight: '100vh',
                width: '100%',
                bgcolor: '#09090b',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                p: 2,
                position: 'relative',
                overflow: 'hidden',
            }}
        >
            {/* Animated background */}
            <Box
                sx={{
                    position: 'absolute',
                    inset: 0,
                    opacity: 0.3,
                    background: `radial-gradient(ellipse at center, ${alpha('#0079da', 0.15)} 0%, transparent 50%)`,
                }}
            />

            {/* Grid pattern */}
            <Box
                sx={{
                    position: 'absolute',
                    inset: 0,
                    opacity: 0.02,
                    backgroundImage: `
                        linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px),
                        linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)
                    `,
                    backgroundSize: '50px 50px',
                }}
            />

            {/* Login Card */}
            <MotionCard
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                sx={{
                    position: 'relative',
                    zIndex: 10,
                    width: '100%',
                    maxWidth: 420,
                    bgcolor: alpha('#18181b', 0.8),
                    backdropFilter: 'blur(24px)',
                    border: `1px solid ${alpha('#fff', 0.1)}`,
                    borderRadius: 4,
                    boxShadow: `0 25px 50px ${alpha('#000', 0.5)}`,
                }}
            >
                <CardContent sx={{ p: 4 }}>
                    {/* Logo & Title */}
                    <Box sx={{ textAlign: 'center', mb: 4 }}>
                        <MotionBox
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                            sx={{
                                width: 64,
                                height: 64,
                                mx: 'auto',
                                mb: 2,
                                borderRadius: 3,
                                bgcolor: '#0079da',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                boxShadow: `0 0 40px ${alpha('#0079da', 0.5)}`,
                            }}
                        >
                            <Typography variant="h4" fontWeight={800} color="white">O</Typography>
                        </MotionBox>

                        <Typography variant="h5" fontWeight={700} color="white" gutterBottom>
                            OBA CRM Sistemə Daxil Olun
                        </Typography>
                        <Typography variant="body2" sx={{ color: alpha('#fff', 0.5) }}>
                            Demo versiyaya giriş üçün məlumatlarınızı daxil edin
                        </Typography>
                    </Box>

                    {/* Error Message */}
                    {error && (
                        <MotionBox
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                        >
                            <Alert
                                severity="error"
                                sx={{
                                    mb: 3,
                                    bgcolor: alpha('#f44336', 0.1),
                                    border: `1px solid ${alpha('#f44336', 0.2)}`,
                                    color: '#f87171',
                                }}
                            >
                                {error}
                            </Alert>
                        </MotionBox>
                    )}

                    {/* Login Form */}
                    <Box component="form" onSubmit={handleSubmit}>
                        {/* Email Field */}
                        <TextField
                            fullWidth
                            label="Email"
                            type="email"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            placeholder="demo@oba.az"
                            sx={{
                                mb: 2.5,
                                '& .MuiOutlinedInput-root': {
                                    color: 'white',
                                    bgcolor: alpha('#27272a', 0.5),
                                    borderRadius: 2,
                                    '& fieldset': { borderColor: alpha('#fff', 0.2) },
                                    '&:hover fieldset': { borderColor: alpha('#fff', 0.3) },
                                    '&.Mui-focused fieldset': { borderColor: '#0079da' },
                                },
                                '& .MuiInputLabel-root': { color: alpha('#fff', 0.5) },
                                '& .MuiInputLabel-root.Mui-focused': { color: '#60a5fa' },
                            }}
                        />

                        {/* Password Field */}
                        <TextField
                            fullWidth
                            label="Şifrə"
                            type={showPassword ? 'text' : 'password'}
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            placeholder="••••••••"
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            onClick={() => setShowPassword(!showPassword)}
                                            edge="end"
                                            sx={{ color: alpha('#fff', 0.5) }}
                                        >
                                            {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                            sx={{
                                mb: 2,
                                '& .MuiOutlinedInput-root': {
                                    color: 'white',
                                    bgcolor: alpha('#27272a', 0.5),
                                    borderRadius: 2,
                                    '& fieldset': { borderColor: alpha('#fff', 0.2) },
                                    '&:hover fieldset': { borderColor: alpha('#fff', 0.3) },
                                    '&.Mui-focused fieldset': { borderColor: '#0079da' },
                                },
                                '& .MuiInputLabel-root': { color: alpha('#fff', 0.5) },
                                '& .MuiInputLabel-root.Mui-focused': { color: '#60a5fa' },
                            }}
                        />

                        {/* Remember Me */}
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={formData.remember}
                                        onChange={(e) => setFormData({ ...formData, remember: e.target.checked })}
                                        sx={{
                                            color: alpha('#fff', 0.3),
                                            '&.Mui-checked': { color: '#0079da' },
                                        }}
                                    />
                                }
                                label="Məni xatırla"
                                sx={{
                                    color: alpha('#fff', 0.5),
                                    '& .MuiFormControlLabel-label': { fontSize: 14 },
                                }}
                            />
                            <Typography
                                variant="body2"
                                sx={{
                                    color: '#60a5fa',
                                    cursor: 'pointer',
                                    '&:hover': { color: '#93c5fd' },
                                }}
                            >
                                Şifrəni unutdum?
                            </Typography>
                        </Box>

                        {/* Submit Button */}
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            disabled={isLoading}
                            sx={{
                                py: 1.5,
                                borderRadius: 2,
                                fontWeight: 600,
                                fontSize: 16,
                                background: isLoading
                                    ? alpha('#27272a', 0.8)
                                    : 'linear-gradient(90deg, #0079da, #0056b3)',
                                boxShadow: isLoading
                                    ? 'none'
                                    : `0 8px 25px ${alpha('#0079da', 0.4)}`,
                                '&:hover': {
                                    background: isLoading
                                        ? alpha('#27272a', 0.8)
                                        : 'linear-gradient(90deg, #0056b3, #003d82)',
                                    transform: isLoading ? 'none' : 'scale(1.02)',
                                    boxShadow: isLoading
                                        ? 'none'
                                        : `0 12px 30px ${alpha('#0079da', 0.5)}`,
                                },
                                transition: 'all 0.2s',
                            }}
                        >
                            {isLoading ? (
                                <CircularProgress size={24} sx={{ color: alpha('#fff', 0.5) }} />
                            ) : (
                                'Daxil Ol'
                            )}
                        </Button>
                    </Box>

                    {/* Demo Credentials */}
                    <Box
                        sx={{
                            mt: 3,
                            p: 2,
                            borderRadius: 2,
                            bgcolor: alpha('#0079da', 0.05),
                            border: `1px solid ${alpha('#0079da', 0.1)}`,
                        }}
                    >
                        <Typography
                            variant="caption"
                            sx={{ color: alpha('#fff', 0.5), display: 'block', textAlign: 'center', mb: 1 }}
                        >
                            Demo məlumatlar:
                        </Typography>
                        <Box sx={{ fontFamily: 'monospace', fontSize: 12 }}>
                            <Typography variant="body2" sx={{ color: alpha('#fff', 0.7) }}>
                                <Box component="span" sx={{ color: alpha('#fff', 0.4) }}>Email:</Box> demo@oba.az
                            </Typography>
                            <Typography variant="body2" sx={{ color: alpha('#fff', 0.7) }}>
                                <Box component="span" sx={{ color: alpha('#fff', 0.4) }}>Şifrə:</Box> Demo2025!
                            </Typography>
                        </Box>
                    </Box>

                    {/* Back to Landing */}
                    <Box sx={{ mt: 3, textAlign: 'center' }}>
                        <Button
                            startIcon={<ArrowBackIcon />}
                            onClick={() => navigate('/landing')}
                            sx={{
                                color: alpha('#fff', 0.5),
                                textTransform: 'none',
                                '&:hover': { color: 'white', bgcolor: alpha('#fff', 0.05) },
                            }}
                        >
                            Ana səhifəyə qayıt
                        </Button>
                    </Box>
                </CardContent>
            </MotionCard>
        </Box>
    );
}
