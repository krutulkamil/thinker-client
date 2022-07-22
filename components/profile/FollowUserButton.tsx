import React, {FunctionComponent, MouseEvent} from 'react';

interface FollowUserButtonProps {
    isUser: boolean;
    following: boolean;
    username: string;
    follow: (username: string) => Promise<void>;
    unfollow: (username: string) => Promise<void>;
}

const FollowUserButton: FunctionComponent<FollowUserButtonProps> = ({
                                                                        isUser,
                                                                        following,
                                                                        username,
                                                                        follow,
                                                                        unfollow
                                                                    }): JSX.Element | null => {
    if (isUser) return null;

    const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        following ? unfollow(username): follow(username);
    };

    return (
        <button
            className={`btn btn-sm action-btn ${following ? "btn-secondary" : "btn-outline-secondary"}`}
            onClick={handleClick}
        >
            <i className="ion-plus-round" /> &nbsp; {following ? "Unfollow" : "Follow"} {username}
        </button>
    )
};

export default FollowUserButton;