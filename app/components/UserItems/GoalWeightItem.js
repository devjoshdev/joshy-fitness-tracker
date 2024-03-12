"use client";
import { useState } from "react";
import { updateGoalWeight } from "../../actions/userActions";

const GoalWeightItem = ({userId, name, value}) => {
    const [editing, setEditing] = useState(false);
    const [val, setVal] = useState(value == null ? "" : value);
    const [newVal, setNewVal] = useState(val);
    const handleValChange = (e) => {
        setNewVal(e.target.value);
    }
    const handleClick = async () => {
        setEditing(currentVal => !currentVal);
        if (editing) {
            const updateGoalWeightSuccess = await updateGoalWeight(userId, newVal);
            if (updateGoalWeightSuccess) {
                setVal(newVal);
            }
            else {
                setVal(val);
                setNewVal(val);
            }
        }
    };
    const bigContainer = {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
    };
    const containerStyle = {
        marginTop: "5px",
        marginBottom: "5px",
        border: "2px solid black",
        borderRadius: "10px",
        display: "flex",
        flexDirection: "row",
        justifyContent: "left",
        alignItems: "center",
        minWidth: "fit-content",
        width: "30%",
    };
    const nameStyle = {
        marginLeft: "10px",
        marginRight: "10px",
    };
    const buttonStyle = {
        marginLeft: "10px",
        marginRight: "10px",
        marginLeft: "auto",
    };

    return (
        <div style={bigContainer}>
            <div style={containerStyle}>
                <h3 style={nameStyle}>{name}</h3>
                {editing === true ? <p><input value={newVal} onChange={handleValChange}/> (in pounds)</p> : <p style={nameStyle}>{val === "" ? "Not set yet!" : val} {val === "" ? "" : "lbs"}</p>}
                <div style={buttonStyle}>
                    <button onClick={handleClick} style={nameStyle}>{editing === true ? "Update" : "Edit"}</button>
                    {editing && <button onClick={() => {setEditing(false); setNewVal(val);}} style={{...buttonStyle, marginLeft: "0px",}}>Cancel</button>}
                </div>
                
            </div>
        </div>
    )
};

export default GoalWeightItem;