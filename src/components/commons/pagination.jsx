import React from "react";
import _ from "lodash";
import PropTypes from "prop-types";
const Pagination = props => {
  const { count, pageSize, onPageChanged, currentPage } = props;
  let pages = count / pageSize;
  pages = Math.ceil(pages);
  if (pages === 1) return null;
  pages = _.range(1, pages + 1);
  return (
    <nav aria-label="Page navigation example">
      <ul className="pagination">
        {pages.map(page => (
          <li
            key={page}
            className={currentPage === page ? "page-item active" : "page-item"}
          >
            <a
              className="page-link"
              href="#"
              onClick={() => onPageChanged(page)}
            >
              {page}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};
Pagination.propTypes = {
  count: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  onPageChanged: PropTypes.func.isRequired,
  currentPage: PropTypes.number.isRequired
};
export default Pagination;
