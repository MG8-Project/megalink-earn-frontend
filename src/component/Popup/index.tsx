import React, { useEffect, useState, useLayoutEffect } from "react";
import styled from "styled-components";
import {
  zealy,
  closeBtn,
  bg,
  title,
  USDT1,
  USDT2,
  USDT3,
  inputCheck,
} from "../../assets/images";

interface PopupProps {
  isOpen: boolean;
}

const Popup: React.FC<PopupProps> = (props) => {
  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "visible";
    };
  }, []);

  const [checked, IsChecked] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(props.isOpen);

  const today = new Date();
  let todayDate = today.getDate();
  let tomorrow = new Date(today.setDate(todayDate + 1));

  const Cookie = () => {
    document.cookie = `name=${todayDate}; path=/; expires=${tomorrow.toUTCString()}; secure`;
  };

  const checkPopup = () => {
    const cookies = document.cookie.match("(^|;) ?" + "name" + "=([^;]*)(;|$)");
    const cookieDate = cookies ? Number(cookies[2]) : 0;
    return cookieDate === todayDate;
  };

  const handleCheckboxChange = () => {
    IsChecked(!checked);
  };

  const handleCloseButtonClick = () => {
    if (checked) {
      Cookie();
    }
    setIsOpen(false);
  };

  // 쿠키를 불러오는 함수
  useLayoutEffect(() => {
    if (checkPopup()) {
      setIsOpen(false);
    }
  }, []);

  return (
    <>
      {isOpen && (
        <PopupOverlay>
          <PopupWrapper>
            <CloseBtnContainer>
              <img
                src={closeBtn}
                alt=""
                width={24}
                height={24}
                onClick={handleCloseButtonClick}
              />
            </CloseBtnContainer>
            <TopContent>
              <img src={zealy} alt="zealy" width={40} height={40} />

              <TitleImage src={title} alt="" width={343} height={40} />
              <Subtitle>Infinite Spin</Subtitle>
            </TopContent>
            <BackgroundMiddleContent>
              <MiddleContent>
                <CoinImage1 src={USDT1} alt="" width={120} height={110} />
                <CoinImage2 src={USDT2} alt="" width={64} height={59} />
                <CoinImage3 src={USDT3} alt="" width={60} height={60} />
                <MiddleTextContent>
                  <div>Reward pool</div>
                  <p>500 USDT</p>
                </MiddleTextContent>
              </MiddleContent>
            </BackgroundMiddleContent>

            <BottomContent>
              <PopupButton>Go to Zealy</PopupButton>
              <CheckLabel>
                <Checkbox
                  type="checkbox"
                  checked={checked}
                  onChange={handleCheckboxChange}
                />
                Do Not Show For 24 Hours
              </CheckLabel>
            </BottomContent>
          </PopupWrapper>
        </PopupOverlay>
      )}
    </>
  );
};

export default Popup;
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
  width: 520px;
  height: 571px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: inline-flex;

  border-radius: 20px;
  border-top: 1px solid rgba(255, 255, 255, 0.2);
  background: #101111;
  padding: 24px;
  display: flex;
  align-items: center;
  flex-direction: column;
  background-image: url(${bg});
  background-size: cover;
  background-repeat: no-repeat;
`;

const CloseBtnContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  margin-bottom: 8px;
`;
const TopContent = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
`;

const TitleImage = styled.img``;

const BackTitleImage = styled.img`
  position: relative;
`;

const Subtitle = styled.div`
  text-align: center;
  font-family: Retroica;
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

const BackgroundMiddleContent = styled.div`
  margin-top: 40px;
  width: 442px;
  height: 162px;
  border-radius: 20px;
  background-image: linear-gradient(
    to right,
    rgba(255, 255, 255, 0.05),
    rgb(255, 255, 255)
  );
  position: relative;
`;

const MiddleContent = styled.div`
  /* margin-top: 40px; */
  width: 440px;
  height: 160px;
  flex-shrink: 0;
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.05);
  background: #1c1d1d;
  backdrop-filter: blur(10px);
  padding: 42px 0px;
  display: flex;
  justify-content: center;
  position: absolute;
  position: relative;
  top: 1px;
  left: 1px;
`;

const MiddleTextContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  font-family: Retroica;
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  p {
    font-size: 40px;
    font-weight: 400;
    line-height: normal;
  }
`;
const CoinImage1 = styled.img`
  position: absolute;
  top: 106px;
  right: 0px;
`;
const CoinImage2 = styled.img`
  position: absolute;
  top: -30px;
  left: 0px;
`;
const CoinImage3 = styled.img`
  position: absolute;
  top: 80px;
  right: -30px;
`;

const BottomContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 56px;
`;

const PopupButton = styled.div`
  margin-bottom: 14px;
  display: flex;
  width: 240px;
  height: 52px;
  justify-content: center;
  align-items: center;
  border-radius: 100px;
  background: #006ebe;
`;

const Checkbox = styled.input`
  width: 14px;
  height: 14px;
  background-color: transparent;
  border: 1.5px solid #ffffff;
  border-radius: 4px;
  margin-right: 8px;
  position: relative;
  cursor: pointer;
  appearance: none;

  &:checked {
    background-color: #ffffff;
  }

  &:checked::before {
    content: "";
    display: inline-block;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 12px;
    height: 12px;
    background-image: url(${inputCheck});

    background-size: contain;
    background-repeat: no-repeat;
  }
`;

const CheckLabel = styled.label`
  display: flex;
  align-items: center;
  text-align: center;
  font-family: Pretendard;
  font-size: 14px;
  font-weight: 400;
  line-height: normal;
`;
