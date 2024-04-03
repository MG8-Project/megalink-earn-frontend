import { useEffect, useState } from "react";
import styled from "styled-components";
import ReceiptPopup from "./SuccessPopup";
import FailPopup from "./FailPopup";
import { theme } from "../../styles/theme";
import {
  closeBtn,
  active,
  line,
  claim,
  noneActive,
  // loading,
} from "../../assets/images";

const TxPopup = () => {
  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const ClosePopup = () => {
    setIsOpen(false);
  };

  return (
    <>
      {isOpen && (
        <PopupOverlay>
          <PopupWrapper>
            <CloseBtn
              src={closeBtn}
              alt=""
              width={24}
              height={24}
              onClick={ClosePopup}
            />
            <PopupContainer>
              <TitleContainer>
                <Title>Transaction Request</Title>
                <Subtitle>MG8 Point Claim</Subtitle>
              </TitleContainer>
              <InfoContainer>
                <InfoTop>
                  <InfoTopLeftText>MG8 Point Exchange Info.</InfoTopLeftText>
                  <InfoTopRightText>1 P = XX.xx MG8</InfoTopRightText>
                </InfoTop>
                <InfoContentBox>
                  <InfoContentText>
                    <div>Your Current Point​</div>
                    <span>234,567,890P</span>
                  </InfoContentText>
                  <InfoContentText>
                    <div>You will Recieve​</div>
                    <span>2,345,678 MG8</span>
                  </InfoContentText>
                </InfoContentBox>
              </InfoContainer>
              <GasText>
                *Gas fee will be paid in <span>BNB</span>
              </GasText>
              <ProgressContainer>
                <ProgressBox>
                  {/* <ProgressImage>
                    <img src={active} alt="" width={20} height={20} />
                    <img src={line} alt="" />
                    <img src={claim} alt="" width={20} height={20} />
                  </ProgressImage> */}
                  <ProgressImage>
                    <img src={noneActive} alt="" width={20} height={20} />
                    <img src={line} alt="" />
                    <img src={active} alt="" width={20} height={20} />
                  </ProgressImage>
                  <ProgressText>
                    <span>Activate</span>
                    <span>Claim</span>
                  </ProgressText>
                </ProgressBox>
              </ProgressContainer>
              <ActiveButton>Activate Claim</ActiveButton>
              {/* <PendingButton>
                <img src={loading} alt="" width={24} height={24} />
                Pending
              </PendingButton> */}
            </PopupContainer>
          </PopupWrapper>
          {/* <ReceiptPopup />
          <FailPopup /> */}
        </PopupOverlay>
      )}
    </>
  );
};

export default TxPopup;

const PopupOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  z-index: 999;
`;

const PopupWrapper = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: inline-flex;
  padding: 20px 20px 32px 20px;
  flex-direction: column;
  align-items: flex-end;
  gap: 8px;
  border-radius: 16px;
  background: #1b1b1b;
`;
const PopupContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0px 12px;
`;
const CloseBtn = styled.img`
  cursor: pointer;
`;

const TitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  font-family: Pretendard;
  font-size: 22px;
  font-weight: 600;
`;
const Title = styled.div`
  line-height: normal;
`;
const Subtitle = styled.div`
  text-align: center;
  font-size: 18px;
  font-weight: 600;
  line-height: 22px;
  background: linear-gradient(104deg, #82e8ff 0%, #379fff 100%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;
const InfoContainer = styled.div`
  padding-top: 40px;
`;

const InfoTop = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  line-height: normal;
`;
const InfoTopLeftText = styled.div`
  font-size: 16px;
  font-weight: 600;
`;
const InfoTopRightText = styled.div`
  font-size: 12px;
  font-weight: 400;
`;

const InfoContentBox = styled.div`
  display: flex;
  width: 416px;
  padding: 16px;
  flex-direction: column;
  align-items: flex-start;
  gap: 16px;
  border-radius: 10px;
  background: #222;
  margin-top: 12px;
  margin-bottom: 16px;
  line-height: normal;
`;

const InfoContentText = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  div {
    color: #fff;
    font-size: 14px;
    font-weight: 400;
  }
  span {
    color: #fff;
    font-size: 16px;
    font-weight: 600;
  }
`;

const ActiveButton = styled.button`
  display: flex;
  width: 416px;
  height: 56px;
  padding: 10px;
  justify-content: center;
  align-items: center;
  line-height: normal;
  gap: 10px;
  border-radius: 8px;
  background: #006ebe;
  color: #ffffff;
  font-size: 16px;
  font-weight: 500;
`;

const PendingButton = styled.button`
  display: flex;
  width: 416px;
  height: 56px;
  padding: 10px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  border-radius: 8px;
  border: 1px solid #333;
  background: #222;
  font-weight: 500;
  color: #999;
  font-size: 16px;
  font-weight: 500;
`;

const GasText = styled.div`
  font-size: 16px;
  font-weight: 400;
  line-height: normal;
  span {
    font-size: 16px;
    font-weight: 600;
  }
`;

const ProgressContainer = styled.div`
  padding-top: 48px;
  padding-bottom: 24px;
`;

const ProgressBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 360px;
  height: 38px;
`;
const ProgressImage = styled.div`
  display: flex;
`;
const ProgressText = styled.div`
  display: flex;
  width: 360px;
  justify-content: space-between;
  margin-top: 4px;
  text-align: center;
  font-size: 12px;
  font-weight: 500;
  line-height: normal;

  span {
    width: 50px;
  }
`;
