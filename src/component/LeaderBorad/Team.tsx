import styled from "styled-components";
import { theme } from "../../styles/theme";
import { useEffect, useState } from "react";
import API from "../../apis/Api";
import { API_SUCCESS_CODE } from "../../constants";

export const tableTitle = [
  { id: 0, title: "Rank" },
  { id: 1, title: "Name" },
  { id: 2, title: "Nation" },
  { id: 3, title: "Booster" },
  { id: 4, title: "Total Points" },
];
interface TeamListType {
  userName: string;
  rank: number;
  point: number;
}
interface TeamResponseType {
  status: number;
  data: {
    teamRnkLst: Array<TeamListType>;
  };
}
const TeamList = () => {
  const [teamListData, setTeamListData] = useState([]);
  const fetchTeamList = async () => {
    try {
      const endPoint = `${process.env.REACT_APP_API_PERSONAL}/teamRnk`;
      const res: TeamResponseType = await API.get(endPoint);
      if (res.status !== API_SUCCESS_CODE) throw new Error(String(res.status));
      setTeamListData(res.data.teamRnkLst);
    } catch (err) {
      switch (err) {
        default:
          console.log("Fail to Load Team Rank Data");
      }
    }
  };
  const convertNation = (nationCode: number) => {
    if (nationCode === undefined || nationCode === 0) return "Others";
    return teamListData.filter((data) => data.code === nationCode)[0].nation;
  };

  const addComma = (point: string) => {
    return point.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };
  useEffect(() => {
    fetchTeamList();
  }, []);
  return (
    <TeamListWrapper>
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
              <StyledTd>{item.userName}</StyledTd>
              <StyledTd>{convertNation(item.nation)}</StyledTd>
              {/* FIXME: column 추가되면 넣기 */}
              <StyledTd>15.23%</StyledTd>
              <StyledTd>{addComma(item.point)}</StyledTd>
            </tr>
          ))}
        </tbody>
      </TableStyle>
    </TeamListWrapper>
  );
};

export default TeamList;
const TeamListWrapper = styled.div`
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
