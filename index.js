const { Client, Intents, MessageEmbed } = require('discord.js-selfbot-v13');
const express = require('express');
const app = express();
const PORT = 8080;

const client = new Client({
  checkUpdate: false,
});

app.get('/', (req, res) => {
  res.send('Self-bot działa na Render! 🚀');
});

app.listen(PORT, () => {
  console.log(`Serwer pingujący działa na porcie ${PORT}`);
});

// Reklama serwera
const serverAd = `
# 🎨 **X-West Official Studios - Twoje miejsce na profesjonalne grafiki i więcej!** 🎨  

🌟 **Potrzebujesz grafiki, bota Discord, czy strony internetowej? My to zrobimy!**  

### Co oferujemy:  
- **🎨 Kreatywne projekty graficzne** – Logo, branding, grafiki do social media i więcej.  
- **🤖 Boty Discord** – Tworzymy boty dostosowane do Twoich potrzeb: zarządzanie, rozrywka, automatyzacja.  
- **🌐 Strony internetowe** – Profesjonalne projekty, responsywny design, zgodność z Twoją wizją.  
- **⚡ Szybko i profesjonalnie** – Gwarancja jakości i terminowości.  
- **💬 Indywidualne podejście** – Tworzymy wszystko zgodnie z Twoimi oczekiwaniami.  
- **🌈 Szeroka oferta** – Od prostych grafik po zaawansowane projekty 3D i kompleksowe systemy.  

### Dlaczego my:  
- **🌟 Doświadczenie** – Setki udanych projektów i zadowolonych klientów.  
- **⚡ Nowoczesne rozwiązania** – Innowacyjność i unikalność na pierwszym miejscu.  
- **💬 Współpraca na każdym etapie** – Twoje pomysły, nasza realizacja.  

👉 **Chcesz się wyróżnić? Dołącz teraz!**  
[Link do serwera](https://discord.gg/CwVrjqqhmJ)  
https://discord.gg/CwVrjqqhmJ  
https://media.discordapp.net/attachments/1327529385611493447/1340104080818962443/reklama.png?ex=67b124ae&is=67afd32e&hm=4b586733bbb88251125e8ddfff59d15fab3443edfa675ee5135a5b6b51352698&=&format=webp&quality=lossless

🎨 **X-West Official Studios – Twoje pomysły, nasza pasja!** 🎨
`;

const partneringUsers = new Map();
const partnershipTimestamps = new Map();

// ID kanałów
const channelId_partnerstwa = '1346609247869337701';
const channelId_global = '1348329636056268911';
const zimoweall = '1346609268375158834';
const fourhrs = '1346609313329971293';
const zeroToHundred = '1346609263681732710';
const zimowe6h = '1346609312042324060';
const twohrs = '1346609314927743047';
const onehr = '1346609316190486528';
const thirtymin = '1346609317335531632';
const fifteenmin = '1346609318476255293';
const onemin = '1346609319877279794';
const miastoAds = '1254165815071342602';
const miastopartnerstwa = '1332399570872832151';
const miastoall = '1254165638331502653';
const miasto6h = '1254123088103346247';
const miasto2gdz = '1254163564264947782';
const zeroToOneHundred_2h = '1254162168899960883';

