import { Panel, PanelHeader, PanelHeaderButton, Group } from '@vkontakte/vkui';
import { useRouteNavigator } from '@vkontakte/vk-mini-apps-router';
// import Arrow from '../../assets/BackIcon.svg';

import { Icon28ChevronBack } from '@vkontakte/icons'

import Board from "../../components/ticTacClassic/Board";

import './SmallBoardGame.css';

export const SmallBoardGame = ({ id, botActive, botLevel, boardSize, currentBack }) => {
  const routeNavigator = useRouteNavigator();

  

  return (
  <Panel id={id}>
    <div className={`panel-board ${currentBack}`} > 
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
    </div>
	</Panel>
  
  );
}
