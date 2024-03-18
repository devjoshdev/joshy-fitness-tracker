import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { findUser, initializeUser } from "@/app/actions/userActions";

export default async function FoodDay(props) {
    const currentDate = props.searchParams.date;
    const session = await getServerSession();
    if (!session) {
        redirect(`/sign-in?callback=foods/day?date=${currentDate}`);
    }
    let registeredUser = await findUser(session.user.email);
    if (registeredUser == null) {
        registeredUser = await initializeUser(session.user.email);
        if (registeredUser == null) {
            // DB error
            return (
                <div style={foodsPageContainer}>
                    <h1>There has been a grave error</h1>
                    <p>Please try again after some time</p>
                </div>
            )
        }
    }
    const foodDayContainer = {
        marginTop: "120px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",    
    }
    return (
        <div style={foodDayContainer}>
            Hi
        </div>
    )
}