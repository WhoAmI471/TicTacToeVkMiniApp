import { Panel, PanelHeader, PanelHeaderButton, Group } from '@vkontakte/vkui';
import { useRouteNavigator } from '@vkontakte/vk-mini-apps-router';
import Arrow from '../assets/arrow.svg';

import Board from "../components/ticTacClassic/Board";

export const SmallBoardGame = ({id, botActive, botLevel, boardSize}) => {
  const routeNavigator = useRouteNavigator();

  return (
  <Panel id={id}>
    <PanelHeader
      before={
        <PanelHeaderButton onClick={() => routeNavigator.push('/')}>
          <img src={Arrow}/>
        </PanelHeaderButton>
      }
    >
      Парная игра
    </PanelHeader>

    <Group style={{margin: '0 auto'}}>
      <Board botActive={botActive} botLevel={botLevel} boardSize={boardSize} />
    </Group>
	</Panel>
  );
}
