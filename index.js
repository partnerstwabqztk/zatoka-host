const { Client, Intents } = require('discord.js-selfbot-v13');
const express = require('express');
const app = express();
const PORT = 8080;

const client = new Client({
  checkUpdate: false,
  intents: [Intents.FLAGS.DIRECT_MESSAGES, Intents.FLAGS.GUILDS],
});

app.get('/', (req, res) => {
  res.send('Self-bot działa na Render! 🚀');
});

app.listen(PORT, () => {
  console.log(`Serwer pingujący działa na porcie ${PORT}`);
});

const serverAd = `
🎨 **X-West Official Studios - Twoje miejsce na profesjonalne grafiki i więcej!** 🎨  

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

🎨 **X-West Official Studios – Twoje pomysły, nasza pasja!** 🎨 NASZA REKLAMA
`;

const channelIds = {
  reklama11m1: '1346609262356463736',
  reklama2h: '1346609266987110451',
  reklama11m2: '1348329636056268911',
  reklama11m3: '1346609268375158834',
  reklama11m4: '1346609270933946490',
  reklama11m5: '1346609275761332325',
  reklama11m6: '1346609280291442708',
  reklama11m7: '1346609283932094529',
  reklama11m8: '1346609287048204378',
  reklama16m1: '1346609290332602420',
  reklama16m2: '1347263942975557633',
  reklama11m9: '1346609292425429194',
  reklama16m3: '1346609318476255293',
  reklama30m: '1346609317335531632',
  reklama1h: '1346609316190486528',
  reklama2h2: '1346609314927743047',
  reklama4h: '1346609313329971293',
  reklama6h: '1346609312042324060',
  zapytaniePartnerstwo: '1346609247869337701'
};

client.once('ready', () => {
  console.log(`Bot ${client.user.tag} jest gotowy.`);

  // Wysyłanie reklam co określony czas na różne kanały
  setInterval(async () => {
    for (let i = 1; i <= 9; i++) {
      const channel = client.channels.cache.get(channelIds[`reklama11m${i}`]);
      if (channel) await channel.send(serverAd);
    }
  }, 11 * 60 * 1000); // Co 11 minut

  setInterval(async () => {
    const channel = client.channels.cache.get(channelIds.reklama2h);
    if (channel) await channel.send(serverAd);
  }, 2 * 60 * 60 * 1000); // Co 2 godziny

  setInterval(async () => {
    const channel = client.channels.cache.get(channelIds.reklama16m1);
    if (channel) await channel.send(serverAd);
  }, 16 * 60 * 1000); // Co 16 minut

  setInterval(async () => {
    const channel = client.channels.cache.get(channelIds.reklama16m2);
    if (channel) await channel.send(serverAd);
  }, 16 * 60 * 1000);

  setInterval(async () => {
    const channel = client.channels.cache.get(channelIds.reklama11m9);
    if (channel) await channel.send(serverAd);
  }, 11 * 60 * 1000); // Co 11 minut

  setInterval(async () => {
    const channel = client.channels.cache.get(channelIds.reklama30m);
    if (channel) await channel.send(serverAd);
  }, 30 * 60 * 1000); // Co 30 minut

  setInterval(async () => {
    const channel = client.channels.cache.get(channelIds.reklama1h);
    if (channel) await channel.send(serverAd);
  }, 60 * 60 * 1000); // Co 1 godzinę

  setInterval(async () => {
    const channel = client.channels.cache.get(channelIds.reklama2h2);
    if (channel) await channel.send(serverAd);
  }, 2 * 60 * 60 * 1000); // Co 2 godziny

  setInterval(async () => {
    const channel = client.channels.cache.get(channelIds.reklama4h);
    if (channel) await channel.send(serverAd);
  }, 4 * 60 * 60 * 1000); // Co 4 godziny

  setInterval(async () => {
    const channel = client.channels.cache.get(channelIds.reklama6h);
    if (channel) await channel.send(serverAd);
  }, 6 * 60 * 60 * 1000); // Co 6 godzin

  // Zapytanie o partnerstwo co 6 minut
  setInterval(async () => {
    const channel = client.channels.cache.get(channelIds.zapytaniePartnerstwo);
    if (channel) await channel.send('# Masz serwer i szukasz partnerstw? Wbijaj PV!');
  }, 6 * 60 * 1000); // Co 6 minut
});

const respondedUsers = new Set(); // lista kto już dostał odpowiedź

client.on('messageCreate', async (message) => {
  if (message.author.bot) return; // ignoruj boty
  if (message.author.id === client.user.id) return; // ignoruj siebie

  if (message.channel.type === 'DM') {
    try {
      // jeśli już odpowiedziano temu userowi, to nic nie rób
      if (respondedUsers.has(message.author.id)) return;

      if (message.content.toLowerCase() === 'tak') {
        await message.reply('❤️ Dziękujemy za nawiązanie partnerstwa!\n✅ Twoja reklama została wstawiona na <#1334989910091759778>\n🖱️ Kliknij [TUTAJ](https://discord.com/channels/1328172859222134844/1328182722937753692) aby przejść do twojego partnerstwa!\n🔔 Pamiętaj że wyjście z serwera spowoduje automatyczne usunięcie reklamy!');
      } else {
        // automatycznie na każde pierwsze wiadomości
        await message.reply('🌎 Witaj! Jeśli chcesz nawiązać partnerstwo, wyślij proszę swoją reklamę (maksymalnie 1 serwer).');
      }

      respondedUsers.add(message.author.id); // zapamiętaj że odpowiedziano
    } catch (error) {
      console.error('Błąd przy wysyłaniu wiadomości DM:', error.message);
    }
  }
});


