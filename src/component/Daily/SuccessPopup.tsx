import styled from "styled-components";
import { check, circle, link } from "../../assets/images";
import { useEffect } from "react";
const SuccessPopup = () => {
  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "visible";
    };
  }, []);

  return (
    <PopupOverlay>
      <PopupWrapper>
        <PopupContainer>
          <TopContnet>
            <Circle>
              <ContentWrapper>
                <img src={circle} alt="" width={72} height={72} />
                <CheckImage src={check} alt="" width={36} height={36} />
              </ContentWrapper>
            </Circle>

            <TopContentTitle>Transaction Receipt</TopContentTitle>
            <ReceiveText>
              You will receive xx,xxx,xxx <span>MG8</span>
            </ReceiveText>
          </TopContnet>

          <MiddleContnet>
            <MiddleText>
              *If not, plz check your transaction request status ​through the
              link below​
            </MiddleText>
            <ViewText>
              <span>View on Bscscan:</span>
              <span>
                0xfe9aef...
                <span>
                  <img src={link} alt="" width={20} height={20} />
                </span>
              </span>
            </ViewText>
          </MiddleContnet>
          <ActiveButton>OK</ActiveButton>
        </PopupContainer>
      </PopupWrapper>
    </PopupOverlay>
  );
};

export default SuccessPopup;

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
  padding: 32px;
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
`;

const ActiveButton = styled.button`
  display: flex;
  width: 356px;
  height: 56px;
  padding: 10px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  border-radius: 8px;
  background: #006ebe;
  color: #ffffff;
  font-size: 16px;
  font-weight: 500;
`;

const Circle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ContentWrapper = styled.div`
  position: relative;
  height: 72px;
`;

const CheckImage = styled.img`
  position: absolute;
  top: 55%;
  left: 50%;
  transform: translate(-50%, -55%);
`;

const TopContnet = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
`;

const TopContentTitle = styled.div`
  font-size: 20px;
  font-weight: 600;
`;
const ReceiveText = styled.div`
  width: 356px;
  color: #fff;
  text-align: center;
  font-size: 16px;
  font-weight: 400;
`;

const MiddleContnet = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  margin-top: 32px;
`;

const MiddleText = styled.div`
  width: 356px;
  color: #999;
  text-align: center;
  font-family: Pretendard;
  font-size: 14px;
  font-weight: 400;
  line-height: normal;
`;

const ViewText = styled.div`
  display: flex;
  padding: 8px 16px;
  justify-content: flex-end;
  align-items: center;
  gap: 4px;
  border-radius: 4px;
  background: #222;
  text-align: center;
  font-size: 14px;
  font-weight: 400;

  margin-bottom: 24px;
  span {
    display: flex;
    align-items: center;
  }
`;
