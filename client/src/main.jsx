import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { DashboardProvider } from "./context/DashboardContext.jsx";
import { Provider } from "react-redux"; // ✅ Missing import added
import store from "./redux/app/store";

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <BrowserRouter>
      <DashboardProvider>
        <App />
      </DashboardProvider>
    </BrowserRouter>
  </Provider>
);
