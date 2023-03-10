import { GetServerSideProps, NextPage } from 'next';
import Head from 'next/head';
import { Inter } from '@next/font/google';
import { gql } from 'graphql-tag';

import { urqlClient } from '../libs/gql-requests';

import { PostIndexPageDocument } from '../graphql/generated.graphql';


import styles from '../styles/Home.module.css';

const inter = Inter({ subsets: ['latin'] })

type Props = {
  posts: {
    id: string;
    title: string;
  }[];
}

const Home: NextPage<Props> = (props) => {
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <h1 className={styles.title}>Hello, GraphQL</h1>
        <ul className={styles.grid}>
          {props.posts.map((post) => (
            <li key={post.id} className={styles.title}>
              id: {post.id}, title: {post.title}
            </li>
          ))}
        </ul>
      </main>
    </>
  )
}

export const getStaticProps: GetServerSideProps<Props> = async () => {
  try {
    const client = await urqlClient();
    const result = await client.query(PostIndexPageDocument, {}).toPromise();

    return {
      props: {
        posts: result.data.posts,
      }
    }
  } catch(e) {
    console.error(e);
    return {
      notFound: true,
    };
  }
}

export default Home;
