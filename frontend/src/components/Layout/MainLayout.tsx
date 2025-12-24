import { useState, ReactNode } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
    Box,
    Drawer,
    AppBar,
    Toolbar,
    List,
    Typography,
    Divider,
    IconButton,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Avatar,
    Chip,
    useTheme,
    alpha,
    Tooltip,
} from '@mui/material';
import {
    Menu as MenuIcon,
    Dashboard as DashboardIcon,
    SupportAgent as CallCenterIcon,
    Poll as SurveysIcon,
    Analytics as AnalyticsIcon,
    QrCode as QrCodeIcon,
    PlayArrow as SimulatorIcon,
    Notifications as NotificationsIcon,
    DarkMode as DarkModeIcon,
    LightMode as LightModeIcon,
} from '@mui/icons-material';
import { useThemeMode } from '../../context/ThemeContext';

const drawerWidth = 260;

interface MainLayoutProps {
    children: ReactNode;
}

const menuItems = [
    { text: 'Dashboard', icon: <DashboardIcon />, path: '/' },
    { text: 'Call Center', icon: <CallCenterIcon />, path: '/call-center' },
    { text: 'Anketlər', icon: <SurveysIcon />, path: '/surveys' },
    { text: 'Analitika', icon: <AnalyticsIcon />, path: '/analytics' },
    { text: 'QR Kodlar', icon: <QrCodeIcon />, path: '/qr-codes' },
    { text: 'Simulyator', icon: <SimulatorIcon />, path: '/simulator' },
];

export default function MainLayout({ children }: MainLayoutProps) {
    const [mobileOpen, setMobileOpen] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const theme = useTheme();
    const { mode, toggleTheme } = useThemeMode();

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const drawer = (
        <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            {/* Logo Section */}
            <Box sx={{ p: 3, display: 'flex', alignItems: 'center', gap: 2 }}>
                <Avatar
                    sx={{
                        bgcolor: theme.palette.primary.main,
                        width: 48,
                        height: 48,
                        fontSize: 20,
                        fontWeight: 700,
                    }}
                >
                    OBA
                </Avatar>
                <Box>
                    <Typography variant="h6" sx={{ fontWeight: 700, color: theme.palette.primary.main }}>
                        OBA CRM
                    </Typography>
                    <Chip
                        label="DEMO"
                        size="small"
                        color="secondary"
                        sx={{ height: 20, fontSize: 10 }}
                    />
                </Box>
            </Box>

            <Divider />

            {/* Navigation */}
            <List sx={{ flex: 1, px: 2, py: 1 }}>
                {menuItems.map((item) => {
                    const isActive = location.pathname === item.path;
                    return (
                        <ListItem key={item.text} disablePadding sx={{ mb: 0.5 }}>
                            <ListItemButton
                                onClick={() => navigate(item.path)}
                                sx={{
                                    borderRadius: 2,
                                    bgcolor: isActive ? alpha(theme.palette.primary.main, 0.12) : 'transparent',
                                    color: isActive ? theme.palette.primary.main : theme.palette.text.secondary,
                                    '&:hover': {
                                        bgcolor: alpha(theme.palette.primary.main, 0.08),
                                    },
                                }}
                            >
                                <ListItemIcon
                                    sx={{
                                        color: isActive ? theme.palette.primary.main : theme.palette.text.secondary,
                                        minWidth: 40,
                                    }}
                                >
                                    {item.icon}
                                </ListItemIcon>
                                <ListItemText
                                    primary={item.text}
                                    primaryTypographyProps={{
                                        fontWeight: isActive ? 600 : 400,
                                    }}
                                />
                            </ListItemButton>
                        </ListItem>
                    );
                })}
            </List>

            {/* Footer */}
            <Box sx={{ p: 2 }}>
                <Box
                    sx={{
                        p: 2,
                        borderRadius: 2,
                        bgcolor: alpha(theme.palette.primary.main, 0.08),
                    }}
                >
                    <Typography variant="caption" color="text.secondary">
                        Powered by
                    </Typography>
                    <Typography variant="body2" fontWeight={600} color="primary">
                        Azure AI + WhatsApp
                    </Typography>
                </Box>
            </Box>
        </Box>
    );

    return (
        <Box sx={{ display: 'flex', minHeight: '100vh' }}>
            {/* AppBar */}
            <AppBar
                position="fixed"
                sx={{
                    width: { sm: `calc(100% - ${drawerWidth}px)` },
                    ml: { sm: `${drawerWidth}px` },
                    bgcolor: 'background.paper',
                    color: 'text.primary',
                    boxShadow: mode === 'dark' ? 'none' : '0 1px 3px rgba(0,0,0,0.1)',
                    borderBottom: mode === 'dark' ? '1px solid rgba(255,255,255,0.1)' : 'none',
                }}
            >
                <Toolbar>
                    <IconButton
                        color="inherit"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ mr: 2, display: { sm: 'none' } }}
                    >
                        <MenuIcon />
                    </IconButton>

                    <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
                        {menuItems.find(item => item.path === location.pathname)?.text || 'Dashboard'}
                    </Typography>

                    {/* Theme Toggle */}
                    <Tooltip title={mode === 'dark' ? 'Light Mode' : 'Dark Mode'}>
                        <IconButton
                            color="inherit"
                            onClick={toggleTheme}
                            sx={{
                                transition: 'transform 0.3s, color 0.3s',
                                '&:hover': {
                                    transform: 'rotate(180deg)',
                                    color: mode === 'dark' ? '#fbbf24' : '#60a5fa',
                                },
                            }}
                        >
                            {mode === 'dark' ? <LightModeIcon /> : <DarkModeIcon />}
                        </IconButton>
                    </Tooltip>

                    <IconButton color="inherit">
                        <NotificationsIcon />
                    </IconButton>

                    <Avatar sx={{ ml: 1, bgcolor: theme.palette.secondary.main }}>
                        A
                    </Avatar>
                </Toolbar>
            </AppBar>

            {/* Drawer */}
            <Box
                component="nav"
                sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
            >
                <Drawer
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{ keepMounted: true }}
                    sx={{
                        display: { xs: 'block', sm: 'none' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                >
                    {drawer}
                </Drawer>
                <Drawer
                    variant="permanent"
                    sx={{
                        display: { xs: 'none', sm: 'block' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                    open
                >
                    {drawer}
                </Drawer>
            </Box>

            {/* Main Content */}
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    p: 3,
                    width: { sm: `calc(100% - ${drawerWidth}px)` },
                    mt: 8,
                    bgcolor: 'background.default',
                    minHeight: '100vh',
                }}
            >
                {children}
            </Box>
        </Box>
    );
}
