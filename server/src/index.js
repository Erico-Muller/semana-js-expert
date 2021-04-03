import SocketServer from './socket.js'
import Event from 'events'
import { constants } from './constants.js'

const port = process.env.PORT || 4000

const eventEmitter = new Event()

/*async function test(){

    const options = {
        port: process.env.PORT || 4000,
        host: 'localhost',
        headers: {
            Connection: 'Upgrade',
            Upgrade: 'websocket'
        }
    }

    const http = await import('http')
    const req = http.request(options)
    req.end()

    req.on('upgrade', (req, socket) => {
        
        socket.on('data', data => {
            console.log('client received', data.toString())
        })

        setInterval(() => {
            socket.write('ping')
        }, 500)

    })

}*/

const socketServer = new SocketServer({ port })
const server = await socketServer.initialize(eventEmitter)

console.log('server runnging at', server.address().port)

/*
eventEmitter.on(constants.event.NEW_USER_CONNECTED, (socket) => {
    console.log('new connection', socket.id)

    socket.on('data', data => {
        console.log('server received', data.toString())
        socket.write('pong')
    })
})

test()
*/