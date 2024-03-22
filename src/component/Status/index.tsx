import styled from "styled-components";
import { statusList } from "../../constants";
import { theme } from "../../styles/theme";
import ApiStatus from "../../apis/ApiStatus";
import { useEffect, useState } from "react";

interface StatusState {
  [key: string]: string;
}

const Status = () => {
  const [status, setStatus] = useState<StatusState>({
    totalTransactions: '0',
    totalWallets: '0',
    transactionsToday: '0',
    newWalletsToday: '0',
    spinCount: '0',
    totalPoints: '0',
    MG8Dropped: '0',
    BNBRewarded: '0'
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await ApiStatus.status();
        setStatus({
          totalTransactions: response.totalTransactions,
          totalWallets: response.totalWallets,
          transactionsToday: response.transactionsToday,
          newWalletsToday: response.newWalletsToday,
          spinCount: response.spinCount,
          totalPoints: response.totalPoints,
          MG8Dropped: response.MG8Dropped,
          BNBRewarded: response.BNBRewarded
        });
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();

    const intervalId = setInterval(fetchData, 5000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <StatusWrapper>
      <StatusTitle>Status</StatusTitle>
      <StatusListWrapper>
        {statusList.map((item) => (
          <StatusListContainer key={item.id}>
            <StatusListContentBox>
              <ListTitle>{item.title}</ListTitle>
              <ListContent>
              {
                item.id === 1 ? status.totalTransactions :
                item.id === 2 ? status.totalWallets :
                item.id === 3 ? status.transactionsToday :
                item.id === 4 ? status.newWalletsToday :
                item.id === 5 ? status.spinCount :
                item.id === 6 ? status.totalPoints :
                item.id === 7 ? `${status.MG8Dropped} MG8` :
                item.id === 8 ? `${status.BNBRewarded} BNB` :
                "0"
              }
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
