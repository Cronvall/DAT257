import React from "react";
import styles from "./styles/sampleLeague.module.css";

export default function SampleLeague() {
    return (
        <div className={styles.mainContainer}>
            <div className={styles.leagueContainer}>
                <table>
                    <tr className={styles.dataHeader}>
                        <th>Rank</th>
                        <th>Username</th>
                        <th>Gains</th>
                    </tr>
                    <tr>
                        <td>#1</td>
                        <td>Oscar</td>
                        <td>+53%</td>
                    </tr>
                    <tr>
                        <td>#2</td>
                        <td>Keivan</td>
                        <td>+45%</td>
                    </tr>
                    <tr>
                        <td>#3</td>
                        <td>Johannes</td>
                        <td>+42%</td>
                    </tr>
                    <tr>
                        <td>#4</td>
                        <td>Isac</td>
                        <td>+40%</td>
                    </tr>
                </table>
            </div>
            <div className={styles.textPitch}>
                <h2>Why Wall St. Warriors?</h2>
                <p>Join a league and compete with your friends to see who can make the most money.</p>
            </div>
        </div>
    );
};
