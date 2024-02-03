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
    let registeredUser = await findUser(session.user.email);
    if (registeredUser == null) {
        registeredUser = await initializeUser(session.user.email);
        if (registeredUser == null) {
            return (
                <div className={styles["goals-container"]}>
                    <h1>There has been a grave error</h1>
                    <p>Please try again after some time</p>
                </div>
            )
        }
    }
    console.log(registeredUser);
    return (
        <div className={styles["goals-container"]}>
            Yessir, hey {session.user.name}!
        </div>
    )
}