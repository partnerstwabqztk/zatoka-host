// 📦 WYMAGANE PACZKI
const { Client } = require('discord.js-selfbot-v13');
const express = require('express');
const app = express();
const PORT = process.env.PORT || 8080;

// 🔥 EXPRESS - żeby Render trzymał bota aktywnego
app.get('/', (req, res) => {
  res.send('Self-bot działa na Render! 🚀');
});
app.listen(PORT, () => {
  console.log(`🌐 Serwer Express działa na porcie ${PORT}`);
});

// 🤖 TWORZENIE KLIENTA DISCORD
const client = new Client({ checkUpdate: false });

// 🌊 TWOJA REKLAMA - Zatoka Bots&Host
const serverAd = `
# 🌊 Zatoka Bots&Host – Twój port dla botów i hostingu Discord! 🌊

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

ℹ️ Dołącz do naszej Zatoki i poczuj różnicę!

📩 Zapraszamy: https://discord.gg/TEZ6auew7U
📢 Potrzebujesz więcej informacji? Nasz support czeka na Twoją wiadomość!
`;

// ✉️ KRÓTKA WIADOMOŚĆ PARTNERSTWOWA
const partnerMessage = '# Szukam Partnerstw. Wbijaj PV!';

// 📢 TWOJE KANAŁY
const channels = {
  zimowe: {
    shops: '1346609275761332325',
    hosting: '1347263942975557633',
    programing: '1346609292425429194',
    partnerstwa: '1346609247869337701'
  },
  miasto: {
    partnerstwa: '1332399570872832151'
  },
  hyper: {
    hyperpartners: '1286351421691793466'
  }
};

// 📋 FUNKCJE WYSYŁANIA

async function sendAd(channelId) {
  try {
    let channel = client.channels.cache.get(channelId) || await client.channels.fetch(channelId);
    if (!channel) return console.error(`❌ Nie znaleziono kanału ${channelId}`);
    await channel.send(serverAd);
    console.log(`✅ Wysłano reklamę na ${channel.name}`);
  } catch (error) {
    console.error(`❌ Błąd przy wysyłaniu reklamy:`, error);
  }
}

async function sendPartnerInvite(channelId) {
  try {
    let channel = client.channels.cache.get(channelId) || await client.channels.fetch(channelId);
    if (!channel) return console.error(`❌ Nie znaleziono kanału ${channelId}`);
    await channel.send(partnerMessage);
    console.log(`✅ Wysłano partnerstwo na ${channel.name}`);
  } catch (error) {
    console.error(`❌ Błąd przy wysyłaniu partnerstwa:`, error);
  }
}

function startSendingAds() {
  // Reklamy na zimowe co 6 minut
  setInterval(() => {
    sendAd(channels.zimowe.shops);
    sendAd(channels.zimowe.hosting);
    sendAd(channels.zimowe.programing);
  }, 6 * 60 * 1000);

  // Reklama na hyper co 1 godzinę
  setInterval(() => {
    sendAd(channels.hyper.hyperpartners);
  }, 1 * 60 * 60 * 1000);

  // Reklama na miasto co 2 godziny
  setInterval(() => {
    sendAd(channels.miasto.partnerstwa);
  }, 2 * 60 * 60 * 1000);
}

function startSendingPartnerInvites() {
  // Partnerstwo na zimowe co 6 minut
  setInterval(() => {
    sendPartnerInvite(channels.zimowe.partnerstwa);
  }, 6 * 60 * 1000);

  // Partnerstwo na miasto co 2 godziny
  setInterval(() => {
    sendPartnerInvite(channels.miasto.partnerstwa);
  }, 2 * 60 * 60 * 1000);

  // Partnerstwo na hyper co 1 godzinę
  setInterval(() => {
    sendPartnerInvite(channels.hyper.hyperpartners);
  }, 1 * 60 * 60 * 1000);
}

// 🚀 READY
client.once('ready', async () => {
  console.log(`✅ Zalogowano jako ${client.user.tag}`);
  startSendingAds();
  startSendingPartnerInvites();
});

// 🔑 LOGOWANIE
client.login(process.env.DISCORD_TOKEN);
