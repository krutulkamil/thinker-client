import { SyntheticEvent } from "react";
import { DEFAULT_PROFILE_IMAGE } from "./constant";

const handleBrokenImage = (event: SyntheticEvent<HTMLImageElement, Event>) => {
    const target = event.target as HTMLImageElement;
    target.src = DEFAULT_PROFILE_IMAGE;
    target.onerror = null;
};

export default handleBrokenImage;