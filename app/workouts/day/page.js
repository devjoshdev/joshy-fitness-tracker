import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { findUser, initializeUser } from "@/app/actions/userActions";

export default async function WorkoutDay(props) {
    const workoutDayContainer = {
        marginTop: "120px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",    
    }
    async function navigateToDate(formData) {
        "use server";
        const date = formData.get("date-to-navigate");
        console.log("date to travel to is", date);
        redirect(`/workouts/day/?date=${date}`);
    }
    const currentDate = props.searchParams.date;
    const todayDateString = new Date(currentDate).toISOString().substring(0, 10);
    console.log(todayDateString);
    const session = await getServerSession();
    if (!session) {
        redirect(`/sign-in?callback=workouts/day?date=${currentDate}`);
    }
    let registeredUser = await findUser(session.user.email);
    if (registeredUser == null) {
        registeredUser = await initializeUser(session.user.email);
        if (registeredUser == null) {
            // DB error
            return (
                <div style={workoutDayContainer}>
                    <h1>There has been a grave error</h1>
                    <p>Please try again after some time</p>
                </div>
            )
        }
    }
    const { id, email, date_registered, weight, height, dob, gender, activity_level, rate, goal_weight} = registeredUser;

    const workoutDayPageContainer = {
        marginTop: "120px",
        display: "flex",
        flexWrap: "nowrap",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        minWidth: "350px",
        width: "100vw",
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

    return (
        <div style={workoutDayPageContainer}>
            <form action={navigateToDate} style={{...workoutDayPageContainer, marginTop: "10px",}}>
                <input type="date" name="date-to-navigate" defaultValue={todayDateString}/>
                <br/>
                <button type="submit" style={buttonStyle}>Go to Date</button>
            </form>
            {/* TODO: Create the magic aquí */}
        </div>
    )
}