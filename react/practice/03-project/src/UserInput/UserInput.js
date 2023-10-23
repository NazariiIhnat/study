import { act } from "react-dom/test-utils";
import "./UserInput.css";
import { useRef, useReducer } from "react";

export default function UserInput(props) {
  const nameFn = (state, action) => {
    if (action.type === "TYPE")
      return {
        value: action.value,
        hasFocus: state.hasFocus,
      };
    if (action.type === "FOCUS")
      return {
        value: state.value,
        hasFocus: action.value,
      };
  };
  const inputName = useRef();
  const inputAge = useRef();
  const [nameState, dispatchName] = useReducer(nameFn, {
    value: "",
    hasFocus: false,
  });

  const updateName = (event) => {
    dispatchName({ type: "name", value: event.target.value });
  };

  const submitHandler = (event) => {
    event.preventDefault();
    props.onHandleSubmit({
      username: inputName.current.value,
      age: inputAge.current.value,
    });
  };

  const test = () => {
    dispatchName({ type: "FOCUS", value: true });
  };

  return (
    <div className="container">
      <form onSubmit={submitHandler}>
        <label htmlFor="username">Username</label>
        <input
          type="text"
          id="username"
          onChange={updateName}
          onBlur={test}
          className={nameState.hasFocus ? "focus" : ""}
        />
        <label htmlFor="age">Age (Years)</label>
        <input type="number" id="age" ref={inputAge} />
        <button type="submit">Add User</button>
      </form>
    </div>
  );
}
