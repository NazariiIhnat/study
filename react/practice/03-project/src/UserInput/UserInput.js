import "./UserInput.css";
import { useState } from "react";

export default function UserInput(props) {
  const [userInput, setUserInput] = useState({
    username: "",
    age: "",
  });

  const inputChangeHandler = (event) => {
    event.preventDefault();
    const { id, value } = event.target;
    setUserInput((prev) => {
      return {
        ...prev,
        [id]: value,
      };
    });
  };

  const submitHandler = (event) => {
    event.preventDefault();
    props.onHandleSubmit(userInput);
    setUserInput({
      username: "",
      age: "",
    });
  };

  return (
    <div className="container">
      <form onSubmit={submitHandler}>
        <label htmlFor="username">Username</label>
        <input
          type="text"
          id="username"
          onChange={inputChangeHandler}
          value={userInput.username}
        />
        <label htmlFor="age">Age (Years)</label>
        <input
          type="number"
          id="age"
          onChange={inputChangeHandler}
          value={userInput.age}
        />
        <button type="submit">Add User</button>
      </form>
    </div>
  );
}
