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

        setProjects([
          {
            projectName: "Fruit Catcher",
            description:
              "In this engaging fruit catcher game, players strive to catch falling fruits while avoiding obstacles. The game features a dynamic leaderboard to track top scores, and various in-game power-ups that enhance the gameplay experience. With its intuitive mechanics and exciting challenges, players are rewarded for their skills and quick reflexes as they compete for the highest score.",
            img: "https://firebasestorage.googleapis.com/v0/b/potfolio-backend.appspot.com/o/1723885548610_Screencastfrom2024-08-1300-51-19-ezgif.com-video-to-gif-converter.gif?alt=media&token=784564de-a40b-434c-a42e-5e647fdbed2b",
            techs: ["React", "ExpressJS", "MongoDB", "Javascript"],
            _id: "66c057d093f67581f89e9e7a",
            link: "https://fruits-catcher.netlify.app/",
          },
          {
            projectName: "StockScope",
            description:
              "A dynamic user interface that displays real-time stock prices and their detailed analysis, powered by mock data. Designed for intuitive use, it offers insights into stock trends, enabling users to efficiently track and assess stock performance.",
            img: "https://firebasestorage.googleapis.com/v0/b/potfolio-backend.appspot.com/o/Screencastfrom2024-09-2215-22-12-ezgif.com-optimize.gif?alt=media&token=0e95e191-901d-4f7b-8079-d740dc0fe7c7",
            techs: ["React", "Javascript"],
            id: "3",
            _id: "66efe7eb132c12b5e58b8ff0",
            link: "https://tradingscreen.netlify.app/",
          },
          {
            projectName: "QTrip",
            description:
              "Your virtual travel hub for immersive exploration. Discover destinations with tags like cycling and skiing, simulate reservations, and manage bookings. Experience hourly activity booking and dive into detailed descriptions and images. Plan your dream journey authentically without real transactions – an innovative way to connect with travel interests.",
            img: "https://firebasestorage.googleapis.com/v0/b/potfolio-backend.appspot.com/o/1705453911139_qtrip.png?alt=media&token=26526642-e083-460d-af18-c205f4b5651f",
            techs: ["ExpressJS", "React", "NodeJS", "Javascript"],
            _id: "659e1230eb79e5405baff94f",
          },
          {
            projectName: "QKart",
            description:
              'Qkart is an e-commerce web app designed to offer a seamless shopping experience. It features user authentication, allowing secure access to personalized accounts. The app also includes an "Add to Cart" functionality, enabling users to easily manage their desired products. Additionally, Qkart offers a demo payment system, providing a complete and interactive shopping experience from selection to checkout.',
            img: "https://firebasestorage.googleapis.com/v0/b/potfolio-backend.appspot.com/o/1705451392416_Screenshot%202024-01-17%20055826.png?alt=media&token=7b89a1cd-26a4-4546-82fb-5fb4ba22609d",
            techs: ["React", "ExpressJS", "MongoDB", "Javascript"],
            _id: "66c057d093f67581f89e9e7a",
          },
        ]);
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
