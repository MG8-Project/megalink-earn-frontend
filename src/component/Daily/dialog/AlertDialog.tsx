import {forwardRef} from "react";
import {DialogWrapper} from "./ClaimDialog";
import styled from "styled-components";
import {check, failed} from "../../../assets/images";
import {theme} from "../../../styles/theme";
import {Link} from "react-router-dom";

interface AlertDialogProps {
    claimableAmount: bigint;
    hash: string;
    handleCloseDialog: (refCategory: string) => void;
    isTransactionComplete: boolean;
}

const AlertDialog = forwardRef((props: AlertDialogProps, ref: any) => {
    const {isTransactionComplete, hash, claimableAmount, handleCloseDialog} = props;
    const renderComponent = () => {
        if (isTransactionComplete) {
            return (
                <DialogContentWrapper>
                    <div>Transaction Receipt</div>
                    <StyledImg src={check}/>
                    <div>{`You will receive ${claimableAmount} MG8`}</div>
                    <div style={{fontSize: '1.4rem'}}>*If not, plz check your transaction request status through the
                        link below
                    </div>
                    <Link to={`https://testnet.bscscan.com/tx/${props.hash}`}>
                        <StyledHashBox>
                            <div>View on BscScan {hash.slice(0, 8)}...</div>
                        </StyledHashBox>
                    </Link>
                </DialogContentWrapper>
            )
        }
        return (
            <DialogContentWrapper>
                <div>Transaction Failed</div>
                <StyledImg src={failed}/>
                {/*FIXME: 문구 바꾸기*/}
                <div style={{fontSize: '1.7rem', marginTop: '20px'}}>There seems to be some heavy traffic on Polygon
                    network.
                </div>
                <div style={{fontSize: '1.7rem'}}>Plz try a few moments later</div>
            </DialogContentWrapper>
        )
    }
    return (
        <DialogWrapper ref={ref}>
            <DialogContent>
                <DialogContentWrapper>
                    {renderComponent()}
                </DialogContentWrapper>
                <DialogButtonWrapper>
                    <DialogButton onClick={() => handleCloseDialog('all')}>OK</DialogButton>
                </DialogButtonWrapper>
            </DialogContent>
        </DialogWrapper>
    )
})
export default AlertDialog;

const StyledImg = styled.img`
    width: 70px;
`
const DialogContent = styled.section`
    //gap: 15px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 50rem;
    height: 40rem;
    background: ${theme.colors.bg.main};
    border: 3px solid ${theme.colors.bg.icon};
    border-radius: 20px;
    display: grid;
    grid-template-areas:
        "content" "button";
    grid-template-rows:  3fr 0.5fr;
    place-items: center;
`
const DialogContentWrapper = styled.section`
    padding: 10px;
    grid-area: content;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: #fff;
    gap: 8px;
    margin-bottom: 10px;
`
const StyledHashBox = styled.div`
    cursor: pointer;
    width: 30rem;
    margin-top: 20px;
    background: ${theme.colors.bg.iconHover};
    border-radius: 10px;
    padding: 10px 20px;
    color: #fff;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-size: 1.5rem;
`
const DialogButtonWrapper = styled.div`
    grid-area: button;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    margin-bottom: 10px;
`

const DialogButton = styled.button`
    color: #fff;
    width: 90%;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px;
    border-radius: 10px;
    background: ${theme.colors.bg.iconHover};
`