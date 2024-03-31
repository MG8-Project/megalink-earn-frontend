import styled from "styled-components";
import {theme} from "../../styles/theme";
import {useEffect, useState} from "react";
import {IToken} from "./index";
import API from "../../apis/Api";
import {formatUnits} from "ethers";
import {useWallet} from "../../hooks/useWallet";
import {DISCONNECTED, METAMASK_LOCKED_OR_UNINSTALL} from "../../constants";
import {useAuthStore} from "../../store/authStore";
import Spinner from "../ui/Spinner";

interface PartnerTokenProps {
    tokenList: IToken[]
}

interface IBalance {
    "address": string,
    "symbol": string,
    "decimals": number,
    "chainId": number,
    "balance": string
}

interface Response {
    status: number;
    data: {
        "resultCode": "string",
        "msg": "string",
        "address": "string",
        "assets": IBalance[]

    }
}

const PartnerToken = (props: PartnerTokenProps) => {
    const {tokenList} = props;
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [balaceList, setBalanceList] = useState<IBalance[]>([])
    const {walletAddress, connectWallet} = useWallet();
    const onWalletConnect = async () => {
        setIsLoading(true)
        const address = await connectWallet();
        if (address === null) {
            alert(METAMASK_LOCKED_OR_UNINSTALL);
            return;
        }
        useAuthStore.getState().setUserAccount(address);
        setIsLoading(false)
    };

    const onWalletDisconnect = () => {
        //  Disconnect 시 logout
        useAuthStore.getState().logout();
        useAuthStore.getState().setUserAccount(null);
        alert(DISCONNECTED);
    };
    const convertNumber = (data: string) => {
        const numData = Number(data)
        if (numData < 1) return numData
        return Math.floor(numData)
    }
    const findBalance = (symbol: string) => {
        const find = balaceList.find((item) => item.symbol === symbol);
        if (find) {
            return find.balance;
        } else {
            return 0;
        }
    }
    const isClaimAvailable = () => {
        for (let i = 0; i < tokenList.length; i++) {
            const num = Number(findBalance(tokenList[i].symbol)) / convertNumber(formatUnits(tokenList[i].minAmount, tokenList[i].decimals))
            if (num < 1) {
                return false;
            }
        }
        return true
    }
    // const userAddress = useAuthStore((state) => state.userAccount);
    // const [coins, setCoins] = useState(coinList);

    // const fetchBalances = useCallback(async () => {
    //     if (!userAddress) {
    //         return;
    //     }
    //     const updatedCoins = await Promise.all(
    //         coins.map(async (item) => {
    //             const provider = new ethers.JsonRpcProvider(item.url, item.chainId);
    //             const balance = await provider.getBalance(userAddress);
    //             const balanceInEther = ethers.formatEther(balance);
    //             return {...item, balance: balanceInEther};
    //         })
    //     );
    //     setCoins(updatedCoins);
    // }, [userAddress]);
    // console.log(coins)

    // useEffect(() => {
    //     void fetchBalances();
    // }, [fetchBalances]);


    const airDrop = () => {
        const address = walletAddress
    }
    const fetchBalances = async () => {
        try {
            const API_ENDPOINT = `${process.env.REACT_APP_API_URL}/infiniteSpin/mega8/airdrop/balanceAll`
            const res: Response = await API.get(API_ENDPOINT, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('accessToken')}`
                }
            })
            setBalanceList(res.data.assets)
        } catch (err) {
            console.error(err)
        }
    }
    useEffect(() => {
        void fetchBalances()
    }, []);

    return (
        <CardWrapper>
            <TokenWrapper>
                {tokenList.map((item, index) => (
                    <CardBox key={index}>
                        <CardBoxImg src={item.logoUrl} alt=""/>
                        <div>{item.symbol}</div>
                        {walletAddress !== null ?
                            <CardAmountBox>{findBalance(item.symbol)}/{convertNumber(formatUnits(item.minAmount, item.decimals))}</CardAmountBox> : null
                        }
                    </CardBox>
                ))}

            </TokenWrapper>
            <ButtonWrapper>
                {!walletAddress ? (
                    <WalletContainer onClick={onWalletConnect}>
                        {isLoading ? <><Spinner size={15}/>
                            <div style={{marginLeft: '10px'}}>Checking...</div>
                        </> : 'Connect Wallet'}
                    </WalletContainer>
                ) : (
                    <WalletContainer onClick={onWalletDisconnect}>
                        {isClaimAvailable() ? "Claim" : "Connected"}
                    </WalletContainer>
                )}
            </ButtonWrapper>
            {isClaimAvailable ? null : <TokenAlertText>Deposit more coins above to claim</TokenAlertText>}
        </CardWrapper>
    );
};

export default PartnerToken;

const ButtonWrapper = styled.div`

    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
`
const WalletContainer = styled.button`
    display: flex;
    font-weight: 400;
    align-items: center;
    justify-content: center;
    text-align: center;
    width: 140px;
    height: 40px;
    border: 1px solid #ffffff;
    border-radius: 100px;
    font-size: 16px;
`;
const CardWrapper = styled.div`
    background-color: ${theme.colors.bg.box};
    border-radius: 16px;
    display: grid;
    grid-template-areas: 
            "token" 
            "button";
    grid-template-columns: 4fr 1fr;
    width: 80vw;
    place-items: center;
    //gap: 24px;
`;

const TokenWrapper = styled.div`
    grid-area: token;
    display: flex;
    justify-content: space-around;
    width: 100%;
`
const CardBox = styled.div`
    //background: #001bf9;
    width: 10%;
    height: 200px;
    border-radius: 16px;
    display: flex;
    flex-direction: column;
    //gap: 20px;
    align-items: center;
    justify-content: space-around;
`;

const CardAmountBox = styled.div`
    width: 100px;
    height: 40px;
    border: 1.5px solid gray;
    border-radius: 20px;
    background-color: black;
    display: flex;
    flex-direction: column;
    gap: 20px;
    justify-content: center;
    align-items: center;
`;

const CardBoxImg = styled.img`
    width: 64px;
    height: 64px;
    margin-top: 20px;
`;
const TokenAlertText = styled.div`
    padding: 15px 0;
    width: 100%;
    color: #fa3434;
    display: flex;
    align-items: center;
    justify-content: center;
`
