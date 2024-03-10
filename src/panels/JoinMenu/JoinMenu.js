import { useState } from "react";
import { useRouteNavigator } from '@vkontakte/vk-mini-apps-router';

export const JoinMenu = ({ setStatus, setSocket }) => {
  const [codeInput, setCodeInput] = useState("");
  const [joinClicked, setJoinClicked] = useState(false);
  const routeNavigator = useRouteNavigator();

  function handleInputChange(e) {
    setCodeInput(e.target.value);
  }

  async function handleJoinClick() {
    setJoinClicked(true);
    if (codeInput.trim() === "") {
      // Если поле ввода пустое, просто отправляем запрос на присоединение к любой свободной сессии
      try {
        const response = await fetch("http://127.0.0.1:8000/join-free-session", {
          method: "POST",
        });

        if (!response.ok) {
          throw new Error("Failed to join session");
        }

        routeNavigator.push('/bigBoard');
        setStatus("bigBoard"); // Переключаемся на следующий шаг
      } catch (error) {
        console.error("Error joining session:", error);
      }
    } else {
      // Если введен код сессии, присоединяемся к указанной сессии
      try {
        const response = await fetch(`http://127.0.0.1:8000/join-session/${codeInput}`, {
          method: "POST",
        });

        if (!response.ok) {
          throw new Error("Failed to join session");
        }

        routeNavigator.push('/bigBoard');
        setStatus("bigBoard"); // Переключаемся на следующий шаг
      } catch (error) {
        console.error("Error joining session:", error);
      }
    }
  }

  return (
    <div>
      <h2>Join Game:</h2>
      <p>
        Join code: <input value={codeInput} onChange={handleInputChange} />
      </p>
      <button
        className="resetButton"
        disabled={joinClicked}
        onClick={handleJoinClick}
      >
        Join
      </button>
    </div>
  );
}