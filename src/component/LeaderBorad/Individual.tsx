import React, { useState } from "react";
import styled from "styled-components";
import { theme } from "../../styles/theme";
import mockData from "../../mock";
import Pagination from "./Pagination";
import { first, second, third } from "../../assets/images";

export interface MockDataType {
  index: number;
  rank: number;
  name: string;
  nation: string;
  level: string;
  totalpoints: string;
}
interface PaginationButtonProps {
  active?: boolean;
  disabled?: boolean;
}

export const tableTitle = [
  { id: 0, title: "Rank" },
  { id: 1, title: "Name" },
  { id: 2, title: "Nation" },
  { id: 3, title: "Level" },
  { id: 4, title: "Total Points" },
];

const getRankImage = (rank: number): string => {
  if (rank === 1) {
    return first;
  } else if (rank === 2) {
    return second;
  } else if (rank === 3) {
    return third;
  } else {
    return "";
  }
};

const ITEMS_PER_PAGE = 20;

const IndividualList: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);

  const startIndex: number = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex: number = currentPage * ITEMS_PER_PAGE;
  const paginatedData: MockDataType[] = mockData.slice(startIndex, endIndex);

  const totalPages = Math.ceil(mockData.length / ITEMS_PER_PAGE);
  const maxPages = 5;

  let startPage = Math.max(1, currentPage - Math.floor(maxPages / 2));
  let endPage = Math.min(startPage + maxPages - 1, totalPages);

  if (totalPages <= maxPages) {
    startPage = 1;
    endPage = totalPages;
  } else if (endPage === totalPages) {
    startPage = totalPages - maxPages + 1;
  }

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
          <UserStyledTr>
            <UserStyledLeftTd>95,365</UserStyledLeftTd>
            <td>Youuuuuuuuuu</td>
            <td>South Korea</td>
            <td>99</td>
            <UserStyledRightTd>123,456,123,456</UserStyledRightTd>
          </UserStyledTr>

          {paginatedData.map((item) => (
            <tr key={item.index}>
              <StyledTd>
                <RankContainer>
                  {getRankImage(item.rank) && (
                    <RankImg
                      src={getRankImage(item.rank)}
                      alt={`Rank ${item.rank}`}
                    />
                  )}
                  <Rank>{item.rank}</Rank>
                </RankContainer>
              </StyledTd>
              <StyledTd>{item.name}</StyledTd>
              <StyledTd>{item.nation}</StyledTd>
              <StyledTd>{item.level}</StyledTd>
              <StyledEnd>{item.totalpoints}</StyledEnd>
            </tr>
          ))}
        </tbody>
      </TableStyle>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        setCurrentPage={setCurrentPage}
      />
    </IndividualListWrapper>
  );
};

export default IndividualList;

const IndividualListWrapper = styled.div`
  margin-top: 32px;
  background-color: ${theme.colors.bg.box};
  padding: 16px 32px 32px 32px;
  width: 1200px;
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
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
  height: 28px;
  padding: 16px 0px 16px 0px;
`;
const StyledEnd = styled.td`
  font-size: 16px;
  font-weight: 400;
  height: 28px;
  padding: 16px 32px 16px 0px;
  text-align: end;
`;
const StyledTh = styled.th`
  font-size: 16px;
  font-weight: 400;
  padding: 8px 32px;
`;

const UserStyledTr = styled.tr`
  background-image: linear-gradient(
    90deg,
    rgba(126, 229, 255, 0.1),
    rgba(65, 169, 255, 0.1)
  );
  font-size: 16px;
  font-weight: 400;
  height: 28px;
  padding: 16px 0px 16px 0px;
`;

const UserStyledLeftTd = styled.td`
  padding: 16px 0px 16px 0px;
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
`;
const UserStyledRightTd = styled.td`
  padding: 16px 32px 16px 0px;
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
  text-align: end;
`;

const RankContainer = styled.div`
  position: relative;
`;

const RankImg = styled.img`
  position: absolute;
  width: 28px;
  height: 28px;
  top: 70%;
  left: 50%;
  transform: translate(-50%, -70%);
`;
const Rank = styled.div``;
