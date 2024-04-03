import styled from "styled-components";
import { statusList } from "../../constants";
import { theme } from "../../styles/theme";
import ApiStatus from "../../apis/ApiStatus";
import React, { useEffect, useState } from "react";
import Popup from "../Popup";

// StatusState 를 response 데이터의 타입에 활용하기 위해 좀 더 명시적으로 타입을 정의
// 만약 이렇게 상세하게 명시해주지 않고 포괄적인 타입을 사용하고자 한다면 해당 interface 에 정의되어 있던 [key: string] : string 을 Record<string, string>으로 축약하여 사용 가능
interface StatusState {
  totalTransactions: string;
  totalWallets: string;
  transactionsToday: string;
  newWalletsToday: string;
  spinCount: string;
  totalPoints: string;
  MG8Dropped: string;
  BNBRewarded: string;
}

const Status: React.FC = () => {
  const [status, setStatus] = useState<StatusState>({
    totalTransactions: "0",
    totalWallets: "0",
    transactionsToday: "0",
    newWalletsToday: "0",
    spinCount: "0",
    totalPoints: "0",
    MG8Dropped: "0",
    BNBRewarded: "0",
  });

  // 여러 depth 의 삼항연산자로 된 jsx 렌더링 부분을 따로 함수로 빼서 switch 문으로 변경
  const renderListContent = (id: number, status: StatusState) => {
    switch (id) {
      case 1:
        return status.totalTransactions;
      case 2:
        return status.totalWallets;
      case 3:
        return status.transactionsToday;
      case 4:
        return status.newWalletsToday;
      case 5:
        return status.spinCount;
      case 6:
        return status.totalPoints;
      case 7:
        return `${status.MG8Dropped} MG8`;
      case 8:
        return `${status.BNBRewarded} `;
      default:
        return "0";
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      // ApiStatus 요청실패에 따른 에러처리는 해당 훅의 메서드들이 수행해주기 때문에 여기 코드에서 필요없는 try catch 구문 제거
      const response = await ApiStatus.status();
      setStatus({
        totalTransactions: response.totalTransactions,
        totalWallets: response.totalWallets,
        transactionsToday: response.transactionsToday,
        newWalletsToday: response.newWalletsToday,
        spinCount: response.spinCount,
        totalPoints: response.totalPoints,
        MG8Dropped: response.MG8Dropped,
        BNBRewarded: response.BNBRewarded,
      });
    };
    void fetchData();

    const intervalId = setInterval(fetchData, 5000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <StatusWrapper>
      <Popup isOpen={true} />
      <StatusTitle>Status</StatusTitle>
      <StatusListWrapper>
        {statusList.map((item) => (
          <StatusListContainer key={item.id}>
            <StatusListContentBox>
              <ListTitle>{item.title}</ListTitle>
              <ListContent>{renderListContent(item.id, status)}</ListContent>
            </StatusListContentBox>
          </StatusListContainer>
        ))}
      </StatusListWrapper>
    </StatusWrapper>
  );
};

export default Status;

const StatusWrapper = styled.div`
  padding-top: 240px;
  width: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`;

const StatusTitle = styled.h3`
  font-weight: 600;
  font-size: 48px;
`;

const StatusListWrapper = styled.div`
  margin-top: 60px;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;
`;
const StatusListContainer = styled.div`
  width: 282px;
  height: 104px;
  border-radius: 16px;
  background-color: ${theme.colors.bg.box};
  padding: 24px 38px 24px 24px;
`;

const StatusListContentBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const ListTitle = styled.div`
  color: ${theme.colors.textGray};
  font-size: 16px;
  font-weight: 400;
  line-height: 20px;
`;
const ListContent = styled.div`
  text-align: left;
  font-size: 24px;
  font-weight: 500;
  line-height: 100%;
`;
