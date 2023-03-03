import Layout from "../components/layout/Layout";
import Head from "../components/layout/Head";
import { PROD_URL } from "../constants/api";
import styles from "../styles/modules/Home.module.css";
import Image from "next/image";
import Nav from "../components/layout/Nav";
import Link from "next/link";

export default function Home(props) {
  return (
    <>
      <Nav />
      <div className={styles.heading}>
        <h1>DYNASTY</h1>
      </div>
      <Layout>
        <Head />

        <div className={styles.grid}>
          {props.rings.map((ring) => {
            return (
              <div key={ring.id} className={styles.item}>
                <Image
                  src={ring.images[0].src}
                  alt={ring.images[0].alt}
                  width={320}
                  height={250}
                  priority
                />
                <h2>{ring.name}</h2>
                <h3>KR {ring.prices.price}</h3>
                <Link href={`/rings/${ring.id}`}>View More</Link>
              </div>
            );
          })}
        </div>
      </Layout>
    </>
  );
}

export async function getStaticProps() {
  let rings = [];

  try {
    const response = await fetch(PROD_URL);
    const json = await response.json();

    rings = json;
  } catch (error) {
    console.log(error);
  }
  return {
    props: {
      rings: rings,
    },
  };
}
