import styled from "styled-components";
import { theme } from "../../styles/theme";
import { ticket } from "../../assets/images";

const TicketCard = () => {
  return (
    <CardContainer>
      <CardBox>
        <CardImage src={ticket} alt="" />
        <CardTitle>Your Ticket</CardTitle>
        <CardText>1/2</CardText>
      </CardBox>
    </CardContainer>
  );
};

export default TicketCard;

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

const CardText = styled.div`
  font-size: 48px;
  font-weight: 600;
`;
