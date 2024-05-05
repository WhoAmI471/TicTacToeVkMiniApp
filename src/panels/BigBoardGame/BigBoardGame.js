import React, { useState, useEffect } from "react";

import {
  Panel,
  PanelHeader,
  PanelHeaderButton,
  Group,
  Spacing,
  Button,
  ModalRoot,
  ModalCard,
  SplitLayout,
} from "@vkontakte/vkui";
import { useRouteNavigator } from "@vkontakte/vk-mini-apps-router";

import { Icon56CupOutline, Icon28ChevronBack } from "@vkontakte/icons";

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
  currentBack,
  UpdateUserScore,
  clientId,
}) => {
  const routeNavigator = useRouteNavigator();
  const [winMatch, setWinMatch] = useState(null);

  const modal = (
    <ModalRoot activeModal={winMatch}>
      <ModalCard
        id="win"
        onClose={() => setWinMatch(null)}
        header="+50 очков!"
        subheader="Вы выиграли! Продолжайте в том же духе"
        actions={
          <React.Fragment>
            <Spacing size={16} />
            <Button size="l" mode="primary" stretched>
              Выйти
            </Button>
          </React.Fragment>
        }
        icon={<Icon56CupOutline />}
      />

      <ModalCard
        id="loose"
        onClose={() => setWinMatch(null)}
        header="-50 очков!"
        subheader="Вы проиграли! Продолжайте тенироваться"
        actions={
          <React.Fragment>
            <Spacing size={16} />
            <Button size="l" mode="primary" stretched>
              Выйти
            </Button>
          </React.Fragment>
        }
        icon={<Icon56CupOutline />}
      />
    </ModalRoot>
  );

  useEffect(() => {
    if (winMatch && socket) {
      UpdateUserScore(clientId, winMatch);
    }
  }, [winMatch]);

  return (
    <SplitLayout modal={modal}>
      <Panel id={id}>
        <div className={`panel-big-board ${currentBack}`}>
          <PanelHeader
            before={
              <PanelHeaderButton
                onClick={() => {
                  if (socket) {
                    UpdateUserScore(clientId, "loose");
                    console.log(clientId + " loose ");
                  }
                  routeNavigator.push("/");
                }}
              >
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
              // turnNext={turnNext}
              setWinMatch={setWinMatch}
            />
          </Group>
        </div>
      </Panel>
    </SplitLayout>
  );
};
