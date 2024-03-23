import styled from "styled-components";
import {theme} from "../../styles/theme";
import {useEffect, useState} from "react";
import API from "../../apis/Api";
import {API_SUCCESS_CODE, nationList, UNKNOWN} from "../../constants";

import {nextarrow, prearrow} from "../../assets/images";
import RankingAlert from "./RankingAlert";

export const tableTitle = [
    {id: 0, title: "Rank"},
    {id: 1, title: "Name"},
    {id: 2, title: "Nation"},
    {id: 3, title: "Level"},
    {id: 4, title: "Total Points"},
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
    const [totalPage, setTotalPage] = useState(0);
    const [visiblePages, setVisiblePages] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [personalListData, setPersonalListData] = useState<
        Array<PersonalListDataType>
    >([]);

    const handleChangePage = (pageNumber: number) => {
        setCurrentPage(pageNumber);
    };
    const convertNation = (nationCode: number) => {
        // 국가 코드가 지정된 배열에 없는 경우 처리
        if (nationCode === undefined || nationCode === 0) return "Others";
        const findObjectList = nationList.filter(data => data.code === nationCode)
        if (findObjectList.length === 0) return UNKNOWN
        return findObjectList[0].nation
    };

    const isListEmpty = personalListData.length === 0
    
    const fetchIndividualList = async (currentPage: number) => {
        try {
            const endPoint = `${process.env.REACT_APP_API_PERSONAL}/personalRnk?size=5&&page=${currentPage}`;
            const res: IndividualResponseType = await API.get(endPoint);
            if (res.status !== API_SUCCESS_CODE) throw new Error(String(res.status));
            setPersonalListData(res.data.personalRnkLst);
            setTotalPage(Math.ceil(res.data.totalSize / 5));
        } catch (err) {
            console.log(err);
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
    return (
        <IndividualListWrapper>
            {isListEmpty ?
                <RankingAlert text={'There is No Ranking Data Yet'}/>
                :
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
                        {personalListData.map((item, index) => (
                            <tr key={index}>
                                <StyledTd>{item.rank}</StyledTd>
                                <StyledTd>{item.userName}</StyledTd>
                                <StyledTd
                                    style={{color: convertNation(item.nationCode) === UNKNOWN ? '#eba4a4' : '#fff'}}>{convertNation(item.nationCode)}</StyledTd>
                                <StyledTd>{item.level}</StyledTd>
                                <StyledTd>{item.point}</StyledTd>
                            </tr>
                        ))}
                        </tbody>
                    </TableStyle>
                    <PaginationWrapper>
                        <ArrowButton onClick={() => setCurrentPage(1)}>
                            <ButtonImg src={prearrow}/>
                        </ArrowButton>
                        {visiblePages.map((data, index) => (
                            <PageButton
                                key={index}
                                onClick={() => handleChangePage(data)}
                                style={{
                                    background:
                                        data === currentPage
                                            ? theme.colors.bg.dotsActive
                                            : theme.colors.bg.main,
                                }}
                            >

                                {data}
                            </PageButton>
                        ))}
                        {visiblePages.length < totalPage && (
                            <PageButton disabled>...</PageButton>
                        )}
                        <ArrowButton onClick={() => setCurrentPage(totalPage)}>
                            <ButtonImg src={nextarrow}/>
                        </ArrowButton>
                    </PaginationWrapper>
                </>
            }
        </IndividualListWrapper>
    );
};

export default IndividualList;

const IndividualListWrapper = styled.div`
    margin-top: 32px;
    margin-bottom: 32px;
    background-color: ${theme.colors.bg.box};
    padding: 16px 0 16px 0;
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
    padding: 16px 0 16px 0;
`;
const StyledTh = styled.th`
    font-size: 16px;
    font-weight: 400;
    padding: 8px 32px;
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
    background: ${theme.colors.bg.main};
    border: none;
    cursor: pointer;
    padding: 5px 10px;
    margin: 0 5px;
    border-radius: 5px;
`;
export const ButtonImg = styled.img`
    width: 20px;
`;
