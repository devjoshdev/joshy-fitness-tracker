"use client";

import { useState } from "react";
import { createFood } from "@/app/actions/foodActions";

const AddFoodModal = (props) => {
    const date = props.date;
    const userId = props.userId;
    const mealName = props.mealName.toLowerCase();
    const addfoodModalContainer = {
        position: "fixed",
        height: "100%",
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        zIndex: "2",
        top: "0",
        left: "0",
    }
    const foodModalStyle = {
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        background: "black",
        zIndex: "3",
        minWidth: "400px",
        minHeight: "250px",
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
    }
    const closeModalStyle = {
        cursor: "pointer",
        alignSelf: "flex-end",
        marginTop: "0px",
        marginRight: "3%",
        order: "-1",
    }
    const handleClose = () => {
        setNewFoodName("");
        setNewCalories("");
        props.closeModal();
    }

    const handleCreation = async () => {
        if (newFoodName === "" || newCalories === "") return;
        const result = await createFood(newFoodName, newCalories, date, userId, mealName, `/foods/day?date=${date}`);
        if (!result) {
            // handle error here
            console.log("error creating food");
        }
        handleClose();
    }
    const inputSpacingStyle = {
        marginTop: "15px",
        marginBottom: "15px",
    }
    const [newFoodName, setNewFoodName] = useState("");
    const [newCalories, setNewCalories] = useState("");
    return (
        <div style={addfoodModalContainer}>
            <div style={foodModalStyle}>
                <input placeholder="Enter food name" value={newFoodName} onChange={(e) => setNewFoodName(e.target.value)} style={{...inputSpacingStyle, marginBottom: "0px",}}/>
                <input placeholder="Enter calories" value={newCalories} onChange={(e) => setNewCalories(e.target.value)} style={inputSpacingStyle}/>
                <button onClick={handleCreation}>Create it</button>
                <p onClick={handleClose} style={closeModalStyle}>x</p>
            </div>
        </div>

    );
};

export default AddFoodModal;