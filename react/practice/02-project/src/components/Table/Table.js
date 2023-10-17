import TableHeaders from "./TableHeader";
import TableRow from "./TableRow";

export default function Table(props) {
  return (
    <table className="result">
      <thead>
        <TableHeaders tableHeaders={props.tableHeaders} />
      </thead>
      <tbody>
        {Object.values(props.data).map((obj) => (
          <TableRow
            year={obj.year}
            yearlyInterest={obj.yearlyInterest}
            savingsEndOfYear={obj.savingsEndOfYear}
            totalInterest={obj.totalInterest}
            investedCapital={obj.investedCapital}
            key={obj.year}
          />
        ))}
      </tbody>
    </table>
  );
}
