"use client";

import { useState } from "react";
import AddSetsAndRepsWorkout from "./AddSetsAndRepsWorkout";

const AddWorkoutModal = (props) => {
    const date = props.date;
    const userId = props.userId;
    const addworkoutModalContainer = {
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
    const workoutModalStyle = {
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
        // TODO: clear the appropriate fields here before closing the modal
        props.closeModal();
    }
    const handleCreation = async () => {
        // TODO: implement
        handleClose();
    }
    const inputSpacingStyle = {
        marginTop: "15px",
        marginBottom: "15px",
    }
    const [chosenWorkoutType, setChosenWorkoutType] = useState("sets_and_reps");
    return (

        <div style={addworkoutModalContainer}>
            <div style={workoutModalStyle}>
                <h3 style={{marginBottom: "0px",}}>Choose Workout Type</h3>
                <div style={{display: "flex", flexDirection: "row", alignItems: "space-evenly", marginTop: "0px",}}>
                    <p>Sets and Reps</p>
                    <input type="radio" checked={chosenWorkoutType === "sets_and_reps"} value={chosenWorkoutType} name="workout-type" onClick={() => setChosenWorkoutType("sets_and_reps")} style={{marginRight: "20px",}}/>
                    <p>Duration</p>
                    <input type="radio" value={chosenWorkoutType} name="workout-type" onClick={() => setChosenWorkoutType("duration")}/>
                </div>
                {chosenWorkoutType === "sets_and_reps" ? <AddSetsAndRepsWorkout/> : <AddDurationWorkout/>}
                <p onClick={handleClose} style={closeModalStyle}>x</p>
            </div>
        </div>

    );
};


export default AddWorkoutModal;