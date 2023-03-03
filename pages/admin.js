import Layout from "../components/layout/Layout";
import Head from "../components/layout/Head";
import Nav from "../components/layout/Nav";

export default function Login() {
  return (
    <>
      <Head title="Admin" />
      <Nav />
      <Layout>
        <div className="heading">
          <h1>ADMIN</h1>
        </div>
      </Layout>
    </>
  );
}
