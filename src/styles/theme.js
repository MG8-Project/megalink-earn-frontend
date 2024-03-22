const fontSizes = {
  title: "4.8rem",
  subTitle: "2.4rem",
  nav: "1.8rem",
  box: "3.2rem",
  footer: "1.4rem",
};

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
const positions = {
  flexCenterXY: "display: flex; justify-content: center; align-items: center;",
  flexCenterX: "display: flex; justify-content: center;",
  flexCenterY: "display: flex; align-items: center;",
  flexColumnY: "display: flex; flex-direction: column; align-items: center;",
  spaceBetween: "display: flex; justify-content: space-between;",
  spaceAround: "display: flex; justify-content: space-around;",
};

const mq = {
  mobile: "(max-width: 600px)",
  tablet: "(max-width: 1024px)",
  desktop: "(max-width: 1920px)",
  header: "(max-width: 1300px)",
};

export const theme = {
  fontSizes,
  colors,
  positions,
  mq,
};
