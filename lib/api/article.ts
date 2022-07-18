import axios, {AxiosError} from "axios";
import {SERVER_BASE_URL, DEFAULT_LIMIT} from "../utils/constant";
import { getQuery } from "../utils/getQuery";
import {ArticleType} from "../types/articleType";

const ArticleAPI = {
    all: async (page: number, limit = DEFAULT_LIMIT) => {
        await axios.get(`${SERVER_BASE_URL}/articles/${getQuery(limit, page)}`);
    },

    byAuthor: async (author: string, page = 0, limit = 5) => {
        await axios.get(`${SERVER_BASE_URL}/articles?author=${encodeURIComponent(author)}&${getQuery(limit, page)}`);
    },

    byTag: async (tag: string, page = 0, limit = DEFAULT_LIMIT) => {
        await axios.get(`${SERVER_BASE_URL}/articles?tag=${encodeURIComponent(tag)}&${getQuery(limit, page)}`);
    },

    delete: async (id: number, token: string) => {
        await axios.delete(`${SERVER_BASE_URL}/articles/${id}`, {
            headers: {
                Authorization: `Tokekn ${token}`
            }
        });
    },

    favorite: async (slug: string) => {
        await axios.post(`${SERVER_BASE_URL}/articles/${slug}/favorite`);
    },

    favoritedBy: async (author: string, limit = DEFAULT_LIMIT, page: number) => {
        await axios.get(`${SERVER_BASE_URL}/articles?favorited=${encodeURIComponent(author)}&${getQuery(limit, page)}`);
    },

    feed: async (limit = DEFAULT_LIMIT, page: number) => {
        await axios.get(`${SERVER_BASE_URL}/articles?feed?${getQuery(limit, page)}`);
    },

    get: async (slug: string) => {
        await axios.get(`${SERVER_BASE_URL}/articles/${slug}`);
    },

    unfavorite: async (slug: string) => {
        await axios.delete(`${SERVER_BASE_URL}/articles/${slug}/favorite`);
    },

    update: async (article: ArticleType, token: string) => {
        const { data, status } = await axios.put(`${SERVER_BASE_URL}/articles/${article.slug}`, JSON.stringify({article}), {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Token ${encodeURIComponent(token)}`
            }
        });

        return { data, status };
    },

    create: async (article: ArticleType, token: string) => {
        try {
            const { data, status } = await axios.post(`${SERVER_BASE_URL}/articles`, JSON.stringify({article}), {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Token ${encodeURIComponent(token)}`
                }
            });

            return { data, status };
        } catch (error) {
            return (error as AxiosError).response
        }
    }
};

export default ArticleAPI;