client.once('ready', () => {
  console.log(`Bot ${client.user.tag} jest gotowy.`);
  
  // Interwały reklamowe
  setInterval(async () => {
    const channel = client.channels.cache.get(channelId_partnerstwa);
    if (channel) await channel.send('# Szukam partnerstw dowolne serwery! Zapraszam pv');
  }, 5 * 60 * 1000);

  setInterval(async () => {
    const channel = client.channels.cache.get(onemin);
    if (channel) await channel.send(serverAd);
  }, 2.5 * 60 * 1000);

  setInterval(async () => {
    const g = client.channels.cache.get(channelId_global);
    const z = client.channels.cache.get(zimoweall);
    const zth = client.channels.cache.get(zeroToHundred);
    if (g && z && zth) {
      await g.send(serverAd);
      await z.send(serverAd);
      await zth.send(serverAd);
    }
  }, 10 * 60 * 1000);

  setInterval(async () => {
    const channel = client.channels.cache.get(fifteenmin);
    if (channel) await channel.send(serverAd);
  }, 15 * 60 * 1000);

  setInterval(async () => {
    const channel = client.channels.cache.get(thirtymin);
    if (channel) await channel.send(serverAd);
  }, 30 * 60 * 1000);

  setInterval(async () => {
    const channel = client.channels.cache.get(onehr);
    if (channel) await channel.send(serverAd);
  }, 1 * 60 * 60 * 1000);

  setInterval(async () => {
    const channel = client.channels.cache.get(twohrs);
    if (channel) await channel.send(serverAd);
  }, 2 * 60 * 60 * 1000);

  setInterval(async () => {
    const channel = client.channels.cache.get(fourhrs);
    if (channel) await channel.send(serverAd);
  }, 4 * 60 * 60 * 1000);

  setInterval(async () => {
    const channel = client.channels.cache.get(miastopartnerstwa);
    if (channel) await channel.send('# Partnerstwo? PV!');
  }, 2 * 60 * 60 * 1000);

  setInterval(async () => {
    const channel = client.channels.cache.get(miastoall);
    if (channel) await channel.send(serverAd);
  }, 2 * 60 * 60 * 1000);

  setInterval(async () => {
    const channel = client.channels.cache.get(miasto6h);
    if (channel) await channel.send(serverAd);
  }, 6 * 60 * 60 * 1000);

  setInterval(async () => {
    const channel = client.channels.cache.get(miasto2gdz);
    if (channel) await channel.send(serverAd);
  }, 2 * 60 * 60 * 1000);

  setInterval(async () => {
    const channel = client.channels.cache.get(zeroToOneHundred_2h);
    if (channel) await channel.send(serverAd);
  }, 2 * 60 * 60 * 1000);

client.on('messageCreate', async (message) => {
  if (!message.guild && !message.author.bot && message.author.id !== client.user.id) {
    const now = Date.now();
    const last = partnershipTimestamps.get(message.author.id);

    if (last && now - last < 7 * 24 * 60 * 60 * 1000) {
      return message.channel.send("⏳ Musisz jeszcze poczekać, zanim będziesz mógł nawiązać kolejne partnerstwo. Spróbuj ponownie za tydzień.");
    }

    if (!partneringUsers.has(message.author.id)) {
      partneringUsers.set(message.author.id, null);
      return message.channel.send("🌎 Jeśli chcesz nawiązać partnerstwo, wyślij swoją reklamę (maksymalnie 1 serwer).");
    }

    const userAd = partneringUsers.get(message.author.id);

    if (userAd === null) {
      partneringUsers.set(message.author.id, message.content);
      await message.channel.send(`✅ Wstaw naszą reklamę:\n${serverAd}`);
      return message.channel.send("⏰ Daj znać, gdy wstawisz reklamę!");
    }

    if (message.content.toLowerCase().includes('wstawi') || message.content.toLowerCase().includes('już') || message.content.toLowerCase().includes('gotowe') || message.content.toLowerCase().includes('juz')) {
      await message.channel.send("Czy wymagane jest dołączenie na twój serwer?");

      const filter = m => m.author.id === message.author.id;
      const reply = await message.channel.awaitMessages({ filter, max: 1, time: 60000, errors: ['time'] }).catch(() => null);

      if (reply && !reply.first().content.toLowerCase().includes('nie')) {
        await message.channel.send("Mój właściciel @bqztk za niedługo na pewno dołączy do twojego serwera.");
        const owner = await client.users.fetch('1087428851036082266');
        await owner.send(`Wymagane dołączenie na serwer:\n${userAd}`);
      }

      const guild = client.guilds.cache.get('1363565181048983562');
      if (!guild) return message.channel.send("❕ Nie znaleziono serwera.");

      const member = await guild.members.fetch(message.author.id).catch(() => null);
      if (!member) return message.channel.send("❕ Dołącz na serwer, aby kontynuować!");

      const channel = guild.channels.cache.find(ch => ch.name === '💼・partnerstwa' && ch.isText());
      if (!channel) return message.channel.send("Nie znaleziono kanału '💼・partnerstwa'.");

      await channel.send(`${userAd}\n\nPartnerstwo z: ${member}`);
      await message.channel.send("✅ Dziękujemy za partnerstwo! W razie pytań kontaktuj się z użytkownikiem @bqrzk (bqrzk)");

      partnershipTimestamps.set(message.author.id, now);
      partneringUsers.delete(message.author.id);
    }
  }
});

client.on('guildMemberAdd', async (member) => {
  if (partneringUsers.has(member.id)) {
    const userAd = partneringUsers.get(member.id);
    const channel = member.guild.channels.cache.find(ch => ch.name === '💼・partnerstwa' && ch.isText());
    if (channel) {
      await channel.send(`${userAd}\n\nPartnerstwo z: ${member}`);
      const dm = await member.createDM();
      await dm.send("✅ Dziękujemy za dołączenie! Twoja reklama została wstawiona.");
      partneringUsers.delete(member.id);
      partnershipTimestamps.set(member.id, Date.now());
    }
  }
});

client.on('error', (error) => {
  console.error('Błąd Discorda:', error);
});

process.on('unhandledRejection', (error) => {
  console.error('Nieobsłużony błąd:', error);
});

client.login(process.env.DISCORD_TOKEN);
