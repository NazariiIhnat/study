import ExpenseForm from "./ExpenseForm";
import "./NewExpense.css";
import { useState } from "react";

export default function NewExpanse(props) {
  const [isVisibleForm, setIsVisibleForm] = useState(false);

  const saveExpenseDataHandler = (enteredExpenseData) => {
    const expenseData = {
      ...enteredExpenseData,
      id: Math.random().toString(),
    };
    props.onAddExpenseData(expenseData);
    setIsVisibleForm(false);
  };

  function handleFormVisible() {
    setIsVisibleForm(true);
  }

  function handleFormHide() {
    setIsVisibleForm(false);
  }

  let formContent = (
    <button onClick={handleFormVisible}>Add new expense</button>
  );

  if (isVisibleForm) {
    formContent = (
      <ExpenseForm
        onSaveExpenceData={saveExpenseDataHandler}
        onHideForm={handleFormHide}
      />
    );
  }

  return <div className="new-expense">{formContent}</div>;
}