const client = new Client({
  checkUpdate: false,
  intents: [Intents.FLAGS.DIRECT_MESSAGES, Intents.FLAGS.GUILDS],
});

app.get('/', (req, res) => {
  res.send('Self-bot działa na Render! 🚀');
});

app.listen(PORT, () => {
  console.log(`Serwer pingujący działa na porcie ${PORT}`);
});

const serverAd = `
🎨 **X-West Official Studios - Twoje miejsce na profesjonalne grafiki i więcej!** 🎨  

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

🎨 **X-West Official Studios – Twoje pomysły, nasza pasja!** 🎨 NASZA REKLAMA
`;

const channelIds = {
  reklama11m1: '1346609262356463736',
  reklama2h: '1346609266987110451',
  reklama11m2: '1348329636056268911',
  reklama11m3: '1346609268375158834',
  reklama11m4: '1346609270933946490',
  reklama11m5: '1346609275761332325',
  reklama11m6: '1346609280291442708',
  reklama11m7: '1346609283932094529',
  reklama11m8: '1346609287048204378',
  reklama16m1: '1346609290332602420',
  reklama16m2: '1347263942975557633',
  reklama11m9: '1346609292425429194',
  reklama16m3: '1346609318476255293',
  reklama30m: '1346609317335531632',
  reklama1h: '1346609316190486528',
  reklama2h2: '1346609314927743047',
  reklama4h: '1346609313329971293',
  reklama6h: '1346609312042324060',
  zapytaniePartnerstwo: '1346609247869337701'
};

client.once('ready', () => {
  console.log(`Bot ${client.user.tag} jest gotowy.`);

  // Wysyłanie reklam co określony czas na różne kanały
  setInterval(async () => {
    for (let i = 1; i <= 9; i++) {
      const channel = client.channels.cache.get(channelIds[`reklama11m${i}`]);
      if (channel) await channel.send(serverAd);
    }
  }, 11 * 60 * 1000); // Co 11 minut

  setInterval(async () => {
    const channel = client.channels.cache.get(channelIds.reklama2h);
    if (channel) await channel.send(serverAd);
  }, 2 * 60 * 60 * 1000); // Co 2 godziny

  setInterval(async () => {
    const channel = client.channels.cache.get(channelIds.reklama16m1);
    if (channel) await channel.send(serverAd);
  }, 16 * 60 * 1000); // Co 16 minut

  setInterval(async () => {
    const channel = client.channels.cache.get(channelIds.reklama16m2);
    if (channel) await channel.send(serverAd);
  }, 16 * 60 * 1000);

  setInterval(async () => {
    const channel = client.channels.cache.get(channelIds.reklama11m9);
    if (channel) await channel.send(serverAd);
  }, 11 * 60 * 1000); // Co 11 minut

  setInterval(async () => {
    const channel = client.channels.cache.get(channelIds.reklama30m);
    if (channel) await channel.send(serverAd);
  }, 30 * 60 * 1000); // Co 30 minut

  setInterval(async () => {
    const channel = client.channels.cache.get(channelIds.reklama1h);
    if (channel) await channel.send(serverAd);
  }, 60 * 60 * 1000); // Co 1 godzinę

  setInterval(async () => {
    const channel = client.channels.cache.get(channelIds.reklama2h2);
    if (channel) await channel.send(serverAd);
  }, 2 * 60 * 60 * 1000); // Co 2 godziny

  setInterval(async () => {
    const channel = client.channels.cache.get(channelIds.reklama4h);
    if (channel) await channel.send(serverAd);
  }, 4 * 60 * 60 * 1000); // Co 4 godziny

  setInterval(async () => {
    const channel = client.channels.cache.get(channelIds.reklama6h);
    if (channel) await channel.send(serverAd);
  }, 6 * 60 * 60 * 1000); // Co 6 godzin

  // Zapytanie o partnerstwo co 6 minut
  setInterval(async () => {
    const channel = client.channels.cache.get(channelIds.zapytaniePartnerstwo);
    if (channel) await channel.send('# Masz serwer i szukasz partnerstw? Wbijaj PV!');
  }, 6 * 60 * 1000); // Co 6 minut
});

const respondedUsers = new Set(); // lista kto już dostał odpowiedź

client.on('messageCreate', async (message) => {
  if (message.author.bot) return; // ignoruj boty
  if (message.author.id === client.user.id) return; // ignoruj siebie

  if (message.channel.type === 'DM') {
    try {
      // jeśli już odpowiedziano temu userowi, to nic nie rób
      if (respondedUsers.has(message.author.id)) return;

      if (message.content.toLowerCase() === 'tak') {
        await message.reply('❤️ Dziękujemy za nawiązanie partnerstwa!\n✅ Twoja reklama została wstawiona na <#1334989910091759778>\n🖱️ Kliknij [TUTAJ](https://discord.com/channels/1328172859222134844/1328182722937753692) aby przejść do twojego partnerstwa!\n🔔 Pamiętaj że wyjście z serwera spowoduje automatyczne usunięcie reklamy!');
      } else {
        // automatycznie na każde pierwsze wiadomości
        await message.reply('🌎 Witaj! Jeśli chcesz nawiązać partnerstwo, wyślij proszę swoją reklamę (maksymalnie 1 serwer).');
      }

      respondedUsers.add(message.author.id); // zapamiętaj że odpowiedziano
    } catch (error) {
      console.error('Błąd przy wysyłaniu wiadomości DM:', error.message);
    }
  }
});

client.login(process.env.TOKEN);
