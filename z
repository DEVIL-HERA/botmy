require('dotenv').config(); // Load environment variables from .env file

const {
  default: makeWASocket,
  useMultiFileAuthState,
  DisconnectReason,
  jidNormalizedUser,
  getContentType,
  fetchLatestBaileysVersion,
  Browsers
} = require('@whiskeysockets/baileys');

const { getBuffer, getGroupAdmins, getRandom, h2k, isUrl, Json, runtime, sleep, fetchJson } = require('./lib/functions');
const mongoose = require('mongoose');
const fs = require('fs');
const P = require('pino');
const config = require('./config');
const qrcode = require('qrcode-terminal');
const util = require('util');
const { sms, downloadMediaMessage } = require('./lib/msg');
const axios = require('axios');
const { File } = require('megajs');
const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

const ownerNumber = ['94706075447'];

// MongoDB connection
async function connectDB() {
  const dbURI = process.env.MONGO_URI || 'mongodb://mongo:wsaVqtadmqwGhIPQrrSgHMjqqDHpExDl@autorack.proxy.rlwy.net:29925';
  
  try {
    await mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log("MongoDB connected successfully!");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);  // Exit the app if DB connection fails
  }
}

//===================SESSION-AUTH============================
if (!fs.existsSync(__dirname + '/auth_info_baileys/creds.json')) {
  if (!config.SESSION_ID) return console.log('Please add your session to SESSION_ID env !!');
  
  const sessdata = config.SESSION_ID;
  const filer = File.fromURL(`https://mega.nz/file/${sessdata}`);
  filer.download((err, data) => {
    if (err) {
      console.error("Error downloading session data from Mega:", err);
      return;
    }
    
    fs.writeFile(__dirname + '/auth_info_baileys/creds.json', data, (writeErr) => {
      if (writeErr) {
        console.error("Error writing session data to file:", writeErr);
        return;
      }
      console.log("Session downloaded ✅");
    });
  });
}

// Connect to WhatsApp
async function connectToWA() {
  await connectDB();  // Ensure DB connection is established before continuing

  const { readEnv } = require('./lib/database');
  const config = await readEnv(' ');  // Ensure ' ' is correct or remove if not needed
  const prefix = config.PREFIX;
  
  console.log("Connecting sani bot 🧬...");
  const { state, saveCreds } = await useMultiFileAuthState(__dirname + '/auth_info_baileys/');

  const { version } = await fetchLatestBaileysVersion();
  const conn = makeWASocket({
    logger: P({ level: 'silent' }),
    printQRInTerminal: false,
    browser: Browsers.macOS("chrome"),
    syncFullHistory: true,
    auth: state,
    version
  });

  conn.ev.on('connection.update', (update) => {
    const { connection, lastDisconnect } = update;
    if (connection === 'close') {
      if (lastDisconnect.error.output.statusCode !== DisconnectReason.loggedOut) {
        connectToWA();
      }
    } else if (connection === 'open') {
      console.log('Bot connected successfully ✅');
      const ownerJid = ownerNumber[0] + "@s.whatsapp.net";
      const up = `Sanidu-BOT connected successfully ✅\n\nPREFIX: ${prefix}`;
      conn.sendMessage(ownerJid, { image: { url: `https://telegra.ph/file/900435c6d3157c98c3c88.jpg` }, caption: up });
    }
  });

  conn.ev.on('creds.update', saveCreds);

  // Handle incoming messages
  conn.ev.on('messages.upsert', async (mek) => {
    if (!mek || !mek.messages || !mek.messages[0]) return;
    mek = mek.messages[0];
    if (!mek.message) return;

    mek.message = (getContentType(mek.message) === 'ephemeralMessage') ? mek.message.ephemeralMessage.message : mek.message;
    const m = sms(conn, mek);
    const type = getContentType(mek.message);
    const body = (type === 'conversation') ? mek.message.conversation : 
                 (type === 'extendedTextMessage') ? mek.message.extendedTextMessage.text :
                 (type === 'imageMessage') && mek.message.imageMessage.caption ? mek.message.imageMessage.caption :
                 (type === 'videoMessage') && mek.message.videoMessage.caption ? mek.message.videoMessage.caption : '';
    const isCmd = body.startsWith(prefix);
    const command = isCmd ? body.slice(prefix.length).trim().split(' ').shift().toLowerCase() : '';
    const args = body.trim().split(/ +/).slice(1);
    const q = args.join(' ');

    // Additional command and event handling here...
  });

  // Start Express server
  app.listen(port, () => console.log(`Listening on port ${port}`));
}

connectToWA();
