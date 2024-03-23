import styled from "styled-components";
import {useWallet} from "../../hooks/useWallet";
import {useAuthStore} from "../../store/authStore";
import ApiPoints from "../../apis/ApiPoints";
import {useState} from "react";
import {LOGIN_FAILED, LOGIN_SUCCESS, METAMASK_NOT_INSTALLED} from "../../constants";

// FIXME: LoginResponse 확인 후 프로퍼티 수정하기
interface LoginResponse {
    resultCode: string;
}

const Points = () => {
    const {connectWallet} = useWallet();
    const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
    const walletAddress = useAuthStore((state) => state.userAccount);
    const [loginAttemptFailed, setLoginAttemptFailed] = useState(false);

    const clickLogin = async () => {
        try {
            let address = walletAddress || await connectWallet();
            if (!address) {
                alert(METAMASK_NOT_INSTALLED);
                return;
            }
            console.log("Connected Address:", address);
            const loginResponse: LoginResponse = await ApiPoints.login(address);
            console.log(loginResponse, loginResponse.resultCode, loginResponse.resultCode !== '1');
            if (loginResponse.resultCode !== '1') {
                throw new Error(LOGIN_FAILED);
            }
            console.log(LOGIN_SUCCESS, loginResponse.resultCode);
            useAuthStore.getState().login(address);
        } catch (error) {
            console.error("An error occurred during login process:", error);
            setLoginAttemptFailed(true);
        }
    };

    return (
        <PointsWrapper>
            <TextWrapper>
                <div>My Total MG8 Points</div>
                <PointText>-P</PointText>
            </TextWrapper>
            {(!isLoggedIn || loginAttemptFailed) && (
                <LoginButton onClick={clickLogin}>Login</LoginButton>
            )}
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
