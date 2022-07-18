import React, {createContext, Dispatch, FunctionComponent, ReactNode, useContext, useState} from "react";

export type PageCountDispatch = Dispatch<any>;

interface Props {
    children: ReactNode
}

const PageCountStateContext = createContext<number | undefined>(undefined);

const PageCountDispatchContext = createContext<PageCountDispatch | undefined>(undefined);

const PageCountContextProvider: FunctionComponent<Props> = ({children}): JSX.Element => {
    const [pageCount, setPageCount] = useState<number>(1);
    return (
        <PageCountDispatchContext.Provider value={setPageCount}>
            <PageCountStateContext.Provider value={pageCount}>
                {children}
            </PageCountStateContext.Provider>
        </PageCountDispatchContext.Provider>
    );
};

export const usePageCountState = () => {
    return useContext(PageCountStateContext);
};

export const usePageCountDispatch = () => {
    return useContext(PageCountDispatchContext);
};

export default PageCountContextProvider;