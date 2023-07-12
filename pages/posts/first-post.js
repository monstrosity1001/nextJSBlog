import Link from 'next/link';
import Head from 'next/head';
import Script from 'next/script';

export default function FirstPost() {
  return (
    <>
    <Head>
      <title>First Post</title>
    </Head>
    <Script
      src="https://connect.facebook.net/en_US/sdk.js"
      strategy="lazyOnLoad"
      onLoad={() => console.log('script loaded correctly, window.FB now exists')}
    />
    <h1>First Post!!!</h1>
    <h2>
      Play <Link href="/posts/TicTacToe">TicTacToe</Link>
    </h2>
    <h3>
      <Link href="/">Back to home</Link>
    </h3>
    </>
  );
}