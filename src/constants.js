import discord from "assets/discord.svg";
import medium from "assets/medium.svg";
import telegram from "assets/telegram.svg";
import twitter from "assets/twitter.svg";


export const SOCIALS = [
  {
    title: "Twitter",
    img: twitter,
    link: "https://twitter.com/",
  },
  {
    title: "Medium",
    img: medium,
    link: "https://medium.com/",
  },
  {
    title: "Telegram",
    img: telegram,
    link: "https://telegram.com/",
  },
  {
    title: "Discord",
    img: discord,
    link: "https://discord.com/",
  },
];
export const ROUTES = [
  {
    title: "home",
    id: "home",
  },
  {
    title: "collection",
    id: "collection",
  },
].map((e, i) => ({ ...e, link: `/${i === 0 ? "" : e.id}` }));
