"use client";

import Link from "next/link";
import styles from "../styles/NavBar.module.css";

const NavBar = () => {
    return (
        <div className={styles["nav-layout-container"]}>
                <ul className={styles["nav-list"]}>
                    <li className={styles["nav-li"]}><Link href="/home" className={styles.link} prefetch={false}>Home</Link></li>
                    <li className={styles["nav-li"]}><Link href="/foods" className={styles.link} prefetch={false}>Foods</Link></li>
                    <li className={styles["nav-li"]}><Link href="/workouts" className={styles.link} prefetch={false}>Workouts</Link></li>
                    <li className={styles["nav-li"]}><Link href="/goals" className={styles.link} prefetch={false}>Goals</Link></li>
                </ul>
        </div>
    )
};

export default NavBar;