import React from 'react';
import ReactPaginate from "react-paginate";
import style from './Pagination.module.scss'
const Pagination = ({currentPage, setCurrentPage, limitPage}) => {
    return (
        <div>
            <ReactPaginate
            className={style.root}
            breakLabel="..."
            nextLabel=">"
            previousLabel="<"
            onPageChange={event => setCurrentPage(event.selected + 1)}
            pageRangeDisplayed={6}
            pageCount={2}
            renderOnZeroPageCount={null}
          />
        </div>
    );
};

export default Pagination;