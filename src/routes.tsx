import { lazy } from "react";
import { useRoutes } from "react-router-dom";
import withToken from "@/src/hoc/withToken";
import withNoToken from "@/src/hoc/withNoToken.tsx";

const Home = lazy(() => import("./pages/page.tsx"));
const Login = lazy(() => import("./pages/login/page.tsx"));
const Video = lazy(() => import("./pages/[chatId]/[messageId]/page.tsx"));

const Routes = () =>
  useRoutes([
    {
      path: "/",
      Component: withToken(Home),
    },
    {
      path: "/login",
      Component: withNoToken(Login),
    },
    {
      path: "/:chatId/:messageId",
      Component: withToken(Video),
    },
  ]);

export default Routes;
