# OBA CRM Demo - Prezentasiya Bələdçisi

## 5 Dəqiqəlik Demo Flow

### Dəqiqə 1: Problem (1 dəq)
> "Müştəri geri bildirimlərini idarə etmək çətindir. Əl ilə data toplanması və analizi vaxt aparır."

- Müştəri şikayətləri itə bilir
- Cavab vaxtı uzundur
- Analiz manual edilir

### Dəqiqə 2: Həll Təqdim Et (1 dəq)
> "OBA Smart Feedback Platform - QR kod ilə asan giriş, AI-powered avtomatik analiz"

- QR kodları göstər (QR Codes səhifəsi)
- AI analiz qabiliyyətlərini izah et
- Call Center routing-i göstər

### Dəqiqə 3: Live Demo (2 dəq)

1. **Simulator səhifəsinə get**
   - Nümunə mesaj seç: "Satıcılar çox kobud davrandı"
   - "Göndər" düyməsini bas
   - AI analiz nəticəsini göstər (😊/☹️, prioritet, departament)

2. **Dashboard-a qayıt**
   - Yeni mesajın real-time göründüyünü göstər
   - KPI kartlarını izah et
   - Qrafikləri göstər

3. **Call Center səhifəsinə get**
   - Yüksək prioritetli tiketi göstər
   - "Zəng Et" düyməsini bas

### Dəqiqə 4: Əlavə Xüsusiyyətlər (30 san)
- **Anketlər**: Survey yaratma və nəticələr
- **Analitika**: Departament statistikası
- **Telegram**: Alternativ kanal

### Dəqiqə 5: Impact və Gələcək (30 san)
> "5% data effektivlik artımı, Call Center response 50% azalma, Müştəri məmnuniyyəti 23% artım"

- Real inteqrasiya planları
- Genişlənmə imkanları

---

## Key Demo Points

### Dashboard
- 📊 **KPI Kartları**: Ümumi rəylər, bu həftə, həll olunub, Call Center
- 📈 **Sentiment Trend**: Son 7 günün pozitiv/neytral/negatif trendi
- 🥧 **Kateqoriya Chart**: Rəy növləri paylanması
- 📋 **Cədvəl**: Son rəylər, emoji sentiment, status

### Call Center
- 🔴 **Yüksək Prioritet**: Dərhal diqqət tələb edən
- 🟡 **Orta Prioritet**: Normal iş axınında
- 🟢 **Aşağı Prioritet**: Standart prosedur

### AI Analiz
- **Sentiment**: Positive 😊, Neutral 😐, Negative ☹️
- **Priority**: HIGH → Call Center, MEDIUM → Department, LOW → CRM
- **Department**: Products, Service, HR, IT, Marketing, Facilities

---

## Texniki Qeyd

Demo üçün backend `localhost:5000`, frontend `localhost:3000`-da işləyir. Real API key lazım deyil - bütün data mock-dur.
