import React from "react";
import styled from "styled-components";

const Footer = () => {
  return (
    <FooterWrapper>
      <FooterInfo> 푸터</FooterInfo>
      <FooterBottom>Megalink Labs Limited. All RIGHTS RESERVED.</FooterBottom>
    </FooterWrapper>
  );
};

export default Footer;

const FooterWrapper = styled.div`
  width: 1200px;
`;
const FooterInfo = styled.div`
  max-width: 1200px;
  height: 174px;
  border-bottom: 1px solid #333333;
`;

const FooterBottom = styled.div``;
