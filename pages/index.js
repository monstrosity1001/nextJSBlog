import Head from "next/head";
import Link from "next/link";
import Layout, {siteTitle} from '../components/layout';
import utilStyles from '../styles/utils.module.css';

export default function Home() {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <p>Hi, I'm Varun!</p>
        <p>
          I built this with Next.js!
        </p>
        <Link href="/posts/first-post">
            <button>Go to my first post</button>
        </Link>
      </section>
    </Layout>
  );
}