import styled from "styled-components";
import {theme} from "../../styles/theme";
import Reward from "./Reward";
import Points from "./Points";
import API from "../../apis/Api";
import {useEffect, useState} from "react";

interface Response {
    status: number;
    data: {
        resultCode: string,
        msg: string,
        claimable: boolean
    }
}

const Daily = () => {
    const API_ENDPOINT = `${process.env.REACT_APP_API_URL}/infiniteSpin/mega8/claim/available`;
    const [isFetch, setIsFetch] = useState<boolean>(false);
    const [isClaimable, setIsClaimable] = useState<boolean>(false);
    useEffect(() => {
        const fetchIsClaimAvailable = async () => {
            try {
                const res: Response = await API.get(API_ENDPOINT)
                setIsClaimable(res.data.claimable)
                setIsFetch(!isFetch)
            } catch (err) {
                console.error(err);
            }
        }
        void fetchIsClaimAvailable()
    }, [API_ENDPOINT, isFetch])
    return (
        <DailyWrapper>
            <TitleContainer>
                <MainTitle>Daily dose of $MG8</MainTitle>
                <SubTitle>Login 7 days in a row, and your rewards will grow.</SubTitle>
            </TitleContainer>
            <DayWrapper>
                <ContentWrapper>
                    <Reward/>
                    <Points isClaimable={isClaimable}/>
                </ContentWrapper>
                {isClaimable ?
                    <ContentAlertText>
                        You can claim up to
                        <strong style={{fontWeight: 'bold'}}> 50,000p</strong> at once.
                    </ContentAlertText> :
                    <ContentAlertText style={{color: '#b81414'}}>Insufficient POINT to claim.</ContentAlertText>}
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

