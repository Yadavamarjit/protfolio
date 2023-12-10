import { motion } from "framer-motion";

import { styles } from "../styles";
import { useEffect, useState } from "react";

const Hero = () => {
  const [text, setText] = useState("");
  const techStack = [
    "JavaScript",
    "ReactJs",
    "NodeJs",
    "ExpressJs",
    "Python",
    "AWS",
    "Fire Base",
    "GraphQL",
    "MongoDB",
  ];
  const [phraseIndex, setPhraseIndex] = useState(0);
  const currentPhrase = techStack[phraseIndex];
  const speed = 50;

  useEffect(() => {
    let timer = setTimeout(() => {
      setText(currentPhrase.substring(0, text.length + 1));
    }, speed);

    if (text === currentPhrase) {
      clearTimeout(timer);
      setTimeout(() => {
        setPhraseIndex((phraseIndex + 1) % techStack.length);
        setText("");
      }, 1500); // Wait for 1.5 seconds before displaying the next phrase
    }

    return () => clearTimeout(timer);
  }, [text, currentPhrase, phraseIndex, techStack]);
  return (
    <section className={`relative w-full h-screen mx-auto`}>
      <div
        className={`absolute inset-0 top-[120px]  max-w-7xl mx-auto ${styles.paddingX} flex flex-row items-start gap-5`}
      >
        <div className="flex flex-col justify-center items-center mt-5">
          <div className="w-5 h-5 rounded-full bg-[#915EFF]" />
          <div className="w-1 sm:h-80 h-40 violet-gradient" />
        </div>

        <div>
          <h1 className={`${styles.heroHeadText} text-white`}>
            Hi, I'm <span className="text-[#915EFF]">Yadav Amerjit</span>
          </h1>
          <p className={`${styles.heroSubText} mt-2 text-white-100`}>
            Fullstack Dev, crafting seamless experiences.
            <br className="sm:block hidden" /> Innovator and problem solver.
          </p>
          <p className={`${styles.heroSubText} mt-2 text-white-100`}>
            I craft applications using{" "}
            <span className="text-[#FFF78A]">{text + "."}</span>
          </p>
        </div>
      </div>

      <div className="absolute xs:bottom-10 bottom-32 w-full flex justify-center items-center">
        <a href="#about">
          <div className="w-[35px] h-[64px] rounded-3xl border-4 border-secondary flex justify-center items-start p-2">
            <motion.div
              animate={{
                y: [0, 24, 0],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatType: "loop",
              }}
              className="w-3 h-3 rounded-full bg-secondary mb-1"
            />
          </div>
        </a>
      </div>
    </section>
  );
};

export default Hero;
