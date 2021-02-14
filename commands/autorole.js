async function create_job(message, args, client, job) {
    //console.log(args[0])
    if(args[0] === 'start') {
        if(job.running){
            message.channel.send('Autorole is already runing')
        } else {
            job.start();
            message.channel.send('Auto role Start!')
        }
    }
    if(args[0] === 'stop') {
        if(job.running){
            job.stop()
            message.channel.send('Auto role Stop!')
        } else {
            message.channel.send('No job runing')
        }
    }

    if(args[0] === 'status') {
        message.channel.send(`Autorole stat : ${job.running ? 'Running' : false}`)
    }
}
  

module.exports = {
    name: 'autorole',
    description: 'Start/Stop Auto Role',
    execute(message, args, client, job) {
        //if(message.author.id === '276302139276394496') { 
            create_job(message, args, client, job) 
        //}
    },
};
