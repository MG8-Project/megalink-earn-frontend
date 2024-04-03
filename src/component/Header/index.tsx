import { Link } from "react-router-dom";
import styled from "styled-components";
import { headerLogo } from "../../assets/images";
import { useWallet } from "../../hooks/useWallet";
import { useAuthStore } from "../../store/authStore";
import { DISCONNECTED, METAMASK_LOCKED_OR_UNINSTALL } from "../../constants";

const Header = () => {
  const { connectWallet } = useWallet();
  const walletAddress = useAuthStore((state) => state.userAccount);

  const onWalletConnect = async () => {
    const address = await connectWallet();
    if (address === null) {
      alert(METAMASK_LOCKED_OR_UNINSTALL);
      return;
    }
    // 아래 alert와 비슷한 역할을 하는것 같은데 우선 console.log로 작성되어있어 따로 alert로 변경하진 않았습니다.
    useAuthStore.getState().setUserAccount(address);
  };

  const onWalletDisconnect = () => {
    //  Disconnect 시 logout
    useAuthStore.getState().logout();
    // useAuthStore.getState().setUserAccount(null);
    // 같은 메서드인데 다른 컴포넌트에서는 alert여서 일단 alert로 통일 시켜놓았습니다.
    window.location.reload();
    alert(DISCONNECTED);
  };

  const clickMenu = (id: string) => {
    const destinationSection = document.getElementById(id);
    if (destinationSection) {
      const headerHeight = 200;
      const destinationOffset = destinationSection.offsetTop - headerHeight;
      window.scrollTo({ top: destinationOffset, behavior: "smooth" });
    }
  };
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  return (
    <HeaderWrapper>
      <HeaderLogo src={headerLogo} alt="" onClick={scrollToTop} />
      <div>
        <HeaderUl>
          <li style={{ cursor: "pointer" }} onClick={scrollToTop}>
            <Link to={"/"}>Home</Link>
          </li>
          <li
            style={{ cursor: "pointer" }}
            onClick={() => clickMenu("leaderboard")}
          >
            LeaderBoard
          </li>
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
  li {
    cursor: pointer;
    height: 80px;
    display: flex;
    align-items: center;

    &:hover {
      box-shadow: inset 0 -2px 0 #d9d9d9;
    }
  }
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
