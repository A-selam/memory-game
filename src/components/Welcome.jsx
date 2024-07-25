export default function Welcome(props) {
  function handleClick() {
    props.screenSwitch("game");
  }
  return (
    <div className="welcome-text-container">
      <h1 className="welcome">The Memory Game</h1>
      <button className="play" onClick={handleClick}>
        Play
      </button>
    </div>
  );
}
