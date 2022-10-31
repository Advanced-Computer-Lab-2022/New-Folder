import { useState } from "react";
import { login } from "../network";
import { useNavigate } from "react-router-dom";
import { ReactSession } from "react-client-session";

const Login = (props) => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const submit = async (e) => {
    e.preventDefault();
    const loginData = {
      username,
      password,
    };
    try {
      const userData = await login(loginData);
      ReactSession.set("userType", userData.data.userType);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <form onSubmit={submit}>
      <input
        type="text"
        value={username}
        placeholder="Username"
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        value={password}
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <button>Submit</button>
    </form>
  );
};

export default Login;
