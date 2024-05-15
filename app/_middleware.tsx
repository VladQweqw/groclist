import { NextResponse } from "next/server";

const signinPages = ['/', '/account']

export default function middleware(req: any) {
    if(signinPages.find((p) => p === req.nextUrl.pathname)) {
        const { token: token } = req.cookies;
        
        if(!token) {
            return NextResponse.redirect('/login')
        }
    }
}