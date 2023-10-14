import userModel from "@/libs/models/userModel";
import tcWrap from "@/libs/utils/tcWrap";


export const POST = tcWrap(async (req, res) => {
    const { name, email, password, } = (await req.json()) as {
        name: string;
        email: string;
        password: string;
        role?: string;
    };

    if (!name) {
        throw new Error("field name required");
    }
    if (!email) {
        throw new Error("field email required");
    }
    if (!password) {
        throw new Error("field password required");
    }
    
    const data = await userModel.create({
        name, email, password
    })
    if (!data) throw new Error("something went wrong");
    return res.json({
        result: {
            message: "user created",
            data: data,
        },
    }, { status: 201 });
});
