import "./Modal.css";
import Wraper from "../Helpers/Wraper";
import ReactDOM from "react-dom";

const ModalPortal = (props) => {
  return (
    <div className="overlay" onClick={props.onClick}>
      <div className="container">
        <form>
          <h2>Invalid input</h2>
          <p>Please enter valid username and age (non-empty values)</p>
          <button type="submit">Okay</button>
        </form>
      </div>
    </div>
  );
};

export default function Modal(props) {
  const closeModal = (event) => {
    event.preventDefault();
    props.onCloseModal();
  };

  return (
    <Wraper>
      {ReactDOM.createPortal(
        <ModalPortal onClick={closeModal} />,
        document.getElementById("root-modal")
      )}
    </Wraper>
  );
}
