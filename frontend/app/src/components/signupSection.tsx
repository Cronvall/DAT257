import React from "react";
import styles from "./styles/singupSection.module.css"

const SignupSection = () => {
    return (
        <div className={styles.mainContainer}>
            <h1 className={styles.header}>Wall St. Warriors</h1>
            <div className={styles.underRowContainer}>
                <h2 className={styles.underRow}>The stock trading playground</h2>
                <h2 className={styles.underRow}>for you and your friends</h2>
            </div>

            <div className={styles.buttonContainer}>
                <div className={styles.buttonWrapper}>
                    <button className={styles.button}>Sign Up</button>
                </div>
                <div className={styles.buttonWrapper}>
                    <button className={styles.button}>Join League</button>
                </div>
                <div className={styles.buttonWrapper}>
                    <button className={styles.button}>Create League</button>
                </div>                    
            </div>

        </div>
    );
};

export default SignupSection;