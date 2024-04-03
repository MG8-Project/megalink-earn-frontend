import styled from "styled-components";
import { theme } from "../../styles/theme";
import { useEffect, useState } from "react";
import API from "../../apis/Api";
import { API_SUCCESS_CODE, nationList, UNKNOWN } from "../../constants";

import {
  nextarrow,
  prearrow,
  next,
  pre,
  gold,
  silver,
  bronze,
  preArrowHover,
  preHover,
  nextArrowHover,
  nextHover,
} from "../../assets/images";
import RankingAlert from "./RankingAlert";
import { useAuthStore } from "../../store/authStore";

export const tableTitle = [
  { id: 0, title: "Rank" },
  { id: 1, title: "Name" },
  { id: 2, title: "Nation" },
  { id: 3, title: "Level" },
  { id: 4, title: "Total Points" },
];

interface PersonalListDataType {
  userName: string;
  rank: number;
  nationCode: number;
  point: number;
  level: number;
}
interface IndividualResponseType {
  status: number;
  data: {
    totalSize: number;
    personalRnkLst: Array<PersonalListDataType>;
  };
}

const IndividualList = () => {
  const isLoggedIn = useAuthStore(state => state.isLoggedIn);
  const walletAddress = useAuthStore(state => state.userAccount);
  const [totalPage, setTotalPage] = useState(0);
  const [visiblePages, setVisiblePages] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [personalData, setPersonalData] = useState<PersonalListDataType>(null);
  const [personalListData, setPersonalListData] = useState<
    Array<PersonalListDataType>
  >([]);
  
  // 페이지네이션 화살표
  const isPreArrowClickable = currentPage !== 1;
  const isPreClickable = currentPage > 1;
  const isNextArrowClickable = currentPage !== totalPage;
  const isNextClickable = totalPage > currentPage;

  const handleChangePage = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };
  const convertNation = (nationCode: number) => {
    // 국가 코드가 지정된 배열에 없는 경우 처리
    if (nationCode === undefined || nationCode === 0) return "Others";
    const findObjectList = nationList.filter(
      (data) => data.code === nationCode
    );
    if (findObjectList.length === 0) return UNKNOWN;
    return findObjectList[0].nation;
  };

  const isListEmpty = personalListData.length === 0;

  const fetchIndividualList = async (currentPage: number) => {
    try {
      const endPoint = `${process.env.REACT_APP_API_PERSONAL}/personalRnk?size=20&&page=${currentPage}`;
      const res: IndividualResponseType = await API.get(endPoint);
      if (res.status !== API_SUCCESS_CODE) throw new Error(String(res.status));
      setPersonalListData(res.data.personalRnkLst);
      setTotalPage(Math.ceil(res.data.totalSize / 20));
    } catch (err) {
      switch (err) {
        default:
      }
    }
  };
  useEffect(() => {
    void fetchIndividualList(currentPage);
  }, [currentPage]);

  useEffect(() => {
    const visiblePages = () => {
      const visiblePageCount = 5;
      const totalVisiblePageCount = Math.min(visiblePageCount, totalPage);
      const offset = Math.floor(totalVisiblePageCount / 2);
      let startPage = currentPage - offset;
      let endPage = currentPage + offset;
      if (startPage <= 0) {
        startPage = 1;
        endPage = Math.min(totalPage, visiblePageCount);
      } else if (endPage > totalPage) {
        endPage = totalPage;
        startPage = Math.max(1, endPage - visiblePageCount + 1);
      }
      const pages: number[] = [];
      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }
      setVisiblePages(pages);
    };
    visiblePages();
  }, [currentPage, totalPage]);
  useEffect(() => {
    const fetchPersonalData = async () => {
      try {
        const API_ENDPOINT = `${process.env.REACT_APP_API_PERSONAL}/myPersonalRnk`;
      const res = await API.get(API_ENDPOINT, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`
          }
        });
        setPersonalData(res.data);
        } catch (err) {
          console.error(err);
        }
      }
    fetchPersonalData();
  }, [isLoggedIn, walletAddress]);

  return (
    <IndividualListWrapper>
      {isListEmpty ? (
        <RankingAlert text={"There is No Ranking Data Yet"} />
      ) : (
        <>
          <TableStyle>
            <TheadStyle>
              <tr>
                {tableTitle.map((column) => (
                  <StyledTh key={column.id}>{column.title}</StyledTh>
                ))}
              </tr>
            </TheadStyle>
            <tbody>
            <Space />
              {
                personalData && 
                <UserStyledTr>
                  <UserStyledTdStart>{personalData.rank}</UserStyledTdStart>
                  <StyledTd>{personalData.userName}</StyledTd>
                  <StyledTd>{convertNation(personalData.nationCode)}</StyledTd>
                  <StyledTd>{personalData.level}</StyledTd>
                  <UserStyledTdEnd>{personalData.point}</UserStyledTdEnd>
                </UserStyledTr>
              }
            {personalListData.map((item, index) => (
                <StyledTr key={index}>
                  <StyledTd>
                    {item.rank}
                    {item.rank === 1 && <RankImage src={gold} alt="" />}
                    {item.rank === 2 && <RankImage src={silver} alt="" />}
                    {item.rank === 3 && <RankImage src={bronze} alt="" />}
                  </StyledTd>
                  <StyledTd>{item.userName}</StyledTd>
                  <StyledTd
                    style={{
                      color:
                        convertNation(item.nationCode) === UNKNOWN
                          ? "#eba4a4"
                          : "#fff",
                    }}
                  >
                    {convertNation(item.nationCode)}
                  </StyledTd>
                  <StyledTd>{item.level}</StyledTd>
                  <StyledTdEnd>{item.point}</StyledTdEnd>
                </StyledTr>
              ))}
            </tbody>
          </TableStyle>
          <PaginationWrapper>
            <ArrowButton onClick={() => setCurrentPage(1)}>
              <ButtonImg src={isPreArrowClickable ? preArrowHover : prearrow} />
            </ArrowButton>
            <ArrowButton
              onClick={() =>
                setCurrentPage((prevPage) => Math.max(prevPage - 1, 1))
              }
            >
              <ButtonImg src={isPreClickable ? preHover : pre} />
            </ArrowButton>
            {visiblePages.map((data, index) => (
              <PageButton
                key={index}
                onClick={() => handleChangePage(data)}
                style={{
                  color:
                    data === currentPage
                      ? theme.colors.text
                      : theme.colors.textGray,
                }}
              >
                {data}
              </PageButton>
            ))}
            {visiblePages.length < totalPage && (
              <PageButton disabled>...</PageButton>
            )}
            <ArrowButton
              onClick={() =>
                setCurrentPage((nextPage) => Math.min(nextPage + 1, totalPage))
              }
            >
              <ButtonImg src={isNextClickable ? nextHover : next} />
            </ArrowButton>
            <ArrowButton onClick={() => setCurrentPage(totalPage)}>
              <ButtonImg
                src={isNextArrowClickable ? nextArrowHover : nextarrow}
              />
            </ArrowButton>
          </PaginationWrapper>
        </>
      )}
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
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 24px;
  text-align: center;
`;

const TableStyle = styled.table`
  width: 100%;
  border-collapse: collapse;
`;
const TheadStyle = styled.thead`
  font-size: 16px;
  font-weight: 600;
  color: ${theme.colors.textGray};
  line-height: 20px;
`;
const StyledTr = styled.tr`
  height: 52px;
`;

const Space = styled.div`
  // 테이블 간격
  height: 4px;
`;

const StyledTd = styled.td`
  font-size: 16px;
  font-weight: 400;
  position: relative;
  padding: 16px 0px;
  vertical-align: bottom;
  text-align: center;
  height: 20px;
`;
const StyledTdEnd = styled.td`
  font-size: 16px;
  font-weight: 400;
  padding: 16px 64px 16px 0px;
  text-align: end;
  vertical-align: bottom;
  height: 20px;
`;
const StyledTh = styled.th`
  font-size: 16px;
  font-weight: 400;
  padding: 16px 32px;
`;

export const PaginationWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

export const PageButton = styled.button`
  font-size: 1.7rem;
  color: #ffffff;
  border: none;
  cursor: pointer;
  padding: 5px 10px;
  margin: 0 5px;
  border-radius: 5px;
`;

export const ArrowButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.7rem;
  border: none;
  cursor: pointer;
  padding: 5px 10px;
  margin: 0 5px;
  border-radius: 5px;
`;
export const ButtonImg = styled.img`
  width: 20px;
`;

export const RankImage = styled.img`
  width: 32px;
  height: 32px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
`;

const UserStyledTr = styled.tr`
  height: 52px;
  padding: 0px 32px;
  gap: 68px;
  border-radius: 10px;

  background: linear-gradient(
    90deg,
    rgba(126, 229, 255, 0.1) 3.13%,
    rgba(65, 169, 255, 0.1) 100%
  );
`;
const UserStyledTdStart = styled.td`
  font-size: 16px;
  font-weight: 400;
  text-align: end;
  border-bottom-left-radius: 10px;
  border-top-left-radius: 10px;
  padding: 16px 0px;
  vertical-align: bottom;
  text-align: center;
  height: 20px;
`;
const UserStyledTdEnd = styled.td`
  font-size: 16px;
  font-weight: 400;
  padding: 16px 64px 16px 0px;
  width: 200px;
  border-bottom-right-radius: 10px;
  border-top-right-radius: 10px;
  padding-right: 64px;
  text-align: end;
  vertical-align: bottom;
  height: 20px;
`;
