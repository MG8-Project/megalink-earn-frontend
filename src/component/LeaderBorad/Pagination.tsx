import React from "react";
import styled from "styled-components";
import { theme } from "../../styles/theme";
import {
  preArrow,
  preArrowHover,
  pre,
  preHover,
  next,
  nextHover,
  nextArrow,
  nextArrowHover,
} from "../../assets/images";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  setCurrentPage: (page: number) => void;
}

interface PaginationButtonProps {
  active?: boolean;
  disabled?: boolean;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  setCurrentPage,
}) => {
  const handlePrevClick = () => {
    // 한 번에 5개의 페이지씩 이동
    setCurrentPage(1);
  };

  const handleNextClick = () => {
    // 한 번에 5개의 페이지씩 이동
    setCurrentPage(totalPages);
  };

  const getPageNumbers = (): number[] => {
    const maxPagesToShow = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
    let endPage = Math.min(startPage + maxPagesToShow - 1, totalPages);

    if (totalPages <= maxPagesToShow) {
      startPage = 1;
      endPage = totalPages;
    } else if (endPage === totalPages) {
      startPage = totalPages - maxPagesToShow + 1;
    }

    return Array.from(
      { length: endPage - startPage + 1 },
      (_, index) => startPage + index
    );
  };

  return (
    <PaginationWrapper>
      {/* 이전 페이지로 이동하는 버튼 */}
      <PaginationButton onClick={handlePrevClick} disabled={currentPage === 1}>
        <ArrowImage src={currentPage === 1 ? preArrow : preArrowHover} alt="" />
      </PaginationButton>
      <PaginationButton
        onClick={() => setCurrentPage(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <ArrowImage src={currentPage === 1 ? pre : preHover} alt="" />
      </PaginationButton>
      {getPageNumbers().map((pageNumber) => (
        <PaginationButton
          key={pageNumber}
          onClick={() => setCurrentPage(pageNumber)}
          active={pageNumber === currentPage}
        >
          {pageNumber}
        </PaginationButton>
      ))}
      <PaginationButton
        onClick={() => setCurrentPage(Math.min(currentPage + 1, totalPages))}
        disabled={currentPage === totalPages}
      >
        <ArrowImage
          src={currentPage === totalPages ? next : nextHover}
          alt=""
        />
      </PaginationButton>
      <PaginationButton
        onClick={handleNextClick}
        disabled={currentPage === totalPages}
      >
        <ArrowImage
          src={currentPage === totalPages ? nextArrow : nextArrowHover}
          alt=""
        />
      </PaginationButton>
    </PaginationWrapper>
  );
};

export default Pagination;

const PaginationWrapper = styled.div`
  display: flex;
  justify-content: center;
  font-weight: 400;
  line-height: 18px;
  gap: 16px;
`;

const PaginationButton = styled.button<PaginationButtonProps>`
  color: ${(props) => (props.active ? "white" : theme.colors.textGray)};
  padding: 0.5rem;
  cursor: pointer;
  &:disabled {
    cursor: not-allowed;
  }
`;

const ArrowImage = styled.img`
  width: 16px;
  height: 16px;
  &:hover {
    color: white;
  }
`;
