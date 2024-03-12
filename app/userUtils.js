const poundsToKilos = (lbs) => lbs / 2.2046;
const inchesToCm = (inches) => inches * 2.35;
const getAge = (d) => {
    const today = new Date();
    const yearDifference = today.getFullYear() - d.getFullYear();
    const monthDifference = today.getMonth() - d.getMonth();
    if (monthDifference < 0) {
        return yearDifference - 1;
    }
    if (monthDifference === 0 && today.getDate() < d.getDate()) {
        return yearDifference - 1;
    }
    return yearDifference;
}
const calculateBasalMetabolicRate = (weight, height, dob, gender) => {
    const kilosWeight = poundsToKilos(weight);
    const cmHeight = inchesToCm(height);
    const age = getAge(dob);
    const intermediateStep = (10 * kilosWeight) + (6.25 * cmHeight) + - (5 * age);
    return gender === "male" ? (intermediateStep + 5) : (intermediateStep - 161);
};
const calculateTDEE = (bmr, activityLevel) => {
    switch (activityLevel) {
        case "sedentary":
            return Math.round(bmr * 1.2);
        case "lightly-active":
            return Math.round(bmr * 1.375);
        case "active":
            return Math.round(bmr * 1.55);
        case "very-active":
            return Math.round(bmr * 1.725);
        default:
            return Math.round(bmr * 1.2);
    } 
}
const calculateTargetCaloriesDelta = (rate) => {
    switch (rate) {
        case "slow-and-steady":
            return 250;
        case "moderate":
            return 500;
        case "fast":
            return 1000;
        default:
            return 250; 
    }
};

export { poundsToKilos, inchesToCm, getAge, calculateBasalMetabolicRate, calculateTDEE, calculateTargetCaloriesDelta };