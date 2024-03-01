import React from 'react';
import useLogin from "../hooks/useLogin";
import useField from "../hooks/useField";

const LoginComponent = () => {
  const usernameInput = useField("");
  const passwordInput = useField("");

  const { handleLogin } = useLogin();

  const handler = () => {
    handleLogin(usernameInput.value, passwordInput.value);
  };
  
  return (
    <div className='login'>
      <h3>Login</h3>
      <label>Username
        <input type="text" placeholder='Username' {...usernameInput} />
      </label>
      <br />
      <label>Password
        <input type="password" placeholder='Password' {...passwordInput}/>
      </label>
      <br />
      <button onClick={handler}>Login</button>
    </div>
  );
};

export default LoginComponent;




// const Login = () => {
//   return (
//     <form className="login">
//       <h3>Log In</h3>

//       <label>Username:</label>
//       <input type="rext" />
//       <label>Password:</label>
//       <input type="password" />

//       <button>Log in</button>
//     </form>
//   );
// };

// export default Login;
