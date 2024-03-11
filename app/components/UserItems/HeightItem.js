"use client";
import { useState } from "react";
import { updateHeight } from "../../actions/userActions";

const HeightItem = ({userId, name, value}) => {
    const [editing, setEditing] = useState(false);
    const [feetForDisplay, setFeetForDisplay] = useState(value == null ? "" : Math.floor(value / 12));
    const [inchesForDisplay, setInchesForDisplay] = useState(value == null ? "" : value % 12);
    const [newFeet, setNewFeet] = useState(feetForDisplay);
    const [newInches, setNewInches] = useState(inchesForDisplay);

    const handleClick = async () => {
        setEditing(currentVal => !currentVal);
        if (editing) {
            const newVal = (newFeet * 12) + Number(newInches);
            console.log(newFeet, newInches, newVal);
            const updateHeightSuccess = await updateHeight(userId, newVal);
            if (updateHeightSuccess) {
                setFeetForDisplay(newFeet);
                setInchesForDisplay(newInches);
            }
            else {
                setFeetForDisplay(feetForDisplay);
                setInchesForDisplay(inchesForDisplay);
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
    const feetSelect = (
        <select value={newFeet} onChange={e => setNewFeet(e.target.value)}>
            <option value={1}>1</option>
            <option value={2}>2</option>
            <option value={3}>3</option>
            <option value={4}>4</option>
            <option value={5}>5</option>
            <option value={6}>6</option>
            <option value={7}>7</option>
            <option value={8}>8</option>
        </select>
    );
    const inchesSelect = (
        <select value={newInches} onChange={e => setNewInches(e.target.value)}>
            <option value={0}>0</option>
            <option value={1}>1</option>
            <option value={2}>2</option>
            <option value={3}>3</option>
            <option value={4}>4</option>
            <option value={5}>5</option>
            <option value={6}>6</option>
            <option value={7}>7</option>
            <option value={8}>8</option>
            <option value={9}>9</option>
            <option value={10}>10</option>
            <option value={11}>11</option>
        </select>
    );
    return (
        <div style={bigContainer}>
            <div style={containerStyle}>
                <h3 style={nameStyle}>{name}</h3>
                {editing === true ? <>{feetSelect} <p>Feet</p> {inchesSelect} <p>inches</p></> : <p style={nameStyle}>{feetForDisplay === "" ? "Not set yet!" : feetForDisplay + " feet " + inchesForDisplay + " inches"}</p>}
                <div style={buttonStyle}>
                    <button onClick={handleClick} style={nameStyle}>{editing === true ? "Update" : "Edit"}</button>
                    {editing && <button onClick={() => {setEditing(false); setNewFeet(feetForDisplay); setNewInches(inchesForDisplay);}} style={{...buttonStyle, marginLeft: "0px",}}>Cancel</button>}
                </div>
                
            </div>
        </div>
    )
};

export default HeightItem;