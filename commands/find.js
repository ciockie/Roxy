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
                if(
                    member.displayName.toLowerCase().includes('aquila') || 
                    member.displayName.toLowerCase().includes('bootes') ||
                    member.displayName.toLowerCase().includes('cassiopeia') ||
                    member.displayName.toLowerCase().includes('draco')
                    ) {
                    //console.log(`${member.displayName} : ${member}`)
                    let argsn = member.displayName.split(/ +/); 
                    if(member.displayName.toLowerCase().endsWith(')')) {
                        //console.log(member.displayName.toLowerCase().split(" ").length)
                        if(member.displayName.toLowerCase().split(" ").length - 1 < 3 && member.displayName.toLowerCase().split(" ").length - 1 > 1) {
                            str.push(`${member.displayName} : ${member}\n`)
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