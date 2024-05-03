import { Panel, PanelHeader, PanelHeaderButton, Group } from "@vkontakte/vkui";
import { useRouteNavigator } from "@vkontakte/vk-mini-apps-router";

import { Icon28ChevronBack } from "@vkontakte/icons";

import BigBoard from "../../components/ticTacUltimate/BigBoard";

import "./BigBoardGame.css";
import "../SmallBoardGame/SmallBoardGame.css";

export const BigBoardGame = ({
  id,
  panelHeaderText,
  socket,
  robot,
  appStatus,
  playerIsX,
  turnNext,
  currentBack,
}) => {
  const routeNavigator = useRouteNavigator();

  return (
    <Panel id={id}>
      <div className={`panel-big-board ${currentBack}`}>
        <PanelHeader
          before={
            <PanelHeaderButton onClick={() => routeNavigator.push("/")}>
              <Icon28ChevronBack />
            </PanelHeaderButton>
          }
        >
          {panelHeaderText}
        </PanelHeader>

        <Group style={{ margin: "0 auto" }}>
          <BigBoard
            socket={socket}
            robot={robot}
            appStatus={appStatus}
            playerIsX={playerIsX}
            turnNext={turnNext}
          />
        </Group>
      </div>
    </Panel>
  );
};
