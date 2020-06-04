import React from 'react';

import './Pagination.css'

export const Pagination = ({ startIndex, lastIndex, totalPages, totalCount, onPageChange, currentPage }) => {

    return (
        <div className="row">
            <div className="col-sm-12 footer-pagination d-flex">
                <nav className="form-inline" aria-label="Page navigation example">
                    <div className="fnt-sm pagination-number">
                        <span className="fnt-bold">{startIndex}-{lastIndex} </span>of
                                    <a className="pl-1" href="#">{totalCount}</a></div>
                    <ul className="pagination text-center">
                        <li className={"page-item " + (currentPage !== 1 ? 'active' : "")}
                            onClick={(e) => onPageChange('previous', currentPage)}>
                            <a className="page-link border-0 ml-3" href="javascript:void(0)">
                                <i className="arrow left"></i>
                            </a>
                        </li>
                        <li className={"page-item " + (currentPage < totalPages ? 'active' : '')}
                            onClick={(e) => onPageChange('next', currentPage, totalPages)}>
                            <a className="page-link border-0 ml-3" href="javascript:void(0)">
                                <i className="arrow right"></i>
                            </a>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    )
}