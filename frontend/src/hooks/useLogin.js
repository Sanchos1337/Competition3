import { useNavigate } from "react-router-dom";

const useLogin = () => {
  // const [error, setError] = useState(null);
  // const [isLoading, setIsLoading] = useState(null);
  const navigate = useNavigate();
  const url = "/api/users/login";

  const handleLogin = async (username, password) => {
    // setIsLoading(true);
    // setError(null);

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const user = await response.json();
        localStorage.setItem("user", JSON.stringify(user));
        console.log("User logged in successfully!");
        navigate("/");
      } else {
        console.error("Login failed");
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  return { handleLogin };
};

export default useLogin;