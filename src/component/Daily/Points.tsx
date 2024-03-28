import styled from "styled-components";
import {useWallet} from "../../hooks/useWallet";
import {useAuthStore} from "../../store/authStore";
import ApiPoints from "../../apis/ApiPoints";
import {useCallback, useEffect, useRef, useState} from "react";
import {LOGIN_FAILED, METAMASK_LINK_FAILED} from "../../constants";
import ApiDaily from "../../apis/ApiDaily";
import ClaimDialog from "./dialog/ClaimDialog";
import {theme} from "../../styles/theme";
import API from "../../apis/Api";

// FIXME: LoginResponse 확인 후 프로퍼티 수정하기
interface LoginResponse {
    resultCode: string;
}

interface MyPointsResponse {
    totalPoints: number | null;
    resultCode: string;
    msg: string;
}


interface IsClaimAvailableResponse {
    status: number;
    data: {
        resultCode: string,
        msg: string,
        claimable: boolean
    }
}

interface PointsProps {
    exchangeRatio: number;
    currentPoint: number;
    currentMG8: number;
}

const Points = (props: PointsProps) => {
    const {exchangeRatio, currentPoint, currentMG8} = props;
    const {connectWallet} = useWallet();
    const [isClaimable, setIsClaimable] = useState<boolean>(false);
    const dialogRef = useRef<HTMLDialogElement | null>(null)
    const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
    const walletAddress = useAuthStore((state) => state.userAccount);
    const [loginAttemptFailed, setLoginAttemptFailed] = useState(false);
    const [myPoints, setMyPoints] = useState(0);

    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const handleOpenModal = () => {
        setIsDialogOpen(true)
        dialogRef.current?.showModal()
    }
    const handleCloseDialog = () => {
        setIsDialogOpen(false)
        dialogRef.current?.close()
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
    }, [walletAddress, fetchMyPoints]);

    useEffect(() => {
        if (isDialogOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }

        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isDialogOpen]);

    useEffect(() => {
        const API_ENDPOINT = `${process.env.REACT_APP_API_URL}/infiniteSpin/mega8/claim/available`;
        const fetchIsClaimAvailable = async () => {
            try {
                const res: IsClaimAvailableResponse = await API.get(API_ENDPOINT)
                setIsClaimable(res.data.claimable)
            } catch (err) {
                console.error(err);
            }
        }
        void fetchIsClaimAvailable()
    }, [])
    return (
        <PointsWrapper>
            <TextWrapper>
                <div>My Total MG8 Points</div>
                <PointText>{isLoggedIn ? myPoints : '-'} P</PointText>
            </TextWrapper>
            {(!isLoggedIn || loginAttemptFailed) ? (
                    <LoginButton onClick={clickLogin}>Login</LoginButton>
                ) :
                <ClaimButton onClick={!isClaimable ? handleOpenModal : null}
                             style={{color: isClaimable ? '#fff' : theme.colors.bg.icon}}>
                    {isClaimable ? 'Activate Claim' : 'Claim All'}
                </ClaimButton>}
            {isDialogOpen ?
                <ClaimDialog ref={dialogRef}
                             currentMG8={currentMG8}
                             exchangeRatio={exchangeRatio}
                             currentPoint={currentPoint}
                             handleCloseDialog={handleCloseDialog}/>
                : null}
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
    border: 1px solid #ffffff;
    border-radius: 100px;
    font-size: 20px;
    padding: 12px 30px 12px 30px;
`

const StyledDialog = styled.dialog`
    background: darkblue;
    width: 100vw;
`