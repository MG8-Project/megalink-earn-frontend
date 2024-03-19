import styled from "styled-components";
import { theme } from "../../styles/theme";
import mockData from "../../mock";

export const tableTitle = [
  { id: 0, title: "Rank" },
  { id: 1, title: "Name" },
  { id: 2, title: "Nation" },
  { id: 3, title: "Level" },
  { id: 4, title: "Total Points" },
];

const IndividualList = () => {
  return (
    <IndividualListWrapper>
      <TableStyle>
        <TheadStyle>
          <tr>
            {tableTitle.map((column) => (
              <StyledTh key={column.id}>{column.title}</StyledTh>
            ))}
          </tr>
        </TheadStyle>
        <tbody>
          {mockData.map((item) => (
            <tr key={item.index}>
              <StyledTd>{item.rank}</StyledTd>
              <StyledTd>{item.name}</StyledTd>
              <StyledTd>{item.nation}</StyledTd>
              <StyledTd>{item.level}</StyledTd>
              <StyledTd>{item.totalpoints}</StyledTd>
            </tr>
          ))}
        </tbody>
      </TableStyle>
    </IndividualListWrapper>
  );
};

export default IndividualList;

const IndividualListWrapper = styled.div`
  margin-top: 32px;
  background-color: ${theme.colors.bg.box};
  padding: 16px 0px 32px 0px;
  width: 1200px;
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 24px;
  text-align: center;
`;

const TableStyle = styled.table`
  width: 100%;
`;
const TheadStyle = styled.thead`
  font-size: 16px;
  font-weight: 600;
  color: ${theme.colors.textGray};
  line-height: 20px;
`;

const StyledTd = styled.td`
  font-size: 16px;
  font-weight: 400;
  padding: 16px 0px 16px 0px;
`;
const StyledTh = styled.th`
  font-size: 16px;
  font-weight: 400;
  padding: 8px 32px;
`;
