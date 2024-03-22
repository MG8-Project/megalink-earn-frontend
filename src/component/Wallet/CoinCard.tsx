import styled from "styled-components";
import { theme } from "../../styles/theme";
import { coinList } from "../../constants";

const CoinCard = () => {
  return (
    <CardWrapper>
      {coinList.map((item, index) => (
        <CardBox key={index}>
          <CardBoxImg src={item.image} alt="" />
          <div>{item.title}</div>
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
