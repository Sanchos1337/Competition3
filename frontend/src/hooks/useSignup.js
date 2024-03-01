import { useState } from "react";
import { useNavigate } from "react-router-dom";

const useSignup = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const navigate = useNavigate();
  const url = "/api/users/register"

  const signup = async (username, email, password, date_of_birth, phone_number) => {
    setIsLoading(true);
    setError(null);
    
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password, username, date_of_birth, phone_number}),
    });
    const user = await response.json();

    if (!response.ok) {
      setError(user.message);
      setIsLoading(false);
      return error;
    }

    sessionStorage.setItem("user", JSON.stringify(user));
    console.log("User signed up successfully!")
    setIsLoading(false);
    navigate("/");
  };

  return { signup, isLoading, error };
};

export default useSignup;