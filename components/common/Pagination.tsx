import React, {FunctionComponent, useCallback, MouseEvent} from "react";
import {useSWRConfig} from "swr";
import {getRange, getPageInfo} from "../../lib/utils/calculatePagination";
import {usePageDispatch, usePageState} from "../../lib/context/PageContext";
import Maybe from "./Maybe";

interface PaginationProps {
    total: number;
    limit: number;
    pageCount: number;
    currentPage: number;
    lastIndex: number;
    fetchURL: string;
}

const Pagination: FunctionComponent<PaginationProps> = ({
                                                            total,
                                                            limit,
                                                            pageCount,
                                                            currentPage,
                                                            lastIndex,
                                                            fetchURL
                                                        }): JSX.Element => {
    const page = usePageState();
    const setPage = usePageDispatch();
    const { mutate } = useSWRConfig();

    const {firstPage, lastPage, hasPreviousPage, hasNextPage} = getPageInfo({
        limit,
        pageCount,
        total,
        page: currentPage
    });
    const pages = total > 0 ? getRange(firstPage, lastPage): [];

    const handleClick = useCallback(async (event: MouseEvent<HTMLLIElement>, index: number) => {
        event.preventDefault();
        setPage!(index);
        await mutate(fetchURL);
    }, []);

    const handleFirstClick = useCallback(async (event: MouseEvent<HTMLLIElement>) => {
        event.preventDefault();
        setPage!(0);
    }, []);

    const handlePrevClick = useCallback(async (event: MouseEvent<HTMLLIElement>) => {
        event.preventDefault();
        setPage!(page! - 1);
        await (fetchURL);
    }, [])

    const handleNextClick = useCallback(async (event: MouseEvent<HTMLLIElement>) => {
        event.preventDefault();
        setPage!(lastIndex);
        await mutate(fetchURL);
    }, []);

    const handleLastClick = useCallback(async (event: MouseEvent<HTMLLIElement>) => {
        event.preventDefault();
        setPage!(lastIndex);
        await mutate(fetchURL);
    }, []);

    return (
        <nav>
            <ul className="pagination">
                <li className="page-item" onClick={handleFirstClick}>
                    <a className="page-link">{'<<'}</a>
                </li>
                <Maybe evaluateBoolean={hasPreviousPage}>
                    <li className="page-item" onClick={handlePrevClick}>
                        <a className="page-link">{`<`}</a>
                    </li>
                </Maybe>

                {pages.map((page) => {
                    const isCurrent = !currentPage ? page === 0 : page === currentPage;
                    return (
                        <li
                            key={page.toString()}
                            className={isCurrent ? "page-item active" : "page-item"}
                            onClick={(event: MouseEvent<HTMLLIElement, any> ) => handleClick(event, page)}
                        >
                            <a className="page-link">{page + 1}</a>
                        </li>
                    );
                })}
                <Maybe evaluateBoolean={hasNextPage}>
                    <li className="page-item" onClick={handleNextClick}>
                        <a className="page-link">{`>`}</a>
                    </li>
                </Maybe>
                <li className="page-item" onClick={handleLastClick}>
                    <a className="page-link">{`>>`}</a>
                </li>
            </ul>
        </nav>
    );
};

export default Pagination;