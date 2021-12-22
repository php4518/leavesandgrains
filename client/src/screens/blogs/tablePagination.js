import React, { Component } from "react";
import { Pagination, PaginationItem, PaginationLink } from "reactstrap";

import PropTypes from "prop-types";
/** I used object destructuring of the props object, to pass down the properties as variables. This improves readability by getting rid of props. */
const TablePagination = ({
  pagesCount,
  currentPage,
  handlePageClick,
  handlePreviousClick,
  handleNextClick,
}) => {
  return (
    /**The reactstrap Pagination component encapsulates the reactstrap PaginationItem which in turn encapsulates reactstrap PaginationLink. */
    /**The first PaginationItem inside the Pagination is the previous button. This is disabled when the current page is zero or less
     *  than zero “disabled={currentPage <= 0}”. */
    <div>
      <Pagination size="sm">
        <PaginationItem disabled={currentPage <= 0}>
          <PaginationLink onClick={handlePreviousClick} previous href="#" />
        </PaginationItem>
        {/* The next PaginationItem after the previous PaginationItem button is the dynamic PaginationItem. This is the one that generates the page number buttons. */}
        {/* “Array(pagesCount)”: creates and initializes a new array object of length equal to pagesCount. */}
        {/* “[…Array(pagesCount)].map( fn)”: using the spread operator I expand the array. After expanding, the map() method then creates a new array of PaginationItems. */}

        {[...Array(pagesCount)].map((page, i) => (
          <PaginationItem active={i === currentPage} key={i}>
            <PaginationLink onClick={(e) => handlePageClick(e, i)} href="#">
              {i + 1}
            </PaginationLink>
          </PaginationItem>
        ))}

        <PaginationItem disabled={currentPage >= pagesCount - 1}>
          <PaginationLink onClick={handleNextClick} next href="#" />
        </PaginationItem>
      </Pagination>
    </div>
  );
};

TablePagination.propTypes = {
  //pageCount: the total number of records in our dataset.
  pagesCount: PropTypes.number.isRequired,
  //currentPage: the current page navigated to
  currentPage: PropTypes.number.isRequired,
  /**handlePageClick: a function that handles the click event when a page number is clicked.
   * This function will pass the current page number which will be saved in state. */
  handlePageClick: PropTypes.func.isRequired,
  /**handlePreviousClick: a function that handles the click event when the previous button is clicked. This enables navigating to the previous(<<) page. */
  handlePreviousClick: PropTypes.func.isRequired,
  /**handleNextClick: a function that handles the click event when the next (>>) button is clicked. This enables navigating to the next page. */
  handleNextClick: PropTypes.func.isRequired,
};
export default TablePagination;