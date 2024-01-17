import React, { createContext, useState, useContext, useEffect } from "react";
import { changeFaviconAndTitle, fetch, getUserName } from "../utils/util";
import { addVisitors } from "../utils/visitorsUtils";

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [basicInfo, setBasicInfo] = useState({});
  const [projects, setProjects] = useState([]);
  const [experiences, setExperiences] = useState([]);
  const [userLoading, setUserLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const userId = getUserName() ?? import.meta.env.VITE_APP_ADMIN_ID;
        const userData = await fetch("GET", userId);

        const {
          experiences,
          projects,
          email,
          heading,
          name,
          profilePic,
          profession,
          techStacks,
          subHeader,
          overView,
        } = userData;
        changeFaviconAndTitle(profilePic ?? "", name);

        setBasicInfo({
          email,
          heading,
          name,
          profession,
          profilePic,
          techStacks,
          subHeader,
          overView,
        });

        setProjects([...projects]);
        setExperiences([...experiences]);

        if (!localStorage.getItem("email") && email) {
          localStorage.setItem("email", email);
          addVisitors();
        }
        setUserLoading(false);
      } catch (err) {
        console.log(userData);
        setUserLoading(false);
      }
    })();
  }, []);

  return (
    <UserContext.Provider
      value={{
        basicInfo,
        setBasicInfo,
        projects,
        setProjects,
        experiences,
        setExperiences,
        userLoading,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

const useUserContext = () => useContext(UserContext);

export { UserProvider, useUserContext };
