import axios, {AxiosError} from "axios";
import {SERVER_BASE_URL} from "../utils/constant";
import {CommentType} from "../types/commentType";

const CommentAPI = {
    create: async (slug: string, comment: CommentType) => {
        try {
            return await axios.post(`${SERVER_BASE_URL}/articles/${slug}/comments`, JSON.stringify({comment}));
        } catch (error) {
            if (axios.isAxiosError(error)) {
                return error.response
            }
        }
    },

    delete: async (slug: string, commentId: number) => {
        try {
            return await axios.delete(`${SERVER_BASE_URL}/articles/${slug}/comments/${commentId}`);
        } catch (error) {
            if (axios.isAxiosError(error)) {
                return error.response
            }
        }
    },

    forArticle: async (slug: string) => {
        return await axios.get(`${SERVER_BASE_URL}/articles/${slug}/comments`)
    }
};

export default CommentAPI;