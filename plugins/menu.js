const {readEnv} = require('../lib/database')
const {cmd , commands} = require('../command')

cmd({
    pattern: "menu",
    desc: "Get Menu list.",
    category: "main",
    filename: __filename
},
async(conn, mek, m,{from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
const config = await readENV():
let menu = {
main: '',
download: '',
group: '',
owner: '',
convert: '',
search: ''
}
for (let i = 0; i < commands.length; i++) {
if (commands[i].pattern && !commands[i].dontAddCommandList) {
menu[commands[i].category] += `${config.PREFIX}${commands[i].pattern}\n`;
 }
}
let madeMenu = ' ✌️ Helow ${pushname}
>download commands ⬇️

${menu.download}
  
>Main commands 🧠

${menu.main}  

>Group commands 🧑🏻‍👩🏻‍👧🏻🧑🏻‍👩🏻‍👧🏻🧑🏻‍👩🏻‍👧🏻

${menu.group}

>Owner commands 🫦

${menu.owner}

>Convert commands 🤷

${menu.convert}

>Search commands 👀

${menu.search}

Powerd by sanidu (●'◡'●)☣️

await conn.sendMessage(from,{image: {url: "config.ALIVE_IMG" },caption: madeMenu},{quoted: mek})



  
}catch(e){
console.log(e)
reply(`${e}`)
}
})
