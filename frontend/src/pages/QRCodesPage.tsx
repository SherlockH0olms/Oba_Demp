import { useEffect, useState } from 'react';
import { Box, Card, CardContent, Typography, Grid, Button, Chip } from '@mui/material';
import { QRCodeSVG } from 'qrcode.react';
import { WhatsApp as WhatsAppIcon, Telegram as TelegramIcon } from '@mui/icons-material';

interface Market {
    id: string;
    name: string;
    location: string;
    whatsappUrl: string;
    telegramUrl: string;
}

const markets: Market[] = [
    { id: 'M001', name: 'OBA 28 May', location: 'Bakı, 28 May metrosu', whatsappUrl: 'https://wa.me/994501234567?text=FEEDBACK_M001', telegramUrl: 'https://t.me/oba_feedback_bot?start=M001' },
    { id: 'M002', name: 'OBA Nərimanov', location: 'Bakı, Nərimanov rayonu', whatsappUrl: 'https://wa.me/994501234568?text=FEEDBACK_M002', telegramUrl: 'https://t.me/oba_feedback_bot?start=M002' },
    { id: 'M003', name: 'OBA Xətai', location: 'Bakı, Xətai rayonu', whatsappUrl: 'https://wa.me/994501234569?text=FEEDBACK_M003', telegramUrl: 'https://t.me/oba_feedback_bot?start=M003' },
    { id: 'M004', name: 'OBA Gənclik', location: 'Bakı, Gənclik metrosu', whatsappUrl: 'https://wa.me/994501234570?text=FEEDBACK_M004', telegramUrl: 'https://t.me/oba_feedback_bot?start=M004' },
    { id: 'M005', name: 'OBA Sumqayıt', location: 'Sumqayıt şəhəri', whatsappUrl: 'https://wa.me/994501234571?text=FEEDBACK_M005', telegramUrl: 'https://t.me/oba_feedback_bot?start=M005' },
];

export default function QRCodesPage() {
    const [selectedChannel, setSelectedChannel] = useState<'whatsapp' | 'telegram'>('whatsapp');

    return (
        <Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="h5">QR Kodlar</Typography>
                <Box sx={{ display: 'flex', gap: 1 }}>
                    <Button
                        variant={selectedChannel === 'whatsapp' ? 'contained' : 'outlined'}
                        color="success"
                        startIcon={<WhatsAppIcon />}
                        onClick={() => setSelectedChannel('whatsapp')}
                    >
                        WhatsApp
                    </Button>
                    <Button
                        variant={selectedChannel === 'telegram' ? 'contained' : 'outlined'}
                        color="info"
                        startIcon={<TelegramIcon />}
                        onClick={() => setSelectedChannel('telegram')}
                    >
                        Telegram
                    </Button>
                </Box>
            </Box>

            <Grid container spacing={3}>
                {markets.map((market) => (
                    <Grid item xs={12} sm={6} md={4} key={market.id}>
                        <Card sx={{ textAlign: 'center' }}>
                            <CardContent>
                                <Chip label={market.id} size="small" sx={{ mb: 2 }} />
                                <Typography variant="h6" gutterBottom>{market.name}</Typography>
                                <Typography variant="body2" color="text.secondary" gutterBottom>
                                    📍 {market.location}
                                </Typography>

                                <Box sx={{ my: 3, display: 'flex', justifyContent: 'center' }}>
                                    <QRCodeSVG
                                        value={selectedChannel === 'whatsapp' ? market.whatsappUrl : market.telegramUrl}
                                        size={180}
                                        level="H"
                                        includeMargin
                                        fgColor={selectedChannel === 'whatsapp' ? '#25D366' : '#0088cc'}
                                    />
                                </Box>

                                <Typography variant="caption" color="text.secondary" display="block">
                                    {selectedChannel === 'whatsapp' ? '💬 WhatsApp ilə rəy göndər' : '✈️ Telegram ilə rəy göndər'}
                                </Typography>

                                <Button
                                    size="small"
                                    sx={{ mt: 2 }}
                                    onClick={() => window.open(selectedChannel === 'whatsapp' ? market.whatsappUrl : market.telegramUrl, '_blank')}
                                >
                                    Linki Aç
                                </Button>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>

            {/* Info Section */}
            <Card sx={{ mt: 4 }}>
                <CardContent>
                    <Typography variant="h6" gutterBottom>📋 QR Kod İstifadə Qaydası</Typography>
                    <Typography variant="body2" color="text.secondary">
                        1. Müştəri marketdə QR kodu telefonla skan edir<br />
                        2. WhatsApp və ya Telegram açılır<br />
                        3. Avtomatik mesaj şablonu əlavə olunur<br />
                        4. Müştəri rəyini yazıb göndərir<br />
                        5. AI analiz etir və CRM-ə düşür
                    </Typography>
                </CardContent>
            </Card>
        </Box>
    );
}
