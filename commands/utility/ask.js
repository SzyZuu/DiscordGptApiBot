const { SlashCommandBuilder } = require('discord.js');
const OpenAI = require('openai');

const openai = new OpenAI();

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ask')
		.setDescription('Ask GPT-not-4')
        .addStringOption(option =>
            option.setName('input')
                .setDescription('The input for gpt')
                .setRequired(true)),
	async execute(interaction) {
        try{
            const userAnswer = interaction.options.getString('input');
        const gptAnswer = await openai.chat.completions.create({
            messages: [{role: "system", content: userAnswer }],
            model: "gpt-3.5-turbo"
        })
		await interaction.reply(`${gptAnswer.choices[0]}`);
        }catch(RateLimitError){
            console.log("big bruh (I'm poor)");
            await interaction.reply("No money");
        }
	},
};
