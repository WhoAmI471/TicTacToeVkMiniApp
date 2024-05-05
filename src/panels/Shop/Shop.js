import { useState } from "react";
import {
  Panel,
  PanelHeader,
  PanelHeaderButton,
  Group,
  ModalRoot,
  ModalCard,
  SplitLayout,
  Card,
} from "@vkontakte/vkui";

import { useRouteNavigator } from "@vkontakte/vk-mini-apps-router";
import "./Shop.css";

import { Icon28ChevronBack } from "@vkontakte/icons";

import circle from "../../assets/circle.svg";
import slah from "../../assets/slah.svg";
import cancel from "../../assets/cancel.svg";

import oblako from "../../assets/shop/oblako.svg";
import son from "../../assets/shop/son.svg";

import CercleCraft from "../../assets/shop/CercleCraft.svg";
import HeartCraft from "../../assets/shop/HeartCraft.svg";

import Zaic from "../../assets/shop/Zaic.svg";
import Morkovka from "../../assets/shop/Morkovka.svg";

export const Shop = ({ id }) => {
  const [activeModal, setActiveModal] = useState("");
  const routeNavigator = useRouteNavigator();

  const modal = (
    <ModalRoot activeModal={activeModal}>
      <ModalCard id="smallBoardWithFriend" onClose={() => setActiveModal(null)}>
        <Group style={{ display: "flex" }}></Group>
      </ModalCard>
    </ModalRoot>
  );

  const skinItems = [
    { name: "Классический", skinX: circle, skinO: cancel, id: 1 },
    { name: "Погода", skinX: oblako, skinO: son, id: 2 },
    { name: "ПиксельАрт", skinX: CercleCraft, skinO: HeartCraft, id: 3 },
    { name: "НеоКлассик", skinX: Zaic, skinO: Morkovka, id: 4 },
  ];

  return (
    <SplitLayout modal={modal}>
      <Panel id={id}>
        <PanelHeader
          before={
            <PanelHeaderButton onClick={() => routeNavigator.push("/")}>
              <Icon28ChevronBack />
            </PanelHeaderButton>
          }
        >
          Магазин
        </PanelHeader>

        <div className="skin-main">
          <Card mode="shadow" className="ads-main">
            <div
              style={{
                fontSize: "18pt",
                fontWeight: "500",
                marginBottom: "10px",
              }}
            >
              Отключить рекламу
            </div>
            <div className="ads-board">
              <div className="box-ads ten">
                <div className="week">Неделя</div>
                <div className="price">10</div>
                <div className="week">Голосов</div>
              </div>
              <div className="box-ads thirty">
                <div className="week">Месяц</div>
                <div className="price">30</div>
                <div className="week">Голосов</div>
              </div>
              <div className="box-ads handred">
                <div className="week">Навсегда</div>
                <div className="price">100</div>
                <div className="week">Голосов</div>
              </div>
            </div>
          </Card>

          <Card mode="shadow" className="skin-board">
            <div
              style={{
                fontSize: "18pt",
                fontWeight: "500",
                marginBottom: "10px",
              }}
            >
              Скины
            </div>
            <div className="item-skin">
              {skinItems.map((item) => (
                <div key={item.id} className="box-skin">
                  <div>{item.name}</div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      marginTop: "20px",
                    }}
                  >
                    <img
                      src={item.skinX}
                      style={{ width: "50px", height: "50px" }}
                    ></img>
                    <img
                      src={slah}
                      style={{ marginLeft: "6px", marginRight: "6px" }}
                    ></img>
                    <img
                      src={item.skinO}
                      style={{ width: "50px", height: "50px" }}
                    ></img>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </Panel>
    </SplitLayout>
  );
};
