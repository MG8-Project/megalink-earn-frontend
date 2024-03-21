import styled from "styled-components";
import { DayRewordList } from "../../constants";

const Reward = () => {
  return (
    <RewardWrapper>
      {DayRewordList.map((item, index) => (
        <RewardContainer key={index}>
          <RewardTitle>{item.title}</RewardTitle>
          <RewardImage src={item.image} alt="" />
          <RewardPrice>+{item.point}P</RewardPrice>
        </RewardContainer>
      ))}
    </RewardWrapper>
  );
};

export default Reward;

const RewardWrapper = styled.div`
  display: flex;
  gap: 32px;
`;

const RewardContainer = styled.div`
  width: 80px;
  height: 180px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const RewardTitle = styled.div`
  font-weight: 700;
  font-size: 18px;
`;
const RewardPrice = styled.div`
  font-weight: 600;
  font-size: 14px;
`;

const RewardImage = styled.img`
  width: 64px;
  margin-top: 24px;
  margin-bottom: 28px;
`;
