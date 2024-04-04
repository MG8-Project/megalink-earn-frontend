import styled from "styled-components";

interface RankingAlertDataType {
    text: string;
}

const RankingAlert = (props: RankingAlertDataType) => {
    const {text} = props
    return <RankingAlertWrapper>{text}</RankingAlertWrapper>
}

const RankingAlertWrapper = styled.div`
  width: 100%;
  padding: 174px;
  font-weight: 400;
  font-size: 20px;
`;
export default RankingAlert