import ComponentsBuilder from './components.js'
import { constants } from './constants.js'

export default class TerminalController{
    
    #usersCollors = new Map()

    #pickCollor = () => `#${((1 << 24) * Math.random() | 0).toString(16)}-fg`

    #getUserCollor(username){

        if(this.#usersCollors.has(username))
            return this.#usersCollors.get(username)

        const color = this.#pickCollor()
        this.#usersCollors.set(username, color)

        return color

    }


    #onInputReceived(eventEmitter){

        return function(){

            const message = this.getValue()
            console.log(message)
            this.clearValue()

        }

    }

    #onMessageReceived({ screen, chat }){

        return msg => {

            const { username, message } = msg
            
            const color = this.#getUserCollor(username)
            chat.addItem(`{${color}}{bold}${username}{/}: ${message}`)
            
            screen.render()

        }

    }

    #onActivityUpdate({ screen, activity }){

        return msg => {
            
            const [ username ] = msg.split(' ')

            const color = this.#usersCollors.get(username)
            activity.addItem(`{${color}}{bold}${msg.toString()}{/}`)

            screen.render()

        }

    }

    #onStatusUpdate({ screen, status }){

        return users => {
            
            const { content } = status.items.shift()
            status.clearItems()
            status.addItem(content)

            users.forEach(username => {
                const color = this.#usersCollors.get(username)
                status.addItem(`{${color}}{bold}${username}{/}`)
            })

            screen.render()

        }
    }

    #registerEvent(eventEmitter, components){

        eventEmitter.on(constants.events.app.MESSAGE_RECEIVED, this.#onMessageReceived(components))
        eventEmitter.on(constants.events.app.ACTIVITY_UPDATED, this.#onActivityUpdate(components))
        eventEmitter.on(constants.events.app.STATUS_UPDATED, this.#onStatusUpdate(components))

    }


    async initializeTable(eventEmitter){

        const components = new ComponentsBuilder()
            .setScreen({ title: 'MyTerminalChat' })
            .setLayoutComponent()
            .setInputComponent(this.#onInputReceived(eventEmitter))
            .setChatComponent()
            .setStatusComponent()
            .setActivityComponent()
            .build()

        this.#registerEvent(eventEmitter, components)

        components.input.focus()
        components.screen.render()

    }

}