import React from "react";

import { BallCanvas } from "./canvas";
import { SectionWrapper } from "../hoc";
import { technologies } from "../constants";
import { useUserContext } from "../context/UserProvider";

const Tech = () => {
  //  const { basicInfo } = useUserContext();
  //  const [techStacks, setTechStacks] = useState([]);

  //  useEffect(() => {
  //    (async () => {
  //      const techs = basicInfo.techStacks;
  //      if (techs.length) {
  //        const res = await fetch("GET", "techs/" + techs.toString());
  //        console.log(res);
  //        setTechStacks(res);
  //      }
  //    })();
  //  }, []);
  return (
    <div className="flex flex-row flex-wrap justify-center gap-10">
      {technologies.map((technology) => (
        <div className="w-28 h-28" key={technology.name}>
          <BallCanvas icon={technology.icon} />
        </div>
      ))}
    </div>
  );
};

export default SectionWrapper(Tech, "");
