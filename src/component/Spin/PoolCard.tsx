import styled from "styled-components";
import { theme } from "../../styles/theme";
import { gift } from "../../assets/images";

const PoolCard = () => {
  return (
    <CardContainer>
      <CardBox>
        <CardImage src={gift} alt="" />
        <CardTitle>Daily Pool</CardTitle>
        <PercentText>100%</PercentText>
        <CardText>Daily Quota Available</CardText>
      </CardBox>
    </CardContainer>
  );
};

export default PoolCard;

const CardContainer = styled.div`
  width: 588px;
  background-color: ${theme.colors.bg.box};
  border-radius: 16px;
`;
const CardTitle = styled.div`
  font-weight: 600;
  font-size: 20px;
  margin-bottom: 48px;
`;
const CardBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 48px 0px 48px 0px;
`;
const CardImage = styled.img`
  margin-bottom: 16px;
  width: 64px;
`;
const PercentText = styled.div`
  font-size: 48px;
  font-weight: 600;
`;

const CardText = styled.div`
  margin-top: 56px;
  font-size: 18px;
  font-weight: 400;
`;
