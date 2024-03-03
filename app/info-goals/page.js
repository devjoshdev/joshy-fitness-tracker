import styles from "../styles/Goals.module.css";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { findUser, initializeUser } from "../actions/userActions";
import RowItem from "../components/RowItem";
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
    return (
        <div className={styles["goals-container"]}>
            Yessir, hey {session.user.name}!
            <RowItem userId={id} name="Weight" value={weight}/>
            <RowItem userId={id} name="Height" value={height}/>
            <RowItem userId={id} name="Date of Birth" value={dob}/>
            <RowItem userId={id} name="Gender" value={gender}/>
            <RowItem userId={id} name="Activity Level" value={activity_level}/>
            <RowItem userId={id} name="Height" value={height}/>
            This is a nonsense addition

        </div>
    )
}