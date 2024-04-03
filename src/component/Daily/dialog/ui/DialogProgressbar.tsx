import styled from "styled-components";
import {theme} from "../../../../styles/theme";

interface ClaimDialogProgressbarProps {
    isNetworkChange: boolean
}

const ClaimDialogProgressbar = (props: ClaimDialogProgressbarProps) => {
    const {isNetworkChange} = props;
    return (
        <DialogProgressWrapper>
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
    )
}
export default ClaimDialogProgressbar
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