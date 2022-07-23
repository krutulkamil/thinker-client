import React, {useState, useCallback, FunctionComponent, ChangeEvent, FormEvent} from "react";
import {useRouter} from "next/router";
import useSWR, {useSWRConfig} from "swr";
import CustomImage from "../common/CustomImage";
import CustomLink from "../common/CustomLink";
import checkLogin from "../../lib/utils/checkLogin";
import {SERVER_BASE_URL} from "../../lib/utils/constant";
import storage from "../../lib/utils/storage";
import ListErrors from "../common/ListErrors";
import CommentAPI from "../../lib/api/comment";

const CommentInput: FunctionComponent = (): JSX.Element => {
    const {data: currentUser} = useSWR("user", storage);
    const {mutate} = useSWRConfig();
    const isLoggedIn = checkLogin(currentUser);
    const router = useRouter();
    const {query: {pid}} = router;

    const [content, setContent] = useState<string>("");
    const [isLoading, setLoading] = useState<boolean>(false);
    const [errors, setErrors] = useState([] as unknown as Record<string, string>);

    const handleChange = useCallback((event: ChangeEvent<HTMLTextAreaElement>) => {
        setContent(event.target.value);
    }, []);

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setLoading(true);
        const { data, status } = await CommentAPI.create(String(pid), {body: content}, currentUser?.token)

        setLoading(false);

        if (status > 204) {
            setErrors(data.errors);
        } else {
            setErrors([] as unknown as Record<string, string>);
        }

        setContent("");
        await mutate(`${SERVER_BASE_URL}/articles/${pid}/comments`);
    };

    if (!isLoggedIn) {
        return (
            <p>
                <CustomLink href="/user/login" as="/user/login">
                    Sign in
                </CustomLink>
                &nbsp;or&nbsp;
                <CustomLink href="/user/register" as="/user/register">
                    Sign up
                </CustomLink>
                &nbsp; to add comments on this article.
            </p>
        );
    }

    return (
        <>
            {errors && <ListErrors errors={errors} />}
            <form className="card comment-form" onSubmit={handleSubmit}>
                <div className="card-block">
                <textarea rows={3}
                          className="form-control"
                          placeholder="Write a comment..."
                          value={content}
                          onChange={handleChange}
                          disabled={isLoading}
                />
                </div>
                <div className="card-footer">
                    <CustomImage
                        src={currentUser?.image}
                        alt="Comment author's profile image"
                        className="comment-author-img"
                    />
                    <button className="btn btn-sm btn-primary" type="submit">
                        Post Comment
                    </button>
                </div>
            </form>
        </>
    );
};

export default CommentInput;