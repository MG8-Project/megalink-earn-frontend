import React, { useState } from 'react';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';

const JoinModal: React.FC = () => {

    const { register, handleSubmit } = useForm();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const onSubmit = async (data: any) => {

        setIsSubmitting(true);
        // TODO: 회원가입 API 호출

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
                    />
                    <JoinModalInput
                        name="country"
                        placeholder="country"
                    />
                    <JoinModalAddress>
                        {window.ethereum?.selectedAddress}
                    </JoinModalAddress>
                    <JoinModalButton type="submit" disabled={isSubmitting}>
                        {isSubmitting ? '로딩...' : '회원가입'}
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

const JoinModalError = styled.div`
    color: red;
    margin-bottom: 10px;
`;