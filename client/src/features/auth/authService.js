// services files deal with https requests
const API_URL = "http://localhost:5000/api/users/";

// Register user
const register = async (userData) => {
    const response = await fetch(API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(userData)
    });

    if(response.ok) {
        const result = await response.json();
        console.log(result);
        localStorage.setItem("user", JSON.stringify(result));
        return result;
    }
}

// Login user
const login = async (userData) => {
    const response = await fetch(API_URL + "login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(userData)
    });

    if(response.ok) {
        const result = await response.json();
        localStorage.setItem("user", JSON.stringify(result));
        return result;
    }
}


// Logout user 
const logout = () => {
    localStorage.removeItem("user");
}

const authService = {
    register,
    login,
    logout
}

export default authService;