import styles from "../styles/Goals.module.css";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { findUser, initializeUser } from "../actions/userActions";
export default async function InfoGoals() {
    const session = await getServerSession();
    if (!session) {
        redirect("/sign-in?callback=info-goals");
    }
    console.log(session);
    const registeredUser = await findUser(session.user.email);
    if (registeredUser == null) {
        const initialized = await initializeUser(session.user.email);
        console.log(initialized);
    }
    else {
        console.log("hey we have auth and we have the user registered");
    }
    return (
        <div className={styles["goals-container"]}>
            Yessir, hey {session.user.name}!
        </div>
    )
}