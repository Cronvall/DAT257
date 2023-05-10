import NavBar from "../components/navBar"
import SignupSection from "../components/signupSection";
import SampleLeague from "../components/sampleLeague";
import styles from "../styles/home.module.css";
import Footer from "../components/footer";
import { NextRouter, useRouter } from "next/router";

export default function Home() {

  const router: NextRouter = useRouter();

  return (
    <>
      <div className={styles.body}>
        <NavBar transparent={true}/>
        <div className={styles.tiltObj} /> 
        <div className={styles.contentContainer}>
          <SignupSection router={router}/>
          <div className={styles.whiteSpace} />
        </div>

      </div>
      <Footer />
    </>
  );
};
