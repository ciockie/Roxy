const CronJob = require('cron').CronJob;
const { serverid, test_log_chnn } = require('../config.json');
const check_role = require('./lib/checkrole')

async function getnick(client) {

	const list =  new Promise((resolve, reject) => {
		if(client.guilds.cache.get(serverid) !== undefined) {
			resolve(client.guilds.cache.get(serverid))
		} else {
			reject(false)
		}
	  });
	return list ;
}

async function set_roles(message, member) {
    let MuteUser = await message.guild.members.cache.get(member.id)
    MuteUser.roles.add('778532539287207956');
}

async function create_job(message, args, client) {
    var job = new CronJob('* * * * * *', async function() {
        console.log('Test cron every sec')
        /*
        let a = await getnick(client);
        //console.log(a)
        let str = [];
        if(a != false) {
            //message.channel.send("Reply")
            var serverlist = ["Aquila", "aquila"]
            a.members.cache.forEach(member => {
                if(check_role(member)) {
                    if(member.displayName.includes('Aquila') || member.displayName.includes('aquila')) {
                        //console.log(`${member.displayName} : ${member}`)
                        let argsn = member.displayName.split(/ +/);
                        //console.log(args)
                        if(argsn.length == 2) {
                            if(argsn[1].toLowerCase().includes('aquila') && argsn[1].endsWith(')')) {
                                str.push(`${member.displayName} : ${member}\n`)
                                set_roles(message, member)
                            }
                        } else if(argsn.length == 3) {
                            if (argsn[2].toLowerCase().includes('aquila') && argsn[2].endsWith(')')) {
                                str.push(`${member.displayName} : ${member}\n`)
                                set_roles(message, member)
                            }
                        }
                    }
                }
            });
            } else {
                message.channel.send('err')
            }
            if(str.length > 0) {
                channel_ = client.channels.cache.find(x => x.id == test_log_chnn);
                channel_.send(`**Added Role** : \`\`\`${str.join('')}\`\`\``)
            }*/
        }, null, true, 'Asia/Singapore'); 
        if(args[0] === 'start') {
            message.channel.send('Auto role Start!')
            job.start();
        }
    }

module.exports = {
    name: 'autorole',
    description: 'Start/Stop Auto Role',
    execute(message, args, client) {
        //if(message.author.id === '276302139276394496') { 
            create_job(message, args, client) 
        //}
    },
};
