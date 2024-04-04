import styled from "styled-components";
import { useWallet } from "../../hooks/useWallet";
import { useAuthStore } from "../../store/authStore";
import ApiPoints from "../../apis/ApiPoints";
import { useRef, useState } from "react";
import { LOGIN_FAILED, METAMASK_LINK_FAILED } from "../../constants";
import ClaimDialog from "./dialog/ClaimDialog";
import { theme } from "../../styles/theme";
import { BrowserProvider, Contract, formatEther, toBeHex } from "ethers";
import { Vault } from "../../typechain-types";
import { VaultAbi } from "../../typechain-types/contracts/Vault";
import AlertDialog from "./dialog/AlertDialog";
import { DOMAIN_SEPARATOR } from "./Reward";

interface LoginResponse {
  resultCode: string;
}

interface PointsProps {
  doRerender: () => void;
  myPointsAPI: number;
  isClaimable: boolean;
  minAmount: bigint;
  maxAmount: bigint;
  decimal: number;
  exChangeRatioAPI: number;
}

const Points = (props: PointsProps) => {
  const {
    doRerender,
    myPointsAPI,
    exChangeRatioAPI,
    isClaimable,
    maxAmount,
    minAmount,
  } = props;

  const { connectWallet } = useWallet();
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const walletAddress = useAuthStore((state) => state.userAccount);

  const claimDialogRef = useRef<HTMLDialogElement | null>(null);
  const alertDialogRef = useRef<HTMLDialogElement>(null);

  const [loginAttemptFailed, setLoginAttemptFailed] = useState(false);

  const [myPointContract, setMyPointContract] = useState(0);

  const [hash, setHash] = useState("");
  const [isTransactionComplete, setIsTransactionComplete] = useState(false);
  const [isNetworkChange, setIsNetworkChange] = useState(false);
  const [isButtonActive, setIsButtonActive] = useState(false);

  const [claimableAmount, setClaimableAmount] = useState<bigint>(BigInt(0));
  const [exchangeRatioContract, setExchangeRatioContract] = useState(0);

  const getClaimableAmount = async () => {
    try {
      const provider = new BrowserProvider(window.ethereum);
      const vault: Vault = new Contract(
        process.env.REACT_APP_CONTRACT_VAULT,
        VaultAbi,
        provider
      ) as unknown as Vault;
      const chainId = await window.ethereum.request({ method: "eth_chainId" });
      if (chainId.toString() !== DOMAIN_SEPARATOR.chainId.toString()) {
        await window.ethereum.request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId: toBeHex(97) }],
        });
        const signer = await provider.getSigner(0);
        const convertPointToMG8Ratio: any =
          await vault.convertPointToMG8Ratio();
        const claimableAmountRes: any = await vault.claimableAmount(
          await signer.getAddress()
        );
        const currentPointRes =
          claimableAmountRes._mg8Amount * convertPointToMG8Ratio;
        const maxClaimableAmount =
          maxAmount > claimableAmountRes._mg8Amount
            ? claimableAmountRes._mg8Amount
            : maxAmount;

        setClaimableAmount(maxClaimableAmount);
        setExchangeRatioContract(Number(convertPointToMG8Ratio));
        setMyPointContract(parseFloat(formatEther(currentPointRes)));
        // setReceivedMG8(maxAmount <= res._mg8Amount ? maxAmount : res._mg8Amount)
      }

      setIsNetworkChange(true);
    } catch (error) {
      console.error(error);
      setIsNetworkChange(false);
      claimDialogRef.current?.close();
    }
  };

  const handleOpenDialog = (refCategory: string) => {
    const dialogRef = refCategory === "claim" ? claimDialogRef : alertDialogRef;
    void getClaimableAmount();
    dialogRef.current?.showModal();
  };
  const handleCloseDialog = (refCategory: string) => {
    switch (refCategory) {
      case "claim":
        claimDialogRef.current?.close();
        break;
      case "alert":
        alertDialogRef.current?.close();
        break;
      default:
        alertDialogRef.current?.close();
        claimDialogRef.current?.close();
        break;
    }
  };

  const clickLogin = async () => {
    try {
      let address = walletAddress || (await connectWallet());
      if (address === null) {
        alert(METAMASK_LINK_FAILED);
        return;
      }
      const loginResponse: LoginResponse = await ApiPoints.login(address);
      if (loginResponse.resultCode !== "1") {
        throw new Error(LOGIN_FAILED);
      }
      useAuthStore.getState().login(address);
      void doRerender();
    } catch (error) {
      console.error("An error occurred during login process:", error);
      setLoginAttemptFailed(true);
      alert(LOGIN_FAILED);
    }
  };

  let buttonContent;
  if (!isLoggedIn || loginAttemptFailed) {
    buttonContent = <LoginButton onClick={clickLogin}>Login</LoginButton>;
  } else {
    if (!isClaimable) {
      buttonContent = (
        <ClaimButton
          onClick={null}
          style={{ color: theme.colors.bg.icon, fontSize: "20px" }}
        >
          Disabled
        </ClaimButton>
      );
    } else if (myPointsAPI / exChangeRatioAPI < minAmount) {
      buttonContent = (
        <ClaimButton
          onClick={null}
          style={{ color: theme.colors.bg.icon, fontSize: "18px" }}
        >
          No MG8 Point
        </ClaimButton>
      );
    } else if (isButtonActive) {
      buttonContent = (
        <ClaimButton
          onClick={() => handleOpenDialog("claim")}
          style={{ color: "#fff", fontSize: "20px" }}
        >
          Claim All
        </ClaimButton>
      );
    } else {
      buttonContent = (
        <ClaimButton
          onClick={() => setIsButtonActive(true)}
          style={{ color: "#fff", fontSize: "17px" }}
        >
          Activate Claim
        </ClaimButton>
      );
    }
  }
  return (
    <PointsWrapper>
      <TextWrapper>
        <div>My Total MG8 Points</div>
        <PointText>{isLoggedIn ? myPointsAPI : "-"} P</PointText>
      </TextWrapper>
      {buttonContent}
      <ClaimDialog
        ref={claimDialogRef}
        setHash={setHash}
        minAmount={minAmount}
        claimableAmount={claimableAmount}
        isNetworkChange={isNetworkChange}
        exchangeRatio={exchangeRatioContract}
        myPointContract={myPointContract}
        setIsTransactionComplete={setIsTransactionComplete}
        handleOpenDialog={handleOpenDialog}
        handleCloseDialog={handleCloseDialog}
      />
      <AlertDialog
        ref={alertDialogRef}
        hash={hash}
        isTransactionComplete={isTransactionComplete}
        claimableAmount={claimableAmount}
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
  width: 352px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const TextWrapper = styled.div`
  padding-top: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-weight: 600;
  font-size: 18px;
  line-height: normal;
`;
const PointText = styled.div`
  color: #fff;
  font-size: 32px;
  font-weight: 600;
  line-height: 100%;
  padding-top: 16px;
`;

const LoginButton = styled.button`
  margin-top: 32px;
  display: flex;
  width: 160px;
  height: 52px;
  padding: 10px 12px;
  justify-content: center;
  align-items: center;
  border-radius: 100px;
  background: #006ebe;
  backdrop-filter: blur(4px);
  font-size: 18px;
  font-weight: 500;
`;

const ClaimButton = styled.button`
  margin-top: 32px;
  font-weight: 600;
  width: 160px;
  height: 52px;
  border: 1px solid gray;
  border-radius: 100px;
  color: gray;
`;
