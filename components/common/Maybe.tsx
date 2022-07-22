import React, {FunctionComponent, ReactNode} from "react";

interface MaybeProps {
    evaluateBoolean: boolean;
    children: ReactNode;
}

const Maybe: FunctionComponent<MaybeProps> = ({ evaluateBoolean, children }): JSX.Element => {
    return (
        <>
            {evaluateBoolean && children}
        </>
    );
};

export default Maybe;