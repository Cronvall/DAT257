import useAxios from "axios-hooks";
import styles from "./style.module.css";


type SignUpResponse = {
  success: boolean;
};
const SignupPage = () => {
  const [{ data, loading, error }, signup] = useAxios<SignUpResponse>(
    {
      url: "http://localhost:8080/users",
      method: "POST",
    },
    {
      manual: true,
    }
  );

  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          signup();
        }}
        className={styles.form}
      >
        <h1>Sign Up</h1>
        <input name="username" className={styles.input}/>
        <input name="password" className={styles.input}/>
        {error && <p>{error.message}</p>}
        {data?.success && <p>Successfully signed up</p>}
        <div>
          <button className={styles.button}>{loading ? "Loading..." : "Sign up"}</button>
        </div>
      </form>
    </>
  );
};
export default SignupPage;