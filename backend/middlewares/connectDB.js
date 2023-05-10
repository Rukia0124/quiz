const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB_LINK, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connexion à MongoDB réussie !");
  } catch (error) {
    console.log("Connexion à MongoDB échouée !");
  }
};

module.exports = connectDB;
