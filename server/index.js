import mongoose from "mongoose";
import app from "./app";
import config from "./config/index";

(async () => {
  try {
    await mongoose.connect(config.MONGODB_URL);
    console.log("Db connected successfully");

    app.on("error", (err) => {
      console.log("Error: ", err);
      throw err;
    });

    app.listen(config.PORT, () => {
      console.log(`App is listening on port ${config.PORT}`);
    });
  } catch (error) {
    console.log(`Error: ${error}`);
    throw error;
  }
})();
