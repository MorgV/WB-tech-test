import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./app/store";

import { AppRouter } from "./app/router";
import { AppThemeProvider } from "./app/providers/themeProvider";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <AppThemeProvider>
          <AppRouter />
        </AppThemeProvider>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
