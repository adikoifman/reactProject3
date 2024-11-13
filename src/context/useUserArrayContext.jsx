import { useState, createContext } from "react";

export const UsersArrContext = createContext();

export function UsersArrProvider({ children }) {
  const [usersArr, setUsersArr] = useState(["11"]);
  return (
    <UsersArrContext.Provider value={{usersArr, setUsersArr}}>{children}</UsersArrContext.Provider>
  );
}
