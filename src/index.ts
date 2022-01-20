import { Client, Intents } from "discord.js";
import { config as dotenv } from "dotenv";
import { randomTimeout, sendCheese } from "./lib";
dotenv();

const client = new Client({ intents: [Intents.FLAGS.GUILDS] });
const timeouts = new Map<string, NodeJS.Timeout>();

client.once("ready", () => {
  console.info("Logged in!");
  console.info(`Tag: ${client.user?.tag}`);
  console.info(`Client ID: ${client.user?.id}`);

  client.guilds.cache.forEach((guild) => {
    const timeout = setTimeout(() => {
      sendCheese(guild);
    }, randomTimeout());
    timeouts.set(guild.id, timeout);
  });
});

client.on("guildCreate", (guild) => {
  const timeout = setTimeout(() => {
    sendCheese(guild);
  }, randomTimeout());
  timeouts.set(guild.id, timeout);
});

client.on("guildDelete", (guild) => {
  if (!timeouts.has(guild.id)) return;
  clearTimeout(timeouts.get(guild.id)!);
  timeouts.delete(guild.id);
});

client.login(process.env.BOT_TOKEN);
