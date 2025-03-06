import { RouterProvider } from "react-router-dom";
import ToastNotification from "./components/common/ToastNotification";
import PageLoading from "./components/common/PageLoading";
import AppRoutes from "./router/AppRoutes";

function App() {
  return (
    <>
      <RouterProvider router={AppRoutes} />
      <ToastNotification />
      <PageLoading />
    </>
  );
}

export default App;
