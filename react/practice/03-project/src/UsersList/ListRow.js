import "./ListRow.css";

export default function ListRow(props) {
  return (
    <li>
      {props.username} ({props.age} years old)
    </li>
  );
}
