import React, {FunctionComponent} from "react";
import {DEFAULT_IMAGE_SOURCE} from "../../lib/utils/constant";
import handleBrokenImage from "../../lib/utils/handleBrokenImage";

interface CustomImageProps {
    src: string;
    alt: string;
    className?: string;
}

const CustomImage: FunctionComponent<CustomImageProps> = ({src, alt, className}): JSX.Element => {
    return (
        <img
            data-sizes="auto"
            data-src={src}
            src={DEFAULT_IMAGE_SOURCE}
            alt={alt}
            className={className ? `${className} lazyload` : `lazyload`}
            onError={handleBrokenImage}
        />
    );
};

export default CustomImage;