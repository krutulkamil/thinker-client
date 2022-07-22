import React from "react";
import { useRouter } from "next/router";
import useSWR, { useSWRConfig } from "swr";
import ArticleList from "../../components/article/ArticleList";
import CustomImage from "../../components/common/CustomImage";
import ErrorMessage from "../../components/common/ErrorMessage";
import Maybe from "../../components/common/Maybe";
import EditProfileButton from "../../components/profile/EditProfileButton";
import FollowUserButton from "../../components/profile/FollowUserButton";
import ProfileTab from "../../components/profile/ProfileTab";
import UserAPI from "../../lib/api/user";
import checkLogin from "../../lib/utils/checkLogin";
import {SERVER_BASE_URL} from "../../lib/utils/constant";
import fetcher from "../../lib/utils/fetcher";
import storage from "../../lib/utils/storage";
import {NextPage} from "next";
import {UserType} from "../../lib/types/userType";

interface ProfilePageProps {
    initialProfile: UserType;
}

const Profile: NextPage<ProfilePageProps> = ({ initialProfile }): JSX.Element => {
    const router = useRouter();
    const { mutate } = useSWRConfig();
    const { query: { pid }} = router;
    
    const { data: fetchedProfile, error: profileError } = useSWR(`${SERVER_BASE_URL}/profiles/${encodeURIComponent(String(pid))}`, fetcher);
    
    if (profileError) return <ErrorMessage message="Can't load profile..." />;
    
    const { profile } = fetchedProfile || initialProfile;
    const { username, bio, image, following } = profile;
    
    const { data: currentUser } = useSWR("user", storage);
    const isLoggedIn = checkLogin(currentUser);
    const isUser = currentUser && username === currentUser?.username;
    
    const handleFollow = async () => {
        await mutate(`${SERVER_BASE_URL}/profiles/${pid}`, { profile: { ...profile, following: true } }, false);
        await UserAPI.follow(String(pid));
        await mutate(`${SERVER_BASE_URL}/profiles/${pid}`);
    };
    
    const handleUnfollow = async () => {
        await mutate(`${SERVER_BASE_URL}/profiles/${pid}`, { profile: { ...profile, following: true } }, true);
        await UserAPI.unfollow(String(pid));
        await mutate(`${SERVER_BASE_URL}/profiles/${pid}`);
    };
    
    return (
        <div className="profile-page">
            <div className="user-info">
                <div className="container">
                    <div className="row">
                        <div className="col-xs-12 col-md-10 offset-md-1">
                            <CustomImage
                                src={image}
                                alt="User profile image"
                                className="user-img" 
                            />
                            <h4>{username}</h4>
                            <p>{bio}</p>
                            <EditProfileButton isUser={isUser} />
                            <Maybe evaluateBoolean={isLoggedIn}>
                                <FollowUserButton
                                    isUser={isUser}
                                    following={following}
                                    username={username}
                                    follow={handleFollow}
                                    unfollow={handleUnfollow}
                                />
                            </Maybe>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container">
                <div className="row">
                    <div className="col-xs-12 col-md-10 offset-md1">
                        <div className="articles-toggle">
                            <ProfileTab profile={profile} />
                        </div>
                        <ArticleList />
                    </div>
                </div>
            </div>
        </div>
    );
};

Profile.getInitialProps = async ({ query: { pid }}) => {
    const { data: initialProfile } = await UserAPI.get(String(pid));
    return { initialProfile };
};

export default Profile;