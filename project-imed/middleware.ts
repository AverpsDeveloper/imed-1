import { withAuth } from "next-auth/middleware"
import { NextResponse } from 'next/server'

export default withAuth(
  // `withAuth` augments your `Request` with the user's token.
  function middleware(req) {
    // const pathname = req.nextUrl.pathname;
    // console.log("middleware", req.nextauth.token);

  },
  {
    callbacks: {
      authorized: ({ req, token }) => {
        if (token && !token.isTfa) {
          return true;
        }
        if (token && token.isTfa && token.isTfaAuth) {
          return true
        }
        return false;
      }
    },
  }
)

export const config = { matcher: ["/dashboard(.*)"] }