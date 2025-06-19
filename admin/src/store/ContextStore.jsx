import { createContext } from "react";
export const ContextStore = createContext({});
export const ContextStoreProvider = (props) => {
  const url = "http://localhost:3000";
  return (
    <ContextStore.Provider value={{ url }}>
      {props.children}
    </ContextStore.Provider>
  );
};
