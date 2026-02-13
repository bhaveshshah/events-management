// auth service 2026

const api = "http://localhost:3001/api"

export async function userCreate(email, password) {

    const response = await fetch(`${api}/users`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
    });

    console.log("Creating user for email: ", email);
    console.log("Creating user for password: ", password);

    // handle invalid credentials
    if (response.status === 409) {
        throw new Error("User already exsists");

    } else if (response.status === 403) {
        throw new Error("Password length must be at least 8 characters long");

    } else if (!response.ok) {
        const err = await response.json();
        throw new Error(err.message || "Create user Failed");

    }

    console.log(`User for ${email} created! Getting the token...`);

    // will try to login, so could save the token
    const loginUser = await userLogin(email, password);
    console.log("Login user: ", loginUser);

    // since login only returns very little amount of data,
    // and only getProfile does proper justice, we call it just now
    const token = getToken();
    const user = await getProfileByToken(token);

    return user;

}

export async function userLogin(email, password) {

    const response = await fetch(`${api}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
    });

    // handle invalid credentials
    if (response.status === 403) {
        throw new Error("Invalid email or password");

    } else if (response.status === 409) {
        throw new Error("Password length must be at least 8 characters long");

    } else if (!response.ok) {
        const err = await response.json();
        throw new Error(err.message || "Login Failed")

    }

    let data = await response.json();

    // save token to the local storage
    localStorage.setItem("token", data.token);

    return data.user; // returns USER { id, email }
    // we don't return token as we've already saved it
}

export function getToken() {
    return localStorage.getItem("token");
}

export async function getProfileByToken(token) {

    console.log("Getting profile by token: ", token);

    // parses token and returns profile (incl. userID)
    const response = await fetch(`${api}/auth/profile`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
    })

    // Jason! Stop Jason where you going?
    const data = await response.json();
    console.log("Profile:", data);

    return data;
}

export function userLogout() {
    localStorage.removeItem("token");
}