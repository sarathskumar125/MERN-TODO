import { createContext, useState } from "react";

export const Store = createContext();

export function StoreProvider(props) {
  const [todo, setTodo] = useState([]);

  const userData = localStorage.getItem("USERINFO") ? JSON.parse(localStorage.getItem("USERINFO")) : null;
  
  const [user, setUser] = useState(userData)

 
  const todoValue = [ todo, setTodo ];
  const userValue = {user ,setUser};
  // const value = { todo, user, setTodo, setUser }
  return <Store.Provider value={{todoValue, userValue }}>{props.children}</Store.Provider>;
}
    