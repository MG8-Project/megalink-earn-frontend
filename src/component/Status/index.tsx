import styled from "styled-components";
import { statusList } from "../../constants";
import { theme } from "../../styles/theme";

const Status = () => {
  return (
    <StatusWrapper>
      <StatusTitle>Status</StatusTitle>
      <StatusListWrapper>
        {statusList.map((item, index) => (
          <StatusListContainer key={index}>
            <StatusListContentBox>
              <ListTitle>{item.title}</ListTitle>
              <ListContent>
                {item.id === 7 ? `${item.content} MG8` : item.content}
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
