import styled from "styled-components";
import { theme } from "../../styles/theme";
import { loading } from "../../assets/images";

const ButtonBox = () => {
  return (
    <ButtonBoxWrapper>
      <Default>Enable Claim</Default>
      <Claiming>
        <Loading src={loading} alt="" />
        Pending
      </Claiming>
      <Default>Claim All</Default>

      <Claiming>No MG8 Point</Claiming>
    </ButtonBoxWrapper>
  );
};

const ButtonBoxWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export default ButtonBox;
const Default = styled.button`
  display: flex;
  font-weight: 600;
  align-items: center;
  justify-content: center;
  text-align: center;
  width: 180px;
  height: 56px;
  border: 1px solid #ffffff;
  border-radius: 100px;
  font-size: 20px;
  padding: 10px 12px;
`;

const Claiming = styled.button`
  display: flex;
  font-weight: 600;
  align-items: center;
  justify-content: center;
  text-align: center;
  width: 180px;
  height: 56px;
  color: ${theme.colors.textGray};
  border-radius: 100px;
  font-size: 20px;
  background-color: #222222;
  border: 1px solid #333333;
  gap: 10px;
`;
const Loading = styled.img`
  width: 24px;
`;
