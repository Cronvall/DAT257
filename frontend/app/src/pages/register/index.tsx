import React, { useState } from "react";
import { useRouter } from "next/router";

import styles from "./style.module.css";
import NavBar from "@/components/navBar";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

import IUser from "../../types/user.type";
import { register, login } from "../../services/auth.service";


interface IRegisterUser extends IUser {
  validatePassword : string
}

const SignupPage = () => {

  const [successful, setSuccessful] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");

  const router = useRouter();

  const initialValues: IRegisterUser = {
    username: "",
    email: "",
    password: "",
    validatePassword: ""   
  };


  const validationSchema = Yup.object().shape({
    username: Yup.string()
      .required("This field is required!"),
    email: Yup.string()
      .email("This is not a valid email.")
      .required("This field is required!"),
    password: Yup.string()
      .required("This field is required!"),  
      passwordConfirmation: Yup.string()
      .required('Please fill in')
      .oneOf([Yup.ref('password'), "null"], "Passwords don't match")
  });


  const handleRegister = (formValue: IUser) => {
    const { username, email, password } = formValue;

    register(username, email, password).then(
      (response) => {
        setMessage(response.data.message);
        login(username,password)
        setTimeout(() => {
          router.push("/");
        }, 1000);
      
      },
      (error) => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        setMessage(resMessage);
        setSuccessful(false);
      }
    );
  };


  return (
    <>
      <NavBar transparent={true}/>
      <div className={styles.mainContainer}>
      
        <div className={styles.formContainer}>
        <h1 style={{marginTop: "4rem"}}>Register</h1>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleRegister}
        >
          <Form>
            {!successful && (
              <div>

                <div className={styles.inputContainer}>
                  <label htmlFor="username"> Username </label>
                  <br/>
                  <Field 
                    name="username" 
                    type="text" 
                    className={styles.input}
                  />
                  <ErrorMessage
                    name="username"
                    component="div"
                  />
                </div>

                <div className={styles.inputContainer}>
                  <label htmlFor="email"> Email </label>
                  <br/>
                  <Field 
                    name="email" 
                    type="email" 
                    className={styles.input}
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                  />
                </div>

                <div className={styles.inputContainer}>
                  <label htmlFor="password"> Password </label>
                  <br/>
                  <Field
                    name="password"
                    type="password"
                    className={styles.input}
                  />
                  <ErrorMessage
                    name="password"
                    component="div"
                  />
                </div>

                <div className={styles.inputContainer}>
                  <label htmlFor="passwordConfirmation"> Confirm Password </label>
                  <br/>
                  <Field
                    name="passwordConfirmation"
                    type="password"
                    className={styles.input}
                  />
                  <ErrorMessage
                    name="passwordConfirmation"
                    component="div"
                  />
                </div>

                <div className={styles.btnContainer}>
                  <button type="submit" className={styles.button}>
                    Sign Up
                  </button>
                  <p style={{marginLeft: "1rem", color:"#919191" }}> or </p>
                  <button className={styles.buttonLogin}>
                    <a href="/login"> Login </a>
                  </button>
                </div>
              </div>
            )}

            {message && (
              <div className="form-group">
                <div
                  className={
                    successful ? "alert alert-success" : "alert alert-danger"
                  }
                  role="alert"
                >
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
export default SignupPage;