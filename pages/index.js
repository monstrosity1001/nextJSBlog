import Head from "next/head";
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
      </section>
    </Layout>
  );
}