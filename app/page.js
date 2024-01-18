import styles from "./styles/LandingPage.module.css";
export default async function LandingPage() {
  return (
    <div style={{marginTop: "60px"}}>
      <div className={styles["row-container"]}>
        <div className={styles["landing-column1"]}>
          <h3 className={styles["landing-header3"]}>Do you need a place to log your foods and workouts?</h3>
          <p>Look no further, the Joshy Fitness Tracker (JFT) solves both of those problems</p>
          <h3 className={styles["landing-header3"]}>Track your foods</h3>
          <p>Count those calories and let Joshy keep track of them</p>
        </div>
        <div className={styles["landing-column2"]}>
          <h3 className={styles["landing-header3"]}>Set your goals</h3>
          <p>Put in your info, tell Joshy your goals, and track them on your way to success</p>
          <h3 className={styles["landing-header3"]}>Track your workouts</h3>
          <p>Make note of each set and each rep and Joshy will keep track of it all</p>
        </div>
      </div>
    </div>
  )
};