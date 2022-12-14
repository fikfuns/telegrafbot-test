const { Telegraf, Markup } = require('telegraf');
const data = require('./data.json');


const bot = new Telegraf("5711664450:AAG-MDmU-j65izOUlez9gKZZMbx_c7MlQ7E");
bot.start((ctx) => ctx.reply('Started!'))

// username
bot.command('username', async (ctx) => {
    console.log(ctx);
    let botName = ctx.botInfo.username;
    await ctx.reply(`I am @${botName}`);
})

// Get user id

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

// bot.command('schedule', async (ctx) => {
//     let date = new Date(ctx.message.date * 1000);
//     let users = {}


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

bot.command('custom', async (ctx) => {
    return await ctx.reply('Custom buttons keyboard', Markup
      .keyboard([
        ['🔍 Search', '😎 Popular'], // Row1 with 2 buttons
        ['☸ Setting', '📞 Feedback'], // Row2 with 2 buttons
        ['📢 Ads', '⭐️ Rate us', '👥 Share'] // Row3 with 3 buttons
      ])
      .oneTime()
      .resize()
    )
  })

// Quit
bot.command('quit', async (ctx) => {
    // Explicit usage
    await ctx.telegram.leaveChat(ctx.message.chat.id);

    // Using context shortcut
    await ctx.leaveChat();
});

bot.launch();

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));