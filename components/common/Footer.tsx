import React, {FunctionComponent} from "react";
import {APP_NAME} from "../../lib/utils/constant"

const Footer: FunctionComponent = (): JSX.Element => {
    return (
        <footer>
            <div className="container">
                <a href="/" className="logo-font">{APP_NAME}</a>
                <span className="attribution">
                    An interactive fullstack learning project.
                </span>
            </div>
        </footer>
    );
};

export default Footer;