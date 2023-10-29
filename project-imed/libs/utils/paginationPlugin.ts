import { InferSchemaType } from "mongoose";

export default (schema: InferSchemaType<any>) => {
    schema.query.paginate = async function (query: any) {
        try {
            const parsePage = parseInt(query.page, 10);
            const parseLimit = parseInt(query.limit, 10);

            const meta = {
                page: isNaN(parsePage) || (parsePage <= 1) ? 1 : parsePage,
                limit: isNaN(parseLimit) || (parseLimit <= 0) ? 10 : parseLimit,
                total: 0
            }

            const skip = (meta.page - 1) * meta.limit;

            const [data, total] = await Promise.all([
                this.limit(meta.limit).skip(skip),
                this.model.countDocuments(this.getQuery())
            ]);
            meta.total = total;
            meta.page = skip > total ? Math.ceil(total / meta.limit) : meta.page;            

            return { data, meta }
        } catch (error) {
            return error
        }
    }
}
