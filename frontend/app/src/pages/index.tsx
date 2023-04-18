import NavBar from "../components/navBar"
import SignupSection from "../components/signupSection";
import styles from "../styles/home.module.css";
import Footer from "../components/footer";

export default function Home() {

  return (
    <>
      <div className={styles.body}>
        <NavBar />
        <div className={styles.tiltObj}></div>
        <div className={styles.contentContainer}>
          <SignupSection />
        </div>
        <div className={styles.whiteSpace}></div>
      </div>
      <Footer />
    </>
  );
};
