import React from "react";
import styles from "./styles/footer.module.css"

const Footer = () => {

    const rickRoll = "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
    const slack = "https://join.slack.com/t/agilesoftware-hdh9613/shared_invite/zt-1trspsfqo-1R_8iDFAECdPBdf~fZLh0A"

    const repo = "https://github.com/Cronvall/DAT257"
    const board = "https://github.com/users/Cronvall/projects/1/views/1"
    const drive = "https://drive.google.com/drive/folders/1CFJYWJXDpSmjUTZi1MURRKP985mQS5lT"


    return (
        <div className={styles.footer}>
            <div className={styles.footerContainer}>
                <div className={styles.footerRow}>
                    <div className={styles.footerColumn}>
                        <h3>Company</h3>
                        <ul>
                            <li><a href={rickRoll} target="_blank">About</a></li>
                            <li><a href={rickRoll} target="_blank">Career</a></li>
                            <li><a href={rickRoll} target="_blank">Spotify Wrapped</a></li>
                            <li><a href={rickRoll} target="_blank">30% y/y prortfolio</a></li>
                        </ul>
                    </div>
                    <div className={styles.footerColumn}>
                        <h3>Resources</h3>
                        <ul>
                            <li><a href={rickRoll} target="_blank">Help</a></li>
                            <li><a href={rickRoll} target="_blank">FAQ</a></li>
                            <li><a href={rickRoll} target="_blank">ToS</a></li>
                            <li><a href={rickRoll} target="_blank">Privacy Policy</a></li>
                        </ul>
                    </div>
                    <div className={styles.footerColumn}>
                        <h3>Project</h3>
                        <ul>
                            <li><a href={repo} target="_blank">Github Repo</a></li>
                            <li><a href={board} target="_blank">Project Board</a></li>
                            <li><a href={slack} target="_blank">Join Slack</a></li>
                            <li><a href={drive} target="_blank">Google Drive</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );

};

export default Footer;