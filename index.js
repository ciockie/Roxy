const fs = require('fs');
const Discord = require('discord.js');
const { prefix, token, serverid, log_chnn, role_id } = require('./config.json');
const moment = require('moment')
const CronJob = require('cron').CronJob;
const check_role = require('./commands/lib/checkrole')
const client = new Discord.Client();
client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

async function getnick() {

	const list =  new Promise((resolve, reject) => {
		if(client.guilds.cache.get(serverid) !== undefined) {
			resolve(client.guilds.cache.get(serverid))
		} else {
			reject(false)
		}
	  });
	return list ;
}

async function set_roles(member) {
    const guild = client.guilds.cache.get(serverid);
    if (!guild) return console.log("Guild not found.");
    let MuteUser = await guild.members.cache.get(member.id)
    //console.log(MuteUser)
    MuteUser.roles.add(role_id);
}

async function remove_roles(member) {
    const guild = client.guilds.cache.get(serverid);
    if (!guild) return console.log("Guild not found.");
    let MuteUser = await guild.members.cache.get(member.id)
    //console.log(MuteUser)
    MuteUser.roles.remove(MuteUser.roles.cache)
}

//0,30
var job = new CronJob('0 0,30 * * * *', async function() {

	let a = await getnick();
        //console.log(a)
        let str = [];
        let remove_list = [];
        if(a != false) {
            a.members.cache.forEach(member => {
                if(check_role(member)) {
                    if(
                        member.displayName.toLowerCase().includes('aquila') || 
                        member.displayName.toLowerCase().includes('bootes') ||
                        member.displayName.toLowerCase().includes('cassiopeia') ||
                        member.displayName.toLowerCase().includes('draco')
                        ) {
                        //console.log(`${member.displayName} : ${member}`)
                        let argsn = member.displayName.split(/ +/); 
                        if(member.displayName.toLowerCase().endsWith(')')) {
                            console.log(member.displayName.toLowerCase().split(" ").length)
                            if(member.displayName.toLowerCase().split(" ").length - 1 < 3 && member.displayName.toLowerCase().split(" ").length - 1 > 1) {
                                str.push(`${member.displayName} : ${member}\n`)
                                set_roles(member)
                                console.log(`Add : ${member.displayName} : ${member}`)
                            }
                        }
                    }
                } else if(member.roles.cache.has('778532539287207956')) {
                    if(member.roles.cache.has('778856916927250443')) return //MM Roles
                    if(
                    member.displayName.toLowerCase().includes('aquila') || 
                    member.displayName.toLowerCase().includes('bootes') ||
                    member.displayName.toLowerCase().includes('cassiopeia') ||
                    member.displayName.toLowerCase().includes('draco')
                    ) {
                        //console.log(`${member.displayName} : ${member}`)
                    } else {
                        /*************** REMOVE FUNCTION *******************/
                        //remove_list.push(`${member.displayName} : ${member}`)
                        //console.log(`Remove : ${member.displayName} : ${member}`)
                        //remove_roles(member)
                    }
                    //console.log(`${member.displayName} : ${member}`)
                }
            });
            } else {
                channel_ = client.channels.cache.find(x => x.id == log_chnn);
                channel_.send(`ERR`)
            }
            if(str.length > 0) {
                if(prefix == '$') return;
                channel_ = client.channels.cache.find(x => x.id == log_chnn);
                channel_.send(`**Added Role** : \`\`\`${str.join('')}\`\`\``)
            }
  }, null, true, 'Asia/Singapore');

function throw_log(msg) {
    channel_log = client.channels.cache.find(x => x.id == '809972566852370432')
    if(prefix == '$') return;
    channel_log.send(msg)
}

function throw_dmlog(msg) {
    channel_log = client.channels.cache.find(x => x.id == '811807538567839795')
    channel_log.send(msg)
}

const DDMMYYY_HHMMSS = 'YYYY-MM-DD HH:MM:SS'
for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}

client.once('ready', async () => {
	console.log(`[${moment().format(DDMMYYY_HHMMSS)}]=> Ready!`);
    throw_log(`Roxy Migurdia - ロキシ has restarted.`)
});

client.on('message', async message => {

    if(message.channel.type === 'dm') {
        if(!message.author.bot) {
            let sender_id = message.channel.recipient.id
            let sender_name = message.channel.recipient.username
            let r_message = message.content
            let dmlog = `DM => From ${sender_name} <@${sender_id}> : \`${r_message}\``
            console.log(`[${moment().format(DDMMYYY_HHMMSS)}] ${dmlog}`)
            throw_dmlog(`[${moment().format(DDMMYYY_HHMMSS)}] ${dmlog}`)
        }
    }

    if (!message.content.startsWith(prefix) || message.author.bot || message.channel.type === 'dm') return;
	const args = message.content.slice(prefix.length).trim().split(/ +/);
	const command = args.shift().toLowerCase();
	console.log(`[${moment().format(DDMMYYY_HHMMSS)}]=> ID : ${message.author.id} MSG : ${message.content.replace(prefix,'')}`);
    throw_log(`[${moment().format(DDMMYYY_HHMMSS)}]=> ID : ${message.author.id} MSG : ${message.content.replace(prefix,'')}`)
    let chnnstat = client.channels.cache.get("811903844581507152")
    if(message.content.replace(prefix,'') === 'green') {
        console.log(message.author.id)
        await chnnstat.setName('🟢 roxy') //🔴 🟢 
    } else if(message.content.replace(prefix,'') === 'red') {
        await chnnstat.setName('🔴 roxy') //🔴 🟢
    }
    if (!client.commands.has(command)) return;

	try {
        if(command === 'autorole') {
		    client.commands.get(command).execute(message, args, client, job);
        } else {
            client.commands.get(command).execute(message, args, client);
        }
	} catch (error) {
		console.error(error);
		message.reply('there was an error trying to execute that command!');
	}
});

client.on("guildMemberAdd", (member) => {
	console.log(`[${moment().format(DDMMYYY_HHMMSS)}]=> ${member.id} Joined Server`);
  });

client.login(token);
