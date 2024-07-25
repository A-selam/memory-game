import { useState, useEffect } from "react";

import Card from "./Card";

export default function GameBoard(props) {
  const [contents, setContents] = useState(
    props.imgs.map((img) => {
      return { id: img.id, title: img.name, url: img.image, clicked: false };
    })
  );
  const [contentToDisplay, setcontentToDisplay] = useState([]);
  const [playing, setPlaying] = useState(true);
  const [win, setWin] = useState();

  useEffect(() => {
    let temp = contents;
    if (!playing) {
      temp.map((t) => (t.clicked = false));
    }
    setContents(temp);
  }, [playing, contents]);

  const end = contents.reduce((total, item) => {
    if (item.clicked) {
      total += 1;
    }
    return total;
  }, 0);

  if (props.bestScore < end) {
    props.bestScoreSetter(end);
  }

  useEffect(() => {
    const temp = [];
    while (temp.length < 3) {
      let flag = false;
      let random = Math.floor(Math.random() * 10);

      if (temp.length != 0) {
        temp.map((item) => {
          if (item.id === contents[random].id) {
            flag = true;
          }
        });
      }

      if (flag) {
        continue;
      } else temp.push(contents[random]);

      if (temp.length === 3) {
        if (temp.filter((item) => item.clicked).length === 3) {
          if (contents.filter((item) => item.clicked).length === 10) {
            break;
          } else temp.splice(0, temp.length);
        } else break;
      }
    }

    setcontentToDisplay(temp);
  }, [contents]);

  function handleChangeOfList(newContent) {
    let temp = [...contents];
    temp[newContent.id - 1].clicked = newContent.clicked;
    setContents(temp);
  }

  if (playing) {
    return (
      <>
        <div className="header">
          <div className="score-board">
            <p className="score">Score: {end}</p>
            <p className="best-score">Best: {props.bestScore}</p>
          </div>
          <p>
            {end}/{contents.length}
          </p>
          <button
            className="back"
            onClick={() => props.screenSwitch("welcome")}
          >
            Back
          </button>
        </div>
        <div className="card-container">
          {contentToDisplay.map((content) => (
            <Card
              key={content.id}
              content={content}
              reWrite={(newContent) => handleChangeOfList(newContent)}
              gameStateChanger={(e) => setPlaying(e)}
              gameWinSetter={(e) => setWin(e)}
            />
          ))}
        </div>
      </>
    );
  } else {
    if (win) {
      return (
        <>
          <div className="header">
            <div className="score-board">
              <p className="score">Score: {end}</p>
              <p className="best-score">Best: {props.bestScore}</p>
            </div>
            <p>
              {end}/{contents.length}
            </p>
            <button
              className="back"
              onClick={() => props.screenSwitch("welcome")}
            >
              Back
            </button>
          </div>
          <h1 className="final">You won🙌</h1>;
        </>
      );
    } else {
      return (
        <>
          <div className="header">
            <div className="score-board">
              <p className="score">Score: {end}</p>
              <p className="best-score">Best: {props.bestScore}</p>
            </div>
            <p>
              {end}/{contents.length}
            </p>
            <button
              className="back"
              onClick={() => props.screenSwitch("welcome")}
            >
              Back
            </button>
          </div>
          <h1 className="final">You lost😢</h1>;
        </>
      );
    }
  }
}
