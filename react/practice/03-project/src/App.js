import "./App.css";
import UserInput from "./UserInput/UserInput";
import UsersList from "./UsersList/UsersList";
import Modal from "./Modal/Modal";
import Wraper from "./Helpers/Wraper";
import { useState } from "react";

function App() {
  const [userList, setUserList] = useState([]);
  const [isVisibleModal, setIsVisibleModal] = useState(false);
  const submitHandler = (userInput) => {
    isCorrectValues(userInput)
      ? setUserList((prev) => [...prev, userInput])
      : setIsVisibleModal(true);
  };

  const isCorrectValues = (userInput) => {
    return userInput.username.trim() !== "" && +userInput.age > 0;
  };

  const closeModal = () => setIsVisibleModal(false);

  return (
    <Wraper className="root-container">
      <UserInput onHandleSubmit={submitHandler} />
      {userList.length === 0 ? (
        <h1 style={{ color: "white", textAlign: "center" }}>
          No users entered
        </h1>
      ) : (
        <UsersList usersData={userList} />
      )}

      {isVisibleModal && <Modal onCloseModal={closeModal} />}
    </Wraper>
  );
}

export default App;
