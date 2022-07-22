import type {NextPage} from 'next'
import Head from 'next/head'
import Banner from "../components/home/Banner";
import MainView from "../components/home/MainView";
import Tags from "../components/home/Tags";

const Home: NextPage = () => {
    return (
        <>
            <Head>
                <title>thinker | NEXT.JS</title>
            </Head>
            <div className="home-page">
                <Banner />
                <div className="container page">
                    <div className="row">
                        <MainView />
                        <div className="col-md-3">
                            <div className="sidebar">
                                <p>Popular Tags</p>
                                <Tags />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Home;
