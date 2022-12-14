const { Telegraf, Markup } = require('telegraf');
const cron = require('cron');
const clipboard = require('clipboard-js');
const bot = new Telegraf("5711664450:AAG-MDmU-j65izOUlez9gKZZMbx_c7MlQ7E");


bot.start((ctx) => ctx.reply('Started!'))


// username
bot.command('username', async (ctx) => {
    console.log(ctx);
    let botName = ctx.botInfo.username;
    await ctx.reply(`I am @${botName}`);
})

// Copy button

// Get user id
bot.command('greet', async (ctx) => {
    const firstName = ctx.from.first_name;
    const username = ctx.from.username;

    await ctx.reply(`Hello @${username}! You are also known as ${firstName}!`);
})

// Schedule command test

bot.command('schedule', async (ctx) => {
    // const time = '9:30 AM';
    // const date = new Date(`${new Date().toDateString()} ${time}`);
    // const milliseconds = date.getTime() - Date.now();
    const now = Date.now();
    const currentDate = new Date(now);
    const dateString = currentDate.toLocaleDateString('en-US', {
        day: '2-digit',
        month: '2-digit',
        year: '2-digit',
    });


    const message = `
    ${dateString}
Department (leave those that apply)
#founder #bd #cs #mkt #product

**What you have done:**

    
**What you plan to do:**

    
**What help you need:**


`;

  ctx.reply(message, { parse_mode: 'Markdown' });
})

// Remind 

bot.command('remind', (ctx) => {
    const message = 'Reminder at 2PM';
    const time = '2:00 PM'; // Set the time for the reminder message
  
    // Convert the time string to a date object
    const date = new Date(`${new Date().toDateString()} ${time}`);
  
    // Calculate the number of milliseconds until the reminder time
    const milliseconds = date.getTime() - Date.now();
  
    // Schedule the reminder message to be sent at the specified time
    setInterval(() => {
      ctx.telegram.sendMessage(ctx.chat.id, message);
    }, milliseconds);
  
    ctx.reply(`Reminder set for ${time}.`);
});

// Date
bot.command('date', async (ctx) => {
    let date = new Date(ctx.message.date * 1000);

    // Using context shortcut
    await ctx.reply(`The date is ${date}`);
})

bot.on('inline_query', async (ctx) => {
    const result = [];
    console.log(ctx.inlineQuery.id)
    // Explicit usage
    await ctx.telegram.answerInlineQuery(ctx.inlineQuery.id, result);
  
    // Using context shortcut
    await ctx.answerInlineQuery(result);
});

// Commands list

bot.command('help', async (ctx) => {
    await ctx.reply("Here are the list of commands, \n /date \n /username \n /start \n /quit"); 
})

// Some inline commands

bot.command('inline', (ctx) => {
    return ctx.reply('<b>Coke</b> or <i>Pepsi?</i>', {
        parse_mode: 'HTML',
        ...Markup.inlineKeyboard([
            Markup.button.callback('Coke', 'Coke'),
            Markup.button.callback('Pepsi', 'Pepsi')
      ])
    })
})

bot.command('random', (ctx) => {
    return ctx.reply(
        'random example',
        Markup.inlineKeyboard([
            Markup.button.callback('Coke', 'Coke'),
            Markup.button.callback('Dr Pepper', 'Dr Pepper', Math.random() > 0.5),
            Markup.button.callback('Pepsi', 'Pepsi')
        ])
    )
})

bot.command('simple', (ctx) => {
    return ctx.replyWithHTML(
      '<b>Coke</b> or <i>Pepsi?</i>',
      Markup.keyboard(['Coke', 'Pepsi'])
    )
})


bot.launch();

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));



