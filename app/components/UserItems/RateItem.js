"use client";
import { useState } from "react";
import { updateRate } from "../../actions/userActions";

const RateItem = ({userId, name, value}) => {
    const [editing, setEditing] = useState(false);
    const [rate, setRate] = useState(value == null ? "" : value);
    const [newRate, setNewRate] = useState(rate);

    const handleClick = async () => {
        setEditing(currentVal => !currentVal);
        if (editing) {
            console.log(newRate);
            const updateRateSuccess = await updateRate(userId, newRate);
            if (updateRateSuccess) {
                setRate(newRate);
            }
            else {
                setRate(rate);
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
    const rateSelect = (
        <select value={newRate} onChange={e => setNewRate(e.target.value)}>
            <option value="slow-and-steady">Slow and Steady</option>
            <option value="moderate">Moderate</option>
            <option value="fast">Fast</option>
        </select>
    );
    return (
        <div style={bigContainer}>
            <div style={containerStyle}>
                <h3 style={nameStyle}>{name}</h3>
                {editing === true ? <>{rateSelect}</> : <p style={nameStyle}>{rate === "" ? "Not set yet!" : rate}</p>}
                <div style={buttonStyle}>
                    <button onClick={handleClick} style={nameStyle}>{editing === true ? "Update" : "Edit"}</button>
                    {editing && <button onClick={() => {setEditing(false); setRate(rate);}} style={{...buttonStyle, marginLeft: "0px",}}>Cancel</button>}
                </div>
                
            </div>
        </div>
    )
};

export default RateItem;