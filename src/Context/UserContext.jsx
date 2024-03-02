import axios from "axios";
import { createContext, useEffect, useState } from "react";
export let userContext = createContext();
export default function UserContextProvider(props) {
  let [token, setToken] = useState("");
  let [firstName, setFirstName] = useState("");
  let [role, setRole] = useState("");

  return (
    <>
      <userContext.Provider
        value={{ token, setToken, firstName, setFirstName, role, setRole }}
      >
        {props.children}
      </userContext.Provider>
    </>
  );
}
