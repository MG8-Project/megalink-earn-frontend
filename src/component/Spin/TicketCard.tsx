import { useState, useEffect, useCallback } from "react";
import styled from "styled-components";
import { theme } from "../../styles/theme";
import { ticket } from "../../assets/images";
import { useAuthStore } from "../../store/authStore";
import ApiDaily from "../../apis/ApiDaily";

const TicketCard = () => {
  const [myTickets, setMyTickets] = useState(0);
  const userAccount = useAuthStore((state) => state.userAccount);
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);

  const fetchMyTickets = useCallback(async () => {
    try {
      if (isLoggedIn && userAccount) {
        const response = await ApiDaily.myParticipationTicket(userAccount);
        setMyTickets(response >= 0 ? response : 0);
      } else {
        setMyTickets(0);
      }
    } catch (error) {
      console.error("Error fetching my tickets:", error);
    }
  }, [isLoggedIn, userAccount]);

  useEffect(() => {
    fetchMyTickets();
    if (isLoggedIn) {
      const interval = setInterval(fetchMyTickets, 5000);
      return () => clearInterval(interval);
    }
  }, [fetchMyTickets, isLoggedIn]);

  return (
    <CardContainer>
      <CardBox>
        <CardImage src={ticket} alt="" />
        <CardTitle>Your Ticket</CardTitle>
        <CardText>{myTickets}</CardText>
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
  font-weight: 500;
`;
