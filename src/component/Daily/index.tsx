import styled from "styled-components";
import {theme} from "../../styles/theme";
import Reward from "./Reward";
import Points from "./Points";
import {useEffect, useState} from "react";
import API from "../../apis/Api";
import {BrowserProvider, Contract, formatUnits} from "ethers";
import {Vault} from "../../typechain-types";
import {VaultAbi} from "../../typechain-types/contracts/Vault";


interface CurrentClaimResponse {
    status: number;
    data: {
        resultCode: string,
        msg: string,
        exchangeRatio: number,
        currentPoints: number,
        mg8Amount: number
        decimals: number
    }
}

interface MinClaimResponse {
    status: number;
    data: {
        resultCode: string,
        msg: string,
        minAmount: bigint,
        maxAmount: bigint
    }
}

interface IsClaimAvailableResponse {
    status: number;
    data: {
        resultCode: string,
        msg: string,
        claimable: boolean,
    }
}

const Daily = () => {
    const [currentMG8, setCurrentMG8] = useState(0);
    const [currentPoint, setCurrentPoint] = useState<bigint>(BigInt(0));
    const [exchangeRatio, setExchangeRatio] = useState(0);
    const [claimableAmount, setClaimableAmount] = useState<bigint>(BigInt(0));
    const [minAmount, setMinAmount] = useState<bigint>(BigInt(0));
    const [maxAmount, setMaxAmount] = useState<bigint>(BigInt(0));
    const [decimal, setDecimal] = useState(0)
    const [isClaimable, setIsClaimable] = useState<boolean>(false);

    const isAvailableClaim = currentMG8 >= minAmount
    const addCommas = (num: number) => {
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
    const convertNumber = (data: string) => {
        const numData = Number(data)
        if (numData < 1) return addCommas(numData)
        return addCommas(Math.floor(numData))
    }
    const fetchCurrentClaim = async () => {
        try {
            const API_ENDPOINT = `${process.env.REACT_APP_API_URL}/infiniteSpin/mega8/claim/info`
            const res: CurrentClaimResponse = await API.get(API_ENDPOINT, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('accessToken')}`
                }
            })
            if (res.data.resultCode === '40') throw new Error(res.data.resultCode)
            setCurrentPoint(BigInt(res.data.currentPoints))
            setCurrentMG8(res.data.mg8Amount)
            setDecimal(res.data.decimals)
        } catch (error) {
            // console.error(error)
            // FIXME: Error handling
        }
    }


    const fetchMinClaim = async () => {
        try {
            const API_ENDPOINT = `${process.env.REACT_APP_API_URL}/infiniteSpin/mega8/claim/minMaxAmount`
            const res: MinClaimResponse = await API.get(API_ENDPOINT)
            setMinAmount(res.data.minAmount)
            setMaxAmount(res.data.maxAmount)
        } catch (err) {
            console.error(err)
        }
    }
    const getExchangeRatio = async () => {
        try {
            const provider = new BrowserProvider(window.ethereum);
            const vault: Vault = new Contract(process.env.REACT_APP_CONTRACT_VAULT, VaultAbi, provider) as unknown as Vault
            // const chainId = await window.ethereum.request({method: "eth_chainId"});
            const signer = await provider.getSigner(0)
            const res = await vault.convertPointToMG8Ratio()
            const getClaimableAmount = await vault.claimableAmount(await signer.getAddress())
            setExchangeRatio(Number(res))
            setClaimableAmount(getClaimableAmount._mg8Amount)

        } catch (error) {
            console.error(error)
        }
    }
    useEffect(() => {
        void getExchangeRatio()
        void fetchCurrentClaim()
        void fetchMinClaim()
        const API_ENDPOINT = `${process.env.REACT_APP_API_URL}/infiniteSpin/mega8/claim/available`;
        const fetchIsClaimAvailable = async () => {
            try {
                const res: IsClaimAvailableResponse = await API.get(API_ENDPOINT, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('accessToken')}`
                    }
                })
                setIsClaimable(res.data.claimable)
            } catch (err) {
                console.error(err);
            }
        }
        void fetchIsClaimAvailable()
    }, [])


    return (
        <DailyWrapper>
            <TitleContainer>
                <MainTitle>Daily dose of $MG8</MainTitle>
                <SubTitle>Login 7 days in a row, and your rewards will grow.</SubTitle>
            </TitleContainer>
            <DayWrapper>
                <ContentWrapper>
                    <Reward/>
                    <Points
                        claimableAmount={claimableAmount}
                        isClaimable={isClaimable}
                        exchangeRatio={exchangeRatio}
                        minAmount={minAmount}
                        maxAmount={maxAmount}
                        decimal={decimal}
                        currentPoint={currentPoint}/>
                </ContentWrapper>
                {isClaimable ? (isAvailableClaim ?
                        <ContentAlertText>
                            *CLAIM NOTICE : You can claim up to&nbsp;
                            <strong style={{fontWeight: 'bold'}}>
                                {convertNumber(formatUnits(maxAmount, decimal))}
                            </strong>p at
                            once.
                        </ContentAlertText> :
                        <ContentAlertText style={{color: '#b81414'}}>
                            Insufficient POINT to claim.
                        </ContentAlertText>)
                    : null
                }
            </DayWrapper>
            <ContentAlertText>You can claim your points after the events ends.</ContentAlertText>
        </DailyWrapper>
    );
};

export default Daily;

const DailyWrapper = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    margin-bottom: 160px;
`;
const TitleContainer = styled.div`
    margin-top: 160px;
    display: flex;
    align-items: center;
    flex-direction: column;
    gap: 40px;
`;

const MainTitle = styled.div`
    font-weight: 600;
    font-size: 48px;
`;

const SubTitle = styled.div`
    font-weight: 400;
    font-size: 20px;
`;

const DayWrapper = styled.div`
    width: 1200px;
    height: 310px;
    background-color: ${theme.colors.bg.box};
    border-radius: 16px;
    margin-top: 80px;
    padding: 48px 90px 48px 48px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const ContentWrapper = styled.section`
    margin-top: 30px;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: space-between;
    //align-items: center;
`
const ContentAlertText = styled.h2`
    margin-top: 20px;
    padding: 10px;
    font-weight: 400;
    font-size: 20px;
`

