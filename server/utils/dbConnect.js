const mongoose = require("mongoose");

const dbUrl = "mongodb+srv://pptl8685:V5vPTV2CairDz6eX@cluster0.ehycfhl.mongodb.net/CipherFlow";

const dbConnect = async () => {
    try {
        const res = await mongoose.connect(dbUrl);
        console.log("db Connection successful");
    } catch (error) {
        console.error("Error in dbConnect:", error);
    }
}

module.exports = dbConnect;
