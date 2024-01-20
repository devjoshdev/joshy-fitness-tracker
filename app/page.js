import styles from "./styles/LandingPage.module.css";
export default async function LandingPage() {
  return (
    <div style={{marginTop: "100px"}}>
      <div className={styles["row-container"]}>
        <div className={styles["landing-column1"]}>
          <h2 className={styles["landing-header3-left"]}>Do you need a place to log your foods and workouts?</h2>
          <p className={styles["p-col1"]}>Look no further, the Joshy Fitness Tracker (JFT) solves both of those problems</p>
          <h2 className={styles["landing-header3-right"]}>Set your goals</h2>
          <p className={styles["p-col2"]}>Put in your info, tell Joshy your goals, and track them on your way to success</p>
          <h2 className={styles["landing-header3-left"]}>Track your foods</h2>
          <p className={styles["p-col1"]}>Count those calories and let Joshy keep track of them</p>
          <h2 className={styles["landing-header3-right"]}>Track your workouts</h2>
          <p className={styles["p-col2"]}>Make note of each set and each rep and Joshy will keep track of it all</p>
          <button className={styles["landing-button"]}>Enter the JFT</button>
        </div>
      </div>
    </div>
  )
};