export async function register(username, email, password) {
    const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/auth/register`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username,
                email,
                password
            })
        }
    );

    return response;
}

export async function login(email, password) {
    const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/auth/login`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email,
                password
            })
        }
    );

    return response;
}

export async function getCurrentUser() {
    const token = localStorage.getItem("token");

    const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/users/me`,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    return response;
}