
const TelegramBot = require('node-telegram-bot-api');
const token = '5542261605:AAFSoSIVYQYo0s9lcNvbDwR67zWEDT-gJyw'
var cron = require('node-cron')
const bot = new TelegramBot(token, {polling: true});
const users = require('./users.json')

console.log(words.names);

const main = async () => {
    bot.onText(/\/start/, (msg) => {
        bot.sendMessage(msg.chat.id, "Starting")
    })
    
    bot.on('message', (msg) => {
        
    });
}

main();
