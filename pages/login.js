import Layout from "../components/layout/Layout";
import Head from "../components/layout/Head";
import LoginForm from "../components/login/LoginForm";
import Nav from "../components/layout/Nav";

export default function Login() {
  return (
    <>
      <Nav />
      <div className="heading">
        <h1>LOGIN</h1>
      </div>
      <Layout>
        <Head title="Login" />

        <LoginForm />
      </Layout>
    </>
  );
}
