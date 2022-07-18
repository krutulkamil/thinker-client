import {UserType} from "../types/userType";

const checkLogin = (currentUser: UserType) => (
    !!currentUser && currentUser?.constructor === Object && Object.keys(currentUser).length !== 0
);

export default checkLogin;