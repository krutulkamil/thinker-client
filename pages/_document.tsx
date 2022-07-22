import Document, {DocumentContext, DocumentInitialProps, Head, Html, Main, NextScript} from 'next/document';

class MyDocument extends Document {
    static async getInitialProps(
        ctx: DocumentContext
    ): Promise<DocumentInitialProps> {
        const initialProps = await Document.getInitialProps(ctx)

        return initialProps;
    }

    render() {
        return (
            <Html>
                <Head>
                    <link rel="stylesheet" href="https://demo.productionready.io/main.css" />
                    <link
                        rel="stylesheet"
                        href="https://code.ionicframework.com/ionicons/2.0.1/css/ionicons.min.css"
                    />
                    <link
                        rel="stylesheet"
                        href="//fonts.googleapis.com/css?family=Titillium+Web:700|Source+Serif+Pro:400,700|Merriweather+Sans:400,700|Source+Sans+Pro:400,300,600,700,300italic,400italic,600italic,700italic&display=swap"
                    />
                </Head>
                <body>
                <Main/>
                <NextScript/>
                </body>
            </Html>
        );
    };
}

export default MyDocument;