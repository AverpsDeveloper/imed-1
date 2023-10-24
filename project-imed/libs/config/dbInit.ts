import  { connect, connection } from "mongoose";
import appConfigModel from "@/libs/models/appConfigModel";
import itemModel from "@/libs/models/itemModel";
import itemBatchModel from "@/libs/models/itemBatchModel";

const {
  // Attempts to connect to MongoDB and then tries to connect locally:)
  MONGO_URI = "mongodb+srv://imed:xBvLVwrQBhh4MwsH@imed.3tdr2yt.mongodb.net/imed",
  // MONGO_URI = "mongodb://imed:xBvLVwrQBhh4MwsH@ac-wunawvx-shard-00-00.3tdr2yt.mongodb.net:27017,ac-wunawvx-shard-00-01.3tdr2yt.mongodb.net:27017,ac-wunawvx-shard-00-02.3tdr2yt.mongodb.net:27017/imed?ssl=true&replicaSet=atlas-z2guv2-shard-0&authSource=admin&retryWrites=true&w=majority"
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
       await itemModel.count();
       await itemBatchModel.count();
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
