module.exports = class GameLogic {
    constructor(opts) {
        this.coolDown = opts?.cooldown || 120000;
        this.lastMsg = Date.now() - this.coolDown;
    }

    checkCoolDown =  () => {
        const notOver = Date.now() - this.lastMsg < this.coolDown;
        if(!notOver) this.lastMsg = Date.now();
        return !notOver;
    }

    say = (client, channel) => {
        client.say(channel, `!play`);
        console.log(`* Participating`);
    }

    handlePlayGame = async (client, channel) => {
        if(this.checkCoolDown())  {
            setTimeout(function(){
                this.say(client, channel);
            }.bind(this), Math.random() * (5000));
        }
    }
}