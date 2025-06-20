import { useState } from "react";
import { createContext } from "react";
export const ContextStore = createContext({});
export const ContextStoreProvider = (props) => {
  const url = "https://praneiz-bcakend.onrender.com";
  const [atoken, setaToken] = useState(
    localStorage.getItem("atoken") ? localStorage.getItem("atoken") : ""
  );
  return (
    <ContextStore.Provider value={{ url, atoken, setaToken }}>
      {props.children}
    </ContextStore.Provider>
  );
};
