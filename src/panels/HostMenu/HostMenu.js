import { useState } from "react";
import PlayAsXToggle from "../../components/PlayAsXToggle";

export const HostMenu = ({ id, togglePlayerisX, playerIsX, setSocket }) => {
  const [loading, setLoading] = useState(false);
  const [joinCode, setJoinCode] = useState("");

  const handleHostGame = async () => {
    setLoading(true);

    try {
      const response = await fetch("http://127.0.0.1:8000/create-game-session", {
        method: "POST",
      });

      if (!response.ok) {
        throw new Error("Failed to create game session");
      }

      const data = await response.json();
      setJoinCode(data.joinCode);
    } catch (error) {
      console.error("Error creating game session:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div id={id}>
      <h2>Host Game:</h2>
      <p>
        Join code: <input value={joinCode} readOnly />
      </p>
      <PlayAsXToggle togglePlayerisX={togglePlayerisX} playerIsX={playerIsX}/>
      {loading && (
        <p style={{ color: "red", fontSize: "0.7rem" }}>
          Waiting for other player to join...
        </p>
      )}
      {!loading && joinCode && (
        <p style={{ color: "green", fontSize: "0.7rem" }}>
          Game session created. Waiting for other player to join...
        </p>
      )}
      {!loading && !joinCode && (
        <button className="resetButton" onClick={handleHostGame}>
          Host Game
        </button>
      )}
    </div>
  );
};