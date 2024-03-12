import styles from "../styles/Goals.module.css";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { findUser, initializeUser } from "../actions/userActions";
import { calculateBasalMetabolicRate, calculateTDEE, calculateTargetCaloriesDelta } from "../userUtils";
import RateItem from "../components/UserItems/RateItem";
import WeightItem from "../components/UserItems/WeightItem";
import HeightItem from "../components/UserItems/HeightItem";
import DOBItem from "../components/UserItems/DOBItem";
import GenderItem from "../components/UserItems/GenderItem";
import ActivityLevelItem from "../components/UserItems/ActivityLevelItem";
import GoalWeightItem from "../components/UserItems/GoalWeightItem";
export default async function InfoGoals() {

    const session = await getServerSession();
    if (!session) {
        redirect("/sign-in?callback=info-goals");
    }
    let registeredUser = await findUser(session.user.email);
    if (registeredUser == null) {
        registeredUser = await initializeUser(session.user.email);
        if (registeredUser == null) {
            // DB error
            return (
                <div className={styles["goals-container"]}>
                    <h1>There has been a grave error</h1>
                    <p>Please try again after some time</p>
                </div>
            )
        }
    }
    console.log(registeredUser);
    const { id, email, date_registered, weight, height, dob, gender, activity_level, rate, goal_weight} = registeredUser;
    const bmiAndDailyCaloriesAvailable = [weight, height, dob, gender, activity_level, rate].every(elem => elem != null && elem !== "");
    let TDEE;
    let targetCalories;
    if (bmiAndDailyCaloriesAvailable) {
        const BMR = calculateBasalMetabolicRate(weight, height, dob, gender);
        TDEE = calculateTDEE(BMR, activity_level);
        targetCalories = TDEE;
        if (goal_weight < weight) {
            targetCalories -= calculateTargetCaloriesDelta(rate);
        }
        else {
            targetCalories += calculateTargetCaloriesDelta(rate);
        }
    }
    else {
        console.log("it's not true");
    }
    console.log(height);
    console.log(typeof dob);
    console.log(dob);
    const dobString = dob.toISOString().split('T')[0];
    return (
        <div className={styles["goals-container"]}>
            {bmiAndDailyCaloriesAvailable && 
                <div className={styles["goals-outlook"]}>
                    <h2 style={{marginBottom: "2px",}}>Calories needed to maintain weight: {TDEE}</h2>
                    <h2 style={{marginTop: "2px",}}>Target calories per day: {targetCalories}</h2>
                </div>
            }
            {!bmiAndDailyCaloriesAvailable && 
                <div className={styles["goals-outlook"]}>
                    <h2>You need to fill out the info below to create a gameplan!</h2>
                </div>
            }
            <WeightItem userId={id} name="Weight" value={weight}/>
            <GoalWeightItem userId={id} name="Goal Weight" value={goal_weight}/>
            <HeightItem userId={id} name="Height" value={height}/>
            <DOBItem userId={id} name="Date of Birth" value={dobString}/>
            <GenderItem userId={id} name="Gender" value={gender}/>
            <ActivityLevelItem userId={id} name="Activity Level" value={activity_level}/>
            <RateItem userId={id} name="Rate of Progression" value={rate}/>

        </div>
    )
}