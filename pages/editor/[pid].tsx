import React, {useState, useReducer, ChangeEvent, FormEvent} from "react";
import Router, {useRouter} from "next/router";
import axios from "axios";
import useSWR, { useSWRConfig } from "swr";
import ListErrors from "../../components/common/ListErrors";
import TagInput from "../../components/editor/TagInput";
import ArticleAPI from "../../lib/api/article";
import {SERVER_BASE_URL} from "../../lib/utils/constant";
import editorReducer, {Actions} from "../../lib/utils/editorReducer";
import storage from "../../lib/utils/storage";
import {NextPage} from "next";
import {ArticleDispatchType} from "../../lib/types/articleType";

interface UpdateArticleEditorProps {
    article: ArticleDispatchType
}

const UpdateArticleEditor: NextPage<UpdateArticleEditorProps> = ({article: initialArticle}): JSX.Element => {
    const initialState = {
        title: initialArticle.title,
        description: initialArticle.description,
        body: initialArticle.body,
        tagList: initialArticle.tagList
    };

    const [isLoading, setLoading] = useState<boolean>(false);
    const [errors, setErrors] = useState([] as unknown as Record<string, string>);
    const [posting, dispatch] = useReducer(editorReducer, initialState);
    const {data: currentUser} = useSWR("user", storage);
    const router = useRouter();
    const { mutate } = useSWRConfig();
    const {query: {pid}} = router;

    const handleTitle = (event: ChangeEvent<HTMLInputElement>) => dispatch({
        type: Actions.SET_TITLE,
        text: event.target.value
    });

    const handleDescription = (event: ChangeEvent<HTMLInputElement>) => dispatch({
        type: Actions.SET_DESCRIPTION,
        text: event.target.value
    });

    const handleBody = (event: ChangeEvent<HTMLTextAreaElement>) => dispatch({
        type: Actions.SET_BODY,
        text: event.target.value
    });

    const addTag = (tag: string) => dispatch({
        type: Actions.ADD_TAG,
        tag: tag
    });

    const removeTag = (tag: string) => dispatch({
        type: Actions.REMOVE_TAG,
        tag: tag
    });

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();
        setLoading(true);

        const {
            data,
            status
        } = await axios.put(`${SERVER_BASE_URL}/articles/${pid}`, JSON.stringify({article: posting}), {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Token ${encodeURIComponent(currentUser?.token)}`
            }
        });

        setLoading(false);

        if (status > 204) {
            setErrors(data.errors);
        }

        await Router.push(`/article/${pid}`);
    };

    return (
        <div className="editor-page">
            <div className="container page">
                <div className="row">
                    <div className="col-md-10 offset-md-1 col-xs-12">
                        <ListErrors errors={errors}/>

                        <form>
                            <fieldset>
                                <fieldset className="form-group">
                                    <input
                                        className="form-control form-control-lg"
                                        type="text"
                                        placeholder="Article Title"
                                        value={posting.title}
                                        onChange={handleTitle}
                                    />
                                </fieldset>

                                <fieldset className="form-group">
                                    <input
                                        className="form-control"
                                        type="text"
                                        placeholder="What's this article about?"
                                        value={posting.description}
                                        onChange={handleDescription}
                                    />
                                </fieldset>

                                <fieldset className="form-group">
                                    <textarea
                                        className="form-control"
                                        rows={8}
                                        placeholder="Write your article (in markdown)"
                                        value={posting.body}
                                        onChange={handleBody}
                                    />
                                </fieldset>

                                <TagInput
                                    tagList={posting.tagList}
                                    addTag={addTag}
                                    removeTag={removeTag}
                                />

                                <button
                                    className="btn btn-lg pull-xs-right btn-primary"
                                    type="button"
                                    disabled={isLoading}
                                    onClick={handleSubmit}
                                >
                                    Update Article
                                </button>
                            </fieldset>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

UpdateArticleEditor.getInitialProps = async ({ query: { pid } }) => {
    const { data : { article }} = await ArticleAPI.get(String(pid));
    return { article };
};

export default UpdateArticleEditor;