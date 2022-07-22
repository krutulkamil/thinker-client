import React, {useState, useCallback, FunctionComponent, ChangeEvent, FormEvent} from "react";
import Router from "next/router";
import {useSWRConfig} from "swr";
import ListErrors from "../common/ListErrors";
import UserAPI from "../../lib/api/user";
import {UserType} from "../../lib/types/userType";

const RegisterForm: FunctionComponent = (): JSX.Element => {
    const [isLoading, setLoading] = useState<boolean>(false);
    const [errors, setErrors] = useState([] as unknown as Record<string, string>);
    const [username, setUsername] = useState<UserType["username"]>("");
    const [email, setEmail] = useState<UserType["email"]>("");
    const [password, setPassword] = useState<UserType["password"]>("");

    const { mutate } = useSWRConfig();

    const handleUsernameChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        setUsername(event.target.value);
    }, []);

    const handleEmailChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value);
    }, [])

    const handlePasswordChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    }, []);

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();
        setLoading(true);

        try {
            const { data, status } = await UserAPI.register(username, email, password);
            if (status > 204 && data?.errors) {
                setErrors(data.errors);
            }

            if (data?.user) {
                window.localStorage.setItem("user", JSON.stringify(data.user));
                await mutate("user", data.user);
                await Router.push('/');
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <ListErrors errors={errors} />

            <form onSubmit={handleSubmit}>
                <fieldset>
                    <fieldset className="form-group">
                        <input
                            className="form-control form-control-lg"
                            type="text"
                            placeholder="Username"
                            value={username}
                            onChange={handleUsernameChange}
                        />
                    </fieldset>

                    <fieldset className="form-group">
                        <input
                            className="form-control form-control-lg"
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={handleEmailChange}
                        />
                    </fieldset>

                    <fieldset className="form-group">
                        <input
                            className="form-control form-control-lg"
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={handlePasswordChange}
                        />
                    </fieldset>

                    <button
                        className="btn btn-lg btn-primary pull-xs-right"
                        type="submit"
                        disabled={isLoading}
                    >
                        Sign up
                    </button>
                </fieldset>
            </form>
        </>
    );
};

export default RegisterForm;