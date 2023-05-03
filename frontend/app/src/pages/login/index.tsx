import styles from "./style.module.css";
import NavBar from "../../components/navBar"
import React, { useState } from 'react';
import { useRouter } from "next/router";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

import { login } from "../../services/auth.service";

const LoginPage = () => {

  const router = useRouter();

  const [loading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");

  const initialValues: {
    username: string;
    password: string;
  } = {
    username: "",
    password: "",
  };

  const validationSchema = Yup.object().shape({
    username: Yup.string().required("This field is required!"),
    password: Yup.string().required("This field is required!"),
  });


  const handleLogin = (formValue: { username: string; password: string }) => {
    const { username, password } = formValue;

    setMessage("");
    setLoading(true);

    login(username, password).then(
      () => {
        router.push("/");
      },
      (error) => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        setLoading(false);
        setMessage(resMessage);
      }
    );
  };


return (
    <>
      <NavBar transparent={true}/>
      <div className={styles.mainContainer}>
      <div className={styles.formContainer}>
        <h1 style={{marginTop: "4rem"}}>Login</h1>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleLogin}
        >
          <Form>
          <div className={styles.inputContainer}>
              <label htmlFor="username">Username</label>
              <Field 
                name="username" 
                type="text" 
                className={styles.input}
              />
              <ErrorMessage
                name="username"
                component="div"
                className="alert alert-danger"
              />
            </div>

            <div className={styles.inputContainer}>
              <label htmlFor="password">Password</label>
              <Field 
                name="password" 
                type="password" 
                className={styles.input}
              />
              <ErrorMessage
                name="password"
                component="div"
                className="alert alert-danger"
              />
            </div>

            <div className={styles.btnContainer}>
                  <button type="submit" className={styles.button}>
                    Login
                  </button>
                  <p style={{marginLeft: "1rem", color:"#919191" }}> or </p>
                  <button className={styles.registerButton}>
                    <a href="/register"> register </a>
                  </button>
              </div>

            {message && (
              <div className={styles.inputContainer}>
                <div className="alert alert-danger" role="alert">
                  {message}
                </div>
              </div>
            )}
          </Form>
        </Formik>
        </div>
      </div>
    </>
  );

};
export default LoginPage;
