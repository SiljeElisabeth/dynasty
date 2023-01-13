import styles from "../../styles/modules/Nav.module.css";
import Link from "next/link";
import AuthContext from "../../context/AuthContext";
import { useContext } from "react";
import { useRouter } from "next/router";

export default function Nav() {
  const [auth, setAuth] = useContext(AuthContext);

  const history = useRouter();

  function logout() {
    setAuth(null);
    history.push("/");
  }
  return (
    <nav className={styles.nav}>
      <Link href="/">Home</Link>
      <Link href="/contact">Contact</Link>
      {auth ? (
        <a onClick={logout}>Log out</a>
      ) : (
        <Link href="/login">Login</Link>
      )}
    </nav>
  );
}
