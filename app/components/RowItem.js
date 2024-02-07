"use client";
import { useState, useTransition } from "react";
import { updateWeight } from "../actions/userActions";

const RowItem = ({userId, name, value}) => {
    const [editing, setEditing] = useState(false);
    const [newVal, setNewVal] = useState(value == null ? "" : value);
    const handleValChange = (e) => {
        setNewVal(e.target.value);
    }
    const handleClick = () => {
        if (editing) {
            switch (name) {
                case "Weight":
                    console.log("new weight is", newVal);
                    break;
                default:
                    alert("How has this happened?"); // TODO: handle gracefully
                    break;
            }
        }
        setEditing(currentVal => !currentVal);
    };
    return (
        <div>
            <h3>{name}</h3>
            {editing === true ? <input value={newVal} onChange={handleValChange}/> : <p>{value == null ? "Not set yet!" : value}</p>}
            <button onClick={handleClick}>{editing === true ? "Update" : "Edit"}</button>
            {editing && <button onClick={() => {setEditing(false); setNewVal("");}}>Cancel</button>}
        </div>
    )
};

export default RowItem;