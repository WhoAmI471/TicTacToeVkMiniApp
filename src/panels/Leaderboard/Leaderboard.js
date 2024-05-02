import { Panel, PanelHeader, PanelHeaderButton } from '@vkontakte/vkui';
import { useRouteNavigator } from '@vkontakte/vk-mini-apps-router';


import { Icon28ChevronBack } from '@vkontakte/icons'


import './Leaderboard.css';
import LeaderboardList from '../../components/leaderboard/LeaderboardList';

export const Leaderboard = ({id, data }) => {
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
      Tic-Tac-Toe
    </PanelHeader>
		<LeaderboardList data={data}/>
	</Panel>
  );
}
