import React, {createContext, Dispatch, FunctionComponent, ReactNode, useContext} from "react";
import useSessionStorage from "../hooks/useSessionStorage";

export type PageDispatch = Dispatch<any>;

interface Props {
    children: ReactNode;
}

const PageStateContext = createContext<number | undefined>(undefined);

const PageDispatchContext = createContext<PageDispatch | undefined>(undefined);

const PageContextProvider: FunctionComponent<Props> = ({ children }): JSX.Element => {
    const [page, setPage] = useSessionStorage("offset", 0);

    return (
        <PageDispatchContext.Provider value={setPage}>
            <PageStateContext.Provider value={page}>
                {children}
            </PageStateContext.Provider>
        </PageDispatchContext.Provider>
    );
};

export const usePageState = () => {
    return useContext(PageStateContext);
};

export const usePageDispatch = () => {
    return useContext(PageDispatchContext);
};

export default PageContextProvider;