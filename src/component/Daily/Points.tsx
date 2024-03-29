import styled from "styled-components";
import {useWallet} from "../../hooks/useWallet";
import {useAuthStore} from "../../store/authStore";
import ApiPoints from "../../apis/ApiPoints";
import {useCallback, useEffect, useState} from "react";
import {LOGIN_FAILED, METAMASK_LINK_FAILED} from "../../constants";
import ApiDaily from "../../apis/ApiDaily";

// FIXME: LoginResponse 확인 후 프로퍼티 수정하기
interface LoginResponse {
    resultCode: string;
}

interface MyPointsResponse {
    totalPoints: number | null;
    resultCode: string;
    msg: string;
}

const Points = () => {
    const {connectWallet} = useWallet();
    const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
    const walletAddress = useAuthStore((state) => state.userAccount);
    const [loginAttemptFailed, setLoginAttemptFailed] = useState(false);
    const [myPoints, setMyPoints] = useState(0);

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
            setLoginAttemptFailed(true);
            alert(LOGIN_FAILED);
        }
    };
    const fetchMyPoints = useCallback(async () => {
        try {
            const res: MyPointsResponse = await ApiDaily.myPoint(walletAddress)
            if (res.resultCode !== '1') {
                return
            }
            setMyPoints(res.totalPoints);
        } catch (error) {
            console.error('Error fetching total points:', error);
        }
    }, [walletAddress]);

    useEffect(() => {
        void fetchMyPoints();
        if (isLoggedIn) {
            const interval = setInterval(fetchMyPoints, 5000);
            return () => clearInterval(interval);
        }
    }, [walletAddress, fetchMyPoints, isLoggedIn]);

    let buttonContent;
    if (!isLoggedIn || loginAttemptFailed) {
        buttonContent = (<LoginButton onClick={clickLogin}>Login</LoginButton>);
    } else {
        buttonContent = (<ClaimButton>Claim All</ClaimButton>);
    }
    return (
        <PointsWrapper>
            <TextWrapper>
                <div>My Total MG8 Points</div>
                <PointText>{isLoggedIn ? myPoints : '-'} P</PointText>
            </TextWrapper>
            {buttonContent}
            {/* {(!isLoggedIn || loginAttemptFailed) && (
                <LoginButton onClick={clickLogin}>Login</LoginButton>
            )} */}
        </PointsWrapper>
    );
};
export default Points;

const PointsWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const TextWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 12px;
    font-weight: 600;
    font-size: 18px;
`;
const PointText = styled.div`
    font-size: 40px;
`;

const LoginButton = styled.button`
    margin-top: 36px;
    font-weight: 600;
    width: 120px;
    height: 56px;
    border: 1px solid #ffffff;
    border-radius: 100px;
    font-size: 20px;
`;
const ClaimButton = styled.button`
    margin-top: 36px;
    font-weight: 600;
    width: 150px;
    height: 56px;
    border: 1px solid gray;
    border-radius: 100px;
    font-size: 20px;
    color: gray;
`;