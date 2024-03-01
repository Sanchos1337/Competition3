import { useNavigate } from "react-router-dom";

const useGoal = () => {
    const navigate = useNavigate();
    const url = "/api/goals";

    const hangleGoal = async (text, dueDate, priority) => {

        try {
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({text, dueDate, priority}),
            });

            if (response.ok) {
                const goal = await response.json();
                localStorage.setItem("goal", JSON.stringify(goal));
                console.log("Goal set successfully")
                navigate("/");
            } else {
                console.error("Failed to set goal");
            }
        } catch (error) {
            console.error("Error setting goal: ", error);
        }
    };

    return { hangleGoal };
}

export default useGoal;