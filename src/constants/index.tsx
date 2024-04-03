import {discord, gitbook, mega8, mg8gray, telegram, x} from "../assets/images";
import {hexlify} from "ethers";
//footer
export const FooterList = [
    {title: "Megalink", content: "Website", link: ""},
    {title: "Support", content: "Contact Us", link: ""},
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


export const statusList = [
    {id: 1, title: "Total Transcations", content: "12,345,678,901,234"},
    {id: 2, title: "Total Wallets", content: "12,345,678,901,234"},
    {id: 3, title: "Transcations Today", content: "78,901"},
    {id: 4, title: "New Wallets Today", content: "123,456,789"},
    {id: 5, title: "Spin Count", content: "345,678,901,234"},
    {id: 6, title: "Total Points", content: "345,678,901,234"},
    {id: 7, title: "$MG8 Dropped", content: "678,901,234"},
    {id: 8, title: "BNB Rewarded", content: "1,234"},
];

export const DailyRewardList = [
    {id: 1, title: "Day 1", image: mega8, point: "+100P"},
    {id: 2, title: "Day 2", image: mg8gray, point: "+100P"},
    {id: 3, title: "Day 3", image: mg8gray, point: "+100P"},
    {id: 4, title: "Day 4", image: mg8gray, point: "+100P"},
    {id: 5, title: "Day 5", image: mg8gray, point: "+100P"},
    {id: 6, title: "Day 6", image: mg8gray, point: "+100P"},
    {id: 7, title: "Day 7", image: mg8gray, point: "+100P"},
];

// join modal
export const JOIN_SUCCESS_CODE = "1";
export const nationList = [
    {nation: "South Korea", code: 1},
    {nation: "China", code: 2},
    {nation: "Japan", code: 3},
    {nation: "USA", code: 4},
    {nation: "Brazil", code: 5},
    {nation: "Singapore", code: 6},
    {nation: "Indonesia", code: 7},
    {nation: "India", code: 8},
    {nation: "Vietnam", code: 9},
    {nation: "Philippines", code: 10},
    {nation: "UAE", code: 11},
    {nation: "UK", code: 12},
    {nation: "France", code: 13},
    {nation: "Others", code: 14},
];

export const OTHER_NATION = 'Others'

// API CODE
export const API_SUCCESS_CODE = 200;
export const API_RESULT_CODE_FAIL = '40'
export const API_RESULT_CODE_SUCCESS = '1'

// variables
export const UNKNOWN = 'Unknown'
export const ACCESS_TOKEN = 'accessToken'

export const INDIVIDUAL = 'Individual'
export const TEAM = 'Team'
export const CLAIM = 'claim'
export const ALERT = 'alert'
export const ALL = 'all'

// Alert Message
export const METAMASK_LOCKED_OR_UNINSTALL = "Please install Metamask. If you already installed, please unlock it.";
export const METAMASK_LINK_FAILED = "Metamask linkage failed. Please check your Metamask is locked";
export const LOGIN_FAILED = "Failed to login. You should join first.";
export const LOGIN_SUCCESS = "Successfully logged in.";
export const DISCONNECTED = "Disconnected"

export const OPBNB_CONFIG = process.env.REACT_APP_ENVIRONMENT === 'production' ? {
    chainId: hexlify('0xcc'), // 204
    chainName: 'opBNB Mainnet',
    symbol: 'BNB',
    rpcUrls: ['https://opbnb-mainnet-rpc.bnbchain.org'],
    blockExplorerUrls: ['https://mainnet.opbnbscan.com/']
} : {
    chainId: hexlify('0x15eb'), // 5611
    chainName: 'opBNB Testnet',
    symbol: 'tBNB',
    rpcUrls: ['https://opbnb-testnet-rpc.bnbchain.org'],
    blockExplorerUrls: ['https://testnet.opbnbscan.com/']
}

export const BNB_CONFIG = process.env.REACT_APP_ENVIRONMENT === 'production' ? {
    chainId: hexlify('0x38'), // 56
    chainName: 'BNB Smart Chain Mainnet',
    symbol: 'BNB',
    rpcUrls: ['https://bsc-dataseed.binance.org/'],
    blockExplorerUrls: ['https://bscscan.com/']
} : {
    chainId: hexlify('0x61'), // 97
    chainName: 'BNB Smart Chain Testnet',
    symbol: 'tBNB',
    rpcUrls: ['https://data-seed-prebsc-1-s1.binance.org:8545/'],
    blockExplorerUrls: ['https://testnet.bscscan.com/']
}

// url
export const LEARN_URL = 'https://docs.mega8.io/earn/infinite-spin'