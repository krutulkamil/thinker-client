import axios, {AxiosError} from "axios";
import {SERVER_BASE_URL} from "../utils/constant";
import {CommentType} from "../types/commentType";

const CommentAPI = {
    create: async (slug: string, comment: Partial<CommentType>, token: string) => {
        try {
            return await axios.post(`${SERVER_BASE_URL}/articles/${slug}/comments`, JSON.stringify({comment}), {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Token ${token}`
                }
            });
        } catch (error) {
            const {data, status} = (error as AxiosError).response!;
            return { data, status };
        }
    },

    delete: async (slug: string, commentId: number, token: string) => {
        try {
            return await axios.delete(`${SERVER_BASE_URL}/articles/${slug}/comments/${commentId}`, {
                headers: {
                    Authorization: `Token ${token}`
                }
            });
        } catch (error) {
            const {data, status} = (error as AxiosError).response!;
            return { data, status };
        }
    },

    forArticle: async (slug: string) => {
        return await axios.get(`${SERVER_BASE_URL}/articles/${slug}/comments`)
    }
};

export default CommentAPI;