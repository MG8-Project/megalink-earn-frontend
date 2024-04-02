import styled from "styled-components";
import PartnerToken from "./PartnerToken";
import API from "../../apis/Api";
import {useEffect, useState} from "react";
import { useAuthStore } from "../../store/authStore";


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
    const isLogin = useAuthStore((state) => state.isLoggedIn);
    const [tokenList, setTokeList] = useState<IToken[]>([])
    const [remainTime, setRemainTime] = useState<number>(0)
    const [isClaimAvailable, setIsClaimAvailable] = useState<boolean>(false)

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
        void fetchClaimAvailable();
    }, [isLogin, isClaimAvailable]);

    return (
        <WalletWrapper>
            <WalletTitle>Get $MG8 if you have one of these coins</WalletTitle>
            <PartnerToken tokenList={tokenList} remainTime={remainTime} isClaimAvailable={isClaimAvailable} setIsClaimAvailable={setIsClaimAvailable} isLogin={isLogin}/>
        </WalletWrapper>
    );
};

export default Wallet;

const WalletWrapper = styled.div`
    width: 1200px;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const WalletTitle = styled.h3`
    font-size: 28px;
    margin-bottom: 56px;
`;

