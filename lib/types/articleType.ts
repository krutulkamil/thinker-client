export interface ArticleList {
    articles: ArticleType[];
}

export interface Article {
    article: ArticleType;
}

export interface ArticleDispatchType {
    title: string
    description: string,
    body: string,
    tagList: string[]
}

export type ArticleType = {
    tagList: string[],
    createdAt: number,
    author: Author,
    description: string,
    title: string,
    body: string,
    slug: string,
    updatedAt: number,
    favouritesCount: number,
    favorited: boolean,
}

export type Author = {
    username: string,
    bio: string,
    image: string,
    following: boolean
}