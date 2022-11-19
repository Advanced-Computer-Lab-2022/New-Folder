import { useState } from "react";
import { postAddInstructor } from "../../network";
import { useNavigate } from "react-router-dom";

function AddInstructor() {
  const [data, setData] = useState({
    username: "",
    password: "",
  });
  const navigate = useNavigate();
  const { username, password } = data;
  const onSubmit = (e) => {
    console.log(data);
    postAddInstructor(data);
    e.preventDefault();
    navigate("/");
  };

  const onChange = (e) => {
    setData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          id="username"
          name="username"
          value={username}
          placeholder="Enter your username"
          onChange={onChange}
        />
        <br></br>
        <input
          type="password"
          id="password"
          name="password"
          value={password}
          placeholder="Enter your password"
          onChange={onChange}
        />
        <br></br>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default AddInstructor;
