import mongoose from "mongoose";
import app from "./app.js";
import config from "./config/index.js";

(async () => {
  try {
    mongoose.set('strictQuery', true);
    const connect = await mongoose.connect(config.MONGODB_URL);
    console.log(`Db connected successfuly with Host(${connect.connection.host}) Port(${connect.connection.port}) Name(${connect.connection.name})`);

    app.on("error", (err) => {
      console.log("Error: ", err.message || "App not running");
      throw err;
    });

    app.listen(config.PORT, () => {
      console.log(`App is listening on port http://localhost:${config.PORT}`);
    });
  } catch (error) {
    console.log(`Mongodb Connection Error: ${error.message}`);
    throw error;
  }
})();
