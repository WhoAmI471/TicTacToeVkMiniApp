import { useState, useEffect } from 'react';

import { Panel, PanelHeader, Button, Group, ModalRoot, ModalCard, SplitLayout } from '@vkontakte/vkui';
import { useRouteNavigator } from '@vkontakte/vk-mini-apps-router';

export const NetworkMenu = ({ setStatus }) => {
  const routeNavigator = useRouteNavigator();
  
  const menuRoute = (menuId) => {
    routeNavigator.push('/'+menuId);
    setStatus(menuId);
  };

  return (
    <div>
      <h2>Host or Join an online game: </h2>
      <button
        className="resetButton"
        onClick={() => {
          menuRoute("hostMenu");
        }}
      >
        Host game
      </button>
      <button
        className="resetButton"
        onClick={() => {
          menuRoute("joinMenu");
        }}
      >
        Join game
      </button>
    </div>
  );
}
