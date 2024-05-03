import { useState, useEffect } from "react";

import { Panel, PanelHeader, PanelHeaderButton } from "@vkontakte/vkui";
import { useRouteNavigator } from "@vkontakte/vk-mini-apps-router";

import { Icon28ChevronBack } from "@vkontakte/icons";

const StandbyScreen = () => {
  const routeNavigator = useRouteNavigator();

  return (
    <Panel>
      <PanelHeader
        before={
          <PanelHeaderButton onClick={() => routeNavigator.push("/")}>
            <Icon28ChevronBack />
          </PanelHeaderButton>
        }
      >
        tic-tac-online
      </PanelHeader>
      wait oponent...
    </Panel>
  );
};

export default StandbyScreen;
