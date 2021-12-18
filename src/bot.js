require('log-timestamp');
const tmi = require('tmi.js');

const GameLogic = require('./gameLogic');

module.exports = class MurmelBot {
    constructor(opts) {
        this.client = new tmi.Client({
            options: { debug: true },
            connection: {
                secure: true,
                reconnect: true,
                timeout: 5000
            },
            identity: {
                username: opts.username,
                password: opts.password
            },
            channels: opts.channels || ["#schmaxoff"]
        });

        this.gameLogic = new GameLogic();
    };

    initialize = async () => {
        this.client.on('connected', this.onConnectedHandler);
        this.client.on('disconnected', this.onDisconnectHandler);
        this.client.on('message', this.onMessageReceivedHandler);

        this.client.connect();
    };


    onConnectedHandler = async (addr, port) => {
        console.log(`* Connected to ${addr}:${port}`);
    };

    onDisconnectHandler = async (reason) => {
        console.log(`* Disconnected due to: ${reason}`);
    };

    onMessageReceivedHandler = async (channel, tags, message, self) => {
        // Ignore self
        if(self || !message.startsWith('!')) {
            return;
        }

        const args = message.slice(1).split(' ');
		const command = args.shift().toLowerCase();

        switch(command) {
            case 'play':
                this.gameLogic.handlePlayGame(this.client, channel);
                break;
            default:
                break;
        }
    }
}