export default function Card(props) {
  const content = props.content;
  function handleClick() {
    if (content.clicked) {
      props.gameStateChanger(false);
      props.gameWinSetter(false);
      return;
    }
    content.clicked = true;
    props.reWrite(content);
  }

  const url = { backgroundImage: `url(${props.content.url})` };
  return (
    <div className="card" id={props.content.id} onClick={() => handleClick()}>
      <div className="card-img" style={url}></div>
      <p className="cardTitle">{props.content.title}</p>
    </div>
  );
}
