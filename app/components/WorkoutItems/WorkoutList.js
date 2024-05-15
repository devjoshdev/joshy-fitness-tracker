"use client";

import { useState } from "react";
import AddWorkoutModal from "./AddWorkoutModal";

const WorkoutList = (props) => {
    const date = props.date;
    const userId = props.userId;
    const workoutContainer = {
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
    const addWorkoutSign = {
        marginTop: "0px",
        marginBottom: "1px",
        paddingRight: "3px",
        order: -1,
        alignSelf: "flex-end",
        fontSize: "1.5em",
        cursor: "pointer",
    }
    const [isAddingWorkout, setIsAddingWorkout] = useState(false);
    return (
        <div style={workoutContainer}>
            <p style={addWorkoutSign} onClick={() => setIsAddingWorkout(true)}>+</p>
            {isAddingWorkout && <AddWorkoutModal closeModal={() => setIsAddingWorkout(false)} date={date} userId={userId}/>}            
        </div>
    )
};

export default WorkoutList;