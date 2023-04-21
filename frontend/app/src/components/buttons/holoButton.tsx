import React, { ReactNode } from "react";
import styles from "./styles/holoButton.module.css";
import Image from "next/image";
import rightArrow from "../../assets/icons/right-arrow.svg";

interface HoloButtonProps {
    onClick: () => void;
    txt?: string;
    rightArrow?: boolean;
    width: string | number;
    height: string | number;
}


const HoloButton = (props: HoloButtonProps) => {
    return (
        <div className={styles.buttonWrapper} style={{width: props.width, height: props.height }}>
            <button className={styles.button} onClick={props.onClick}>
                {props.txt}
                {
                    props.rightArrow ?
                    <Image
                        src={rightArrow}
                        alt="right arrow"
                        width={32}
                        height={32}
                    />
                    :
                    null
                }
            </button>
        </div>
    );
};

export default HoloButton;