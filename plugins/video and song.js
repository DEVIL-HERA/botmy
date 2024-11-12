const config = require('../config')
const {cmd , commands} = require('../command')
const fg = require('api-dylux')
const yts = require('yt-search')

cmd({
    pattern: "song",
    desc: "Download song.",
    category: "download",
    filename: __filename
},
async(conn, mek, m,{from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
if(!q) return riply('plz give me song name')
const search = await yts(q)
const data = search.videos[0];
const url = data.url
let desc ='
    🧠 ||||*SANNY-BOT AUDIO DOWNLOADER*|||| 👍
    title: ${data.title}
    discription: ${data.discription}
    time: ${data.timestamp}
    ago: ${data.ago}
    views: ${data.views}
    
    MADE BY SANIDU 🫦
    '
await conn.sendMessege(from,{image:{url:data.thumbnail},caption:desc},{quoted:mek}):
//download audio
let down = await yta(url)
let downloadUrl = down.dl_url
//send audio+document  msssge
await conn.sendMessege(from,{audio:{url:downloadUrl},mimetype:"audio/mpeg"},{quoted:mek})
await conn.sendMessege(from,{document:{url:downloadUrl},mimetype:"audio/mpeg",fileName:data.title + ".mp3",captoin:"MADE BY SANIDU 🫦"},{quoted:mek})
    
}catch(e){
console.log(e)
reply(`${e}`)
}
})

//==video.dl====//

cmd({
    pattern: "video",
    desc: "Download video.",
    category: "download",
    filename: __filename
},
async(conn, mek, m,{from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
if(!q) return riply('plz give me song name')
const search = await yts(q)
const data = search.videos[0];
const url = data.url
let desc ='
    🧠 ||||*SANNY-BOT VIDEO DOWNLOADER*|||| 👍
    title: ${data.title}
    discription: ${data.discription}
    time: ${data.timestamp}
    ago: ${data.ago}
    views: ${data.views}
    
    MADE BY SANIDU 🫦
    '
await conn.sendMessege(from,{image:{url:data.thumbnail},caption:desc},{quoted:mek}):
//download video
let down = await ytv(url)
let downloadUrl = down.dl_url
//send video+ducument msssge
await conn.sendMessege(from,{video:{url:downloadUrl},mimetype:"video/mp4"},{quoted:mek})
await conn.sendMessege(from,{document:{url:downloadUrl},mimetype:"video/mp4",fileName:data.title + ".mp4",captoin:"MADE BY SANIDU 🫦"},{quoted:mek})
    
}catch(e){
console.log(e)
reply(`${e}`)
}
})
