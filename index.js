const fs = require('fs');
const Discord = require('discord.js');
const { prefix, token } = require('./config.json');
const moment = require('moment')
const client = new Discord.Client();
client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

const DDMMYYY_HHMMSS = 'YYYY-MM-DD HH:MM:SS'
for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}

client.once('ready', () => {
	console.log(`[${moment().format(DDMMYYY_HHMMSS)}]=> Ready!`);
	genick();
});

function genick() {
	console.log(client.users.cache);
}

client.on('message', message => {

    if (!message.content.startsWith(prefix) || message.author.bot) return;
	const args = message.content.slice(prefix.length).trim().split(/ +/);
	const command = args.shift().toLowerCase();
	if(command === 'test') {
        message.channel.send("Reply")
	}
});

client.on("guildMemberAdd", (member) => {
	
	console.log(member.guild.id);

  });

client.login(token);