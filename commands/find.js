const { serverid } = require('../config.json');
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

async function res(client, message) { 
    //const res = await getnick(client);
    a = await getnick(client)
    let str = [];
    if(a != false) {
        //message.channel.send("Reply")
        a.members.cache.forEach(member => {
            if(check_role(member)) {
                if(member.displayName.includes('Aquila') || member.displayName.includes('aquila')) {
                    //console.log(`${member.displayName} : ${member}`)
                    let argsn = member.displayName.split(/ +/);
                    //console.log(argsn)
                    if(argsn.length == 2) {
                        if(argsn[1].toLowerCase().includes('aquila') && argsn[1].endsWith(')')) {
                            str.push(`${member.displayName} : ${member}\n`)
                        }
                    } else if(argsn.length == 3) {
                        if (argsn[2].toLowerCase().includes('aquila') && argsn[2].endsWith(')')) {
                            str.push(`${member.displayName} : ${member}\n`)
                        }
                    }
                }
            }
    });
    } else {
        message.channel.send('err')
    }

    if(str.length > 0) {
        message.channel.send(`\`\`\`${str.join('')}\`\`\``)
    } else {
        message.channel.send(`No more correct Nickname form [\`IGN (Guild_name Server_name)\`]`)
    }
}

module.exports = {
	name: 'find',
	description: 'Finding who have change name correctly',
	execute(message, args, client) {
        res(client, message)
	},
};