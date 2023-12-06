import aminUserModel from "@/libs/models/adminUserModel";
import tcWrap from "@/libs/utils/tcWrap";



export const GET = tcWrap(async (req, res) => {
    const { search, page, limit } = req.query;

    let filter: Record<string, any>[] = [{ isBlocked: false }, { role: "DOCTOR" }];
    if (search) {
        filter.push({
            $or: [
                { username: { $regex: search, $options: "i" } },
                { firstName: { $regex: search, $options: "i" } },
                { speciality: { $regex: search, $options: "i" } },
                { bio: { $regex: search, $options: "i" } },
            ],
        });
    }
   
    // @ts-ignore
    const { data, meta } = await aminUserModel.find({ $and: filter }).paginate({ page, limit });

    return res.json({
        result: {
            message: "admin users",
            data: data,
            meta,
        }
    });
});
