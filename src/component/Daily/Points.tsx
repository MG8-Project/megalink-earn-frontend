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
import {BrowserProvider, Contract, toBeHex} from "ethers";
import {Vault} from "../../typechain-types";
import {VaultAbi} from "../../typechain-types/contracts/Vault";
import AlertDialog from "./dialog/AlertDialog";
import {DOMAIN_SEPARATOR} from "./Reward";

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
    minAmount: bigint;
    maxAmount: bigint;
    decimal: number;
}

const Points = (props: PointsProps) => {
    const {decimal, maxAmount, minAmount, exchangeRatio, currentPoint, currentMG8} = props;
    const {connectWallet} = useWallet();
    const [isClaimable, setIsClaimable] = useState<boolean>(false);
    const claimDialogRef = useRef<HTMLDialogElement | null>(null)
    const alertDialogRef = useRef<HTMLDialogElement>(null)
    const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
    const walletAddress = useAuthStore((state) => state.userAccount);
    const [loginAttemptFailed, setLoginAttemptFailed] = useState(false);
    const [myPoints, setMyPoints] = useState(0);

    const [receivedMG8, setReceivedMG8] = useState(0)
    const [hash, setHash] = useState('')
    const [isTransactionComplete, setIsTransactionComplete] = useState(false)
    const [isActivate, setIsActivate] = useState(false)

    const getClaimableAmount = async () => {
        const provider = new BrowserProvider(window.ethereum);
        const vault: Vault = new Contract(process.env.REACT_APP_CONTRACT_VAULT, VaultAbi, provider) as unknown as Vault
        const chainId = await window.ethereum.request({method: "eth_chainId"});
        if (chainId.toString() !== DOMAIN_SEPARATOR.chainId.toString()) {
            await window.ethereum.request({
                method: "wallet_switchEthereumChain",
                params: [{chainId: toBeHex(97)}]
            })
            const signer = await provider.getSigner(0)
            const res: any = await vault.claimableAmount(await signer.getAddress())
            setReceivedMG8(maxAmount <= res._mg8Amount ? maxAmount : res._mg8Amount)
            setIsActivate(true)
        }

    }
    const handleOpenDialog = (refCategory: string) => {
        const dialogRef = refCategory === 'claim' ? claimDialogRef : alertDialogRef
        void getClaimableAmount()
        dialogRef.current?.showModal()
    }
    const handleCloseDialog = (refCategory: string) => {
        switch (refCategory) {
            case 'claim':
                claimDialogRef.current?.close()
                break;
            case 'alert':
                alertDialogRef.current?.close()
                break;
            default:
                alertDialogRef.current?.close()
                claimDialogRef.current?.close()
                break;
        }
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
        if (isLoggedIn) {
            const interval = setInterval(fetchMyPoints, 5000);
            return () => clearInterval(interval);
        }
    }, [walletAddress, fetchMyPoints, isLoggedIn]);


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

    // FIXME: 테스트떄문에 ! 로 해놓음 바꿔야함ㄴ
    let buttonContent;
    if (!isLoggedIn || loginAttemptFailed) {
        buttonContent = (<LoginButton onClick={clickLogin}>Login</LoginButton>);
    } else {
        buttonContent = (<ClaimButton
            onClick={!isClaimable ? () => handleOpenDialog('claim') : null}
            style={{color: isClaimable ? '#fff' : theme.colors.bg.icon}}>
            {isClaimable ? 'Activate Claim' : 'Claim All'}
        </ClaimButton>)
    }
    return (
        <PointsWrapper>
            <button onClick={() => handleOpenDialog('alert')}>test</button>
            <TextWrapper>
                <div>My Total MG8 Points</div>
                <PointText>{isLoggedIn ? myPoints : '-'} P</PointText>
            </TextWrapper>
            {buttonContent}
            <ClaimDialog ref={claimDialogRef}
                         setHash={setHash}
                         minAmount={minAmount}
                         isActivate={isActivate}
                         receivedMG8={receivedMG8 / (10 ** decimal)}
                         exchangeRatio={exchangeRatio}
                         currentPoint={currentPoint}
                         setIsTransactionComplete={setIsTransactionComplete}
                         handleOpenDialog={handleOpenDialog}
                         handleCloseDialog={handleCloseDialog}
            />
            <AlertDialog
                ref={alertDialogRef}
                hash={hash}
                isTransactionComplete={isTransactionComplete}
                receivedMG8={receivedMG8 / (10 ** decimal)}
                handleCloseDialog={handleCloseDialog}
            />
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

const StyledDialog = styled.dialog`
    background: darkblue;
    width: 100vw;
`
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
