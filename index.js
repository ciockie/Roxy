const fs = require('fs');
const Discord = require('discord.js');
const { prefix, token } = require('./config.json');
const moment = require('moment')
const CronJob = require('cron').CronJob;
const client = new Discord.Client();
client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

var job = new CronJob('* * * * * *', function() {
	console.log('You will see this message every second');
  }, null, false, 'America/Los_Angeles');

const DDMMYYY_HHMMSS = 'YYYY-MM-DD HH:MM:SS'
for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}

client.once('ready', () => {
	console.log(`[${moment().format(DDMMYYY_HHMMSS)}]=> Ready!`);
	//channel_log = client.channels.cache.find(x => x.id == '809972566852370432');
	//channel_log.send(`Roxy Migurdia - ロキシ has started , <@276302139276394496> Please start autorole by type \`;autorole start\` in \`MapleSEA Aquila Buys And Trades\` Server`)
});

client.on('message', async message => {

    if (!message.content.startsWith(prefix) || message.author.bot) return;
	const args = message.content.slice(prefix.length).trim().split(/ +/);
	const command = args.shift().toLowerCase();
	//console.log(args)
	if (!client.commands.has(command)) return;

	try {
		client.commands.get(command).execute(message, args, client, job);
	} catch (error) {
		console.error(error);
		message.reply('there was an error trying to execute that command!');
	}
});

client.on("guildMemberAdd", (member) => {
	console.log(`[${moment().format(DDMMYYY_HHMMSS)}]=> ${member.id} Joined Server`);
  });

client.login(token);
