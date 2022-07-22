import React, {FunctionComponent} from "react";
import {useRouter} from "next/router";
import useSWR, { useSWRConfig } from "swr";
import axios from "axios";
import {SERVER_BASE_URL} from "../../lib/utils/constant";
import storage from "../../lib/utils/storage";

interface DeleteButtonProps {
    commentId: number
}

const DeleteButton: FunctionComponent<DeleteButtonProps> = ({commentId}): JSX.Element => {
    const {data: currentUser} = useSWR("user", storage);
    const { mutate } = useSWRConfig();
    const router = useRouter();
    const { query: {pid} } = router;

    const handleDelete = async (commentId: number) => {
        await axios.delete(`${SERVER_BASE_URL}/articles/${pid}/comments/${commentId}`, {
            headers: {
                Authorization: `Token ${currentUser?.token}`
            }
        });
        await mutate(`${SERVER_BASE_URL}/articles/${pid}/comments`);
    };

    return (
        <span className="mod-options">
            <i className="ion-trash-a" onClick={() => handleDelete(commentId)} />
        </span>
    );
};

export default DeleteButton;