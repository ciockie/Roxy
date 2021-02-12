const fs = require('fs');
const Discord = require('discord.js');
const { prefix, token, serverid, channid } = require('./config.json');
const moment = require('moment')
const CronJob = require('cron').CronJob;
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
});

async function getnick() {
	//let list = client.guilds.cache.get(serverid)
	//console.log(list)

	const list =  new Promise((resolve, reject) => {
		if(client.guilds.cache.get(serverid) !== undefined) {
			resolve(client.guilds.cache.get(serverid))
		} else if (client.guilds.cache.get(channid) !== undefined) {
			resolve(client.channels.cache.get(channid))
		} else {
			reject(false)
		}
	  });
	return list ;
}

function check_role (member) {
	return !member.roles.cache.has('774574823363837993') &&  //Co-Owner
	!member.roles.cache.has('778505755576762418') && //Admin
	!member.roles.cache.has('778856916927250443') && //Verified Middleman
	!member.roles.cache.has('774894312789901312') && //Guild Master
	!member.roles.cache.has('774892652881117224') && //Verified Service Provider
	!member.roles.cache.has('774892007462010881') && //Verified Seller
	!member.roles.cache.has('778532539287207956') //Regular Member
}

function check_role_test (member) {
	return !member.roles.cache.has('809711730695340042')  //Test
}

client.on('message', async message => {

    if (!message.content.startsWith(prefix) || message.author.bot) return;
	const args = message.content.slice(prefix.length).trim().split(/ +/);
	const command = args.shift().toLowerCase();

	if(command === 'find') {
		let a = await getnick();
		let str = [];
		if(a != false) {
			//message.channel.send("Reply")
			var serverlist = ["Aquila", "aquila"]
			a.members.cache.forEach(member => {
				if(check_role(member)) {
					if(member.displayName.includes('Aquila') || member.displayName.includes('aquila')) {
						//console.log(`${member.displayName} : ${member}`)
						str.push(`${member.displayName} : ${member}\n`)
					}
					//console.log(`${member.displayName} : ${member}`)
				}
		});
		} else {
			message.channel.send('err')
		}

		if(str !== []) {
			message.channel.send(`\`\`\`${str.join('')}\`\`\``)
		}
        
	} else if (command === 'autorole') {
		var job = new CronJob('* 0,30 * * * *', async function() {
			let a = await getnick();
			//console.log(a)
			let str = [];
			if(a != false) {
				//message.channel.send("Reply")
				var serverlist = ["Aquila", "aquila"]
				a.members.cache.forEach(member => {
					if(check_role(member)) {
						if(member.displayName.includes('Aquila') || member.displayName.includes('aquila')) {
							console.log(`${member.displayName} : ${member}`)
							str.push(`${member.displayName} : ${member}\n`)
							let MuteUser = message.guild.members.cache.get(member.id);
							MuteUser.roles.add('809711730695340042');
						}
						//console.log(`${member.displayName} : ${member}`)
					}
				});
				} else {
					message.channel.send('err')
				}
				if(str.length > 0) {
					message.channel.send(`\`\`\`${str.join('')}\`\`\``)
				}
			}, null, true, 'Asia/Singapore');

		if(args[1] === 'start') {
			job.start();
		}
	}
});

client.on("guildMemberAdd", (member) => {
	
	console.log(member.guild.id);

  });

client.login(token);