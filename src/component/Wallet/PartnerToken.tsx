import styled from "styled-components";
import {theme} from "../../styles/theme";
import {coinList} from "../../constants";
import {useEffect, useState} from "react";
import {useAuthStore} from "../../store/authStore";
import {IToken} from "./index";
import API from "../../apis/Api";

interface PartnerTokenProps {
    tokenList: IToken[]
}

interface Response {
    status: number;
    data: {
        "resultCode": "string",
        "msg": "string",
        "address": "string",
        "assets": [
            {
                "address": "string",
                "symbol": "string",
                "decimals": "number",
                "chainId": "number",
                "balance": "bigint"
            }
        ]
    }
}

const PartnerToken = (props: PartnerTokenProps) => {
    const {tokenList} = props;
    const userAddress = useAuthStore((state) => state.userAccount);
    const [coins, setCoins] = useState(coinList);

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

    const fetchBalances = async () => {
        try {
            const API_ENDPOINT = `${process.env.REACT_APP_API_URL}/infiniteSpin/mega8/airdrop/balanceAll`
            const res: Response = await API.get(API_ENDPOINT, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('accessToken')}`
                }
            })
            // console.log(res)

        } catch (err) {
            console.error(err)
        }
    }

    useEffect(() => {
        void fetchBalances()
    }, []);
    return (
        <CardWrapper>
            {tokenList.map((item, index) => (
                <CardBox key={index}>
                    <CardBoxImg src={item.logoUrl} alt=""/>
                    <div>{item.symbol}</div>
                    {/*<CardAmountBox>{item.balance}/{item.amount}</CardAmountBox>*/}
                </CardBox>
            ))}
        </CardWrapper>
    );
};

export default PartnerToken;

const CardWrapper = styled.div`
    display: flex;
    gap: 24px;
`;

const CardBox = styled.div`
    width: 384px;
    height: 200px;
    border-radius: 16px;
    background-color: ${theme.colors.bg.box};
    display: flex;
    flex-direction: column;
    gap: 20px;
    align-items: center;
`;

const CardBoxImg = styled.img`
    width: 64px;
    height: 64px;
    margin-top: 40px;
`;
