export default function Header(props) {
  const image = props.image;
  const title = props.title;
  const description = props.description;
  return (
    <header>
      <img src={image} alt="Medal badge with a star" />
      <h1>{title}</h1>
      <p>{description}</p>
    </header>
  );
}
