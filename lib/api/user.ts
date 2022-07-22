import axios, {AxiosError} from "axios";
import {SERVER_BASE_URL} from "../utils/constant";
import {UserType} from "../types/userType";

const UserAPI = {
    current: async () => {
        const user: UserType = JSON.parse(window.localStorage.getItem("user") || "");
        const token = user?.token;

        try {
            return await axios.get(`${SERVER_BASE_URL}/user`, {
                headers: {
                    Authorization: `Token ${encodeURIComponent(token)}`
                }
            });
        } catch (error) {
            if (axios.isAxiosError(error)) {
                return error.response
            }
        }
    },

    login: async (email: string, password: string) => {
        try {
            const response = await axios.post(
                `${SERVER_BASE_URL}/users/login`,
                JSON.stringify({ user: { email, password } }),
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
            return response;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                return error.response
            }
        }
    },

    register: async (username: string, email: string, password: string) => {
        try {
            return await axios.post(`${SERVER_BASE_URL}/users`, JSON.stringify({user: {username, email, password}}), {
                headers: {
                    "Content-Type": "application/json"
                }
            });
        } catch (error) {
            if (axios.isAxiosError(error)) {
                return error.response
            }
        }
    },

    save: async (user: Partial<UserType>) => {
        const userToEdit: UserType = JSON.parse(window.localStorage.getItem("user") || "");
        const token = userToEdit?.token;

        try {
            return await axios.put(`${SERVER_BASE_URL}/user`, JSON.stringify({user}), {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Token ${encodeURIComponent(token)}`
                }
            });
        } catch (error) {
            if (axios.isAxiosError(error)) {
                return error.response
            }
        }
    },

    follow: async (username: string) => {
        const user: UserType = JSON.parse(window.localStorage.getItem("user") || "");
        const token = user?.token;

        try {
            return await axios.post(`${SERVER_BASE_URL}/profiles/${username}/follow`, {}, {
                headers: {
                    Authorization: `Token ${encodeURIComponent(token)}`
                }
            });
        } catch (error) {
            if (axios.isAxiosError(error)) {
                return error.response
            }
        }
    },

    unfollow: async (username: string) => {
        const user: UserType = JSON.parse(window.localStorage.getItem("user") || "");
        const token = user?.token;

        try {
            return await axios.delete(`${SERVER_BASE_URL}/profiles/${username}/follow`, {
                headers: {
                    Authorization: `Token ${encodeURIComponent(token)}`
                }
            });
        } catch (error) {
            if (axios.isAxiosError(error)) {
                return error.response
            }
        }
    },

    get: async (username: string) => {
        return await axios.get<UserType>(`${SERVER_BASE_URL}/profiles/${username}`)
    }
};

export default UserAPI;