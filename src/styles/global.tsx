import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";
import { theme } from "./theme";

export const GlobalStyle = createGlobalStyle`
${reset}
html {
  font-size: 62.5%;
  .onlyPc {
    display: block;
  }
  .onlyMobile {
    display: none;
  }
  @media ${({ theme }) => theme.mq.mobile} {
      font-size: 37.5%;
    .onlyMobile {
      display: block;
    }
    .onlyPc {
      display: none;
    }
  }
}
* {
  box-sizing: border-box;
  line-height: normal;
  
}
body {
    background-color: ${theme.colors.bg.main};
    color: ${theme.colors.text};
    ::-webkit-scrollbar {
        display: none;
    }
    font-size: 2.0rem;
    font-weight: 400;
    font-family: pretendard, sans-serif;
    
    a {
      text-decoration: none;
      color: ${theme.colors.text};
      cursor: pointer;
      font-family: pretendard, sans-serif;
    }
    button {
      cursor: pointer;
      border: none;
      background: none;
      color: inherit;
    }
    ul, ol {
      list-style: none;
    }
  }
`;
