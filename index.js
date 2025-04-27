process.on('uncaughtException', (err) => {
  if (err.message.includes('friend_source_flags')) {
    console.warn('⚠️ Ostrzeżenie: Brak danych friend_source_flags. Ignoruję błąd.');
  } else {
    console.error('❌ Błąd krytyczny:', err);
    process.exit(1);
  }
});

const { Client, Intents } = require('discord.js-selfbot-v13');
const { MessageEmbed } = require('discord.js-selfbot-v13');
const express = require('express');
const app = express();
const PORT = 8080;
const Discord = require('discord.js-selfbot-v13');
// Konfiguracja klienta Discord
const client = new Client({
  checkUpdate: false,
});

// Serwer HTTP do utrzymania aktywności na Render (dla darmowego tieru)
app.get('/', (req, res) => {
  res.send('Self-bot działa na Render! 🚀');
});

app.listen(PORT, () => {
  console.log(`Serwer pingujący działa na porcie ${PORT}`);
});

// Obsługa zdarzeń Discorda
client.once('ready', () => {
  console.log(`Zalogowano jako ${client.user.tag}!`);
});

// === KONFIGURACJA ===
const adminId = '1087428851036082266'; // <-- Twoje ID (do powiadomień)
const reklamoweKanaly = [
    { id: '1346609270933946490', czas: 11 }, 
    { id: '1346609275761332325', czas: 11 },
    { id: '1346609282174685264', czas: 11 },
    { id: '1346609283932094529', czas: 11 },
    { id: '1346609287048204378', czas: 11 },
    { id: '1346609290332602420', czas: 16 },
    { id: '1347263942975557633', czas: 16 },
    { id: '1346609292425429194', czas: 11 },
];

const partnerstwaKanaly = [
    { id: '1346609247869337701', czas: 6 },    // 6 minut
    { id: '1332399570872832151', czas: 120 },  // 2 godziny = 120 minut
    { id: '1286351421691793466', czas: 60 },   // 1 godzina = 60 minut
];

const duzaReklama = `
🌊Zatoka Bots&Host – Twój port dla botów i hostingu Discord! 🌊

🤔 Szukasz miejsca, gdzie możesz stworzyć własnego bota Discord albo potrzebujesz solidnego hostingu w dobrej cenie?
U nas znajdziesz wszystko, czego potrzebujesz – łatwo, szybko i tanio! 🚀

🔹 Co oferujemy?

➤ Tworzenie botów Discord na zamówienie – spełniamy Twoje pomysły, od prostych funkcji po rozbudowane systemy!
➤ Hosting botów Discord – stabilny, szybki, 24/7 bez żadnych przerw!
➤ Niskie ceny – elastyczne pakiety dostępne na każdą kieszeń.
➤ 3 dni próbne za darmo – przetestuj nas bez ryzyka!
➤ 2 tygodnie na reklamację – Twoje zadowolenie jest dla nas priorytetem.
➤ Dropy i promocje – regularne eventy z nagrodami i zniżkami na usługi!
➤ Strefa zabawy – mini-gry, konkursy i eventy na naszym serwerze!

🌟 Dlaczego właśnie Zatoka Bots&Host?
• Szybkie i profesjonalne wykonanie usług
• Pełne wsparcie i pomoc techniczna
• Stały monitoring usług i aktualizacje
• Przyjazna społeczność i świetna atmosfera
• Realne możliwości rozwoju Twoich projektów

ℹ️ Dołącz do naszej Zatoki i poczuj różnicę! Rozwijaj swoje pomysły, baw się dobrze i korzystaj z najlepszych warunków na rynku!

📩 Zapraszamy: https://discord.gg/TEZ6auew7U
📢 Potrzebujesz więcej informacji? Nasz support czeka na Twoją wiadomość!
`;

const wiadomoscPartnerstwo = '# Szukam partnerstw. Napisz pv jeśli chcesz! 🌊🦜';

client.once('ready', () => {
    console.log(`✅ Bot zalogowany jako ${client.user.tag}`);

    // Automatyczne wysyłanie dużych reklam
    reklamoweKanaly.forEach(({ id, czas }) => {
        setInterval(async () => {
            const channel = await client.channels.fetch(id).catch(() => null);
            if (channel) {
                channel.send(duzaReklama);
            }
        }, czas * 60 * 1000);
    });

    // Automatyczne wysyłanie wiadomości o szukaniu partnerstw
    partnerstwaKanaly.forEach(({ id, czas }) => {
        setInterval(async () => {
            const channel = await client.channels.fetch(id).catch(() => null);
            if (channel) {
                channel.send(wiadomoscPartnerstwo);
            }
        }, czas * 60 * 1000);
    });
});

// System partnerstw DM
client.on('messageCreate', async (message) => {
    if (message.author.bot) return;

    // Jeśli to DM
    if (message.channel.type === 1) {
        if (!message.channel.partnerSession) {
            message.channel.partnerSession = {
                krok: 'oczekiwanie_na_reklame'
            };
            await message.channel.send('# Hejka! wyślij tutaj swoją reklamę (maksymalnie 1 serwer 🌐.)');
            return;
        }

        const session = message.channel.partnerSession;

        if (session.krok === 'oczekiwanie_na_reklame') {
            await message.channel.send('> Dziękujemy za reklamę! Teraz prosimy o wstawienie naszej reklamy na Twój serwer🤔.');
            await message.channel.send(duzaReklama);
            session.krok = 'oczekiwanie_na_wstawienie';
            return;
        }

        if (session.krok === 'oczekiwanie_na_wstawienie' && message.content.toLowerCase().includes('wstawione')) {
            await message.channel.send('# Czy na Twoim serwerze jest wymagane dołączenie? (tak/nie)');
            session.krok = 'oczekiwanie_na_wymaganie';
            return;
        }

        if (session.krok === 'oczekiwanie_na_wymaganie') {
            if (message.content.toLowerCase() === 'tak') {
                const adminUser = await client.users.fetch(adminId);
                await adminUser.send(`⚠️ Partnerstwo z wymaganym dołączeniem: ${message.author.tag}`);
                await message.channel.send('Dzięki i życzę miłego dnia! Powiadomiliśmy administrację o wymaganym dołączeniu! Admin będzie próbował jak najszybciej dołączyć!.');
            } else {
                await message.channel.send(' # Dzięki za informację!');
            }
            delete message.channel.partnerSession; // Reset
        }
    }
});

client.login(process.env.TOKEN);

