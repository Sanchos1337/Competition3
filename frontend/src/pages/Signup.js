import useSignup from "../hooks/useSignup";
import useField from "../hooks/useField";

const Signup = () => {
  const email = useField("");
  const password = useField("");
  const username = useField("");
  const date_of_birth = useField("")
  const phone_number = useField("")

  // Add necessary code here
  const { signup, error, isLoading } = useSignup();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await signup(username.value, email.value, password.value, date_of_birth.value, phone_number.value); // make necessary modification
  };

  return (
    <form className="signup" onSubmit={handleSubmit}>
      <h3>Sign Up</h3>
      <label></label>
      <input type="text" placeholder="Username" {...username} />
      <label></label>
      <input type="text" placeholder="mail@mail.com" {...email} />
      <label></label>
      <input type="date" placeholder="YYYY-MM-DD" {...date_of_birth} />
      <label ></label>
      <input type="text" placeholder="Phone number" {...phone_number} />
      <label></label>
      <input type="password" placeholder="Password" {...password} />
      {/* Add necessary code here */}
      <button disabled={isLoading} onClick={handleSubmit} >Sign up</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default Signup;


/*
const Signup = () => {
  return (
    <form className="signup">
      <h3>Sign Up</h3>
      <label>Username:</label>
      <input type="text" />
      <label>Email address:</label>
      <input type="email" />
      <label>Password:</label>
      <input type="password" />
      <label>Date of birth:</label>
      <input type="date" />
      <label>Phone number:</label>
      <input type="text" />      
      <button>Sign up</button>
    </form>
  );
};

export default Signup;
*/
