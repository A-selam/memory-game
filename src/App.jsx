import { useState, useEffect } from "react";

import Welcome from "./components/Welcome";
import GameBoard from "./components/GameBoard";
import "./App.css";

function App() {
  const [screen, setScreen] = useState("welcome");
  const [bestScore, setBestScore] = useState(0);
  const [images, setImages] = useState([]);

  useEffect(() => {
    (async () => {
      const response = await fetch(
        "https://rickandmortyapi.com/api/character/[1,2,3,4,5,6,7,8,9,10]"
      );
      const data = await response.json();
      setImages(data);
    })();
  }, []);

  return (
    <main>
      {screen === "welcome" && (
        <div className="heroContainer">
          <Welcome screenSwitch={(screen) => setScreen(screen)} />
        </div>
      )}
      {screen === "game" && (
        <GameBoard
          screenSwitch={(screen) => setScreen(screen)}
          imgs={images}
          bestScore={bestScore}
          bestScoreSetter={(e) => setBestScore(e)}
        />
      )}
    </main>
  );
}

export default App;
