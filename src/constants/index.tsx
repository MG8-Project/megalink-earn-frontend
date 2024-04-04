import {
  ace,
  binance,
  discord,
  mega8,
  mg8gray,
  telegram,
  wemix,
  x,
  gitbook,
} from "../assets/images";
import { hexlify } from "ethers";

// header
export const menuItems = [
  { title: "Home", id: "0" },
  { title: "Leaderboard", id: "3" },
  { title: "Brandsite", id: "" },
];

//footer
export const FooterList = [
  { title: "Megalink", content: "Website", link: "https://mega8.io/" },
  { title: "Support", content: "Contact Us", link: "mailto:contact@mega8.io" },
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
  {
    id: 4,
    linkUrl: "https://docs.mega8.io/",
    imgSrc: gitbook,
    text: "Gitbook",
  },
];

export const coinList = [
  {
    id: 1,
    image: binance,
    amount: 1,
    url: "https://bsc-dataseed.binance.org/",
    chainId: 56,
    balance: "0",
    title: "BNB",
  },
  {
    id: 2,
    image: ace,
    amount: 30,
    url: "https://rpc-endurance.fusionist.io",
    chainId: 648,
    balance: "0",
    title: "ACE",
  },
  {
    id: 3,
    image: wemix,
    amount: 150,
    url: "https://api.wemix.com/",
    chainId: 1111,
    balance: "0",
    title: "WEMIX",
  },
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

export const DailyRewardList = [
  { id: 1, title: "Day 1", image: mega8, point: "+100P" },
  { id: 2, title: "Day 2", image: mg8gray, point: "+100P" },
  { id: 3, title: "Day 3", image: mg8gray, point: "+100P" },
  { id: 4, title: "Day 4", image: mg8gray, point: "+100P" },
  { id: 5, title: "Day 5", image: mg8gray, point: "+100P" },
  { id: 6, title: "Day 6", image: mg8gray, point: "+100P" },
  { id: 7, title: "Day 7", image: mg8gray, point: "+100P" },
];

// join modal
export const JOIN_SUCCESS_CODE = "1";
export const nationList = [
  { nation: "South Korea", code: 1 },
  { nation: "China", code: 2 },
  { nation: "Japan", code: 3 },
  { nation: "USA", code: 4 },
  { nation: "Brazil", code: 5 },
  { nation: "Singapore", code: 6 },
  { nation: "Indonesia", code: 7 },
  { nation: "India", code: 8 },
  { nation: "Vietnam", code: 9 },
  { nation: "Philippines", code: 10 },
  { nation: "UAE", code: 11 },
  { nation: "UK", code: 12 },
  { nation: "France", code: 13 },
  { nation: "Others", code: 14 },
];

// API CODE
export const API_SUCCESS_CODE = 200;

// variables
export const UNKNOWN = "Unknown";

export const INDIVIDUAL = "Individual";
export const TEAM = "Team";

// Alert Message
export const METAMASK_LOCKED_OR_UNINSTALL =
  "Please install Metamask. If you already installed, please unlock it.";
export const METAMASK_LINK_FAILED =
  "Metamask linkage failed. Please check your Metamask is locked";
export const LOGIN_FAILED = "Failed to login. You should join first.";
export const LOGIN_SUCCESS = "Successfully logged in.";
export const DISCONNECTED = "Disconnected";

export const OPBNB_TESTNET = {
  chainId: hexlify("0x15eb"), // 5611
  chainName: "opBNB Testnet",
  symbol: "tBNB",
  rpcUrls: ["https://opbnb-testnet-rpc.bnbchain.org"],
  blockExplorerUrls: ["https://testnet.opbnbscan.com/"],
};

export const OPBNB_MAINNET = {
  chainId: hexlify("0xcc"), // 204
  chainName: "opBNB Mainnet",
  symbol: "BNB",
  rpcUrls: ["https://opbnb-mainnet-rpc.bnbchain.org"],
  blockExplorerUrls: ["https://mainnet.opbnbscan.com/"],
};

export const BNB_TESTNET = {
  chainId: hexlify("0x61"), // 97
  chainName: "BNB Smart Chain Testnet",
  symbol: "tBNB",
  rpcUrls: ["https://data-seed-prebsc-1-s1.binance.org:8545/"],
  blockExplorerUrls: ["https://testnet.bscscan.com/"],
};

export const BNB_MAINNET = {
  chainId: hexlify("0x38"), // 56
  chainName: "BNB Smart Chain Mainnet",
  symbol: "BNB",
  rpcUrls: ["https://bsc-dataseed.binance.org/"],
  blockExplorerUrls: ["https://bscscan.com/"],
};

export const LEARN_URL =
  "https://medium.com/@MegalinkMG8/infinite-spin-coming-soon-ab6b2ea0489b";

export const BRAND_SITE_URL = "https://mega8.io/";

export const ZEALY_URL = "https://zealy.io/cw/megalink/questboard";
