import ReactPaginateModule from "react-paginate";
import type { ReactPaginateProps } from "react-paginate";

import css from "./Pagination.module.css";

const ReactPaginate =
  (
    ReactPaginateModule as unknown as {
      default?: React.ComponentType<ReactPaginateProps>;
    }
  ).default ??
  (ReactPaginateModule as unknown as React.ComponentType<ReactPaginateProps>);

interface PaginationProps {
  currentPage: number;
  setCurrentPage: (number: number) => void;
  totalPages: number;
}

const Pagination = ({
  currentPage,
  totalPages,
  setCurrentPage,
}: PaginationProps) => {
  if (!totalPages || totalPages <= 1) return null;

  const safePageIndex = Math.min(Math.max(currentPage - 1, 0), totalPages - 1);

  return (
    <>
      <ReactPaginate
        pageCount={totalPages}
        pageRangeDisplayed={5}
        marginPagesDisplayed={1}
        onPageChange={({ selected }) => setCurrentPage(selected + 1)}
        forcePage={safePageIndex}
        containerClassName={css.pagination}
        activeClassName={css.active}
        nextLabel="→"
        previousLabel="←"
      />
    </>
  );
};

export default Pagination;