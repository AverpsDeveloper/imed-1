import tcWrap from "@/libs/utils/tcWrap";
import aminUserModel from "@/libs/models/adminUserModel";


export const POST = tcWrap(async (req, res) => {
    const { name, email, password, role } = (await req.json()) as {
        name: string;
        email: string;
        password: string;
        role: string;
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
    if (!role) {
        throw new Error("field role required");
    }

    const data = await aminUserModel.create({
        name, email, password, role
    })
    if (!data) throw new Error("something went wrong");
    return res.json({
        result: {
            message: "user created",
            data: data,
        },
    }, { status: 201 });
});
