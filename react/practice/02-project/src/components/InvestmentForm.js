import "./InvestmentForm.css";
import { useState } from "react";

const hyphenToCamel = (hyphenStr) => {
  return hyphenStr.replace(/-([a-z])/g, (match, letter) =>
    letter.toUpperCase()
  );
};

export default function InvestmentForm(props) {
  const [userInput, setUserInput] = useState({
    currentSavings: "",
    yearlyContribution: "",
    expectedReturn: "",
    duration: "",
  });
  const valuesChangeHandler = (event) => {
    const { id, value } = event.target;
    setUserInput((prev) => ({
      ...prev,
      [hyphenToCamel(id)]: value,
    }));
  };

  const submitHandler = (event) => {
    event.preventDefault();
    props.onFormSubmit(userInput);
    handleClearForm();
  };

  const handleClearForm = () => {
    setUserInput({
      currentSavings: "",
      yearlyContribution: "",
      expectedReturn: "",
      duration: "",
    });
  };

  return (
    <form className="form" onSubmit={submitHandler}>
      <div className="input-group">
        <p>
          <label htmlFor="current-savings">Current Savings ($)</label>
          <input
            type="number"
            id="current-savings"
            onChange={valuesChangeHandler}
            value={userInput.currentSavings}
          />
        </p>
        <p>
          <label htmlFor="yearly-contribution">Yearly Savings ($)</label>
          <input
            type="number"
            id="yearly-contribution"
            onChange={valuesChangeHandler}
            value={userInput.yearlyContribution}
          />
        </p>
      </div>
      <div className="input-group">
        <p>
          <label htmlFor="expected-return">
            Expected Interest (%, per year)
          </label>
          <input
            type="number"
            id="expected-return"
            onChange={valuesChangeHandler}
            value={userInput.expectedReturn}
          />
        </p>
        <p>
          <label htmlFor="duration">Investment Duration (years)</label>
          <input
            type="number"
            id="duration"
            onChange={valuesChangeHandler}
            value={userInput.duration}
          />
        </p>
      </div>
      <p className="actions">
        <button type="reset" onClick={handleClearForm} className="buttonAlt">
          Reset
        </button>
        <button type="submit" className="button">
          Calculate
        </button>
      </p>
    </form>
  );
}
