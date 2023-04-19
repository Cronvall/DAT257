import React from "react";
import styles from "./styles/sampleLeague.module.css";

export default function SampleLeague() {
    return (
        <div className={styles.mainContainer}>
            <div className={styles.leagueContainer}>
                <ul>
                    <li><p className={styles.name}>Oscar</p> <p className={styles.gains}>+53%</p></li>
                    <li><p className={styles.name}>Isac</p> <p className={styles.gains}>-12%</p></li>
                    <li><p className={styles.name}>Adam</p> <p className={styles.gains}>+5%</p></li>
                    <li><p className={styles.name}>Moritz</p> <p className={styles.gains}>+1%</p></li>
                    <li><p className={styles.name}>Keivan</p> <p className={styles.gains}>-3%</p></li>
                </ul>
            </div>
            <div className={styles.textPitch}>
                <h2>Why Wall St. Warriors?</h2>
                <p>Join a league and compete with your friends to see who can make the most money.</p>
            </div>
        </div>
    );
};
