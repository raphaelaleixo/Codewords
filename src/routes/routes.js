import Setup from "../components/Setup";
import Join from "../components/Join";
import Game from "../components/Game";
import NoRoom from "../components/NoRoom";
export const routes = [
  { path: "/", component: Setup },
  { path: "/join", component: Join },
  { path: "/error", component: NoRoom },
  { path: "/game/:room/:role/:allegiance?", component: Game },
  { path: "/game/:room/", component: NoRoom },
  { path: "*", component: Setup }
];
