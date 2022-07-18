import React, {FunctionComponent, ReactNode} from "react";
import PageContext from "./PageContext";
import PageCountContext from "./PageCountContext";

interface Props {
    children: ReactNode;
}

const ContextProvider: FunctionComponent<Props> = ({children}): JSX.Element => {
    return (
        <PageContext>
            <PageCountContext>
                {children}
            </PageCountContext>
        </PageContext>
    )
};

export default ContextProvider;