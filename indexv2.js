const { Telegraf, Markup, Extra } = require('telegraf');
const cron = require('cron');
const axios = require('axios');
const fs = require('fs');
const bot = new Telegraf("5806000626:AAGj4aw-H6tZYFYWLE1cundRLbOkNXtbCmw");

const scheduleGroup = '-1001584927238';
const testGroup = '-797033585';
const mainGroup = ''


// 30 9 * * 1-5 ===== mon-fri, 9:30am
// * * * * * every 1 minute
// */5 * * * * * every 5 sec
const job = new cron.CronJob('30 9 * * 1-5', async function() {
    const now = Date.now();
    const currentDate = new Date(now);
    const dateString = currentDate.toLocaleDateString('en-GB', {
        day: '2-digit',
        month: '2-digit',
        year: '2-digit',
    });

    const message = 
        `${dateString}\n\n`+
        "Department (leave those that apply)\n\n"+
        '#founder #bd #cs #mkt #product\n\n'+
        'What you have done:\n\n'+
        'What you plan to do:\n\n'+
        'What help you need:\n\n';

    const keyboard = {
        reply_markup: {
            inline_keyboard: [
                [{ text: 'Copy', switch_inline_query_current_chat: message }]
            ]
        }
    }

    // Make a GET request to the Zen Quotes API to get a random quote
    await axios.get('https://zenquotes.io/api/random')
        .then(async (response) => {
        // Send the quote text as a message to the Telegram chat
            const quote = response.data[0].q
            const author = response.data[0].a
            const dailyMessage = 
                "Morning folks! Here's the quote of the day!\n\n"+
                `"${quote}"\n\n`+
                `- ${author}\n\n`;
            await bot.telegram.sendMessage(scheduleGroup, dailyMessage);
    })
        .catch(error => {
            console.error(error);
    });

    bot.telegram.sendMessage(scheduleGroup, message, keyboard)
        .then((message) => {
        console.log(`Message sent: ${message.message_id}`);
    })
        .catch((error) => {
            console.error(error);
    })

    tempCheck = true;

}, null, true, 'Asia/Manila');

job.start();

// ADDITIONAL COMMANDS

// ALIVE
const responses = JSON.parse(fs.readFileSync('responses.json', 'utf8'));
// Event handler for when the bot receives a message containing the trigger phrase "are you still alive?"
bot.hears('Are you still alive?', ctx => {
    const response = responses[Math.floor(Math.random() * responses.length)];
    ctx.reply(response);
});


// NEXT SCHEDULE COMMAND 
bot.hears('Next schedule', async ctx => {
    // Get the time of the next scheduled execution of the cron job
    const nextInvocation = job.nextDate();
  
    // Calculate the time difference between the current time and the next scheduled execution
    const timeDifference = nextInvocation - Date.now();
  
    // Calculate the number of hours remaining
    const hoursRemaining = Math.floor(timeDifference / (1000 * 60 * 60));
  
    // Calculate the number of minutes remaining
    const minutesRemaining = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
  
    // Send a message with the time remaining
    await ctx.reply(`There are ${hoursRemaining} hours and ${minutesRemaining} minutes remaining until the next schedule.`);
});
  
bot.launch();


// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
