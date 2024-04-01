"use client";

import { useState } from "react";
import DeleteFoodModal from "./DeleteFoodModal";
import { updateFood } from "@/app/actions/foodActions";

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
    const inputStyle = {
        marginTop: "15px",
        maxWidth: "100px",
        height: "fit-content",

    }
    const handleMealNameChange = (e) => {
        setEditedMealName(e.target.value);
    }
    const handleCaloriesChange = (e) => {
        setEditedCalories(e.target.value);
    }
    const handleCancel = () => {
        setEditedMealName(mealName);
        setEditedCalories(calories);
        setIsEditing(false);
    }
    const handleUpdate = async () => {
        const res = await updateFood(foodId, editedMealName, editedCalories, `/foods/day?date=${date}`);
        if (!res) {
            // handle error here
        }
        setIsEditing(false);
    }
    const [toggleModal, setToggleModal] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editedMealName, setEditedMealName] = useState(mealName);
    const [editedCalories, setEditedCalories] = useState(calories);
    return (
        <div style={mealStyle}>
            {isEditing ? <input style={inputStyle} value={editedMealName} onChange={handleMealNameChange}/> : <p>{mealName}</p>}
            <p>--------</p>
            {isEditing ? <input style={inputStyle} value={editedCalories} onChange={handleCaloriesChange}/> : <p>{calories}</p>}
            {!isEditing && <p style={buttonStyle1} onClick={() => setIsEditing(true)}>Edit</p>}
            {!isEditing && <p style={buttonStyle2} onClick={() => setToggleModal(true)}>Delete</p>}
            {isEditing && <p style={buttonStyle1} onClick={handleUpdate}>Update</p>}
            {isEditing && <p style={buttonStyle2} onClick={handleCancel}>Cancel</p>}
            {toggleModal && <DeleteFoodModal closeModal={() => setToggleModal(false)} id={foodId} date={date}/>}
        </div>
    )
}

export default Meal;