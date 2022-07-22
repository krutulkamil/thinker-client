import React, {FunctionComponent, useState} from "react";
import Link from "next/link";
import Router from "next/router";
import axios from "axios";
import useSWR from "swr";
import CustomLink from "../common/CustomLink";
import CustomImage from "../common/CustomImage";
import {usePageDispatch} from "../../lib/context/PageContext";
import checkLogin from "../../lib/utils/checkLogin";
import {SERVER_BASE_URL} from "../../lib/utils/constant";
import storage from "../../lib/utils/storage";
import {ArticleType} from "../../lib/types/articleType";

const FAVORITED_CLASS = "btn btn-sm btn-primary";
const NOT_FAVORITED_CLASS = "btn btn-sm btn-outline-primary";

interface ArticlePreviewProps {
    article: ArticleType
}

const ArticlePreview: FunctionComponent<ArticlePreviewProps> = ({article}): JSX.Element | null => {
    const setPage = usePageDispatch();

    const [preview, setPreview] = useState(article);
    const [hover, setHover] = useState<boolean>(false);
    const [currentIndex, setCurrentIndex] = useState<number>(-1);

    const {data: currentUser} = useSWR("user", storage);
    const isLoggedIn = checkLogin(currentUser);

    const handleClickFavorite = async (slug: string) => {
        if (!isLoggedIn) {
            await Router.push(`/user/login`);
            return;
        }

        setPreview({
            ...preview,
            favorited: !preview.favorited,
            favouritesCount: preview.favorited ? preview.favouritesCount - 1 : preview.favouritesCount + 1
        });

        try {
            if (preview.favorited) {
                await axios.delete(`${SERVER_BASE_URL}/articles/${slug}/favorite`, {
                    headers: {
                        Authorization: `Token ${currentUser?.token}`
                    }
                })
            } else {
                await axios.post(`${SERVER_BASE_URL}/articles/${slug}/favorite`, {}, {
                    headers: {
                        Authorization: `Token ${currentUser?.token}`
                    }
                })
            }
        } catch {
            setPreview({
                ...preview,
                favorited: !preview.favorited,
                favouritesCount: preview.favorited ? preview.favouritesCount - 1 : preview.favouritesCount + 1
            })
        }
    };

    if (!article) return null;

    return (
        <div className="article-preview" style={{padding: "1.5rem 0.5rem"}}>
            <div className="article-meta">
                <CustomLink href="/profile/[pid]" as={`/profile/${preview.author.username}`}>
                    <CustomImage src={preview.author.image} alt="author's profile image"/>
                </CustomLink>

                <div className="info">
                    <CustomLink href="/profile/[pid]"
                                as={`/profile/${preview.author.username}`}
                                className="author">
                        <span onClick={() => setPage!(0)}>{preview.author.username}</span>
                    </CustomLink>
                    <span className="date">
                        {new Date(preview.createdAt).toDateString()}
                    </span>
                </div>

                <div className="pull-xs-right">
                    <button className={preview.favorited ? FAVORITED_CLASS : NOT_FAVORITED_CLASS}
                            onClick={() => handleClickFavorite(preview.slug)}>
                        <i className="ion-heart"/> {preview.favouritesCount}
                    </button>
                </div>
            </div>

            <CustomLink href="/article/[pid]" as={`/article/${preview.slug}`} className="preview-link">
                <h1>{preview.title}</h1>
                <p>{preview.description}</p>
                <span>Read more...</span>
                <ul className="tag-list" style={{maxWidth: "100%"}}>
                    {preview.tagList.map((tag, index) => {
                        return (
                            <Link href={`/?tag=${tag}`} as={`/?tag=${tag}`} key={index}>
                                <li className="tag-default tag-pill tag-outline"
                                    onClick={(event) => event.stopPropagation()}
                                    onMouseOver={() => {
                                        setHover(true);
                                        setCurrentIndex(index);
                                    }}
                                    onMouseLeave={() => {
                                        setHover(false);
                                        setCurrentIndex(-1);
                                    }}
                                    style={{
                                        borderColor: hover && currentIndex === index ? "#5cb85c" : "initial"
                                    }}
                                >
                                    <span style={{color: hover && currentIndex === index ? "#5cb85c" : "inherit"}}
                                          onClick={() => setPage!(0)}>{tag}</span>
                                </li>
                            </Link>
                        );
                    })}
                </ul>
            </CustomLink>
        </div>
    );
};

export default ArticlePreview;