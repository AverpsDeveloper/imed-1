import userModel from "@/libs/models/userModel";
import tcWrap from "@/libs/utils/tcWrap";


export const POST = tcWrap(async (req, res) => {
    const body = await req.json()

    const data = await userModel.create(body);
    if (!data) throw new Error("something went wrong");
    return res.json({
        result: {
            message: "user created",
            data: data,
        },
    }, { status: 201 });
});
