export default function TableHeader(props) {
  return (
    <tr>
      {props.tableHeaders.map((header, index) => (
        <th key={index}>{header}</th>
      ))}
    </tr>
  );
}
