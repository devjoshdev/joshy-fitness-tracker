"use client";
import Meal from "./Meal";
const MealList = (props) => {
    const mealName = props.meal;
    const meals = props.foods;
    const mealContainer = {
        display: "flex",
        flexWrap: "nowrap",
        flexDirection: "column",
        minWidth: "200px",
        width: "455px",
        justifyContent: "center",
        alignItems: "center",
        border: "3px solid black",
        paddingTop: "0px",
        marginTop: "10px",
        marginBottom: "10px",
    }
    const addFoodSign = {
        marginTop: "0px",
        marginBottom: "1px",
        paddingRight: "3px",
        order: -1,
        alignSelf: "flex-end",
        fontSize: "1.5em"
    }
    const mealNameHeader = {
        marginTop: "0px",
    }
    return (
        <div style={mealContainer}>
            <h3 style={mealNameHeader}>{mealName}</h3>
            <p style={addFoodSign}>+</p>
            {meals.map(elem => <Meal key={elem.id} id={elem.id} mealName={elem.name} calories={elem.calories}/>)}
        </div>
    );
};

export default MealList;