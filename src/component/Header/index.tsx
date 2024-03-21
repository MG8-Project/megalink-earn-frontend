import { Link } from "react-router-dom";
import styled from "styled-components";
import { headerLogo } from "../../assets/images";
import { useWallet } from "../../hooks/useWallet";
import { useAuthStore } from "../../store/authStore";

const Header = () => {
  const { connectWallet } = useWallet();
  const walletAddress = useAuthStore((state) => state.userAccount);

  const onWalletConnect = async () => {
    const address = await connectWallet();
    if (address === null) {
      alert("메타 마스크를 설치해주세요.");
      return;
    }
    console.log("연결된 주소:", address);
    useAuthStore.getState().setUserAccount(address);
  };

  const onWalletDisconnect = () => {
    useAuthStore.getState().setUserAccount(null);
    console.log("연결이 해제되었습니다.");
  };

  return (
    <HeaderWrapper>
      <HeaderLogo src={headerLogo} alt="" />
      <div>
        <HeaderUl>
          <li>
            <Link to={"/"}>Home</Link>
          </li>
          <li>
            <Link to={"/leaderboard"}>LeaderBoard</Link>
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
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  background-color: #000000;
  height: 80px;
`;

const HeaderLogo = styled.img`
  width: 210px;
  height: 48px;
`;

const HeaderUl = styled.ul`
  display: flex;
  width: 277px;
  font-size: 18px;
  justify-content: space-between;
  > li {
  }
`;

const WalletContainer = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  font-weight: 400;
  width: 140px;
  height: 40px;
  border: 1px solid #ffffff;
  border-radius: 100px;
  font-size: 16px;
`;
