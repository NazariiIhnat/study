export default function Card(props) {
  const image = props.image;
  const title = props.title;
  const description = props.description;

  return (
    <li className="concept">
      <img src={image} alt="image icon" />
      <h2>{title}</h2>
      <p>{description}</p>
    </li>
  );
}
