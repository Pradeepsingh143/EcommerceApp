import mongoose from "mongoose";
import app from "./app.js";
import config from "./config/index.js";

(async () => {
  try {
    mongoose.set('strictQuery', true);
    await mongoose.connect(config.MONGODB_URL);
    console.log("Db connected successfully");

    app.on("error", (err) => {
      console.log("Error: ", err.message || "App not running");
      throw err;
    });

    app.listen(config.PORT, () => {
      console.log(`App is listening on port ${config.PORT}`);
    });
  } catch (error) {
    console.log(`Mongodb Connection Error: ${error.message}`);
    throw error;
  }
})();
