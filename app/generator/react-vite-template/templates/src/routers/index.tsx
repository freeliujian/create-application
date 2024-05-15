import {
  createBrowserRouter,
	Link
} from "react-router-dom";
import Home from "../pages/home";

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/about",
      element: (
        <div>
          <div>About</div>
          <div>
            <Link className="cursor-pointer" to="/">
              回到首页
            </Link>
          </div>
        </div>
      ),
    },
  ],

);

export default router
