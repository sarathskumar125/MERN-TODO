import { createContext, useState } from "react";

export const Store = createContext();

export function StoreProvider(props) {
  const [todo, setTodo] = useState([]);
  const value = { todo, setTodo };
  return <Store.Provider value={value}>{props.children}</Store.Provider>
}
