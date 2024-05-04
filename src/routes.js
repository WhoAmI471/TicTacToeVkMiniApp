import {
  createHashRouter,
  createPanel,
  createRoot,
  createView,
  RoutesConfig,
} from "@vkontakte/vk-mini-apps-router";

export const DEFAULT_ROOT = "default_root";

export const DEFAULT_VIEW = "default_view";

export const DEFAULT_VIEW_PANELS = {
  HOME: "home",
  SMALL_BOARD: "smallBoard",
  BIG_BOARD: "bigBoard",
  ONLINE_BIG_BOARD: "onlineBigBoard",
  LEADERBOARD: "leaderboard",
  SHOP: "shop",
};

export const routes = RoutesConfig.create([
  createRoot(DEFAULT_ROOT, [
    createView(DEFAULT_VIEW, [
      createPanel(DEFAULT_VIEW_PANELS.HOME, "/", []),
      createPanel(
        DEFAULT_VIEW_PANELS.BIG_BOARD,
        `/${DEFAULT_VIEW_PANELS.BIG_BOARD}`,
        []
      ),
      createPanel(
        DEFAULT_VIEW_PANELS.SMALL_BOARD,
        `/${DEFAULT_VIEW_PANELS.SMALL_BOARD}`,
        []
      ),
      createPanel(
        DEFAULT_VIEW_PANELS.ONLINE_BIG_BOARD,
        `/${DEFAULT_VIEW_PANELS.ONLINE_BIG_BOARD}`,
        []
      ),
      createPanel(
        DEFAULT_VIEW_PANELS.LEADERBOARD,
        `/${DEFAULT_VIEW_PANELS.LEADERBOARD}`,
        []
      ),
      createPanel(DEFAULT_VIEW_PANELS.SHOP, `/${DEFAULT_VIEW_PANELS.SHOP}`, []),
    ]),
  ]),
]);

export const router = createHashRouter(routes.getRoutes());
