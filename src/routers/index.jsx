import Detail from "../pages/detail";
import Favorite from "../pages/favorite";
import Home from "../pages/home";
import Search from "../pages/search";

const publicRoutes = [
  { path: "/", component: Home },
  { path: "/search", component: Search },
  { path: "/detail", component: Detail },
  { path: "/favorite", component: Favorite, layout: null },
];
export { publicRoutes };
