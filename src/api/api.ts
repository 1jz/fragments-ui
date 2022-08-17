// src/api.ts
// fragments microservice API, defaults to localhost:8080
const apiUrl = "http://localhost:8080";
/**
 * Given an authenticated user, request all fragments for this user from the
 * fragments microservice (currently only running locally). We expect a user
 * to have an `idToken` attached, so we can send that along with the request.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getUserFragments = async (token: string, expand_results = false) => {
    try {
        const expand = expand_results ? "true" : "false";
        const res = await fetch(
            `${apiUrl}/v1/fragments?${new URLSearchParams({
                expand: expand,
            })}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        if (!res.ok) {
            throw new Error(`${res.status} ${res.statusText}`);
        }
        const body = await res.json();
        return body;
    } catch (err) {
        console.error("Unable to call GET /v1/fragment", { err });
    }
};

export const getFragmentById = async (token: string, id: string, ext = "") => {
    try {
        console.log(token);
        const res = await fetch(`${apiUrl}/v1/fragments/${id}${ext != "" ? "." + ext : ""}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        if (!res.ok) {
            throw new Error(`${res.status} ${res.statusText}`);
        }
        return res;
    } catch (err) {
        console.error(`Unable to call GET /v1/fragment/${id}`, { err });
    }
};

export const createFragment = async (token: string, data: string, type: string) => {
    try {
        const res = await fetch(`${apiUrl}/v1/fragments/`, {
            method: "POST",
            body: data,
            headers: {
                "Content-Type": type,
                Authorization: `Bearer ${token}`,
            },
        });
        if (!res.ok) {
            throw new Error(`${res.status} ${res.statusText}`);
        }
        const body = await res.json();
        console.log("Created new fragment", body);
    } catch (err) {
        console.error(err);
        console.error("Unable to call POST /v1/fragment", { err });
    }
};

export const updateFragment = async (token: string, data: string, type: string, id: string) => {
    try {
        const res = await fetch(`${apiUrl}/v1/fragments/${id}`, {
            method: "PUT",
            body: data,
            headers: {
                "Content-Type": type,
                Authorization: `Bearer ${token}`,
            },
        });
        if (!res.ok) {
            throw new Error(`${res.status} ${res.statusText}`);
        }
        const body = await res.json();
        console.log("Created new fragment", body);
    } catch (err) {
        console.error(err);
        console.error("Unable to call POST /v1/fragment", { err });
    }
};
