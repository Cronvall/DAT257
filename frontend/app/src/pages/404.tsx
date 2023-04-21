import React from "react";
import styles from "../styles/pageNotFound.module.css";
import Image from "next/image";
import ClownImg from "../assets/images/clown.jpeg";
import NavBar from "../components/navBar";

const NotFoundPage = () => {
    return( 
    <>
        <NavBar transparent={false}/>
        <h1 className={styles.text}>404 Page not found</h1>
        <Image
            src={ClownImg}
            alt="Clown"
            width={1250}
            height={150}
            style={{margin: 'auto', display: 'block', marginTop: '100px'}}
        />
        
    </>
    );
};


export default NotFoundPage;