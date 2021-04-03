/*
node index.js \
    --username test \
    --room test \
    --hostURI localhost
*/

import Events from 'events'
import CliConfig from './src/cliConfig.js'
import TerminalController from './src/terminalController.js'

const [ nodePath, filePath, ...commands ] = process.argv
const config = CliConfig.parseArgs(commands)
console.log(config)

const componentEmitter = new Events()
const controller = new TerminalController()

await controller.initializeTable(componentEmitter)
