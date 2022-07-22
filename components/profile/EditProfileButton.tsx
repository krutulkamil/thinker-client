import React, {FunctionComponent} from "react";
import CustomLink from "../common/CustomLink";
import Maybe from "../common/Maybe";

interface EditProfileProps {
    isUser: boolean;
}

const EditProfileButton: FunctionComponent<EditProfileProps> = ({isUser}): JSX.Element => {
    return (
        <Maybe evaluateBoolean={isUser}>
            <CustomLink
                href="/user/settings"
                as="/user/settings"
                className="btn btn-sm btn-outline-secondary action-btn"
            >
                <i className="ion-gear-a" /> Edit Profile Settings
            </CustomLink>
        </Maybe>
    );
};

export default EditProfileButton;