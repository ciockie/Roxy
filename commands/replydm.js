
module.exports = {
	name: 'replydm',
	description: 'Direct message',
	execute(message, args, client) {
        let userId = args.shift();
        //console.log(args.join(' '));
        
        client.users.fetch(userId, false).then((user) => {
            user.send(args.join(' '));
           });
	},
};