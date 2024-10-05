import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import "./Pagination.css";
import PropTypes from "prop-types";

const Pagination = ({
  totalPages,
  currentPage,
  isFirstPage,
  isLastPage,
  handlePageChange,
  isDisabled
}) => {
  return (
    <div className="pagination">
      <button
        disabled={isFirstPage || isDisabled}
        onClick={() => handlePageChange("first")}
        className="first-page"
      >
        <ChevronsLeft size={20} />
      </button>
      <button
        disabled={isFirstPage || isDisabled}
        onClick={() => handlePageChange("prev")}
        className="previous-page"
      >
        <ChevronLeft size={20} />
      </button>
      {Array.from({ length: totalPages }, (_, index) => index + 1).map(
        (page) => (
          <button
            key={page}
            className={`page-number ${page === currentPage ? "active" : ""}`}
            onClick={() => handlePageChange(page)}
          >
            {page}
          </button>
        )
      )}
      <button
        disabled={isLastPage || isDisabled}
        onClick={() => handlePageChange("next")}
        className="next-page"
      >
        <ChevronRight size={20} />
      </button>
      <button
        disabled={isLastPage || isDisabled}
        onClick={() => handlePageChange("last")}
        className="last-page"
      >
        <ChevronsRight size={20} />
      </button>
    </div>
  );
};

Pagination.propTypes = {
  totalPages: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  isFirstPage: PropTypes.bool.isRequired,
  isLastPage: PropTypes.bool.isRequired,
  handlePageChange: PropTypes.func.isRequired,
  isDisabled: PropTypes.bool
};

export default Pagination;
