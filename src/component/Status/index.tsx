import styled from "styled-components";
import { statusList } from "../../constants";
import { theme } from "../../styles/theme";
import ApiStatus from "../../apis/ApiStatus";
import { useEffect, useState } from "react";

interface StatusState {
  [key: number]: string;
}

const Status = () => {
  const [status, setStatus] = useState<StatusState>({
    1: '0', // Total Transactions
    2: '0', // Total Wallets
    3: '0', // Transactions Today
    4: '0', // New Wallets Today
    5: '0', // Spin Count
    6: '0', // Total Points
    7: '0', // $MG8 Dropped
    8: '0'  // BNB Rewarded
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await ApiStatus.status();
        setStatus(prevState => ({
          ...prevState,
          1: response.totalTransactions,
          2: response.totalWallets,
          3: response.transactionsToday,
          4: response.newWalletsToday,
          5: response.spinCount,
          6: response.totalPoints,
          7: response.MG8Dropped,
          8: response.BNBRewarded
        }));
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  return (
    <StatusWrapper>
      <StatusTitle>Status</StatusTitle>
      <StatusListWrapper>
        {statusList.map((item, index) => (
          <StatusListContainer key={index}>
            <StatusListContentBox>
              <ListTitle>{item.title}</ListTitle>
              <ListContent>
                {item.id >= 7 ? `${status[item.id]} MG8` : status[item.id]}
              </ListContent>
            </StatusListContentBox>
          </StatusListContainer>
        ))}
      </StatusListWrapper>
    </StatusWrapper>
  );
};

export default Status;

const StatusWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  margin-bottom: 160px;
`;

const StatusTitle = styled.h3`
  font-weight: 600;
  font-size: 48px;
`;

const StatusListWrapper = styled.div`
  margin-top: 80px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 24px;
`;
const StatusListContainer = styled.div`
  width: 588px;
  height: 128px;
  border-radius: 16px;
  background-color: ${theme.colors.bg.box};
  padding: 24px 32px 32px 24px;
`;

const StatusListContentBox = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ListTitle = styled.div`
  color: ${theme.colors.textGray};
  font-weight: 400px;
  font-size: 16px;
`;
const ListContent = styled.div`
  display: flex;
  font-weight: 600;
  font-size: 28px;
  margin-top: 40px;
`;
