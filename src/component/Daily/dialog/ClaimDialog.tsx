import {forwardRef} from "react";
import styled from "styled-components";
import {theme} from "../../../styles/theme";
import {close} from "../../../assets/images"
import {BrowserProvider, Contract} from "ethers";
import {Vault, VaultAbi} from "../../../typechain-types/contracts/Vault";

interface ClaimDialogProps {
    handleCloseDialog: () => void;
    exchangeRatio: number;
    currentPoint: number;
    currentMG8: number
    minAmount: number
}

const ClaimDialog = forwardRef((props: ClaimDialogProps, ref: any) => {
    const {minAmount, handleCloseDialog, exchangeRatio, currentPoint, currentMG8} = props;
    const addCommas = (num: number) => {
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
    const isButtonActive = minAmount <= currentMG8;
    const claim = async () => {
        try {
            if (!isButtonActive) {
                return;
            }
            console.log('claim start')
            const provider = new BrowserProvider(window.ethereum);
            const vault: Vault = new Contract(process.env.REACT_APP_CONTRACT_VAULT, VaultAbi, provider) as unknown as Vault
            const signer = await provider.getSigner(0)
            const res: any = await vault.claimableAmount(await signer.getAddress())
            console.log(res, "?")
            console.log('bnbamount: ', res._bnbAmount)
            console.log('dd', res._mg8Amount)
            // console.log('contract? : ', await vault.claimableAmount(await signer.getAddress()))
            // await vault.claimMG8(currentPoint);
        } catch (error) {
            console.error(error)
        }
    }
    // claimMg8 -> req는 point로 보내기
    const handleClick = () => {
        void claim();
    }

    return (
        <DialogWrapper ref={ref}>
            <DialogContent>
                <DialogIcon>
                    <CloseImg src={close} onClick={handleCloseDialog}/>
                </DialogIcon>
                <DialogTitleWrapper>
                    <DialogTitle>Transaction Request</DialogTitle>
                    <DialogSubTitle>MG8 Point Claim</DialogSubTitle>
                </DialogTitleWrapper>
                <DialogContentWrapper>
                    <DialogContentInfo>
                        <p>MG8 Point Convert Info</p>
                        <p>1p = {exchangeRatio}MG8</p>
                    </DialogContentInfo>
                    <DialogContentCurrentStatus>
                        <DialogContentInfo>
                            <p style={{fontSize: "1.5rem", fontWeight: 'normal'}}>Your Current Point</p>
                            <p style={{fontSize: "1.8rem", fontWeight: 'bold'}}> {addCommas(currentPoint)} p</p>
                        </DialogContentInfo>
                        <DialogContentInfo>
                            <p style={{fontSize: "1.5rem", fontWeight: 'normal'}}>Your Will Received</p>
                            <p style={{fontSize: "1.8rem", fontWeight: 'bold'}}> {addCommas(currentMG8)} MG8</p>
                        </DialogContentInfo>
                    </DialogContentCurrentStatus>
                </DialogContentWrapper>
                <DialogProgressWrapper>
                    <p style={{fontSize: "1.5rem", fontWeight: 'normal', color: '#fff'}}>*Gas fee will be paid in
                        BNB</p>
                    <DialogProgressbar>
                        <DialogProgressStatusActiveCircle/>
                        <DialogProgressLine/>
                        <DialogProgressStatusDisableCircle/>
                    </DialogProgressbar>
                    <DialogProgressbar>
                        <DialogProgressStatusText>Activate</DialogProgressStatusText>
                        <DialogProgressLineInvisible/>
                        <DialogProgressStatusTextRight>Claim</DialogProgressStatusTextRight>
                    </DialogProgressbar>
                </DialogProgressWrapper>
                <DialogButtonWrapper>
                    <DialogButton
                        onClick={handleClick}
                        style={{color: isButtonActive ? '#fff' : theme.colors.bg.icon}}>
                        Active Claim
                    </DialogButton>
                </DialogButtonWrapper>
            </DialogContent>
        </DialogWrapper>
    )
})

export default ClaimDialog;

const DialogWrapper = styled.dialog`
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
const DialogContent = styled.section`
    gap: 15px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 400px;
    height: auto;
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
const DialogTitleWrapper = styled.section`
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
const DialogProgressStatusActiveCircle = styled.div`
    border-radius: 100%;
    background: #fff;
    border: 5px solid ${theme.colors.bg.iconHover};
    padding: 10px;

`
const DialogProgressStatusDisableCircle = styled.div`
    border-radius: 100%;
    background: transparent;
    border: 5px solid ${theme.colors.bg.iconHover};
    padding: 10px;
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