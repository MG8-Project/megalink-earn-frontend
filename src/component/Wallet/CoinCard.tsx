import styled, { css } from "styled-components";
import { theme } from "../../styles/theme";
import { coinList } from "../../constants";

interface CoinItem {
  title: string;
  image: string;
  have: number;
  count: number;
}

interface CountProps {
  have: number;
}

const CoinCard = () => {
  return (
    <CardWrapper>
      {coinList.map((item, index) => (
        <CardBox key={index}>
          <CardBoxImg src={item.image} alt="" />
          <CoinTitle>{item.title}</CoinTitle>
          <Count have={item.have}>
            <CountText have={item.have}>
              {item.have}/{item.count}
            </CountText>
          </Count>
        </CardBox>
      ))}
    </CardWrapper>
  );
};

export default CoinCard;

const CardWrapper = styled.div`
  display: flex;
  gap: 24px;
`;

const CardBox = styled.div`
  width: 384px;
  height: 250px;
  border-radius: 16px;
  background-color: ${theme.colors.bg.box};
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: center;
`;

const CardBoxImg = styled.img`
  width: 64px;
  margin-top: 40px;
`;
const CoinTitle = styled.div`
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 12px;
`;
const Count = styled.div<CountProps>`
  padding: 10px 24px 10px 24px;
  height: 40px;
  border-radius: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  font-weight: 400;
  color: transparent;
  background: linear-gradient(90deg, #82e8ff, #379fff);
  border-radius: 100px;
  border: 1px solid transparent;
  background-image: linear-gradient(#000000, #000000),
    linear-gradient(90deg, #82e8ff, #379fff);
  background-origin: border-box;
  background-clip: padding-box, border-box;

  ${(props) =>
    props.have === 0 &&
    css`
      border: 1px solid transparent;
      background-image: linear-gradient(#000000, #000000),
        linear-gradient(90deg, #333333, #333333);
      background-origin: border-box;
      background-clip: padding-box, border-box;
    `};
`;

const CountText = styled.div<CountProps>`
  color: #ffffff;
  font-size: 20px;
  ${(props) =>
    props.have === 0 &&
    css`
      color: ${theme.colors.textGray};
    `};
`;

const WarningText = styled.div`
  color: red;
`;
