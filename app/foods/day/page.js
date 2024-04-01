import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { findUser, initializeUser } from "@/app/actions/userActions";
import { getFoodsForDay } from "@/app/actions/foodActions";
import { calculateBasalMetabolicRate, calculateTDEE, calculateTargetCaloriesDelta } from "../../userUtils";
import MealList from "@/app/components/FoodItems/MealList";

export default async function FoodDay(props) {
    const foodDayContainer = {
        marginTop: "120px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",    
    }
    async function navigateToDate(formData) {
        "use server";
        const date = formData.get("date-to-navigate");
        console.log("date to travel to is", date);
        redirect(`/foods/day/?date=${date}`);
    }
    const currentDate = props.searchParams.date;
    const todayDateString = new Date(currentDate).toISOString().substring(0, 10);
    console.log(todayDateString);
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
                <div style={foodDayContainer}>
                    <h1>There has been a grave error</h1>
                    <p>Please try again after some time</p>
                </div>
            )
        }
    }
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
    const foodsForTheDay = await getFoodsForDay(currentDate, registeredUser.id);
    let dailyTotalCalories = 0;
    foodsForTheDay.forEach(elem => {
        dailyTotalCalories += elem.calories;
    });
    dailyTotalCalories = Math.round((dailyTotalCalories + Number.EPSILON) * 100) / 100
    const breakfastFoods = foodsForTheDay.filter(food => food.meal === "breakfast");
    const lunchFoods = foodsForTheDay.filter(food => food.meal === "lunch");
    const dinnerFoods = foodsForTheDay.filter(food => food.meal === "dinner");
    const dessertFoods = foodsForTheDay.filter(food => food.meal === "dessert");
    const snackFoods = foodsForTheDay.filter(food => food.meal === "snack");

    const foodDayPageContainer = {
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
        <div style={foodDayPageContainer}>
            <form action={navigateToDate} style={{...foodDayPageContainer, marginTop: "10px",}}>
                <input type="date" name="date-to-navigate" defaultValue={todayDateString}/>
                <br/>
                <button type="submit" style={buttonStyle}>Go to Date</button>
            </form>
            {targetCalories != null && <h3>You've consumed {dailyTotalCalories} out of {targetCalories} calories for this day</h3>}
            <MealList meal="Breakfast" foods={breakfastFoods} date={todayDateString} userId={registeredUser.id}/>
            <MealList meal="Lunch" foods={lunchFoods} date={todayDateString} userId={registeredUser.id}/>
            <MealList meal="Dinner" foods={dinnerFoods} date={todayDateString} userId={registeredUser.id}/>
            <MealList meal="Dessert" foods={dessertFoods} date={todayDateString} userId={registeredUser.id}/>
            <MealList meal="Snack" foods={snackFoods} date={todayDateString} userId={registeredUser.id}/>
        </div>
    )
}