import styled from "styled-components";

const Points = () => {
  return (
    <PointsWrapper>
      <TextWrapper>
        <div>My Total MG8 Points</div>
        {/* <PointText>-P</PointText> */}
        <PointText>123,456,789P</PointText>
      </TextWrapper>
      {/* 
      <LoginButton>Login</LoginButton> */}
      <EnableButton>Enable Claim</EnableButton>
    </PointsWrapper>
  );
};

export default Points;

const PointsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const TextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  font-weight: 600;
  font-size: 18px;
`;
const PointText = styled.div`
  font-size: 40px;
`;

const LoginButton = styled.button`
  margin-top: 36px;
  font-weight: 600;
  width: 120px;
  height: 56px;
  border: 1px solid #ffffff;
  border-radius: 100px;
  font-size: 20px;
`;

const EnableButton = styled.button`
  margin-top: 36px;
  font-weight: 600;
  width: 180px;
  height: 56px;
  border: 1px solid #ffffff;
  border-radius: 100px;
  font-size: 20px;
`;
