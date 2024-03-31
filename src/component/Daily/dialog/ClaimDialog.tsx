import {Dispatch, forwardRef, SetStateAction} from "react";
import styled from "styled-components";
import {theme} from "../../../styles/theme";
import {close} from "../../../assets/images"
import {Vault, VaultAbi} from "../../../typechain-types/contracts/Vault";
import Spinner from "../../ui/Spinner";
import {BrowserProvider, Contract, parseUnits} from "ethers";


interface ClaimDialogProps {
    receivedMG8: number;
    minAmount: bigint
    handleOpenDialog: (refCategory: string) => void;
    handleCloseDialog: (refCategory: string) => void;
    exchangeRatio: number;
    currentPoint: number;
    setHash: Dispatch<SetStateAction<string>>
    isNetworkChange: boolean;
    setIsTransactionComplete: Dispatch<SetStateAction<boolean>>
}

const ClaimDialog = forwardRef((props: ClaimDialogProps, ref: any) => {
    const {
        isNetworkChange,
        setIsTransactionComplete,
        receivedMG8,
        minAmount,
        handleOpenDialog,
        handleCloseDialog,
        exchangeRatio,
        currentPoint,
        setHash
    } = props;

    const addCommas = (num: number) => {
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
    const isButtonActive = minAmount > receivedMG8;


    const claim = async () => {
        try {
            if (!isButtonActive) {
                return;
            }
            const provider = new BrowserProvider(window.ethereum);
            const signer = await provider.getSigner()
            const vault: Vault = new Contract(process.env.REACT_APP_CONTRACT_VAULT, VaultAbi, signer) as unknown as Vault
            const amount = parseUnits((receivedMG8 / exchangeRatio).toString())
            const tx = await vault.claimMG8(amount);
            setHash(tx.hash);
            setIsTransactionComplete(true)
            handleOpenDialog('alert')
        } catch (error) {
            console.error(error)
            handleOpenDialog('alert')
        }
    }
    const handleClick = () => {
        void claim();
    }


    return (
        <DialogWrapper ref={ref}>
            <DialogContent>
                {isNetworkChange ? null :
                    <SpinnerWrapper>
                        <Spinner size={50}/>
                        <p style={{color: '#fff'}}> 네트워크를 변경중입니다...</p>
                        <SpinnerButton onClick={() => handleCloseDialog('claim')}>취소</SpinnerButton>
                    </SpinnerWrapper>}
                <DialogIcon>
                    <CloseImg src={close} onClick={() => handleCloseDialog('claim')}/>
                </DialogIcon>
                <DialogTitleWrapper>
                    <DialogTitle>Transaction Request</DialogTitle>
                    <DialogSubTitle>MG8 Point Claim</DialogSubTitle>
                </DialogTitleWrapper>
                <DialogContentWrapper>
                    <DialogContentInfo>
                        <p>MG8 Point Convert Info</p>
                        <p>1p = {isNetworkChange ? exchangeRatio : '...'}MG8</p>
                    </DialogContentInfo>
                    <DialogContentCurrentStatus>
                        <DialogContentInfo>
                            <p style={{fontSize: "1.5rem", fontWeight: 'normal'}}>Your Current Point</p>
                            <p style={{
                                fontSize: "1.8rem",
                                fontWeight: 'bold'
                            }}> {isNetworkChange ? addCommas(currentPoint) : '...'} p</p>
                        </DialogContentInfo>
                        <DialogContentInfo>
                            <p style={{fontSize: "1.5rem", fontWeight: 'normal'}}>Your Will Received</p>
                            <p style={{
                                fontSize: "1.8rem",
                                fontWeight: 'bold'
                            }}> {isNetworkChange ? addCommas(receivedMG8) : '...'} MG8</p>
                        </DialogContentInfo>
                    </DialogContentCurrentStatus>
                </DialogContentWrapper>
                <DialogProgressWrapper>
                    {/*{isActivate ? null : <SpinnerWrapper> <Spinner/></SpinnerWrapper>}*/}
                    <p style={{fontSize: "1.5rem", fontWeight: 'normal', color: '#fff'}}>*Gas fee will be paid in
                        BNB</p>
                    <DialogProgressbar>
                        <DialogProgressStatusCircle style={{background: '#fff'}}/>
                        <DialogProgressLine/>
                        <DialogProgressStatusCircle
                            style={{background: isNetworkChange ? '#fff' : 'transparent'}}/>
                    </DialogProgressbar>
                    <DialogProgressbar>
                        <DialogProgressStatusText>Activate</DialogProgressStatusText>
                        <DialogProgressLineInvisible/>
                        <DialogProgressStatusTextRight>Claim</DialogProgressStatusTextRight>
                    </DialogProgressbar>
                </DialogProgressWrapper>
                <DialogButtonWrapper>
                    <DialogButton
                        onClick={isNetworkChange ? handleClick : null}
                        style={{color: isButtonActive ? '#fff' : theme.colors.bg.iconHover}}>
                        {isNetworkChange ? 'Claim All' : 'Active Claim'}
                    </DialogButton>
                </DialogButtonWrapper>
            </DialogContent>
        </DialogWrapper>
    )
})

export default ClaimDialog;

export const DialogWrapper = styled.dialog`
    border: none;
    position: fixed;
    width: 100%;
    height: 100vh;
    background: transparent;

    &::backdrop {
        background-color: #000;
        opacity: 0.7;
    }

    &::after {
        content: '';
        opacity: 0.7;
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: #000;
        z-index: -1;
    }
`
export const DialogContent = styled.section`
    gap: 15px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 400px;
    height: 50rem;
    background: ${theme.colors.bg.main};
    border: 3px solid ${theme.colors.bg.icon};
    border-radius: 20px;
    display: grid;
    grid-template-areas:
        "icon" "title" "content" "progress" "button";
    grid-template-rows: 20px 0.7fr 1fr  1fr 0.5fr;
`
const DialogIcon = styled.section`
    padding: 30px 20px 20px 20px;
    grid-area: icon;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-end;
`
const CloseImg = styled.img`
    width: 12px;
    cursor: pointer;
`
export const DialogTitleWrapper = styled.section`
    grid-area: title;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: #fff;
    gap: 8px;
    margin-bottom: 10px;
`
const DialogTitle = styled.p`
    font-size: 2.5rem;
    font-weight: 600;
`
const DialogSubTitle = styled.p`
    color: #e6c319;
    font-size: 2rem;
`
const DialogContentWrapper = styled.section`
    grid-area: content;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: #fff;
    gap: 10px;
    margin-bottom: 20px;
`
const DialogContentInfo = styled.section`
    width: 80%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #fff;
    font-size: 1.5rem;
`
const DialogContentCurrentStatus = styled.section`
    background: ${theme.colors.bg.icon};
    width: 90%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 10px;
    border-radius: 20px;
    gap: 20px;
`

const DialogProgressWrapper = styled.section`
    grid-area: progress;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 10px;
`
const DialogProgressbar = styled.section`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
`
const DialogProgressStatusCircle = styled.div`
    border-radius: 100%;
    border: 5px solid ${theme.colors.bg.iconHover};
    padding: 10px;
    transition: all 0.5s ease-in-out;
`
const DialogProgressLine = styled.div`
    width: 250px;
    height: 5px;
    background: ${theme.colors.bg.iconHover};
`
const DialogProgressStatusText = styled.div`
    border: none;
    padding: 10px;
    font-size: 1.4rem;
    color: #fff;
`
const DialogProgressStatusTextRight = styled.div`
    border: none;
    padding: 10px;
    font-size: 1.4rem;
    color: #fff;
    margin-right: 5px;
`
const DialogProgressLineInvisible = styled.div`
    width: 215px;
    height: 5px;
    background: transparent;
`
const DialogButtonWrapper = styled.section`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    grid-area: button;
`
const DialogButton = styled.button`
    width: 90%;
    padding: 10px;
    background: ${theme.colors.bg.icon};
    margin-bottom: 10px;
    border-radius: 10px;
    color: #fff;
    font-size: 1.5rem;
`
const SpinnerWrapper = styled.div`
    position: absolute;
    background-color: rgba(16, 17, 17, 0.8);
    width: 100%;
    height: 50rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border-radius: 20px;
    gap: 30px;
`
const SpinnerButton = styled.button`
    padding: 10px 20px;
    border-radius: 10px;
    background: ${theme.colors.bg.icon};
    color: #fff;
`