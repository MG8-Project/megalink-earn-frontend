import React, { ChangeEvent, useState } from "react";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import API from "../../apis/Api";

interface JoinModalProps {
  handleCloseModal: () => void;
}
const JoinModal = (props: JoinModalProps) => {
  const { handleCloseModal } = props;
  const { handleSubmit } = useForm();
  const endpointUser = process.env.REACT_APP_API_USER;
  const userAccount = window.ethereum?.selectedAddress;
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [userName, setUserName] = useState("");
  const [userNation, setUserNation] = useState(1);
  const nationList = [
    { nation: "Korea", code: 1 },
    { nation: "China", code: 2 },
    { nation: "Japan", code: 3 },
    { nation: "USA", code: 4 },
    { nation: "Brazil", code: 5 },
    { nation: "Singapore", code: 6 },
    { nation: "Indonesia", code: 7 },
    { nation: "India", code: 8 },
    { nation: "Vietnam", code: 9 },
    { nation: "Philippines", code: 10 },
    { nation: "UAE", code: 11 },
    { nation: "UK", code: 12 },
    { nation: "France", code: 13 },
    { nation: "Others", code: 14 },
  ];
  const handleSelect = (e: ChangeEvent<HTMLSelectElement>) => {
    setUserNation(Number(e.target.value));
  };
  const resetInputFields = () => {
    setUserName("");
    setUserNation(0);
  };
  const fetchJoin = async () => {
    try {
      const res = await API.post(
        `${endpointUser}/join`,
        {
          userAccount: userAccount,
          userName: userName,
          userNation: userNation,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (res.data.resultCode !== "1") throw new Error(res.data.resultCode);
      alert("회원가입이 완료되었습니다.");
      resetInputFields();
      handleCloseModal();
    } catch (err) {
      switch (err) {
        case "2":
          alert("이미 가입된 사용자 정보입니다.");
          return;
        default:
          alert("가입에 실패했습니다.");
          return;
      }
    }
  };
  const onSubmit = async (data: any) => {
    setIsSubmitting(true);
    fetchJoin();
    setIsSubmitting(false);
  };
  return (
    <JoinModalWrapper>
      <JoinModalContent>
        <JoinModalTitle>Join us</JoinModalTitle>
        <form onSubmit={handleSubmit(onSubmit)}>
          <JoinModalInput
            name="name"
            placeholder="name"
            value={userName}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setUserName(e.target.value)
            }
          />
          <JoinModalSelect onChange={handleSelect}>
            {nationList.map((data, index) => (
              <option key={index} value={data.code}>
                {data.nation}
              </option>
            ))}
          </JoinModalSelect>
          <JoinModalAddress>{userAccount}</JoinModalAddress>
          <JoinModalButton type="submit" disabled={isSubmitting}>
            {isSubmitting ? "로딩..." : "회원가입"}
          </JoinModalButton>
        </form>
      </JoinModalContent>
    </JoinModalWrapper>
  );
};
export default JoinModal;

const colors = {
  bg: {
    main: "#101111",
    footer: "#000",
    box: "#1B1B1B",
    icon: "#333",
    iconHover: "#4B4B4B",
    dotsActive: "#379FFF",
  },
  text: "#fff",
  textGray: "#999",
  footerText: "#A0A0A0",
  lines: {
    header: "#333",
    footer: "#333",
    slide: "#333",
    navActive: "#d9d9d9",
  },
};

const JoinModalWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: ${colors.bg.main};
  z-index: 1000;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const JoinModalContent = styled.div`
  width: 500px;
  padding: 20px;
  background-color: ${colors.bg.box};
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  color: ${colors.text};
`;

const JoinModalTitle = styled.h1`
  font-size: 1.8rem; // Adjust based on your fontSizes.title
  font-weight: bold;
  margin-bottom: 10px;
`;

const JoinModalInput = styled.input`
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  margin-bottom: 10px;
  box-sizing: border-box;
`;

const JoinModalSelect = styled.select`
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  margin-bottom: 10px;
  box-sizing: border-box;
  outline: none;
`;

const JoinModalAddress = styled.div`
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  margin-bottom: 10px;
  box-sizing: border-box;
  filter: grayscale(1);
`;

const JoinModalButton = styled.button`
  width: 100%;
  padding: 10px;
  background-color: ${colors.bg.icon}; // Use a light gray color from your theme
  color: ${colors.text}; // Use white text color
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;
