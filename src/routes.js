import {
  createHashRouter,
  createPanel,
  createRoot,
  createView,
  RoutesConfig,
} from '@vkontakte/vk-mini-apps-router';

export const DEFAULT_ROOT = 'default_root';

export const DEFAULT_VIEW = 'default_view';

export const DEFAULT_VIEW_PANELS = {
  HOME: 'home',
  SMALL_BOARD: 'smallBoard',
  BIG_BOARD: 'bigBoard',
  ONLINE_BIG_BOARD: 'OnlineBigBoard',
  NETWORK_MENU: 'networkMenu',
  HOST_MENU: 'hostMenu',
  JOIN_MENU: 'joinMenu',
};

export const routes = RoutesConfig.create([
  createRoot(DEFAULT_ROOT, [
    createView(DEFAULT_VIEW, [
      createPanel(DEFAULT_VIEW_PANELS.HOME, '/', []),
      createPanel(DEFAULT_VIEW_PANELS.BIG_BOARD, `/${DEFAULT_VIEW_PANELS.BIG_BOARD}`, []),
      createPanel(DEFAULT_VIEW_PANELS.SMALL_BOARD, `/${DEFAULT_VIEW_PANELS.SMALL_BOARD}`, []),
      createPanel(DEFAULT_VIEW_PANELS.ONLINE_BIG_BOARD, `/${DEFAULT_VIEW_PANELS.ONLINE_BIG_BOARD}`, []),
      createPanel(DEFAULT_VIEW_PANELS.HOST_MENU, `/${DEFAULT_VIEW_PANELS.HOST_MENU}`, []),
      createPanel(DEFAULT_VIEW_PANELS.JOIN_MENU, `/${DEFAULT_VIEW_PANELS.JOIN_MENU}`, []),
    ]),
  ]),
]);

export const router = createHashRouter(routes.getRoutes());
