import React, { MouseEvent } from "react";
import Router from "next/router";
import useSWR, {useSWRConfig} from "swr";
import SettingsForm from "../../components/profile/SettingsForm";
import checkLogin from "../../lib/utils/checkLogin";
import storage from "../../lib/utils/storage";
import { NextPage } from "next";
import {ServerResponse} from "http";

interface SettingsProps {
    res: ServerResponse | undefined
}

const Settings: NextPage<SettingsProps> = ({ res }): JSX.Element => {
    const {data: currentUser} = useSWR("user", storage);
    const { mutate } = useSWRConfig();
    const isLoggedIn = checkLogin(currentUser);

    if (!isLoggedIn) {
        if (res) {
            res.writeHead(302, {
                Location: "/"
            });
            res.end();
        }
        Router.push("/");
    }

    const handleLogout = async (event: MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        window.localStorage.removeItem("user");
        await mutate("user", null);
        await Router.push("/");
    };

    return (
        <div className="settings-page">
            <div className="container page">
                <div className="row">
                    <div className="col-md-6 offset-md-3 col-xs-12">
                        <h1 className="text-xs-center">Your Settings</h1>
                        <SettingsForm />
                        <hr/>
                        <button className="btn btn-outline-danger" onClick={handleLogout}>
                            Or click here to logout.
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

Settings.getInitialProps = async ({ res }) => {
    return { res };
};

export default Settings;