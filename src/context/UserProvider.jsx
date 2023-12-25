import React, { createContext, useState, useContext, useEffect } from "react";
import { changeFaviconAndTitle, fetch, getUserName } from "../utils/util";
import { addVisitors } from "../utils/visitorsUtils";

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [userData, setUserData] = useState({});

  useEffect(() => {
    (async () => {
      try {
        const userId = getUserName() ?? import.meta.env.VITE_APP_ADMIN_ID;
        const userData = await fetch("GET", userId);

        const { email, profilePic, name } = userData;
        changeFaviconAndTitle(profilePic ?? "", name);

        if (!localStorage.getItem("email") && email) {
          localStorage.setItem("email", email);
          addVisitors();
        }
      } catch (err) {
        console.log(userData);
      }
    })();
  }, []);

  return (
    <UserContext.Provider value={{ userData, setUserData }}>
      {children}
    </UserContext.Provider>
  );
};

const useUserContext = () => useContext(UserContext);

export { UserProvider, useUserContext };
