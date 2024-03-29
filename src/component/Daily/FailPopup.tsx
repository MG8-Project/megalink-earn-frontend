import styled from "styled-components";
import { noneCheck, redCircle, link } from "../../assets/images";

const FailPopup = () => {
  return (
    <>
      <PopupWrapper>
        <PopupContainer>
          <TopContnet>
            <ContentWrapper>
              <img src={redCircle} alt="" width={72} height={72} />
              <CheckImage src={noneCheck} alt="" width={36} height={36} />
            </ContentWrapper>

            <TopContentTitle>Transaction Fail</TopContentTitle>
            <ReceiveText>
              There seems to be some heavy traffic on BSC network.​​
              <MiddleText>Plz try a few moments later.​</MiddleText>
            </ReceiveText>
          </TopContnet>

          <ActiveButton>OK</ActiveButton>
        </PopupContainer>
      </PopupWrapper>
    </>
  );
};

export default FailPopup;

const PopupWrapper = styled.div`
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

const ContentWrapper = styled.div`
  position: relative;
`;

const CheckImage = styled.img`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
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
  width: 300px;
  color: #fff;
  text-align: center;
  font-size: 16px;
  font-weight: 400;
`;

const MiddleContnet = styled.div``;

const MiddleText = styled.div`
  margin-top: 12px;
  margin-bottom: 32px;
  color: #fff;
  text-align: center;
  font-size: 16px;
  font-weight: 400;
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
