import {
  discord,
  x,
  telegram,
  mega8,
  mg8gray,
  binance,
  ace,
  wemix,
} from "../assets/images";
//footer
export const FooterList = [
  { id: 1, title: "Megalink", content: "Website", link: "https://mega8.io/" },
  { id: 2, title: "Support", content: "Contact Us", link: "" },
];

export const FooterSns = [
  {
    id: 1,
    linkUrl: "https://discord.gg/fEsTxNUYth",
    imgSrc: discord,
    text: "Discord",
  },
  {
    id: 2,
    linkUrl: "https://twitter.com/MegalinkMG8",
    imgSrc: x,
    text: "Twitter",
  },
  {
    id: 3,
    linkUrl: "https://t.me/MegalinkMG8",
    imgSrc: telegram,
    text: "Telegram",
  },
];

export const coinList = [
  { id: 1, image: binance, title: "BNB", count: 1, have: 0 },
  { id: 2, image: ace, title: "ACE", count: 30, have: 0 },
  { id: 3, image: wemix, title: "WEMIX", count: 150, have: 0 },
];

export const statusList = [
  { id: 1, title: "Total Transcations", content: "12,345,678,901,234" },
  { id: 2, title: "Total Wallets", content: "12,345,678,901,234" },
  { id: 3, title: "Transcations Today", content: "78,901" },
  { id: 4, title: "New Wallets Today", content: "123,456,789" },
  { id: 5, title: "Spin Count", content: "345,678,901,234" },
  { id: 6, title: "Total Points", content: "345,678,901,234" },
  { id: 7, title: "$MG8 Dropped", content: "678,901,234" },
  { id: 8, title: "BNB Rewarded", content: "1,234" },
];

export const DayRewordList = [
  { id: 1, title: "Day 1", image: mega8, point: 100 },
  { id: 2, title: "Day 2", image: mg8gray, point: 100 },
  { id: 3, title: "Day 3", image: mg8gray, point: 100 },
  { id: 4, title: "Day 4", image: mg8gray, point: 100 },
  { id: 5, title: "Day 5", image: mg8gray, point: 100 },
  { id: 6, title: "Day 6", image: mg8gray, point: 100 },
  { id: 7, title: "Day 7", image: mg8gray, point: 100 },
];
