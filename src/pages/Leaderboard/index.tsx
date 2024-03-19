import Header from "../../component/Header";
import Footer from "../../component/Footer";
import LeaderBard from "../../component/LeaderBorad";
import styled from "styled-components";

const Leaderboard = () => {
  return (
    <HomeWrapper>
      <Header />
	    <LeaderBard />
      <Footer />
    </HomeWrapper>
  );
};

export default Leaderboard;

const HomeWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
