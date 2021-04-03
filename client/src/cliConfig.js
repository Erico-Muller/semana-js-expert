export default class CliConfig {
    
    constructor({ username, room, hostURI }){

        this.username = username
        this.room = room

        const { hostname, port, protocol } = new URL(hostURI)
        this.host = hostname
        this.port = port
        this.protocol = protocol.replace(/\W/, '')

    }

    static parseArgs(commands){
        
        const cmd = new Map()
        
        for(const key in commands){
            
            const command = commands[key]
            const index = parseInt(key)

            if(!command.includes('--')) continue

            cmd.set(
                command.replace('--', ''),
                commands[index+1]
            )

        }

        return new CliConfig(Object.fromEntries(cmd))

    }

}