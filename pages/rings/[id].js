import Layout from "../../components/layout/Layout";
import { PROD_URL } from "../../constants/api";
import Head from "../../components/layout/Head";
import Image from "next/image";
import styles from "../../styles/modules/Rings.module.css";
import Nav from "../../components/layout/Nav";
import Link from "next/link";

export default function Ring({ ring }) {
  console.log(ring);
  return (
    <>
      <Nav />
      <Layout>
        <div className={styles.goback}>
          <Link className={styles.link} href="/">
            Go back
          </Link>
        </div>
        <Head title={ring.name} />
        <div className={styles.container}>
          <Image
            src={ring.images[0].src}
            alt={ring.images[0].alt}
            width={500}
            height={400}
            priority
          />
          <div>
            <h1> {ring.name}</h1>
            <h3>KR {ring.prices.price}</h3>
            <h4>Description:</h4>
            <p>{ring.description}</p>
          </div>
        </div>
      </Layout>
    </>
  );
}

export async function getStaticPaths() {
  try {
    const response = await fetch(PROD_URL);
    const json = await response.json();

    const rings = json;

    const paths = rings.map((ring) => ({
      params: { id: ring.id.toString() },
    }));
    console.log(paths);

    return { paths: paths, fallback: false };
  } catch (error) {
    console.log(error);
  }
}

export async function getStaticProps({ params }) {
  const url = `${PROD_URL}/${params.id}`;

  let ring = null;

  try {
    const response = await fetch(url);
    const json = await response.json();
    ring = json;
  } catch (error) {
    console.log(error);
  }

  return {
    props: { ring: ring },
  };
}
