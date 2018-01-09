import React from 'react';
import Document, { Head, Main, NextScript } from 'next/document';
import JssProvider from 'react-jss/lib/JssProvider';
import getContext from '../styles/getContext';

{
  /*
manifest.json provides metadata used when your web app is added to the
homescreen on Android. See https://developers.google.com/web/fundamentals/engage-and-retain/web-app-manifest/
*/
}
{
  /* PWA primary color */
}
{
  /* Use minimum-scale=1 to enable GPU rasterization */
}

const RegularPage = props => (
  <html lang="en" dir="ltr">
    <Head>
      <title>My page</title>
      <meta charSet="utf-8" />
      <meta
        name="viewport"
        content="user-scalable=0, initial-scale=1, minimum-scale=1, width=device-width, height=device-height"
      />
      <link rel="manifest" href="/static/manifest.json" />
      <meta name="theme-color" content={props.stylesContext.theme.palette.primary[500]} />
    </Head>
    <body>
      <Main />
      <NextScript />
    </body>
  </html>
);

const PreviewPage = props => (
  <html lang="en" dir="ltr">
    <Head>
      <title>My Component Preview</title>
      <meta charSet="utf-8" />
      <meta
        name="viewport"
        content="user-scalable=0, initial-scale=1, minimum-scale=1, width=device-width, height=device-height"
      />
      <link rel="manifest" href="/static/manifest.json" />
      <meta name="theme-color" content={props.stylesContext.theme.palette.primary[500]} />
    </Head>
    <body>
      <Main />
    </body>
  </html>
);

class MyDocument extends Document {
  render() {
    console.log(this.props);

    if (this.props.__NEXT_DATA__.pathname.match(/iframe/)) {
      /*
        This is a way to disable next's JS on certain pages
        We could do any NodeJS rendering we want here
      */

      return <PreviewPage {...this.props} />;
    }
    return <RegularPage {...this.props} />;
  }
}

MyDocument.getInitialProps = ctx => {
  // Resolution order
  //
  // On the server:
  // 1. page.getInitialProps
  // 2. document.getInitialProps
  // 3. page.render
  // 4. document.render
  //
  // On the server with error:
  // 2. document.getInitialProps
  // 3. page.render
  // 4. document.render
  //
  // On the client
  // 1. page.getInitialProps
  // 3. page.render

  // Get the context to collected side effects.
  const context = getContext();
  const page = ctx.renderPage(Component => props => (
    <JssProvider
      registry={context.sheetsRegistry}
      jss={context.jss}
      generateClassName={context.generateClassName}
    >
      <Component {...props} />
    </JssProvider>
  ));

  return {
    ...page,
    stylesContext: context,
    styles: (
      <style
        id="jss-server-side"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: context.sheetsRegistry.toString() }}
      />
    ),
  };
};

export default MyDocument;
