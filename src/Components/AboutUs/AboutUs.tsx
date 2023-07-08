"use client";

import { useEffect, useRef } from "react";
import styles from "./AboutUs.module.css";
import {
  easeInOut,
  motion,
  stagger,
  useAnimation,
  useCycle,
  useInView,
} from "framer-motion";

const textVariants = {
  hidden: {
    opacity: 0,
    left: "1em",
  },

  show: {
    opacity: 1,
    left: "0em",
    transition: {
      duration: 0.2,
    },
  },
};

const textContainerVariants = {
  show: {
    width: ["0%", "100%"],
    height: ["0vh", "100vh"],
    borderRadius: ["100%", "0%"],
    transition: {
      delay: 0,
      duration: 0.6,
      type: "tween",
      stiffeness: 100,
      ease: easeInOut,
    },
  },
  hidden: {
    width: "0",
    height: "0",
    borderRadius: "0%",
  },
};

const titleVariants = {
  show: {
    scaleY: 1,
    transition: {
      duration: 1,
    },
  },

  hidden: {
    scaleY: 0,
  },
};
const sliderVarients = {
  show: {
    scaleX: [0, 1.1, 0],
    transformOrigin: "left",
    transition: {
      ease: "easeInOut",
      duration: 1,
    },
  },

  hidden: {
    scaleX: 0,
  },
};

export default function AboutUs({ text }: aboutUs) {
  const sliderAnim = useAnimation();
  const textAnim = useAnimation();

  const letterWidth = 72
  let textLetters: number = 1

  const textRef = useRef(null);
  const textInView = useInView(textRef, { once: true });

  const [curText, cycleCurText] = useCycle(
    "Programmers",
    "Fullstack Devs",
    "Sleep drained"
  );
    // U may add words here, or delete some if you want, those are the ones being switched through



  useEffect(() => {
    if (textInView) {
      textAnim.start("show");
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [textInView]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    textLetters = curText.split("").length

    setTimeout(() => {
      sliderAnim.start("show");
      setTimeout(cycleCurText, 600);



    }, 4000);
  }, [curText]);

  const phrase = text;
  const title = "About us";

  const textWords = phrase.split(" ").map((char, index) => {
    return (
      <motion.h2
        className={styles.text}
        variants={textVariants}
        style={{ position: "relative", marginRight: ".4em" }}
        key={index}
      >
        {char}
      </motion.h2>
    );
  });

  const titleWords = title.split(" ").map((char, index) => {
    return (
      <motion.h1
        className={styles.text}
        variants={textVariants}
        style={{ position: "relative", marginRight: ".4em" }}
        key={index}
      >
        {char}
      </motion.h1>
    );
  });

  return (
    <motion.div
      ref={textRef}
      animate="show"
      variants={{}}
      id="section-aboutUs"
      className={styles.container}
    >
      <motion.div
        variants={textContainerVariants}
        className={styles.animation_object}
      ></motion.div>

     <div style={{zIndex: 1, display: "flex", justifyContent: "center", alignItems: "center", width: "100%"}}>
        <motion.div className={styles.we_are}>
            <h1 style={{ width: "fit-content", textAlign: "right"}}>We are </h1>

            <motion.h1
            initial="hidden"
            animate={sliderAnim}
            variants={{ show: { transition: { staggerChildren: 0.2 } } }}
            style={{position: "relative", textAlign: "left"}}
            className={styles.we_are_h1}
            >
            {curText}

                <motion.div
                    variants={sliderVarients}
                    style={{
                    position: "absolute",
                    width: `${letterWidth*textLetters}px`,
                    height: "100%",
                    backgroundColor: "purple",
                    top: 0,
                    }}
                ></motion.div>

                <motion.div
                    variants={sliderVarients}
                    style={{
                    position: "absolute",
                    width: "100%",
                    height: "100%",
                    backgroundColor: "blue",
                    top: 0,
                    }}
                ></motion.div>
            </motion.h1>
        </motion.div>
     </div>

      <motion.div
        initial="hidden"
        animate={textAnim}
        variants={{ show: { transition: { staggerChildren: 0.03 } } }}
        className={styles.text_container}
      >
        {textWords}
      </motion.div>
    </motion.div>
  );
}
