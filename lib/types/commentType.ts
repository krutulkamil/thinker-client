export interface Comments {
    comments: CommentType[];
}

export type CommentType = {
    createdAt: number,
    id: number,
    body: string,
    slug: string,
    author: Author,
    updatedAt: number
}

export type Author = {
    username: string,
    bio: string,
    image: string,
    following: boolean
}