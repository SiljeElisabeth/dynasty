import Layout from "../components/layout/Layout";
import Head from "../components/layout/Head";
import styles from "../styles/modules/Contact.module.css";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Nav from "../components/layout/Nav";
import { useState } from "react";

const schema = yup.object().shape({
  firstName: yup
    .string()
    .required("Please enter your first name")
    .min(3, "The message must be at least 3 characters"),
  lastName: yup
    .string()
    .required("Please enter your last name")
    .min(4, "The message must be at least 4 characters"),
  email: yup
    .string()
    .required("Please enter an email address")
    .email("Please enter a valid email address"),
  message: yup
    .string()
    .required("Please enter your message")
    .min(10, "The message must be at least 10 characters"),
  subject: yup
    .mixed()
    .required("please select one")
    .oneOf(["issue", "praise", "lonely", "other"], "please select one option"),
});

export default function Contact() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const onSubmit = (data) => {
    console.log("data", data);
    if (data) {
      setMessage("Thank you for your message!");
      const form = document.querySelector("form");
      form.reset();
    }
  };
  const [message, setMessage] = useState();

  console.log(errors);

  return (
    <>
      <Nav />
      <div className="heading">
        <h1>CONTACT US</h1>
      </div>
      <Layout>
        <Head title="Contact" />
        <div className={styles.container}>
          <div className={styles.formContainer}>
            <form onSubmit={handleSubmit(onSubmit)}>
              {message && <p className={styles.message}>{message}</p>}
              <div>
                <label htmlFor="firstName">First name:</label>{" "}
              </div>
              <input {...register("firstName")} />
              {errors.firstName && <span>{errors.firstName.message}</span>}

              <div>
                <label htmlFor="lastName">Last name:</label>{" "}
              </div>
              <input {...register("lastName")} />
              {errors.lastName && <span>{errors.lastName.message}</span>}

              <div>
                <label htmlFor="email">Email:</label>
              </div>
              <input {...register("email")} />
              {errors.email && <span>{errors.email.message}</span>}

              <div>
                <label htmlFor="subject">Subject:</label>
              </div>
              <select {...register("subject")}>
                <option value={""}>Select one option</option>
                <option value="issue">Issue</option>
                <option value="praise">Praise</option>
                <option value="lonely">Just Lonely</option>
                <option value="other">Other</option>
              </select>
              {errors.subject && <span>{errors.subject.message}</span>}
              <div>
                <label htmlFor="message">Message:</label>
              </div>
              <textarea {...register("message")} />
              {errors.message && <span>{errors.message.message}</span>}
              <div className={styles.buttonContainer}>
                <button className={styles.contactSubmit} type="submit">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </Layout>
    </>
  );
}

/*
 <>
      <Layout>
        <Head title="Contact" />

        <div className={styles.container}>
          <h2>Contact us</h2>
        </div>
        <div className={styles.formContainer}>
          <form action="/send-data-here" method="post">
            <label for="first">First name:(min 3 characters)</label>
            <input type="text" id="first" name="first" />
            <label for="last">Last name:(min 4 characters)</label>
            <input type="text" id="last" name="last" />
            <label for="email">Email:</label>
            <input type="email" id="email" name="email" />
            <label for="subject">Subject:(select one option)</label>
            <select name="subject" id="subject">
              <option value="select">Select a subject</option>
              <option value="issue">Issue</option>
              <option value="praise">Praise</option>
              <option value="lonely">Just Lonely</option>
              <option value="other">Other</option>
            </select>
            <label for="message">Message:(min 10 characters)</label>
            <textarea id="message" name="message" rows="7"></textarea>
            <div className={styles.buttonContainer}>
              <button className={styles.contactSubmit} type="submit">
                Submit
              </button>
            </div>
          </form>
        </div>
      </Layout>
    </>*/
