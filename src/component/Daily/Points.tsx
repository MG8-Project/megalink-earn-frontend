import styled from "styled-components";
import {useWallet} from "../../hooks/useWallet";
import {useAuthStore} from "../../store/authStore";
import ApiPoints from "../../apis/ApiPoints";
import {useCallback, useEffect, useRef, useState} from "react";
import {LOGIN_FAILED, METAMASK_LINK_FAILED} from "../../constants";
import ApiDaily from "../../apis/ApiDaily";
import ClaimDialog from "./dialog/ClaimDialog";
import {theme} from "../../styles/theme";
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


interface PointsProps {
    isClaimable: boolean;
    exchangeRatio: number;
    currentPoint: number;
    minAmount: bigint;
    maxAmount: bigint;
    decimal: number;
}

const Points = (props: PointsProps) => {
    const {isClaimable, decimal, maxAmount, minAmount, exchangeRatio, currentPoint} = props;
    const {connectWallet} = useWallet();
    const claimDialogRef = useRef<HTMLDialogElement | null>(null)
    const alertDialogRef = useRef<HTMLDialogElement>(null)
    const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
    const walletAddress = useAuthStore((state) => state.userAccount);
    const [loginAttemptFailed, setLoginAttemptFailed] = useState(false);
    const [myPoints, setMyPoints] = useState(0);

    const [receivedMG8, setReceivedMG8] = useState(0)
    const [hash, setHash] = useState('')
    const [isTransactionComplete, setIsTransactionComplete] = useState(false)
    const [isNetworkChange, setIsNetworkChange] = useState(false)
    const [isButtonActive, setIsButtonActive] = useState(false)

    const getClaimableAmount = async () => {
        try {
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
            }
            setIsNetworkChange(true)
        } catch (error) {
            console.error(error)
            setIsNetworkChange(false)
            claimDialogRef.current?.close()
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


    let buttonContent;
    if (!isLoggedIn || loginAttemptFailed) {
        buttonContent = (<LoginButton onClick={clickLogin}>Login</LoginButton>);
    } else {
        if (isClaimable) {
            if (currentPoint === 0) {
                buttonContent =
                    <ClaimButton onClick={null} style={{color: theme.colors.bg.icon, fontSize: '18px'}}>No MG8
                        Point</ClaimButton>
            } else {
                if (isButtonActive) {
                    buttonContent = <ClaimButton onClick={() => handleOpenDialog('claim')}
                                                 style={{color: '#fff', fontSize: '20px'}}>Claim
                        All</ClaimButton>
                } else {
                    buttonContent =
                        <ClaimButton onClick={() => setIsButtonActive(true)} style={{color: '#fff', fontSize: '17px'}}>Activate
                            Claim</ClaimButton>
                }
            }
        } else {
            buttonContent = <ClaimButton onClick={null}
                                         style={{color: theme.colors.bg.icon, fontSize: '20px'}}>Disabled</ClaimButton>
        }
    }
    return (
        <PointsWrapper>
            <TextWrapper>
                <div>My Total MG8 Points</div>
                <PointText>{isLoggedIn ? myPoints : '-'} P</PointText>
            </TextWrapper>
            {buttonContent}
            <ClaimDialog ref={claimDialogRef}
                         setHash={setHash}
                         minAmount={minAmount}
                         isNetworkChange={isNetworkChange}
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

const ClaimButton = styled.button`
    margin-top: 36px;
    font-weight: 600;
    width: 150px;
    height: 56px;
    border: 1px solid gray;
    border-radius: 100px;
    color: gray;
`;
