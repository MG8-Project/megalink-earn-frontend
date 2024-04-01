import styled from "styled-components";
import {theme} from "../../styles/theme";
import {useEffect, useState} from "react";
import {IToken} from "./index";
import API from "../../apis/Api";
import {formatUnits} from "ethers";
import {useWallet} from "../../hooks/useWallet";
import {LOGIN_FAILED, METAMASK_LINK_FAILED, METAMASK_LOCKED_OR_UNINSTALL} from "../../constants";
import {useAuthStore} from "../../store/authStore";
import Spinner from "../ui/Spinner";
import RemainTime from "./RemainTime";
import ApiPoints from "../../apis/ApiPoints";

interface LoginResponse {
    resultCode: string;
}

interface PartnerTokenProps {
    tokenList: IToken[]
    remainTime: number
    isClaimAvailable: boolean
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

interface AirdropResponse {
    status: number;
    data: { "resultCode": string, "msg": string, "txHash": string }
}

const PartnerToken = (props: PartnerTokenProps) => {
    const {isClaimAvailable, remainTime, tokenList} = props;
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [balaceList, setBalanceList] = useState<IBalance[]>([])
    const isLogin = useAuthStore((state) => state.isLoggedIn);
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

    const convertNumber = (data: string) => {
        const numData = Number(data)
        if (numData < 1) return numData
        return Math.floor(numData)
    }
    const findBalance = (symbol: string) => {
        const find = balaceList?.find((item) => item.symbol === symbol);
        if (find) {
            return find.balance;
        } else {
            return 0;
        }
    }
    const checkBalance = () => {
        for (let i = 0; i < tokenList.length; i++) {
            const num = Number(findBalance(tokenList[i].symbol)) / convertNumber(formatUnits(tokenList[i].minAmount, tokenList[i].decimals))
            if (num < 1) {
                return false;
            }
        }
        return true
    }
    const clickLogin = async () => {
        try {
            let address = walletAddress || await connectWallet();
            if (address === null) {
                alert(METAMASK_LINK_FAILED);
                return;
            }
            const loginResponse: LoginResponse = await ApiPoints.login(address);
            if (loginResponse.resultCode !== '1') {
                throw new Error(LOGIN_FAILED);
            }
            useAuthStore.getState().login(address);
        } catch (error) {
            console.error("An error occurred during login process:", error);
            alert(LOGIN_FAILED);
        }
    };
    const fetchAirDrop = async () => {
        try {
            const API_ENDPOINT = `${process.env.REACT_APP_API_URL}/infiniteSpin/mega8/airdrop/claim`
            const res: AirdropResponse = await API.post(API_ENDPOINT, {}, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('accessToken')}`
                }
            })
            console.log(res)
        } catch (err) {
            console.error(err)
        }
    }
    const clickAirdrop = () => {
        void fetchAirDrop()
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
                        {isLogin ?
                            <CardAmountBox>{convertNumber(formatUnits(findBalance(item.symbol), item.decimals))}/{convertNumber(formatUnits(item.minAmount, item.decimals))}</CardAmountBox> : null
                        }
                    </CardBox>
                ))}

            </TokenWrapper>
            {walletAddress !== null && isLogin ? <RemainTime remainTime={remainTime}/> : <>Please Login</>}
            <ButtonWrapper>
                {!walletAddress ? (
                    <WalletContainer onClick={onWalletConnect}>
                        {isLoading ? <><Spinner size={15}/>
                            <div style={{marginLeft: '10px'}}>Checking...</div>
                        </> : 'Connect Wallet'}
                    </WalletContainer>
                ) : (
                    // <WalletContainer onClick={onWalletDisconnect}>
                    <WalletContainer onClick={isLogin ? (isClaimAvailable ? clickAirdrop : null) : clickLogin}
                                     style={{
                                         color: isLogin ? (isClaimAvailable ? '#fff' : '#3dbd3d') : '#fff',
                                         border: isLogin ? (isClaimAvailable ? '1px solid #fff' : '1px solid #3dbd3d') : '1px solid #fff'
                                     }}>
                        {isLogin ? (isClaimAvailable ? 'Claim' : 'Claimed!') : 'Login'}
                        {/*{isClaimAvailable() ? "Claim" : "Connected"}*/}
                    </WalletContainer>
                )}
            </ButtonWrapper>
            {checkBalance ? null : <TokenAlertText>Deposit more coins above to claim</TokenAlertText>}
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
            "time"
            "button";
    grid-template-columns: 4fr 2fr 1.5fr;
    width: 90vw;
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
    width: 10%;
    height: 200px;
    border-radius: 16px;
    display: flex;
    flex-direction: column;
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
