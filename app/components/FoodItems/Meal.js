"use client";
const Meal = (props) => {
    const mealName = props.mealName;
    const calories = props.calories;
    const mealStyle = {
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-start",
        minWidth: "fit-content",
        width: "200px",
        flexWrap: "nowrap",

    }
    const buttonStyle1 = {
        minWidth: "fit-content",
        minHeight: "fit-content",
        marginTop: "15px",
        cursor: "pointer",
        marginRight: "5px",
        marginLeft: "20px",
        textDecoration: "underline",
    }
    const buttonStyle2 = {
        minWidth: "fit-content",
        minHeight: "fit-content",
        marginTop: "15px",
        cursor: "pointer",
        marginLeft: "5px",
        textDecoration: "underline",
    }
    return (
        <div style={mealStyle}>
            <p>{mealName}</p>
            <p>--------</p>
            <p>{calories}</p>
            <p style={buttonStyle1}>Edit</p>
            <p style={buttonStyle2}>Delete</p>
        </div>
    )
}

export default Meal;