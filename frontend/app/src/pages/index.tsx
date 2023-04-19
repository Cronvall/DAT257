import NavBar from "../components/navBar"
import SignupSection from "../components/signupSection";
import SampleLeague from "../components/sampleLeague";
import styles from "../styles/home.module.css";
import Footer from "../components/footer";

export default function Home() {

  return (
    <>
      <div className={styles.body}>
        <NavBar transparent={true}/>
        <div className={styles.tiltObj} /> 
        <div className={styles.contentContainer}>
          <SignupSection />
          <SampleLeague />
        </div>
        <div className={styles.whiteSpace} />
      </div>
      <Footer />
    </>
  );
};
