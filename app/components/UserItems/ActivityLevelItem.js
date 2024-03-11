"use client";
import { useState } from "react";
import { updateActivityLevel } from "../../actions/userActions";

const ActivityLevelItem = ({userId, name, value}) => {
    const [editing, setEditing] = useState(false);
    const [activityLevel, setActivityLevel] = useState(value == null ? "" : value);
    const [newLevel, setNewLevel] = useState(activityLevel);

    const handleClick = async () => {
        setEditing(currentVal => !currentVal);
        if (editing) {
            console.log(newLevel);
            const updateActivityLevelSuccess = await updateActivityLevel(userId, newLevel);
            if (updateActivityLevelSuccess) {
                setActivityLevel(newLevel);
            }
            else {
                setActivityLevel(activityLevel);
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
    const activitySelect = (
        <select value={newLevel} onChange={e => setNewLevel(e.target.value)}>
            <option value="sedentary">Sedentary</option>
            <option value="lightly-active">Lightly Active</option>
            <option value="active">Active</option>
            <option value="very-active">Very Active</option>
        </select>
    );
    return (
        <div style={bigContainer}>
            <div style={containerStyle}>
                <h3 style={nameStyle}>{name}</h3>
                {editing === true ? <>{activitySelect}</> : <p style={nameStyle}>{activityLevel === "" ? "Not set yet!" : activityLevel}</p>}
                <div style={buttonStyle}>
                    <button onClick={handleClick} style={nameStyle}>{editing === true ? "Update" : "Edit"}</button>
                    {editing && <button onClick={() => {setEditing(false); setActivityLevel(activityLevel);}} style={{...buttonStyle, marginLeft: "0px",}}>Cancel</button>}
                </div>
                
            </div>
        </div>
    )
};

export default ActivityLevelItem;