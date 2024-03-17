import { useState, useEffect } from 'react';

import { Panel, PanelHeader, Button, Group, ModalRoot, ModalCard, SplitLayout } from '@vkontakte/vkui';
import { useRouteNavigator } from '@vkontakte/vk-mini-apps-router';

const StandbyScreen = () => {
  return (
    <div style={{height: '100%', width: '100%'}}>
      Wait...
    </div>
  );
}

export default StandbyScreen;