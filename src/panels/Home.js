import { useState, useEffect } from 'react';

import { Panel, PanelHeader, Button, Group, ModalRoot, ModalCard, SplitLayout } from '@vkontakte/vkui';
import { useRouteNavigator } from '@vkontakte/vk-mini-apps-router';

export const Home = ({id, setStatus, setBotActive, setBotLevel, setBoardSize}) => {
  const [activeModal, setActiveModal] = useState('');

  const routeNavigator = useRouteNavigator();

  const modal = (
    <ModalRoot activeModal={activeModal}>
      <ModalCard id="smallBoardWithFriend" onClose={() => setActiveModal(null)}>
        <Group>
          <Button className="resetButton" onClick={() => playerScreenClickSmallBoard(3)}> 3x3 </Button>
          <Button className="resetButton" onClick={() => playerScreenClickSmallBoard(5)}> 5x5 </Button>
        </Group>
      </ModalCard>
    </ModalRoot>
  );

  const singleplayerClick = () => {
    setBotActive(true);
    setBotLevel("easy");
    setBoardSize(3);

    routeNavigator.push('smallBoard');
  }

  const playerScreenClickSmallBoard = (boardSize) => {
    setBotActive(false);
    setBotLevel("easy");
    setBoardSize(boardSize);

    routeNavigator.push('smallBoard');
  };

  const handle2PlayerScreenClick = () => {
    routeNavigator.push('bigBoard');
    setStatus("localGame");
  };

  const handle2PlayerOnlineClick = () => {
    routeNavigator.push('networkMenu');
    setStatus("networkMenu");
  };

  const handlePlayAgainstComputerClick = () => {
    routeNavigator.push('aiMenu');
    setStatus("aiMenu");
  };


  return (
    <SplitLayout modal={modal}>
      <Panel id={id}>
        <PanelHeader>
          Select game mode:
        </PanelHeader>
        <Group>
          <Button className="resetButton" onClick={singleplayerClick}>
            одиночная игра
          </Button>
          <Button className="resetButton" onClick={() => setActiveModal('smallBoardWithFriend')}>
            игра c другом
          </Button>
        </Group>

        <Group>
          <Button className="resetButton" onClick={handle2PlayerScreenClick}>
            2 player shared screen
          </Button>
          <Button className="resetButton" onClick={handle2PlayerOnlineClick}>
            2 player online
          </Button>
          <Button className="resetButton" onClick={handlePlayAgainstComputerClick}>
            Play against the computer
          </Button>
        </Group>
      </Panel>
    </SplitLayout>
  );
}
