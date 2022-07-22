import React, {FunctionComponent, ReactNode} from "react";
import Link from "next/link";

interface CustomLinkProps {
    href: string,
    as: string,
    className?: string,
    children: ReactNode
}

const CustomLink: FunctionComponent<CustomLinkProps> = ({ className, href, as, children}): JSX.Element => {
    return (
        <Link href={href} as={as} passHref>
            <a className={className || ""}>
                {children}
            </a>
        </Link>
    );
};

export default CustomLink;