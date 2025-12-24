import React, { createContext, useContext, useState, useMemo, useEffect, ReactNode } from 'react';
import { ThemeProvider as MuiThemeProvider, createTheme, CssBaseline, PaletteMode } from '@mui/material';

interface ThemeContextType {
    mode: PaletteMode;
    toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType>({
    mode: 'light',
    toggleTheme: () => { },
});

export const useThemeMode = () => useContext(ThemeContext);

// Create theme based on mode
const getTheme = (mode: PaletteMode) => createTheme({
    palette: {
        mode,
        primary: {
            main: '#0079da', // OBA Blue
            light: '#60a5fa',
            dark: '#0056b3',
        },
        secondary: {
            main: '#34d399', // Emerald
            light: '#6ee7b7',
            dark: '#059669',
        },
        background: mode === 'dark' ? {
            default: '#09090b',
            paper: '#18181b',
        } : {
            default: '#F5F7FA',
            paper: '#FFFFFF',
        },
        text: mode === 'dark' ? {
            primary: '#fafafa',
            secondary: '#a1a1aa',
        } : {
            primary: '#1a1a1a',
            secondary: '#6b7280',
        },
        success: {
            main: '#22c55e',
        },
        warning: {
            main: '#f59e0b',
        },
        error: {
            main: '#ef4444',
        },
        divider: mode === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)',
    },
    typography: {
        fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
        h4: {
            fontWeight: 600,
        },
        h5: {
            fontWeight: 600,
        },
        h6: {
            fontWeight: 600,
        },
    },
    shape: {
        borderRadius: 12,
    },
    components: {
        MuiCard: {
            styleOverrides: {
                root: {
                    boxShadow: mode === 'dark'
                        ? '0 4px 20px rgba(0,0,0,0.4)'
                        : '0 2px 12px rgba(0,0,0,0.08)',
                    borderRadius: 16,
                    border: mode === 'dark' ? '1px solid rgba(255,255,255,0.1)' : 'none',
                    backgroundColor: mode === 'dark' ? '#18181b' : '#FFFFFF',
                },
            },
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    textTransform: 'none',
                    fontWeight: 500,
                    borderRadius: 8,
                },
            },
        },
        MuiChip: {
            styleOverrides: {
                root: {
                    fontWeight: 500,
                },
            },
        },
        MuiPaper: {
            styleOverrides: {
                root: {
                    backgroundImage: 'none',
                },
            },
        },
        MuiDrawer: {
            styleOverrides: {
                paper: {
                    backgroundColor: mode === 'dark' ? '#0f0f10' : '#FFFFFF',
                    borderRight: mode === 'dark' ? '1px solid rgba(255,255,255,0.1)' : '1px solid rgba(0,0,0,0.08)',
                },
            },
        },
        MuiAppBar: {
            styleOverrides: {
                root: {
                    backgroundColor: mode === 'dark' ? '#0f0f10' : '#FFFFFF',
                    borderBottom: mode === 'dark' ? '1px solid rgba(255,255,255,0.1)' : '1px solid rgba(0,0,0,0.08)',
                },
            },
        },
        MuiTableCell: {
            styleOverrides: {
                root: {
                    borderBottom: mode === 'dark' ? '1px solid rgba(255,255,255,0.1)' : '1px solid rgba(0,0,0,0.08)',
                },
            },
        },
    },
});

interface ThemeProviderProps {
    children: ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
    // Get initial mode from localStorage or default to 'dark'
    const [mode, setMode] = useState<PaletteMode>(() => {
        const savedMode = localStorage.getItem('theme_mode');
        return (savedMode as PaletteMode) || 'dark';
    });

    // Save mode to localStorage when it changes
    useEffect(() => {
        localStorage.setItem('theme_mode', mode);
    }, [mode]);

    const toggleTheme = () => {
        setMode((prev) => (prev === 'light' ? 'dark' : 'light'));
    };

    const theme = useMemo(() => getTheme(mode), [mode]);

    const contextValue = useMemo(() => ({
        mode,
        toggleTheme,
    }), [mode]);

    return (
        <ThemeContext.Provider value={contextValue}>
            <MuiThemeProvider theme={theme}>
                <CssBaseline />
                {children}
            </MuiThemeProvider>
        </ThemeContext.Provider>
    );
}
