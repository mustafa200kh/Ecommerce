import ReactDOM from "react-dom/client";
import "./index.css";
// router
import AppRouter from "@routes/AppRouter";
// axios
import "./services/Api/axios-global";
// redux store
import { store, persistor } from "@store/index";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <PersistGate persistor={persistor} loading={null}>
      <AppRouter />
    </PersistGate>
  </Provider>
);
