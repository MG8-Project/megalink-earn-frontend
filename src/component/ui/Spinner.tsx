import styled, { keyframes } from "styled-components";

interface SpinnerProps {
  size: number;
}

const Spinner: React.FC<SpinnerProps> = ({ size }) => (
  <StyledSpinner size={size} viewBox="0 0 50 50">
    <circle
      className="path"
      cx="25"
      cy="25"
      r="20"
      fill="none"
      strokeWidth="6"
    />
  </StyledSpinner>
);

const spin = keyframes`
    100% {
        transform: rotate(360deg);
    }
`;

const dash = keyframes`
    0% {
        stroke-dasharray: 1, 150;
        stroke-dashoffset: 0;
    }
    50% {
        stroke-dasharray: 90, 150;
        stroke-dashoffset: -35;
    }
    100% {
        stroke-dasharray: 90, 150;
        stroke-dashoffset: -124;
    }
`;

const StyledSpinner = styled.svg<SpinnerProps>`
  animation: ${spin} 2s linear infinite;
  width: ${(props) => props.size}px;
  height: ${(props) => props.size}px;

  & .path {
    stroke: #999999;
    stroke-linecap: round;
    animation: ${dash} 1.5s ease-in-out infinite;
  }
`;

export default Spinner;
