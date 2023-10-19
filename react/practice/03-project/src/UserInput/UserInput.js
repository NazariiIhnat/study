import "./UserInput.css";
import { useRef } from "react";

export default function UserInput(props) {
  const inputName = useRef();
  const inputAge = useRef();

  const submitHandler = (event) => {
    event.preventDefault();
    props.onHandleSubmit({
      username: inputName.current.value,
      age: inputAge.current.value,
    });
  };

  return (
    <div className="container">
      <form onSubmit={submitHandler}>
        <label htmlFor="username">Username</label>
        <input type="text" id="username" ref={inputName} />
        <label htmlFor="age">Age (Years)</label>
        <input type="number" id="age" ref={inputAge} />
        <button type="submit">Add User</button>
      </form>
    </div>
  );
}
