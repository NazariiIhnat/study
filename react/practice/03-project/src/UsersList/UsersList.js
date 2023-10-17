import ListRow from "./ListRow";
import "./UsersList.css";

export default function UsersList(props) {
  return (
    <div className="container">
      <ul>
        {Object.values(props.usersData).map((val, index) => {
          return <ListRow username={val.username} age={val.age} key={index} />;
        })}
      </ul>
    </div>
  );
}
