import aminUserModel from "@/libs/models/adminUserModel";
import categoryModal from "@/libs/models/categoryModal";
import itemBatchModel from "@/libs/models/itemBatchModel";
import itemModel from "@/libs/models/itemModel";
import userModel from "@/libs/models/userModel";
import tcWrap from "@/libs/utils/tcWrap";

export const GET = tcWrap(async (req, res) => {

    const adminQuery = aminUserModel.aggregate([{
        $facet: {
            totalAdmins: [{
                $group: {
                    _id: null,
                    count: { $sum: 1 } // this means that the count will increment by 1
                }
            }],
            roleAdmins: [{
                $group: {
                    _id: '$role',
                    count: { $sum: 1 } // this means that the count will increment by 1
                }
            }],
            activeAdmins: [{
                $group: {
                    _id: '$isActive',
                    count: { $sum: 1 } // this means that the count will increment by 1
                }
            }],
            blockedAdmins: [{
                $group: {
                    _id: '$isBlocked',
                    count: { $sum: 1 } // this means that the count will increment by 1
                }
            },
            ]
        }
    }] as any);
    const usersQuery = userModel.aggregate([{
        $facet: {
            totalUsers: [{
                $group: {
                    _id: null,
                    count: { $sum: 1 } // this means that the count will increment by 1
                }
            }],
            activeUsers: [{
                $group: {
                    _id: '$isActive',
                    count: { $sum: 1 } // this means that the count will increment by 1
                }
            }],
            blockedUsers: [{
                $group: {
                    _id: '$isBlocked',
                    count: { $sum: 1 } // this means that the count will increment by 1
                }
            },
            ]
        }
    }] as any);
    const inventryQuery = itemModel.aggregate([{
        $facet: {
            totalProducts: [{
                $group: {
                    _id: null,
                    count: { $sum: 1 } // this means that the count will increment by 1
                }
            }],
            activeProducts: [{
                $group: {
                    _id: '$isActive',
                    count: { $sum: 1 } // this means that the count will increment by 1
                }
            }],
        }
    }] as any);

    const batchQuery = itemBatchModel.aggregate([{
        $facet: {
            totalBatches: [{
                $group: {
                    _id: null,
                    count: { $sum: 1 } // this means that the count will increment by 1
                }
            }],
            qtyBatches: [{
                $group: {
                    _id: null,
                    count: { $sum: "$qty" } // this means that the count will increment by 1
                }
            }],
            activeBatches: [{
                $group: {
                    _id: '$isActive',
                    count: { $sum: 1 } // this means that the count will increment by 1
                }
            }],
        }
    }] as any);
    const categoryQuery = categoryModal.aggregate([{
        $facet: {
            totalCategories: [{
                $group: {
                    _id: null,
                    count: { $sum: 1 } // this means that the count will increment by 1
                }
            }],
            activeChategories: [{
                $group: {
                    _id: '$isActive',
                    count: { $sum: 1 } // this means that the count will increment by 1
                }
            }],
        }
    }] as any);

    const [admins, users, inventries, batches, categories] = await Promise.all([
        adminQuery, usersQuery, inventryQuery, batchQuery, categoryQuery
    ])


    return res.json({ result: { message: "user update", data: { admins, users, inventries, batches, categories } } });
});