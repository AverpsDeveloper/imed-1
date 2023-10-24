import tcWrap from "@/libs/utils/tcWrap";
import aminUserModel from "@/libs/models/aminUserModel";

import { Types } from "mongoose";



export const GET = tcWrap(async (req, res) => {
  const { username } = req.params;
  console.log("username::",username);
  
  if (!username) {
    throw new Error("field id required");
  }

  const inventroy = await aminUserModel.findOne({ username })

  if (!inventroy) throw new Error("Data Not found");
  return res.json({
    result: {
      message: "User Details",
      data: inventroy,
    }
  });
});
