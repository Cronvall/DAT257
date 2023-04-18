import NavBar from "../components/navBar"
import SignupSection from "../components/signupSection";
import styles from "../styles/home.module.css";

export default function Home() {

  return (
    <>
      <div className={styles.body}>
        <NavBar />
        <div className={styles.tiltObj}></div>
        <div className={styles.contentContainer}>
          <SignupSection />
        </div>
      </div>
    </>
  );
};
