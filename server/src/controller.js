export default class Controller {

    #users = new Map()

    constructor({ socketServer }){
        this.socketServer = socketServer
    }

    onNewConnection(socket){

        const { id } = socket

        console.log('connection stablished with', id)

        const userData = { id, socket }

        this.#updateGlobalUserData(id, userData)

        socket.on('data', this.#onSocketData(id))
        //socket.on('error')
        //socket.on('end')

    }

    #onSocketData(id){



    }

    #updateGlobalUserData(socketId, userData){

        const users = this.#users
        const user = users.get(socketId) ?? {}

        const updateUserData = {
            ...user,
            ...userData
        }

        this.#users.set(socketId, updateUserData)

        return users.get(socketId)

    }

}