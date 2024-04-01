"use client";
import { deleteFood } from "@/app/actions/foodActions";
const DeleteFoodModal = (props) => {
    const foodId = props.id;
    const date = props.date;
    const deleteFoodModalContainer = {
        position: "fixed",
        height: "100%",
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        zIndex: "2",
        top: 0,
        left: 0,
    }
    const foodModalStyle = {
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
        props.closeModal();
    }

    const handleDelete = async () => { // TODO: make this delete
        console.log("handling delete");
        const result = await deleteFood(foodId, `/foods/day?date=${date}`);
        if (!result) {
            // handle error here
            console.log("error deleting food");
        }
        console.log("delete handled");
        handleClose();
    }
    return (
        <div style={deleteFoodModalContainer}>
            <div style={foodModalStyle}>
                <h3>Are you sure?</h3>
                <button onClick={handleDelete}>Delete</button>
                <button onClick={handleClose}>Exit</button>
                <p onClick={handleClose} style={closeModalStyle}>x</p>
            </div>
        </div>

    );
};

export default DeleteFoodModal;