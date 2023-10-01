import { NextApiRequest, NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";
import connectToDatabase from "../config/dbInit";
import { IncomingMessage, ServerResponse } from "http";
import errorHandler from "./errorHandler";

interface Ireq extends Request {
  query?: any;
  params?: any;
  bodyValue: any;
  nextUrl?: any;
}

export default (
    handler: (req?: any, res?: any) =>   Promise<NextResponse<any>>
  ) =>
  async (req: Ireq, { params }: any) => {
    try {
      req.query = Object.fromEntries(req.nextUrl.searchParams.entries());
      req.params = params;
      await connectToDatabase();
      return await handler(req, NextResponse);
    } catch (err) {
      console.log("err", err)
      const error = await errorHandler(err as Error);
      return NextResponse.json({ error, result: null }, {status: error.status});
    }
  };

// const wrap = async (
//   (handler: (arg0: Request, arg1: any) => any) =>  {
//   try {
//     await connectToDatabase();
//     const d = await fn(req, NextResponse);
//     return d;
//   } catch (error) {
//     return NextResponse.json({ message: "hi", error: error });
//   }
// };

export const withProtect =
  (handler: (arg0: Request, arg1: any) => any) => async (req: Request) => {
    try {
      await connectToDatabase();
      return handler(req, NextResponse);
    } catch (error) {
      console.log(error);
      NextResponse.json(error);
    }
  };

// export default withProtect;
