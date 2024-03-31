import styled from "styled-components";
import {theme} from "../../styles/theme";
import Reward from "./Reward";
import Points from "./Points";
import {useEffect, useState} from "react";
import API from "../../apis/Api";


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

const Daily = () => {
    const [currentMG8, setCurrentMG8] = useState(0);
    const [currentPoint, setCurrentPoint] = useState(0);
    const [exchangeRatio, setExchangeRatio] = useState(0);
    const [minAmount, setMinAmount] = useState<bigint>(BigInt(0));
    const [maxAmount, setMaxAmount] = useState<bigint>(BigInt(0));
    const [decimal, setDecimal] = useState(0)

    const isAvailableClaim = currentMG8 >= minAmount
    const addCommas = (num: number) => {
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
    const fetchCurrentClaim = async () => {
        try {
            const API_ENDPOINT = `${process.env.REACT_APP_API_URL}/infiniteSpin/mega8/claim/info`
            const res: CurrentClaimResponse = await API.get(API_ENDPOINT, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('accessToken')}`
                }
            })
            // "Unable Claim" 에러처리
            if (res.data.resultCode === '40') throw new Error(res.data.resultCode)
            setCurrentPoint(res.data.currentPoints)
            setCurrentMG8(res.data.mg8Amount)
            setExchangeRatio(res.data.exchangeRatio)
            setDecimal(res.data.decimals)
        } catch (error) {
            // FIXME: 에러처리 추가
            console.error(error)
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
    useEffect(() => {
        void fetchCurrentClaim()
        void fetchMinClaim()
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
                        exchangeRatio={exchangeRatio}
                        minAmount={minAmount}
                        maxAmount={maxAmount}
                        decimal={decimal}
                        currentPoint={currentPoint}/>
                </ContentWrapper>
                {isAvailableClaim ? <ContentAlertText>
                        *CLAIM NOTICE : You can claim up to
                        {/*<strong style={{fontWeight: 'bold'}}> {addCommas(maxAmount)}p</strong> at once.*/}
                    </ContentAlertText> :
                    <ContentAlertText style={{color: '#b81414'}}>Insufficient POINT to claim.</ContentAlertText>
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

