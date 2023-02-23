const API_URL = "http://localhost:5000/api/goals/";

const getGoal = async (token) => {
    const response = await fetch(API_URL, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
    });

    if(response.ok){
        const goals = await response.json();
        console.log(goals);
        return goals;
    }
}

const createGoal = async (goalData, token) => {

    const response = await fetch(API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(goalData)
    });

    if(response.ok){
        const goals = await response.json();
        console.log(goals);
        return goals;
    }
}

const deleteGoal = async (goalId, token) => {

    const response = await fetch(API_URL + goalId, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
    });

    if(response.ok){
        const goals = await response.json();
        console.log(goals);
        return goals;
    }
}

const goalService = {
    getGoal,
    createGoal,
    deleteGoal
}

export default goalService;