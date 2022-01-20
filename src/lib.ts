import { Guild, Permissions, TextChannel } from "discord.js";
import { readdirSync } from "fs";

const cheeseFiles = readdirSync("./assets/");

const randomChoice = <T>(arr: T[]) =>
  arr[Math.floor(Math.random() * arr.length)];

export const sendCheese = async (guild: Guild) => {
  const sendableChannels = Array.from(
    guild.channels.cache
      .filter(
        (channel) =>
          channel.type === "GUILD_TEXT" &&
          channel.permissionsFor(guild.me!).has(Permissions.FLAGS.SEND_MESSAGES)
      )
      .values()
  ) as TextChannel[];

  const randomChannel = randomChoice(sendableChannels);
  const randomCheese = randomChoice(cheeseFiles);
  await randomChannel.send({ files: [`./assets/${randomCheese}`] });

  setTimeout(() => {
    sendCheese(guild);
  }, randomTimeout());
};

const maxTimeout = 3 * 60 * 60 * 1000; // 3hrs
const minTimeout = 15 * 60 * 1000; // 15min

export const randomTimeout = () =>
  Math.floor(Math.random() * (maxTimeout - minTimeout + 1)) + minTimeout;
