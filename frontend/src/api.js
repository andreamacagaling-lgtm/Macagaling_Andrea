const API_URL = "api";

/**
 * Core helper function for making API requests with optional Authorization headers.
 */
export async function apiRequest(endpoint, options = {}) {
    const token = localStorage.getItem("access_token");

    const headers = {
        "Content-Type": "application/json",
        ...options.headers,
    };

    if (token) {
        headers.Authorization = `Bearer ${token}`;
    }

    try {
        const response = await fetch(`${API_URL}/${endpoint}`, {
            ...options,
            headers,
        });

        const text = await response.text();
        let data;

        try {
            data = JSON.parse(text);
        } catch {
            data = {
                message: text || "Server returned an invalid response.",
            };
        }

        if (!response.ok) {
            throw new Error(
                data.message ||
                data.error ||
                `HTTP Error ${response.status}`
            );
        }

        return data;
    } catch (error) {
        console.error("API ERROR:", error);
        throw new Error(
            error.message || "Unable to connect to server."
        );
    }
}


/*
|--------------------------------------------------------------------------
| REGISTER
|--------------------------------------------------------------------------
*/

export async function register(
    username,
    email,
    password,
    role
) {
    return await apiRequest(
        "register",
        {
            method: "POST",

            body: JSON.stringify({
                username,
                email,
                password,
                role,
            }),
        }
    );
}


/*
|--------------------------------------------------------------------------
| LOGIN
|--------------------------------------------------------------------------
*/

export async function login(
    username,
    password
) {
    const data =
        await apiRequest(
            "login",
            {
                method: "POST",

                body: JSON.stringify({
                    username,
                    password,
                }),
            }
        );

    if (data.tokens) {

        if (
            data.tokens.access_token
        ) {
            localStorage.setItem(
                "access_token",
                data.tokens.access_token
            );
        }

        if (
            data.tokens.refresh_token
        ) {
            localStorage.setItem(
                "refresh_token",
                data.tokens.refresh_token
            );
        }
    }

    if (data.user) {
        localStorage.setItem(
            "user",
            JSON.stringify(data.user)
        );
    }

    return data;
}


/*
|--------------------------------------------------------------------------
| LOGOUT
|--------------------------------------------------------------------------
*/

export async function logout() {
    const refreshToken =
        localStorage.getItem(
            "refresh_token"
        );

    try {
        await apiRequest(
            "logout",
            {
                method: "POST",

                body: JSON.stringify({
                    refresh_token:
                        refreshToken,
                }),
            }
        );

    } catch (error) {

        console.error(
            "Logout error:",
            error
        );
    }

    localStorage.removeItem(
        "access_token"
    );

    localStorage.removeItem(
        "refresh_token"
    );

    localStorage.removeItem(
        "user"
    );
}


/*
|--------------------------------------------------------------------------
| REFRESH TOKEN
|--------------------------------------------------------------------------
*/

export async function refreshToken() {
    const refresh_token =
        localStorage.getItem(
            "refresh_token"
        );

    return await apiRequest(
        "refresh-token",
        {
            method: "POST",

            body: JSON.stringify({
                refresh_token,
            }),
        }
    );
}


/*
|--------------------------------------------------------------------------
| PROFILE
|--------------------------------------------------------------------------
*/

export async function getProfile() {
    return await apiRequest(
        "profile",
        {
            method: "GET",
        }
    );
}


/*
|--------------------------------------------------------------------------
| GET ALL PRODUCTS
|--------------------------------------------------------------------------
*/

export async function getProducts() {
    return await apiRequest(
        "products",
        {
            method: "GET",
        }
    );
}


/*
|--------------------------------------------------------------------------
| GET SINGLE PRODUCT
|--------------------------------------------------------------------------
*/

export async function getProduct(id) {
    return await apiRequest(
        `products/${id}`,
        {
            method: "GET",
        }
    );
}


/*
|--------------------------------------------------------------------------
| CREATE PRODUCT
|--------------------------------------------------------------------------
*/

export async function createProduct(
    product
) {
    return await apiRequest(
        "products",
        {
            method: "POST",

            body: JSON.stringify(
                product
            ),
        }
    );
}


/*
|--------------------------------------------------------------------------
| UPDATE PRODUCT
|--------------------------------------------------------------------------
*/

export async function updateProduct(
    id,
    product
) {
    return await apiRequest(
        `products/${id}`,
        {
            method: "PUT",

            body: JSON.stringify(
                product
            ),
        }
    );
}


/*
|--------------------------------------------------------------------------
| DELETE PRODUCT
|--------------------------------------------------------------------------
*/

export async function deleteProduct(
    id
) {
    return await apiRequest(
        `products/${id}`,
        {
            method: "DELETE",
        }
    );
}