import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isAdminRoute = createRouteMatcher(["/admin(.*)"]);

export default clerkMiddleware(async (auth, req) => {
    if (isAdminRoute(req)) {
        const session = await auth();

        // If not logged in, Clerk automatically redirects to sign-in
        // but we can manually enforce it or check roles here.
        if (!session.userId) {
            return session.redirectToSignIn();
        }

        // Role-based protection: check if the user is an admin
        let role = (session.sessionClaims?.metadata as any)?.role;
        console.log(`[Middleware] Target: ${req.nextUrl.pathname}, User: ${session.userId}, Initial Role: ${role}`);

        if (!role && session.userId) {
            const { clerkClient } = await import("@clerk/nextjs/server");
            const client = await clerkClient();
            const user = await client.users.getUser(session.userId);
            role = user.publicMetadata.role;
            console.log(`[Middleware] Fetched Role from API: ${role}`);
        }

        if (role !== "admin") {
            console.warn(`[Middleware] ACCESS DENIED: User ${session.userId} with role "${role}" tried to access ${req.nextUrl.pathname}. Redirecting to /`);
            return NextResponse.redirect(new URL("/", req.url));
        }
        
        console.log(`[Middleware] ACCESS GRANTED: User ${session.userId} is admin.`);
    }
});

export const config = {
    matcher: [
        // Skip Next.js internals and all static files, unless found in search params
        '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
        // Always run for API routes
        '/(api|trpc)(.*)',
    ],
};
