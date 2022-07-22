import React, {FunctionComponent} from "react";
import useSWR from "swr";
import CustomLink from "../common/CustomLink";
import CustomImage from "../common/CustomImage";
import Maybe from "../common/Maybe";
import DeleteButton from "./DeleteButton";
import checkLogin from "../../lib/utils/checkLogin";
import storage from "../../lib/utils/storage";
import {CommentType} from "../../lib/types/commentType";

interface CommentProps {
    comment: CommentType
}

const Comment: FunctionComponent<CommentProps> = ({comment}): JSX.Element => {
    const {data: currentUser} = useSWR("user", storage);
    const isLoggedIn = checkLogin(currentUser);
    const canModify = isLoggedIn && currentUser?.username === comment?.author?.username;

    return (
        <div className="card">
            <div className="card-block">
                <p className="card-text">{comment.body}</p>
            </div>
            <div className="card-footer">
                <CustomLink href="/profile/[pid]" as={`/profile/${comment.author.username}`} className="comment-author">
                    <CustomImage src={comment.author.image} alt="Comment author's profile image" className="comment-author-img"/>
                </CustomLink>
                &nbsp;
                <CustomLink href="/profile/[pid]" as={`/profile/${comment.author.username}`} className="comment-author">
                    {comment.author.username}
                </CustomLink>
                <span className="date-posted">
                    {new Date(comment.createdAt).toDateString()}
                </span>
                <Maybe evaluateBoolean={canModify}>
                    <DeleteButton commentId={comment.id} />
                </Maybe>
            </div>
        </div>
    );
};

export default Comment;