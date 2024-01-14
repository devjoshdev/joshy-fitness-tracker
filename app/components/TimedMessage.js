const TimedMessage = ({opacity, message, bgColor, textColor}) => {
    const containerStyle = {
        display: opacity === 0 ? "none" : "",
        "backgroundColor": bgColor,
        color: textColor,
        position: "fixed",
        zIndex: 1000,
        top: "50%",
        left: "50%",
        opacity: opacity,
        transform: "translateX(-50%)",
        transition: "opacity 5000ms ease-in-out",
        borderRadius: "5px",
    }
    const messageStyle = {
        paddingLeft: "10px",
        paddingRight: "10px",
    }
    return (
        <div style={containerStyle}>
            <p style={messageStyle}>{message}</p>
        </div>
    )
};

export default TimedMessage;