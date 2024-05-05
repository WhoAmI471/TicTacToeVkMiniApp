import { useState, useEffect } from "react";
import bridge from "@vkontakte/vk-bridge";
import { View, SplitLayout, SplitCol, ScreenSpinner } from "@vkontakte/vkui";

import {
  useActiveVkuiLocation,
  useRouteNavigator,
} from "@vkontakte/vk-mini-apps-router";

import { DEFAULT_VIEW_PANELS } from "./routes";

import { Home } from "./panels/Home/Home";
import { SmallBoardGame } from "./panels/SmallBoardGame/SmallBoardGame";
import { Shop } from "./panels/Shop/Shop";
import { BigBoardGame } from "./panels/BigBoardGame/BigBoardGame";

import WebSocketComponent from "./components/ticTacUltimate/WebSocketComponent";
import { Leaderboard } from "./panels";

export const App = () => {
  const { panel: activePanel = DEFAULT_VIEW_PANELS.WELCOME_MENU } =
    useActiveVkuiLocation();
  const [fetchedUser, setUser] = useState(null);
  const [fetchedUsersStats, setSortedUserStats] = useState(null);
  const [popout, setPopout] = useState(<ScreenSpinner size="large" />);

  const [robot, setRobot] = useState(2);
  const [status, setStatus] = useState("home");
  const [playerIsX, setPlayerIsX] = useState(true);
  const [clientId, setClientId] = useState(null); // Добавляем состояние для client_id
  const [panelHeaderText, setPanelHeaderText] = useState(null);

  const [botActive, setBotActive] = useState(0);
  const [botLevel, setBotLevel] = useState(2);
  const [boardSize, setBoardSize] = useState(2);

  const [currentBack, setCurrentBack] = useState("blue");

  function statusUpdate(newStatus) {
    setStatus(newStatus);
  }

  function togglePlayerisX() {
    setPlayerIsX(!playerIsX);
  }

  function robotMenuClick(robotLevel) {
    setRobot(robotLevel);
    setStatus("aiGame");
  }

  useEffect(() => {
    async function fetchData() {
      const user = await bridge.send("VKWebAppGetUserInfo");
      setUser(user);
      setPopout(null);
    }
    fetchData();
  }, []);

  async function SendLinkGame() {
    bridge.send("VKWebAppAddToChat", {
      action_title: "Показать погоду",
    });
    bridge
      .send("VKWebAppAddToChatResult")
      .then((data) => {
        if (data.result) {
          // Обработка события в случае успеха
          console.log(data);
        } else {
          // Ошибка
        }
      })
      .catch((error) => {
        // Обработка события в случае ошибки
        console.log(error);
      });
  }

  async function CreateUserStats(user_id, name, last_name, img_url) {
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/leaderboard/${user_id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            user_id: 0,
            name: name,
            last_name: last_name,
            img_url: img_url,
            position: 1, // стартовая позиция
            score: 500, // стартовое количество очков
          }),
        }
      );
      // const data = await response.json();
      console.log(response.json());
      // Обработка ответа
    } catch (error) {
      console.error("Error:", error);
    }
  }

  async function GetUserStats(user_id) {
    try {
      const response = await fetch(`/leaderboard/${user_id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        mode: "no-cors",
      });
      const data = await response.json();
      console.log(data);
      return data;
      // Обработка ответа
    } catch (error) {
      console.error("Error:", error);
    }
  }

  async function UpdateUserScore(user_id, outcome) {
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/leaderboard/${user_id}/update-points?outcome=${outcome}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      console.log(data);
      return data;
      // Обработка ответа
    } catch (error) {
      console.error("Error:", error);
    }
  }

  async function SortedUsersStats() {
    try {
      const response = await fetch(`http://127.0.0.1:8000/leaderboard-sort`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      console.log(data);
      setSortedUserStats(data);
      // Обработка ответа
    } catch (error) {
      console.log("Error:" + error);
    }
  }

  useEffect(() => {
    if (fetchedUser) {
      console.log(fetchedUser);
      // setClientId(fetchedUser.id);
      setClientId(Date.now());
      // CreateUserStats(
      //   fetchedUser.id,
      //   fetchedUser.first_name,
      //   fetchedUser.last_name,
      //   fetchedUser.photo_100
      // );

      // SortedUsersStats();
    }
  }, [fetchedUser]);

  useEffect(() => {
    if (clientId) {
      CreateUserStats(
        clientId,
        fetchedUser.first_name,
        fetchedUser.last_name,
        fetchedUser.photo_100
      );
      SortedUsersStats();
    }
  }, [clientId]);

  return (
    <SplitLayout popout={popout}>
      <SplitCol>
        <View activePanel={activePanel}>
          <Home
            id="home"
            setStatus={statusUpdate}
            setBotActive={setBotActive}
            setBotLevel={setBotLevel}
            setBoardSize={setBoardSize}
            robotMenuClick={robotMenuClick}
            SendLinkGame={SendLinkGame}
            setPanelHeaderText={setPanelHeaderText}
            setCurrentBack={setCurrentBack}
          />
          <Shop id="shop" />
          <Leaderboard
            id="leaderboard"
            data={fetchedUsersStats}
            userId={clientId}
          />
          <SmallBoardGame
            id="smallBoard"
            botActive={botActive}
            botLevel={botLevel}
            boardSize={boardSize}
            currentBack={currentBack}
          />
          <BigBoardGame
            id="bigBoard"
            panelHeaderText={panelHeaderText}
            robot={robot}
            appStatus={status}
            playerIsX={playerIsX}
            currentBack={currentBack}
          />
          <WebSocketComponent
            id="onlineBigBoard"
            panelHeaderText={panelHeaderText}
            robot={robot}
            appStatus={status}
            clientId={clientId}
            currentBack={currentBack}
            UpdateUserScore={UpdateUserScore}
          />
        </View>
      </SplitCol>
    </SplitLayout>
  );
};
