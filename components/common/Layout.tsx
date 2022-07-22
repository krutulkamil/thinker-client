import React, {FunctionComponent, ReactNode} from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

interface LayoutProps {
    children: ReactNode
}

const Layout: FunctionComponent<LayoutProps> = ({children}) => {
    return (
        <>
            <Navbar />
            {children}
            <Footer />
        </>
    );
};

export default Layout;