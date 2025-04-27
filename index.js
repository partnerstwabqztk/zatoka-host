// Łapanie znanych błędów
process.on('uncaughtException', (err) => {
  if (err.message.includes('friend_source_flags') || err.message.includes('Cannot read properties of null') || err.message.includes('ClientUserSettingManager._patch')) {
    console.warn('⚠️ Ostrzeżenie: Znany błąd Discorda. Ignoruję.');
  } else {
    console.error('❌ Błąd krytyczny:', err);
    process.exit(1);
  }
});

const { Client, Intents, MessageEmbed } = require('discord.js-selfbot-v13');
const express = require('express');
const app = express();
const PORT = 8080;
require('dotenv').config();

// Konfiguracja klienta Discord
const client = new Client({
  checkUpdate: false,
});

// Serwer HTTP do utrzymania aktywności na Render
app.get('/', (req, res) => {
  res.send('Self-bot działa na Render! 🚀');
});
app.listen(PORT, () => {
  console.log(`🌐 Serwer pingujący działa na porcie ${PORT}`);
});

// === KONFIGURACJA ===
const adminId = '1087428851036082266'; // Twoje ID do powiadomień
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
  { id: '1346609247869337701', czas: 6 },
  { id: '1332399570872832151', czas: 120 },
  { id: '1286351421691793466', czas: 60 },
];
const kanalReklamowy = '1365679660796612608'; // ID kanału do wrzucania reklam użytkowników

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

// Mapa blokad użytkowników (na 24h)
const blokady = new Map();

// Po zalogowaniu
client.once('ready', () => {
  console.log(`✅ Bot zalogowany jako ${client.user.tag}`);

  // Wysyłanie reklam
  reklamoweKanaly.forEach(({ id, czas }) => {
    setInterval(async () => {
      const channel = await client.channels.fetch(id).catch(() => null);
      if (channel) {
        channel.send(duzaReklama);
      }
    }, czas * 60 * 1000);
  });

  // Wysyłanie wiadomości o partnerstwach
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
  if (message.channel.type !== 1) return; // tylko DM

  if (blokady.has(message.author.id)) {
    await message.channel.send('⛔ Możesz nawiązać kolejne partnerstwo za mniej niż 24h!');
    return;
  }

  if (!message.channel.partnerSession) {
    message.channel.partnerSession = { krok: 'oczekiwanie_na_reklame' };
    await message.channel.send('# Hejka! Wyślij tutaj swoją reklamę (maksymalnie 1 serwer 🌐.)');
    return;
  }

  const session = message.channel.partnerSession;

  if (session.krok === 'oczekiwanie_na_reklame') {
    session.reklamaUzytkownika = message.content;

    await message.channel.send('> Dziękujemy za reklamę! Teraz prosimy o wstawienie naszej reklamy na Twój serwer 🤔.');
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
      await message.channel.send('Dzięki! Powiadomiliśmy administrację! 🛡️');
    } else {
      await message.channel.send('# Dzięki za informację!');
    }

    // Wstawienie reklamy użytkownika na kanał
    const kanal = await client.channels.fetch(kanalReklamowy).catch(() => null);
    if (kanal) {
      kanal.send(`# Reklama od użytkownika ${message.author.tag}\n${session.reklamaUzytkownika}`);
      console.log(`[PARTNERSTWO] Wstawiono reklamę od ${message.author.tag}`);
    }

    await message.channel.send('Miłego dnia! Dziękuję za nawiązane partnerstwo! 🌊');

    blokady.set(message.author.id, Date.now());

    setTimeout(() => {
      blokady.delete(message.author.id);
      message.author.send('🔔 Hej! Możesz już ponownie nawiązać partnerstwo, jeśli chcesz! 🚀').catch(() => {});
    }, 24 * 60 * 60 * 1000); // 24 godziny

    delete message.channel.partnerSession;
  }
});

// Logowanie
client.login(process.env.TOKEN);
