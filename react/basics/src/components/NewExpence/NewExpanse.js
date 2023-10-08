import ExpenseForm from "./ExpenseForm";
import "./NewExpense.css";

export default function NewExpanse(props) {
  const saveExpenseDataHandler = (enteredExpenseData) => {
    const expenseData = {
      ...enteredExpenseData,
      id: Math.random().toString(),
    };
    props.onAddExpenseData(expenseData);
  };
  return (
    <div className="new-expense">
      <ExpenseForm onSaveExpenceData={saveExpenseDataHandler} />
    </div>
  );
}
