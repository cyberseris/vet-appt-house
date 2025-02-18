import { RouterProvider } from "react-router-dom";
import ToastNotification from "./components/common/ToastNotification";
import AppRoutes from "./router/AppRoutes";

function App() {
  return (
    <>
      <RouterProvider router={AppRoutes} />
      <ToastNotification />
    </>
  );
}

export default App;
