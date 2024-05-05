import { useState, useEffect } from "react";

import { Panel, PanelHeader, PanelHeaderButton } from "@vkontakte/vkui";
import { useRouteNavigator } from "@vkontakte/vk-mini-apps-router";

import { Icon28ChevronBack } from "@vkontakte/icons";

import "./StandbyScreen.css";
import CercleCraft from "../../assets/shop/CercleCraft.svg";

const StandbyScreen = () => {
  const routeNavigator = useRouteNavigator();

  return (
    <Panel>
      <div className="panel-oponent">
        <PanelHeader
          before={
            <PanelHeaderButton onClick={() => routeNavigator.push("/")}>
              <Icon28ChevronBack />
            </PanelHeaderButton>
          }
        >
          tic-tac-online
        </PanelHeader>

        <div className="main-oponent">
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div style={{ marginBottom: "30px" }}> Ожидание соперника </div>
            <img className="zagr" src={CercleCraft} alt="" />
          </div>
        </div>
      </div>
    </Panel>
  );
};

export default StandbyScreen;
