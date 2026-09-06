import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

const privateRoute = ["/cartedProducts", "/profile"];

export async function proxy(req) {
    const token = await getToken({ req });

    const reqPath = req.nextUrl.pathname;

    const isAuthenticate = Boolean(token);

    const isAuth = reqPath.startsWith("/auth");

    const isPrivate = privateRoute.some((route) =>
        reqPath.startsWith(route)
    );

    if (isPrivate && !isAuthenticate) {
        return NextResponse.redirect(
            new URL("/auth/login", req.url)
        );
    }

    if (isAuth && isAuthenticate) {
        return NextResponse.redirect(
            new URL("/", req.url)
        );
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        "/cartedProducts/:path*",
        "/profile/:path*",
        "/auth/:path*",
    ],
};