import styled from "styled-components";
import { theme } from "../../styles/theme";
import { gift } from "../../assets/images";
import { useState, useEffect } from "react";
import ApiDaily from "../../apis/ApiDaily";

const PoolCard = () => {
  const [dailyPool, setDailyPool] = useState(0);

  async function fetchDailyPool() {
    try {
      const response = await ApiDaily.dailyPool();
      setDailyPool(response);
    } catch (error) {
      console.error("Error fetching daily pool:", error);
    }
  }

  useEffect(() => {
    fetchDailyPool();
    const interval = setInterval(fetchDailyPool, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <CardContainer>
      <CardBox>
        <CardImage src={gift} alt="" />
        <CardTitle>Daily Pool</CardTitle>
        <PercentText>{dailyPool}%</PercentText>
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
  padding-top: 48px;
  font-size: 48px;
  font-weight: 500;
`;

const CardText = styled.div`
  padding-top: 56px;
  font-size: 18px;
  font-weight: 400;
  line-height: 22px;
`;
