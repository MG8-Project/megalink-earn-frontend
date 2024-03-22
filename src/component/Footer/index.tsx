import React from "react";
import styled from "styled-components";
import { theme } from "../../styles/theme";
import { footerLogo } from "../../assets/images";
import { FooterList, FooterSns } from "../../constants";

const Footer = () => {
  return (
    <FooterWrapper>
      <FooterContainer>
        <FooterInfo>
          {FooterList.map((item, index) => (
            <FooterContentBox key={index}>
              <FooterBoldText>{item.title}</FooterBoldText>
              <a href={item.link}>
                <FooterContentText>{item.content}</FooterContentText>
              </a>
            </FooterContentBox>
          ))}

          <FooterContentBox>
            <FooterBoldText>Community</FooterBoldText>
            <ImgBoxWrapper>
              {FooterSns.map((sns, index) => (
                <ImgBox key={index}>
                  <a href={sns.linkUrl}>
                    <CommunityImg src={sns.imgSrc} alt={sns.text} />
                  </a>
                </ImgBox>
              ))}
            </ImgBoxWrapper>
          </FooterContentBox>
        </FooterInfo>

        <FooterBottom>
          <FooterBottomText>
            Megalink Labs Limited. All RIGHTS RESERVED.
          </FooterBottomText>
          <FooterCi src={footerLogo} alt="" />
        </FooterBottom>
      </FooterContainer>
    </FooterWrapper>
  );
};

export default Footer;

const FooterWrapper = styled.div`
  background-color: ${theme.colors.bg.footer};
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const FooterContainer = styled.div`
  width: 1200px;
`;
const FooterInfo = styled.div`
  width: 100%;
  height: 138px;
  gap: 100px;
  margin-top: 40px;

  border-bottom: 1px solid #333333;
  display: flex;
`;

const FooterBottom = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 80px;
`;

const FooterBottomText = styled.div`
  color: ${theme.colors.footerText};
`;
const FooterContentText = styled.p`
  font-size: 16px;
  font-weight: 400;
`;

const FooterCi = styled.img`
  width: 139px;
  height: 20px;
`;

const FooterBoldText = styled.div`
  font-size: 18px;
  font-weight: 600;
  line-height: 22px;
`;

const FooterContentBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const ImgBoxWrapper = styled.div`
  display: flex;
  gap: 12px;
`;

const ImgBox = styled.div``;

const CommunityImg = styled.img`
  width: 48px;
`;
