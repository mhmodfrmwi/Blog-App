import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination.jsx";
import { useState, useEffect } from "react";

const PaginationComponent = ({ totalPages, currentPage, onPageChange }) => {
  const [visiblePages, setVisiblePages] = useState([]);

  useEffect(() => {
    setVisiblePages(getVisiblePages(currentPage, totalPages));
  }, [currentPage, totalPages]);

  function getVisiblePages(page, total) {
    if (total <= 7) {
      return [...Array(total)].map((_, idx) => idx + 1);
    }
    if (page <= 4) {
      return [1, 2, 3, 4, 5, "ellipsis", total];
    } else if (page >= total - 3) {
      return [1, "ellipsis", total - 4, total - 3, total - 2, total - 1, total];
    } else {
      return [1, "ellipsis", page - 1, page, page + 1, "ellipsis", total];
    }
  }

  const handleClick = (page) => {
    if (page === "ellipsis") return;
    onPageChange(page);
    window.scrollTo({ top: 0, behavior: "smooth" }); // Scroll to top after page change
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href="#"
            onClick={handlePrevious}
            disabled={currentPage === 1}
          />
        </PaginationItem>

        {visiblePages.map((page, index) => (
          <PaginationItem key={index}>
            {page === "ellipsis" ? (
              <PaginationEllipsis />
            ) : (
              <PaginationLink
                href="#"
                onClick={() => handleClick(page)}
                isActive={page === currentPage}
                className="transition duration-200 ease-in-out transform hover:scale-105" // Added animation
              >
                {page}
              </PaginationLink>
            )}
          </PaginationItem>
        ))}

        <PaginationItem>
          <PaginationNext
            href="#"
            onClick={handleNext}
            disabled={currentPage === totalPages}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default PaginationComponent;
