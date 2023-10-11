import React, { useState } from "react";
import styles from "./Pagination.module.css";

interface PaginationProps {
  items: any[];
  onPageChange: (itemsToShow: any[]) => void;
}

const Pagination: React.FC<PaginationProps> = ({ items, onPageChange }) => {
  const ITEMS_PER_PAGE = 12;

  const totalPages = Math.ceil(items.length / ITEMS_PER_PAGE);
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);

    const indexOfLastItem = pageNumber * ITEMS_PER_PAGE;
    const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;

    const itemsToShow = items.slice(indexOfFirstItem, indexOfLastItem);
    onPageChange(itemsToShow);
  };

  return (
    <div className={styles.paginationControls}>
      <button
        className={styles.button}
        onClick={() => handlePageChange(1)}
        disabled={currentPage === 1}
      >
        First
      </button>
      <button
        className={styles.button}
        onClick={() => handlePageChange(Math.max(currentPage - 1, 1))}
        disabled={currentPage === 1}
      >
        Previous
      </button>
      <button
        className={styles.button}
        onClick={() => handlePageChange(Math.min(currentPage + 1, totalPages))}
        disabled={currentPage === totalPages}
      >
        Next
      </button>
      <button
        className={styles.button}
        onClick={() => handlePageChange(totalPages)}
        disabled={currentPage === totalPages}
      >
        Last
      </button>
    </div>
  );
};

export default Pagination;
