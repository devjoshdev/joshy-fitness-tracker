"use client";
import { useState } from "react";
import Meal from "./Meal";
import AddFoodModal from "./AddFoodModal";
const MealList = (props) => {
    const mealName = props.meal;
    const meals = props.foods;
    const date = props.date;
    const userId = props.userId;
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
        fontSize: "1.5em",
        cursor: "pointer",
    }
    const mealNameHeader = {
        marginTop: "0px",
    }
    const [toggleModal, setToggleModal] = useState(false);
    return (
        <div style={mealContainer}>
            <h3 style={mealNameHeader}>{mealName === "Snack" ? "Snacks" : mealName}</h3>
            <p style={addFoodSign} onClick={() => setToggleModal(true)}>+</p>
            {meals.map(elem => <Meal key={elem.id} id={elem.id} mealName={elem.name} calories={elem.calories} date={date} userId={userId}/>)}
            {toggleModal && <AddFoodModal closeModal={() => setToggleModal(false)} mealName={mealName} date={date} userId={userId}/> }
        </div>
    );
};

export default MealList;