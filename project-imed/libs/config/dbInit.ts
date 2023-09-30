import { connect, connection } from "mongoose";
import appConfigModel from "../models/appConfigModel";

const {
  // Attempts to connect to MongoDB and then tries to connect locally:)
  MONGO_URI = "mongodb+srv://imed:xBvLVwrQBhh4MwsH@imed.3tdr2yt.mongodb.net/imed",
} = process.env;

const options: any = {
  useUnifiedTopology: true,

  useNewUrlParser: true,
};

let conf: any = null;

const dbInit = async (isReaload?: boolean) => {
  if (!connection.readyState && !isReaload) {
    console.log("Connecting to ::", MONGO_URI);
    connect(MONGO_URI, options);
    connection.on("error", console.error.bind(console, "connection error:"));
    connection.once("open", async () => {
      console.log("DB connected...");
      try {
        conf = await appConfigModel.findOne();
        console.log("apppConfig", conf);
      } catch (error) {
        console.log(error);
      }
    });
  }
  if (connection.readyState && !conf) {
    conf = await appConfigModel.findOne();
  }
};
export const getCongig = () => conf;

export default dbInit;
