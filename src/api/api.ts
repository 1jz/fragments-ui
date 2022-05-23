// src/api.ts
// fragments microservice API, defaults to localhost:8080
const apiUrl = process.env.VITE_API_URL || "http://localhost:8080";
/**
 * Given an authenticated user, request all fragments for this user from the
 * fragments microservice (currently only running locally). We expect a user
 * to have an `idToken` attached, so we can send that along with the request.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function getUserFragments(auth: any) {
    try {
        console.log(auth.authStatus);
        const res = await fetch(`${apiUrl}/v1/fragments`, {
            // Generate headers with the proper Authorization bearer token to pass
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${auth.user.signInUserSession.idToken.jwtToken}`,
            },
        });
        if (!res.ok) {
            throw new Error(`${res.status} ${res.statusText}`);
        }
        const data = await res.json();
        console.log("Got user fragments data", { data });
    } catch (err) {
        console.error("Unable to call GET /v1/fragment", { err });
    }
}
