import styled from "styled-components";
import { theme } from "../../styles/theme";
import { useEffect, useState } from "react";
import API from "../../apis/Api";
import { API_SUCCESS_CODE, nationList } from "../../constants";

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
}
interface IndividualResponseType {
  status: number;
  data: {
    personalRnkLst: Array<PersonalListDataType>;
  };
}
const IndividualList = () => {
  const [personalListData, setPersonalListData] = useState<
    Array<PersonalListDataType>
  >([]);
  const fetchIndividualList = async () => {
    try {
      const endPoint = `${process.env.REACT_APP_API_PERSONAL}/personalRnk`;
      const res: IndividualResponseType = await API.get(endPoint);
      if (res.status !== API_SUCCESS_CODE) throw new Error(String(res.status));
      setPersonalListData(res.data.personalRnkLst);
    } catch (err) {
      console.log(err);
    }
  };

  const convertNation = (nationCode: number) => {
    if (nationCode === undefined || nationCode === 0) return "Others";
    return nationList.filter((data) => data.code === nationCode)[0].nation;
  };
  useEffect(() => {
    fetchIndividualList();
  }, []);

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
          {personalListData.map((item, index) => (
            <tr key={index}>
              <StyledTd>{item.rank}</StyledTd>
              <StyledTd>{item.userName}</StyledTd>
              <StyledTd>{convertNation(item.nationCode)}</StyledTd>
              {/* FIXME: column 추가되면 넣기 */}
              <StyledTd>10</StyledTd>
              <StyledTd>{item.point}</StyledTd>
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
