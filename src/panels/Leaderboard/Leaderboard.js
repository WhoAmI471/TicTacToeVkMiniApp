import { Panel, PanelHeader, PanelHeaderButton, Text } from "@vkontakte/vkui";
import { useRouteNavigator } from "@vkontakte/vk-mini-apps-router";

import { Icon28ChevronBack } from "@vkontakte/icons";

import "./Leaderboard.css";
import LeaderboardList from "../../components/leaderboard/LeaderboardList";

export const Leaderboard = ({ id, data, userId }) => {
  const routeNavigator = useRouteNavigator();

  return (
    <Panel id={id}>
      <PanelHeader
        before={
          <PanelHeaderButton onClick={() => routeNavigator.push("/")}>
            <Icon28ChevronBack />
          </PanelHeaderButton>
        }
      >
        Tic-Tac-Toe
      </PanelHeader>
      {data ? (
        <LeaderboardList data={data} userId={userId} />
      ) : (
        <Text>Sorry, list is empty</Text>
      )}
    </Panel>
  );
};
