import { BASE_URL, TOKEN_PATH } from "../../constants/api";
import { useState, useContext } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import styles from "../../styles/modules/Login.module.css";
import { useRouter } from "next/router";
import AuthContext from "../../context/AuthContext";

const url = BASE_URL + TOKEN_PATH;

const schema = yup.object().shape({
  username: yup.string().required("Please enter your username"),
  password: yup.string().required("Please enter your password"),
});

export default function LoginForm() {
  const [submitting, setSubmitting] = useState(false);
  const [loginError, setLoginError] = useState(null);

  const history = useRouter();
  const [auth, setAuth] = useContext(AuthContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  async function onSubmit(data) {
    setSubmitting(true);
    setLoginError(null);

    console.log(data);

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const json = await response.json();

      console.log("response", json);
      setAuth(json);

      if (json.token) {
        history.push("/admin");
      } else {
        console.log(json.code);
        setLoginError(json.code.toString());
      }
    } catch (error) {
      console.log("error", error);
      setLoginError(error.toString());
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <>
      <div className={styles.formContainer}>
        <form onSubmit={handleSubmit(onSubmit)}>
          {loginError && <span>{loginError}</span>}
          <div>
            <label htmlFor="username">Username:</label>
          </div>
          <input {...register("username")} />
          {errors.username && <span>{errors.username.message}</span>}

          <div>
            <label htmlFor="password">Password</label>
          </div>
          <input type="password" {...register("password")} />
          {errors.password && <span>{errors.password.message}</span>}
          <div className={styles.buttonContainer}>
            <button className={styles.login}>
              {submitting ? "Logging in..." : "Login"}
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
