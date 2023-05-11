import React, { useState } from "react";
import styles from "./styles/sampleLeague.module.css";
import Create from "../assets/images/Create.png";
import Login from "../assets/images/Login.png";
import Profile from "../assets/images/Profile.png";
import Stocks from "../assets/images/Stocks.png";
import Why from "../assets/images/WhyWW.png";
import Image from "next/image";

export default function SampleLeague() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const handleSlideChange = (index: React.SetStateAction<number>) => {
    setCurrentSlide(index);
  };

  return (
    <>
      <div className={styles.mainContainer}>
        <div className={styles.carouselContainer}>
          <div className={styles["carouselTrack"]} style={{ transform: `translateX(-${currentSlide * 114.5}%)` }}>
            <div className={styles["carousel-slide"]}>
              <Image
                src={Why}
                alt="Home"
                width={960}
                height={540}
                className={styles["carousel-slide-image"]}
              />
            </div>
            <div className={styles["carousel-slide"]}>
              <Image
                src={Login}
                alt="home"
                width={960}
                height={540}
                className={styles["carousel-slide-image"]}
              />
            </div>
            <div className={styles["carousel-slide"]}>
              <Image
                src={Create}
                alt="Login"
                width={960}
                height={540}
                className={styles["carousel-slide-image"]}
              />
            </div>
            <div className={styles["carousel-slide"]}>
              <Image
                src={Stocks}
                alt="Login"
                width={960}
                height={540}
                className={styles["carousel-slide-image"]}
              />
            </div>
            <div className={styles["carousel-slide"]}>
              <Image
                src={Profile}
                alt="Login"
                width={960}
                height={540}
                className={styles["carousel-slide-image"]}
              />
            </div>
          </div>
          <div className={styles.carouselButtons}>
            <button onClick={() => handleSlideChange(0)}>1</button>
            <button onClick={() => handleSlideChange(1)}>2</button>
            <button onClick={() => handleSlideChange(2)}>3</button>
            <button onClick={() => handleSlideChange(3)}>4</button>
            <button onClick={() => handleSlideChange(4)}>5</button>
          </div>
        </div>
      </div>
    </>
  );
};

