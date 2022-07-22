import React from "react";
import {useRouter} from "next/router";
import useSWR from "swr";
import {marked} from "marked";
import ArticleMeta from "../../components/article/ArticleMeta";
import CommentList from "../../components/comment/CommentList";
import ArticleAPI from "../../lib/api/article";
import {Article} from "../../lib/types/articleType";
import {SERVER_BASE_URL} from "../../lib/utils/constant";
import fetcher from "../../lib/utils/fetcher";
import {NextPage} from "next";

interface ArticlePageProps {
    initialArticle: Article
}

const ArticlePage: NextPage<ArticlePageProps> = ({initialArticle}): JSX.Element => {
    const router = useRouter();
    const {query: {pid}} = router;

    const {data: fetchedArticle} = useSWR(`${SERVER_BASE_URL}/articles/${pid}`, fetcher);

    const {article}: Article = fetchedArticle || initialArticle;
    const markup = {__html: marked(article?.body || "")};

    return (
        <div className="article-page">
            <div className="banner">
                <div className="container">
                    <h1>{article?.title}</h1>
                    <ArticleMeta article={article}/>
                </div>
            </div>
            <div className="container page">
                <div className="row article-content">
                    <div className="col-xs-12">
                        <div dangerouslySetInnerHTML={markup}/>
                        <ul className="tag-list">
                            {article?.tagList.map((tag) => (
                                <li key={tag} className="tag-default tag-pill tag-outline">
                                    {tag}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
                <hr/>
                <div className="article-actions"/>
                <div className="row">
                    <div className="col-xs-12 col-md-8 offset-md-2">
                        <CommentList/>
                    </div>
                </div>
            </div>
        </div>
    );
};

ArticlePage.getInitialProps = async ({query: {pid}}) => {

    const { data } = await ArticleAPI.get(String(pid));
    return { initialArticle : data };
}

export default ArticlePage;