import { RouterProvider } from "react-router-dom";
import ToastNotification from "./components/common/ToastNotification";
import PageLoading from "./components/common/PageLoading";
import AppRoutes from "./router/AppRoutes";
import Cursor from "./components/common/Cursor";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import api from "./services/api";

function App() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
    // wake render server
    api("/");
  }, []);

  return (
    <>
      <RouterProvider router={AppRoutes} />
      <PageLoading />
      <ToastNotification />
      <Cursor />
    </>
  );
}

export default App;
