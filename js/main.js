const savedPortfolio = localStorage.getItem("portfolixData");

if (savedPortfolio) {
    console.log("Saved PortfoliX portfolio found.");
} else {
    console.log("No saved portfolio yet.");
}