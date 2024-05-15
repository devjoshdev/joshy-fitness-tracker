"use client";
import { useState } from "react";
const SET_OPTIONS = [];
for (let i = 0; i < 50; i++) {
    SET_OPTIONS.push(i+1);
}
const AddSetsAndRepsWorkout = (props) => {
    // TODO: finish this, maybe make reps agree with numSets in size
    const [numSets, setNumSets] = useState(1);
    const [reps] = useState([]);
    return (
        <div>
            <select value={numSets} onChange={(e) => setNumSets(e.target.value)}>
                {SET_OPTIONS.map(elem => <option value={elem}>{elem}</option>)}
            </select>
            <div style={{display: "flex", flexDirection: "column",}}>
                {Array.from({ length: numSets }, (_, index) => (
                    <input key={index} type="text" placeholder={`Input ${index + 1}`} />
                ))}
            </div>
        </div>
    )
};

export default AddSetsAndRepsWorkout;