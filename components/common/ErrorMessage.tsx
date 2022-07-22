import React, {FunctionComponent} from "react";

interface ErrorMessageProps {
    message: string
}

const ErrorMessage: FunctionComponent<ErrorMessageProps> = ({message}): JSX.Element => {
    return (
        <div className="error-container">
            <div className="error-content">
                {message}
            </div>
        </div>
    );
};

export default ErrorMessage;