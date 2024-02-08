"use client";
import { useState } from "react";
import { updateWeight } from "../actions/userActions";

const RowItem = ({userId, name, value}) => {
    const [editing, setEditing] = useState(false);
    const [val, setVal] = useState(value == null ? "" : value);
    const [newVal, setNewVal] = useState(val);
    const handleValChange = (e) => {
        setNewVal(e.target.value);
    }
    const handleClick = async () => {
        setEditing(currentVal => !currentVal);
        if (editing) {
            switch (name) {
                case "Weight":
                    setVal("Loading my boy...");
                    const updateWeightSuccess = await updateWeight(userId, newVal);
                    if (updateWeightSuccess) {
                        setVal(newVal);
                    }
                    else {
                        setVal(val);
                        setNewVal(val);
                    }
                    break;
                default:
                    alert("How has this happened?"); // TODO: handle gracefully
                    break;
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
        justifyContent: "center",
        alignItems: "center",
        width: "fit-content",
    };
    const nameStyle = {
        marginLeft: "10px",
        marginRight: "10px",
    };

    return (
        <div style={bigContainer}>
            <div style={containerStyle}>
                <h3 style={nameStyle}>{name}</h3>
                {editing === true ? <input value={newVal} onChange={handleValChange}/> : <p style={nameStyle}>{val == null ? "Not set yet!" : val}</p>}
                <button onClick={handleClick} style={nameStyle}>{editing === true ? "Update" : "Edit"}</button>
                {editing && <button onClick={() => {setEditing(false); setNewVal(val);}} style={{...nameStyle, marginLeft: "0px",}}>Cancel</button>}
            </div>
        </div>
    )
};

export default RowItem;