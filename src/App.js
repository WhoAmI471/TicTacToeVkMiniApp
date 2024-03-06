import { useState, useEffect } from 'react';
import bridge from '@vkontakte/vk-bridge';
import { View, SplitLayout, SplitCol, ScreenSpinner, ModalRoot, ModalCard, Group, Button } from '@vkontakte/vkui';
import { useActiveVkuiLocation, useRouteNavigator } from '@vkontakte/vk-mini-apps-router';

import { Home, AiMenu, NetworkMenu, HostMenu, JoinMenu, SmallBoardGame } from './panels';
import { DEFAULT_VIEW_PANELS } from './routes';

import BigBoard from "./components/BigBoard";

export const App = () => {
  const { panel: activePanel = DEFAULT_VIEW_PANELS.WELCOME_MENU } = useActiveVkuiLocation();
  const [fetchedUser, setUser] = useState();
  const [popout, setPopout] = useState(<ScreenSpinner size="large" />);


  const [reset, setReset] = useState(0);
  const [robot, setRobot] = useState(2);
  const [status, setStatus] = useState("home");
  const [playerIsX, setPlayerIsX] = useState(true);

  const [botActive, setBotActive] = useState(0);
  const [botLevel, setBotLevel] = useState(2);
  const [boardSize, setBoardSize] = useState(2);

  const [activeModal, setActiveModal] = useState('');

  function resetBoard() {
    setReset(reset + 1);
  }

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
      const user = await bridge.send('VKWebAppGetUserInfo');
      setUser(user);
      setPopout(null);
    }
    fetchData();
  }, []);

  

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
          />
          <SmallBoardGame 
            id="smallBoard" 
            botActive={botActive} 
            botLevel={botLevel} 
            boardSize={boardSize} 
          />
          <BigBoard
            id="bigBoard"
            robot={robot}
            key={reset}
            appStatus={status}
            playerIsX={playerIsX}
          />
          <AiMenu
            id="aiMenu"
            togglePlayerisX={togglePlayerisX}
            playerIsX={playerIsX}
            robotMenuClick={robotMenuClick}
          />
          <NetworkMenu id="networkMenu" setStatus={statusUpdate} />
          <HostMenu id="hostMenu" togglePlayerisX={togglePlayerisX} playerIsX={playerIsX} />
          <JoinMenu id="joinMenu" />
        </View>
      </SplitCol>
    </SplitLayout>
  );
};
