import Card from "./Card";

export default function Cards(props) {
  console.log(props);
  return (
    <ul id="concepts">
      <Card
        title={props.concepts[0].title}
        description={props.concepts[0].description}
        image={props.concepts[0].image}
      ></Card>
      <Card
        title={props.concepts[1].title}
        description={props.concepts[1].description}
        image={props.concepts[1].image}
      ></Card>
      <Card
        title={props.concepts[2].title}
        description={props.concepts[2].description}
        image={props.concepts[2].image}
      ></Card>
    </ul>
  );
}
