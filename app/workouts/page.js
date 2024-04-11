import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { findUser, initializeUser } from "../actions/userActions";

export default async function Workouts() {
    const workoutsPageContainer = {
        marginTop: "120px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    }
    const buttonStyle = {
        cursor: "pointer",
        padding: "5px 5px",
        width: "125px",

        backgroundColor: "black",
        color: "white",
        border: "none",
        borderRadius: "25px",
        fontWeight: "bold",
        textTransform: "uppercase",
        boxShadow: "0px 0px 6px 6px rgba(255, 255, 255, .2)", 
    }
    async function navigateToDate(formData) {
        "use server";
        const date = formData.get("date-to-navigate");
        console.log("date to travel to is", date);
        redirect(`/workouts/day/?date=${date}`);
    }
    const now = new Date();
    const timeZoneDifference = now.getTimezoneOffset() * 60000;
    const todayDateString = new Date(now - timeZoneDifference).toISOString().substring(0, 10);
    console.log(todayDateString);
    const session = await getServerSession();
    if (!session) {
        redirect("/sign-in?callback=workouts");
    }
    let registeredUser = await findUser(session.user.email);
    if (registeredUser == null) {
        registeredUser = await initializeUser(session.user.email);
        if (registeredUser == null) {
            // DB error
            return (
                <div style={workoutsPageContainer}>
                    <h1>There has been a grave error</h1>
                    <p>Please try again after some time</p>
                </div>
            )
        }
    }

    return (
        <div style={workoutsPageContainer}>
            <h1>Choose a Date</h1>
            <form action={navigateToDate} style={{...workoutsPageContainer, marginTop: "10px",}}>
                <input type="date" name="date-to-navigate" defaultValue={todayDateString}/>
                <br/>
                <button type="submit" style={buttonStyle}>Go to workouts</button>
            </form>
        </div>
    );
}