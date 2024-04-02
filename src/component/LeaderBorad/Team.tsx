import styled from "styled-components";
import {theme} from "../../styles/theme";
import {useEffect, useState} from "react";
import API from "../../apis/Api";
import {API_SUCCESS_CODE, nationList} from "../../constants";
import {ArrowButton, ButtonImg, PageButton, PaginationWrapper,} from "./Individual";

import {nextarrow, prearrow} from "../../assets/images";
import RankingAlert from "./RankingAlert";

export const tableTitle = [
    {id: 0, title: "Rank"},
    {id: 1, title: "Name"},
    {id: 2, title: "Nation"},
    {id: 3, title: "Booster"},
    {id: 4, title: "Total Points"},
];

interface TeamListDataType {
    name: string;
    rank: number;
    totalpoints: number;
    booster: string;
    nation: number;
}

interface TeamResponseType {
    status: number;
    data: {
        totalSize: number;
        teamRnkLst: Array<TeamListDataType>;
    };
}

const TeamList = () => {
    const [totalPage, setTotalPage] = useState(0);
    const [visiblePages, setVisiblePages] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [teamListData, setTeamListData] = useState<Array<TeamListDataType>>([]);
    const handleChangePage = (pageNumber: number) => {
        setCurrentPage(pageNumber);
    };

    const convertNation = (nationCode: number) => {
        if (nationCode === undefined || nationCode === 0) return "Others";
        return nationList.filter((data) => data.code === nationCode)[0].nation;
    };
    const addComma = (point: string) => {
        return point.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };

    const isListEmpty = teamListData.length === 0

    const fetchTeamList = async (currentPage: number) => {
        try {
            const endPoint = `${process.env.REACT_APP_API_PERSONAL}/teamRnk?size=5&&page=${currentPage}`;
            const res: TeamResponseType = await API.get(endPoint);
            if (res.status !== API_SUCCESS_CODE) throw new Error(String(res.status));
            setTeamListData(res.data.teamRnkLst);
            setTotalPage(Math.ceil(res.data.totalSize / 5));
        } catch (err) {
            switch (err) {
                default:
            }
        }
    };
    useEffect(() => {
        void fetchTeamList(currentPage);
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
        <TeamListWrapper>
            {isListEmpty ? <RankingAlert text={'There is No Ranking Data Yet'}/>
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
                        {teamListData.map((item, index) => (
                            <tr key={index}>
                                <StyledTd>{item.rank}</StyledTd>
                                <StyledTd>{item.name}</StyledTd>
                                <StyledTd>{convertNation(item.nation)}</StyledTd>
                                <StyledTd>{item.booster}%</StyledTd>
                                <StyledTd>{addComma(String(item.totalpoints))}</StyledTd>
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

        </TeamListWrapper>
    );
};

export default TeamList;
const TeamListWrapper = styled.div`
    margin-top: 32px;
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
    padding: 16px 0px 16px 0px;
`;
const StyledTh = styled.th`
    font-size: 16px;
    font-weight: 400;
    padding: 8px 32px;
`;
