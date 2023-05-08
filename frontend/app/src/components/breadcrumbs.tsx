import React, { useEffect, useState } from "react";

import { useRouter } from "next/router";
import styles from './styles/navBar.module.css';

interface IProps {
    transparent: boolean
}


const Breadcrumbs = (props: IProps) => {

    const [path, setPath] = useState<string[]>([]);
    const [txtColor, setTxtColor] = useState(props.transparent ? "white" : "black");
    const router = useRouter();

    useEffect(() => {
        if(typeof window === 'undefined') return;
        else{
            setPath(window.location.pathname.split('/').filter((x) => x !== ''));
        }
    }, []);

        return (
            <div className={styles.breadcrumbsContainer} style={{color: txtColor}}>

                    <div key={"home"} className={styles.breadcrumbsSec}>
                        <button 
                        onClick={() => router.push(`/`)} 
                        className={styles.breadcrumbBtn}
                        style={{color: txtColor}}
                        >
                            <h3>home</h3>
                        </button>
                    </div>
                {              
                path.map((x, i) => {
                    return (
                        <>
                        <div key={i + "devider"} className={styles.breadcrumbsSec}>
                            <h3>&gt;</h3>
                        </div>
                        <div key={i} className={styles.breadcrumbsSec}>
                            <button 
                                onClick={() => router.push(`/${x}`)} 
                                className={styles.breadcrumbBtn}
                                style={{color: txtColor}}
                            >
                                <h3>{x}</h3>
                            </button>
                        </div>
                        </>
                    )
                })
                }

            </div>
        )
}

export default Breadcrumbs;