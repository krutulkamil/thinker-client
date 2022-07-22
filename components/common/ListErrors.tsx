import React, {FunctionComponent} from "react";

interface ErrorProps {
    errors: Record<string, string>
}

const ListErrors: FunctionComponent<ErrorProps> = ({ errors }) => {
    return (
        <ul className="error-messages">
            {Object.keys(errors).map((key: string) => {
                return (
                    <li key={key}>
                        {key} - {errors[key]}
                    </li>
                );
            })}
        </ul>
    );
};

export default ListErrors;