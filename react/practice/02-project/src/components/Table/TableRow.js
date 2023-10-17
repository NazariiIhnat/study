import "./TableRow.css";

export default function TableRow(props) {
  const usDollar = Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });
  return (
    <tr>
      <td>{props.year}</td>
      <td>{usDollar.format(props.savingsEndOfYear)}</td>
      <td>{usDollar.format(props.yearlyInterest)}</td>
      <td>{usDollar.format(props.totalInterest)}</td>
      <td>{usDollar.format(props.investedCapital)}</td>
    </tr>
  );
}
