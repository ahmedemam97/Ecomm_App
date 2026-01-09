import { createContext, useState } from "react";

export let UserContext = createContext();

export default function UserContextProvider(props) {
  let [userToken, setUserToken] = useState(null);
  let [userData, setUserData] = useState(null);

  return (
    <UserContext.Provider
      value={{ userToken, setUserToken, userData, setUserData }}
    >
      {props.children}
    </UserContext.Provider>
  );
}
