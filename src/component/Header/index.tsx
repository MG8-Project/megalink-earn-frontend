import {Link} from "react-router-dom";
import styled from "styled-components";
import {headerLogo} from "../../assets/images";
import {useWallet} from "../../hooks/useWallet";
import {useAuthStore} from "../../store/authStore";
import {DISCONNECTED, METAMASK_LOCKED_OR_UNINSTALL} from "../../constants";

const Header = () => {
    const {connectWallet} = useWallet();
    const walletAddress = useAuthStore((state) => state.userAccount);

    const onWalletConnect = async () => {
        const address = await connectWallet();
        if (address === null) {
            alert(METAMASK_LOCKED_OR_UNINSTALL);
            return;
        }
        useAuthStore.getState().setUserAccount(address);
    };

    const onWalletDisconnect = () => {
        useAuthStore.getState().logout();
        window.location.reload();
        alert(DISCONNECTED);
    };

    const clickMenu = (id: string) => {
        const destinationSection = document.getElementById(id);
        if (destinationSection) {
            destinationSection.scrollIntoView({behavior: "smooth"})
        }
    }
    return (
        <HeaderWrapper>
            <HeaderLogo src={headerLogo} alt=""/>
            <div>
                <HeaderUl>
                    <li style={{cursor: "pointer"}}>
                        <Link to={"/"}>Home</Link>
                    </li>
                    <li style={{cursor: "pointer"}} onClick={() => clickMenu('leaderboard')}>LeaderBoard</li>
                </HeaderUl>
            </div>
            {!walletAddress ? (
                <WalletContainer onClick={onWalletConnect}>
                    Connect Wallet
                </WalletContainer>
            ) : (
                <WalletContainer onClick={onWalletDisconnect}>
                    Connected
                </WalletContainer>
            )}
        </HeaderWrapper>
    );
};

export default Header;

const HeaderWrapper = styled.div`
    z-index: 999;
    display: flex;
    position: fixed;
    justify-content: space-around;
    align-items: center;
    width: 100%;
    background-color: #000000;
    height: 80px;

    li {
        cursor: pointer;
        height: 80px;
        display: flex;
        align-items: center;

        &:hover {
            border-bottom: 2px solid #d9d9d9;
        }
    }
`;

const HeaderLogo = styled.img`
    width: 210px;
    height: 48px;
    cursor: pointer;
`;

const HeaderUl = styled.ul`
    display: flex;
    width: 277px;
    font-size: 18px;
    justify-content: space-between;
`;

const WalletContainer = styled.button`
    display: flex;
    width: 148px;
    height: 40px;
    padding: 12px 16px;
    justify-content: center;
    align-items: center;
    gap: 10px;
    border-radius: 100px;
    background: #006ebe;
    font-size: 16px;
    font-weight: 500;
    line-height: 100%;
`;
