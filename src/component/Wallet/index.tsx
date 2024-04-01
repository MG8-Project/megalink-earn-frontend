import styled from "styled-components";
import PartnerToken from "./PartnerToken";
import API from "../../apis/Api";
import {useEffect, useState} from "react";


export interface IToken {
    "symbol": "string",
    "logoUrl": "string",
    "contractAddress": "string",
    "chainId": "number",
    "minAmount": "bigint",
    "maxAmount": "bigint",
    "decimals": "number"
}

interface Response {
    status: number;
    data: {
        "resultCode": "string",
        "msg": "string",
        "partnerTokens": IToken[]
    }

}

interface ClaimAvailableResponse {
    status: number;
    data: {
        resultCode: string,
        msg: string,
        claimable: boolean,
        remainingTime: number
    }

}

const Wallet = () => {
    // const {connectWallet} = useWallet();
    // const walletAddress = useAuthStore((state) => state.userAccount);
    const [tokenList, setTokeList] = useState<IToken[]>([])
    const [remainTime, setRemainTime] = useState<number>(0)
    const [isClaimAvailable, setIsClaimAvailable] = useState<boolean>(false)

    // const onWalletConnect = async () => {
    //     const address = await connectWallet();
    //     if (address === null) {
    //         alert(METAMASK_LOCKED_OR_UNINSTALL);
    //         return;
    //     }
    //     useAuthStore.getState().setUserAccount(address);
    // };
    //
    // const onWalletDisconnect = () => {
    //     //  Disconnect 시 logout
    //     useAuthStore.getState().logout();
    //     useAuthStore.getState().setUserAccount(null);
    //     alert(DISCONNECTED);
    // };
    const fetchPartnerTokens = async () => {
        try {
            const API_ENDPOINT = `${process.env.REACT_APP_API_URL}/infiniteSpin/mega8/airdrop/partnerToken`
            const res: Response = await API.get(API_ENDPOINT)
            setTokeList(res.data.partnerTokens)
        } catch (err) {
            console.error(err)
        }
    }
    const fetchClaimAvailable = async () => {
        try {
            const API_ENDPOINT = `${process.env.REACT_APP_API_URL}/infiniteSpin/mega8/airdrop/claim/available `
            const res: ClaimAvailableResponse = await API.get(API_ENDPOINT, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('accessToken')}`
                }
            })
            setIsClaimAvailable(res.data.claimable)
            setRemainTime(res.data.remainingTime)
        } catch (err) {
            console.error(err)
        }
    }
    useEffect(() => {
        void fetchPartnerTokens();
        void fetchClaimAvailable()
    }, []);

    return (
        <WalletWrapper>
            <WalletTitle>Get $MG8 if you have one of these coins</WalletTitle>
            <PartnerToken tokenList={tokenList} remainTime={remainTime} isClaimAvailable={isClaimAvailable}/>
            {/*{!walletAddress ? (*/}
            {/*    <WalletContainer onClick={onWalletConnect}>*/}
            {/*        Connect Wallet*/}
            {/*    </WalletContainer>*/}
            {/*) : (*/}
            {/*    <WalletContainer onClick={onWalletDisconnect}>*/}
            {/*        Connected*/}
            {/*    </WalletContainer>*/}
            {/*)}*/}
        </WalletWrapper>
    );
};

export default Wallet;

const WalletWrapper = styled.div`
    width: 1200px;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 160px;
    margin-bottom: 160px;
`;

const WalletTitle = styled.h3`
    font-size: 28px;
    margin-bottom: 56px;
`;

const WalletContainer = styled.button`
    margin-top: 40px;
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
