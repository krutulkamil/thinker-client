import React from "react";
import Head from "next/head";
import CustomLink from "../../components/common/CustomLink";
import RegisterForm from "../../components/profile/RegisterForm";
import {NextPage} from "next";

const Register: NextPage = (): JSX.Element => {
    return (
        <>
        <Head>
            <title>REGISTER | thinker next.js</title>
            <meta name="description" content="Please register before login" />
        </Head>
            <div className="auth-page">
                <div className="container page">
                    <div className="row">
                        <div className="col-md-6 offset-md-3 col-xs-12">
                            <h1 className="text-xs-center">Sign Up</h1>
                            <p className="text-xs-center">
                                <CustomLink href="/user/login" as="/user/login">
                                    Have an account?
                                </CustomLink>
                            </p>

                            <RegisterForm />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Register;