import { Panel, PanelHeader, PanelHeaderButton, Group } from '@vkontakte/vkui';
import { useRouteNavigator } from '@vkontakte/vk-mini-apps-router';


import { Icon28ChevronBack } from '@vkontakte/icons'

import BigBoard from "../../components/ticTacUltimate/BigBoard";

import './SmallBoardGame.css';

export const SmallBoardGame = ({id, botActive, botLevel, boardSize}) => {
  const routeNavigator = useRouteNavigator();

  return (
  <Panel id={id}>
    <PanelHeader
      before={
        <PanelHeaderButton onClick={() => routeNavigator.push('/')}>
          <Icon28ChevronBack />
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
