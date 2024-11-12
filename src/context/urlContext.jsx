import { useState, createContext, useContext } from "react";

export const ApiContext = createContext();

export function ApiProvider({ children }) {
  //   const [username, setUsername] = useState("");
  const API_URL = "http://localhost:3500/";
  return (
    <ApiContext.Provider value={{ API_URL }}>{children}</ApiContext.Provider>
  );
}
