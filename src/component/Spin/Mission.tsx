import styled from "styled-components";
import { theme } from "../../styles/theme";
import { spinFrame } from "../../assets/images";
import MissionCard from "./MissionCard";
import TicketCard from "./TicketCard";
import PoolCard from "./PoolCard";

const Mission = () => {
  return (
    <MissionWrapper>
      <CardWrapper>
        <MissionCard />
        <TicketCard />
        <PoolCard />
      </CardWrapper>
      <SpinContainer>
        <SpinContainerImage src={spinFrame} alt="" />
      </SpinContainer>
    </MissionWrapper>
  );
};

export default Mission;

const CardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const MissionWrapper = styled.div`
  margin-top: 80px;
  width: 1200px;

  display: flex;
  gap: 24px;
`;

const SpinContainer = styled.div`
  /* width: 588px;
  height: 1112px;
  border-radius: 16px; */
`;
const SpinContainerImage = styled.img`
  width: 588px;
  height: 1112px;
  border-radius: 16px;
`;
