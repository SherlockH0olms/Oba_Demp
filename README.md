# OBA AI-Powered WhatsApp CRM Demo

Müştəri geri bildirimlərini QR kod vasitəsilə toplayan, Azure AI ilə analiz edən və Call Center-ə yönləndirən demo CRM platforması.

![Demo](https://img.shields.io/badge/Status-Demo-orange) ![React](https://img.shields.io/badge/React-18-blue) ![Node.js](https://img.shields.io/badge/Node.js-Express-green)

## 🚀 Tez Başlanğıc

### Backend
```bash
cd backend
npm install
npm start
# http://localhost:5000
```

### Frontend
```bash
cd frontend
npm install
npm run dev
# http://localhost:3000
```

## ✨ Xüsusiyyətlər

- **📱 QR Kod İnteqrasiyası** - 5 OBA filialı üçün WhatsApp/Telegram QR kodları
- **🤖 Azure AI Simulyasiyası** - NLP, Sentiment Analysis, Category Detection
- **📞 Call Center Modulu** - Prioritet əsaslı tiket sistemi
- **📊 Real-time Dashboard** - KPI, qrafiklər, cədvəllər
- **📋 Anket İdarəetmə** - Sorğu yaratma və planlaşdırma
- **🔔 WebSocket** - Real-time bildirişlər

## 📁 Layihə Strukturu

```
oba-crm-demo/
├── backend/
│   ├── routes/           # API endpoints
│   ├── services/         # AI analyzer, priority calculator
│   ├── data/             # Mock data
│   └── server.js         # Express server
├── frontend/
│   ├── src/
│   │   ├── components/   # React components
│   │   ├── pages/        # Route pages
│   │   ├── services/     # API & Socket
│   │   └── store/        # Zustand state
│   └── package.json
└── docs/
    └── DEMO_GUIDE.md
```

## 🛠 Texnologiyalar

| Layer | Texnologiya |
|-------|-------------|
| Frontend | React 18, TypeScript, MUI v5, Recharts |
| Backend | Node.js, Express, Socket.IO |
| State | Zustand |
| QR | qrcode.react |

## 📖 Demo Ssenariləri

1. **QR Scan → WhatsApp → Dashboard** - Müştəri QR skan edir, mesaj göndərir, dashboard-da görünür
2. **Kritik Şikayət → Call Center** - Mənfi sentiment → yüksək prioritet → Call Center alert
3. **Anket Göndərmə** - Admin anket yaradır, planlaşdırır, nəticələri görür

## ⚠️ Qeyd

Bu **demo versiyasıdır**. Bütün API-lər simulyasiya edilir, real WhatsApp/Telegram/Azure inteqrasiyası yoxdur.

## 📄 Lisenziya

MIT License - OBA Demo Project
