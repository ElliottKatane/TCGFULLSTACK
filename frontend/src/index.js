import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { AuthContextProvider } from "./context/AuthContext";
//redux imports
import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./redux/reducers/rootReducer"; // Update the import path to access the rootReducer.js file
import { Provider } from "react-redux"; // Redux Provider
import thunk from "redux-thunk";

// Create the Redux store using configureStore
const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk), // Add your middleware (e.g., Redux Thunk) here
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <BrowserRouter>
        <Provider store={store}>
          {" "}
          {/* Wrap with the Redux Provider */}
          <App />
        </Provider>
      </BrowserRouter>
    </AuthContextProvider>
  </React.StrictMode>
);
