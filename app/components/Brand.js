"use client";
import styles from "../styles/Brand.module.css";
import TimedMessage from "./TimedMessage";
import { useState } from "react";
const Brand = () => {
    const motivateTheMasses = () => {
        if (displayMessage === 0) {
            setDisplayMessage(1);
            setTimeout(() => setDisplayMessage(0), 3000);
        }
    };
    const [displayMessage, setDisplayMessage] = useState(0);
    return (
        <div className={styles["brand-container"]}>
            <h2 className={styles["brand-text"]} onClick={motivateTheMasses}>The JFT</h2>
            {<TimedMessage opacity={displayMessage} message="Put in the WORK, don't let your dreams be dreams!" bgColor="black" textColor="white"/>}
        </div>
    )
};

export default Brand;