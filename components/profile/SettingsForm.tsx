import React, {useState, useEffect, ChangeEvent, FormEvent, FunctionComponent} from "react";
import Router from "next/router";
import axios from "axios";
import useSWR, {useSWRConfig} from "swr";
import ListErrors from "../common/ListErrors";
import checkLogin from "../../lib/utils/checkLogin";
import {SERVER_BASE_URL} from "../../lib/utils/constant";
import storage from "../../lib/utils/storage";
import {UserType} from "../../lib/types/userType";

const SettingsForm: FunctionComponent = (): JSX.Element => {
    const [isLoading, setLoading] = useState<boolean>(false);
    const [errors, setErrors] = useState([] as unknown as Record<string, string>);
    const [userInfo, setUserInfo] = useState<Partial<UserType>>({
        image: "",
        username: "",
        bio: "",
        email: "",
        password: ""
    });

    const {data: currentUser} = useSWR("user", storage);
    const isLoggedIn = checkLogin(currentUser);
    const {mutate} = useSWRConfig();

    useEffect(() => {
        if (!isLoggedIn) return;
        setUserInfo({...userInfo, ...currentUser});
    }, []);

    const updateState = (field: string) => (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const state = userInfo;
        const newState = {...state, [field]: event.target.value}
    };

    const submitForm = async (event: FormEvent) => {
        event.preventDefault();
        setLoading(true);

        const user = {...userInfo};

        if (!user.password) {
            delete user.password;
        }

        const {data, status} = await axios.put(`${SERVER_BASE_URL}/user`, JSON.stringify({user}), {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Token ${currentUser?.token}`
            }
        });

        setLoading(false);

        if (status > 204) {
            setErrors(data.errors.body);
        }

        if (data?.user) {
            window.localStorage.setItem("user", JSON.stringify(data.user));
            await mutate("user", data.user);
            await Router.push('/');
        }
    };

    return (
        <>
            <ListErrors errors={errors}/>
            <form onSubmit={submitForm}>
                <fieldset>
                    <fieldset className="form-group">
                        <input
                            className="form-control"
                            type="text"
                            placeholder="URL of profile picture"
                            value={userInfo.image}
                            onChange={updateState("image")}
                        />
                    </fieldset>

                    <fieldset className="form-group">
                        <input
                            className="form-control form-control-lg"
                            type="text"
                            placeholder="Username"
                            value={userInfo.username}
                            onChange={updateState("username")}
                        />
                    </fieldset>

                    <fieldset className="form-group">
                        <textarea
                            className="form-control form-control-lg"
                            rows={8}
                            placeholder="Short bio about you"
                            value={userInfo.bio}
                            onChange={updateState("bio")}
                        />
                    </fieldset>

                    <fieldset className="form-group">
                        <input
                            className="form-control form-control-lg"
                            type="email"
                            placeholder="Email"
                            value={userInfo.email}
                            onChange={updateState("email")}
                        />
                    </fieldset>

                    <fieldset className="form-group">
                        <input
                            className="form-control form-control-lg"
                            type="password"
                            placeholder="New Password"
                            value={userInfo.password}
                            onChange={updateState("password")}
                        />
                    </fieldset>

                    <button
                        className="btn btn-lg btn-primary pull-xs-right"
                        type="submit"
                        disabled={isLoading}
                    >
                        Update Settings
                    </button>
                </fieldset>
            </form>
        </>
    );
};

export default SettingsForm;