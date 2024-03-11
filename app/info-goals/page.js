import styles from "../styles/Goals.module.css";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { findUser, initializeUser } from "../actions/userActions";
import RateItem from "../components/UserItems/RateItem";
import WeightItem from "../components/UserItems/WeightItem";
import HeightItem from "../components/UserItems/HeightItem";
import DOBItem from "../components/UserItems/DOBItem";
import GenderItem from "../components/UserItems/GenderItem";
import ActivityLevelItem from "../components/UserItems/ActivityLevelItem";
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
    const { id, email, date_registered, weight, height, dob, gender, activity_level, rate} = registeredUser;
    const bmiAndDailyCaloriesAvailable = [weight, height, dob, gender, activity_level, rate].every(elem => elem != null);
    if (bmiAndDailyCaloriesAvailable) {
        // TODO: finish this ish
    }
    console.log(height);
    console.log(typeof dob);
    console.log(dob);
    const dobString = dob.toISOString().split('T')[0];
    return (
        <div className={styles["goals-container"]}>
            <WeightItem userId={id} name="Weight" value={weight}/>
            <HeightItem userId={id} name="Height" value={height}/>
            <DOBItem userId={id} name="Date of Birth" value={dobString}/>
            <GenderItem userId={id} name="Gender" value={gender}/>
            <ActivityLevelItem userId={id} name="Activity Level" value={activity_level}/>
            <RateItem userId={id} name="Rate of Progression" value={rate}/>

        </div>
    )
}