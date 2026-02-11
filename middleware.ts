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
        // Clerk stores this in publicMetadata or privateMetadata
        const role = (session.sessionClaims?.metadata as any)?.role;

        if (role !== "admin") {
            // Redirect non-admins to the home page or an unauthorized page
            return NextResponse.redirect(new URL("/", req.url));
        }
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
