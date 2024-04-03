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

              <FooterContentText>
                <a href={item.link} target={"_blank"}>
                  {item.content}
                </a>
              </FooterContentText>
            </FooterContentBox>
          ))}

          <FooterContentBox>
            <FooterBoldText>Community</FooterBoldText>
            <ImgBoxWrapper>
              {FooterSns.map((sns) => (
                <a href={sns.linkUrl} target={"_blank"}>
                  <CommunityBox>
                    <CommunityImg src={sns.imgSrc} alt={sns.text} />
                  </CommunityBox>
                </a>
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
  margin-top: 160px;
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
  font-size: 14px;
`;
const FooterContentText = styled.div`
  font-size: 16px;
  font-weight: 400;
  line-height: 20px;
  a {
    &:hover {
      text-decoration: underline;
    }
  }
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
  width: auto;
`;

const ImgBoxWrapper = styled.div`
  display: flex;
  gap: 12px;
`;

const CommunityBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  border-radius: 12px;
  border-top: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.12);
  background-color: #333;
  cursor: pointer;

  &:hover {
    background: linear-gradient(
        0deg,
        rgba(255, 255, 255, 0.12) 0%,
        rgba(255, 255, 255, 0.12) 100%
      ),
      #333;
  }
  @media ${theme.mq.tablet} {
    width: 40px;
    height: 40px;
    border-radius: 10px;
  }
  @media ${theme.mq.mobile} {
    width: unset;
    height: unset;
    display: block;
    background: none;
    box-shadow: unset;
    border-top: 0;
    a {
      font-size: 14px;
      line-height: 1.28;
      &:hover {
        text-decoration: underline;
      }
    }
  }
`;

const CommunityImg = styled.img`
  width: 24px;
  height: 24px;
  @media ${theme.mq.tablet} {
    width: 20px;
    height: 20px;
  }
`;
