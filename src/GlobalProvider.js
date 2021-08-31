import React, { createContext, useReducer } from "react";
import PropTypes from "prop-types";
import globalReducer from "./GlobalReducer";

export const GlobalContext = createContext();

const initialState = {
  token: "",
  loggedIn: false,
  blogName: "Truth Today",
  titleFont: "Limelight",
  primaryColor: "#000080",
  secondaryColor: "dodgerblue",
};

const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(globalReducer, initialState);
  return (
    <GlobalContext.Provider value={{ state, dispatch }}>
      {children}
    </GlobalContext.Provider>
  );
};

GlobalProvider.propTypes = {
  children: PropTypes.object,
};

export default GlobalProvider;
