"use client";

import { useState } from "react";
import DeleteFoodModal from "./DeleteFoodModal";

const Meal = (props) => {
    const mealName = props.mealName;
    const calories = props.calories;
    const foodId = props.id;
    const date = props.date;
    const mealStyle = {
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-start",
        minWidth: "fit-content",
        width: "200px",
        flexWrap: "nowrap",

    }
    const buttonStyle1 = {
        minWidth: "fit-content",
        minHeight: "fit-content",
        marginTop: "15px",
        cursor: "pointer",
        marginRight: "5px",
        marginLeft: "20px",
        textDecoration: "underline",
    }
    const buttonStyle2 = {
        minWidth: "fit-content",
        minHeight: "fit-content",
        marginTop: "15px",
        cursor: "pointer",
        marginLeft: "5px",
        textDecoration: "underline",
    }
    const [toggleModal, setToggleModal] = useState(false);
    return (
        <div style={mealStyle}>
            <p>{mealName}</p>
            <p>--------</p>
            <p>{calories}</p>
            <p style={buttonStyle1}>Edit</p>
            <p style={buttonStyle2} onClick={() => setToggleModal(true)}>Delete</p>
            {toggleModal && <DeleteFoodModal closeModal={() => setToggleModal(false)} id={foodId} date={date}/>}
        </div>
    )
}

export default Meal;