import logo from "./assets/investment-calculator-logo.png";
import Header from "./components/Header";
import InvestmentForm from "./components/InvestmentForm";
import Table from "./components/Table/Table";
import { useState } from "react";

const tableHeaders = [
  "Year",
  "Total Savings",
  "Interest (Year)",
  "Total Interest",
  "Invested Capital",
];

function App() {
  const [data, setData] = useState([]);
  const yearlyData = [];
  const calculateHandler = (userInput) => {
    let currentSavings = +userInput.currentSavings;
    const yearlyContribution = +userInput.yearlyContribution;
    const expectedReturn = +userInput.expectedReturn / 100;
    const duration = +userInput.duration;

    for (let i = 0; i < duration; i++) {
      const yearlyInterest = currentSavings * expectedReturn;
      const investedCapital =
        +userInput.currentSavings + yearlyContribution * (i + 1);
      currentSavings += yearlyInterest + yearlyContribution;
      yearlyData.push({
        year: i + 1,
        yearlyInterest: yearlyInterest,
        savingsEndOfYear: currentSavings,
        totalInterest: currentSavings - investedCapital,
        investedCapital: investedCapital,
      });
    }
    setData(yearlyData);
  };
  return (
    <div>
      <Header />
      <InvestmentForm onFormSubmit={calculateHandler} />
      <Table tableHeaders={tableHeaders} data={data} />
    </div>
  );
}

export default App;
