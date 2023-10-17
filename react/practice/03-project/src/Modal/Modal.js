import "./Modal.css";
import { useState } from "react";

export default function Modal(props) {
  const closeModal = (event) => {
    event.preventDefault();
    props.onCloseModal();
  };

  return (
    <div className="overlay" onClick={closeModal}>
      <div className="container">
        <form onSubmit={closeModal}>
          <h2>Invalid input</h2>
          <p>Please enter valid username and age (non-empty values)</p>
          <button type="submit">Okay</button>
        </form>
      </div>
    </div>
  );
}
