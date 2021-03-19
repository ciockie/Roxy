function check_room_id (id) {
	let boo = false
	for (var i = 0; i < id.length; i++) {
		boo = boo 
		|| id[i] == '1'
		|| id[i] == '2'
		|| id[i] == '3'
		|| id[i] == '4'
		|| id[i] == '5'
		|| id[i] == '6'
		|| id[i] == '7'
		|| id[i] == '8'
		|| id[i] == '9'
		|| id[i] == '0'
	  }
	//console.log(boo)
	return boo
}

module.exports = {
	name: 'msg',
	description: 'Send message to special room',
	execute(message, args, client) {
        //console.log(args)
		if(check_room_id(args[0])) {
			channel = client.channels.cache.find(x => x.id == args[0])
			channel.send(args.join(' ').replace(`${args[0]} `,''))
		} else {
			message.channel.send(args.join(' '))
		}
	},
};