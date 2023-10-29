import { NextResponse } from "next/server";
import { PagesModel } from "@/libs/models/publicPages";
import tcWrap from "@/libs/utils/tcWrap";

export const GET = tcWrap(async (req, res) => {
    const { id } = req.params;
    console.log("<><>",id);
    
    if (!id) {
        throw new Error("field `id` required");
    }
    const data: any = await PagesModel.findById(id);
    return res.json({ result: { message: id, data: data } });
});