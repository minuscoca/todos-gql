import { DocumentHeadTags, documentGetInitialProps, type DocumentHeadTagsProps } from '@mui/material-nextjs/v13-pagesRouter'; // or `v14-pagesRouter` if you are using Next.js v14
import { Head, Html, Main, NextScript, type DocumentProps } from 'next/document';

export default function MyDocument(props: DocumentProps & DocumentHeadTagsProps) {
  return (
    <Html lang="en">
      <Head>
        <DocumentHeadTags {...props} />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

MyDocument.getInitialProps = documentGetInitialProps;