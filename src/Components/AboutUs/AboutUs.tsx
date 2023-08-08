/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./AboutUs.module.css";
import { motion, useAnimation, useCycle, useInView } from "framer-motion";
import { Variants } from "framer-motion";

const textVariants: Variants = {
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

const sliderVarients: Variants = {
  rightToLeft: {
    left: "-100%",
    right: "0%",
    transition: {
      ease: "easeInOut",
      duration: 1.3,
    },
  },

  leftToRight: {
    left: "0%",
    right: "-100%",
    transition: {
      ease: "easeInOut",
      duration: 1,
    },
  },

  hiddenRight: {
    left: "100%",
    right: "0%",
  },
  hiddenLeft: {
    left: "0%",
    right: "100%",
  },
};

export default function AboutUs({ text }: aboutUs) {
  const sliderAnim = useAnimation(); // The changing text
  const ContainerAnim = useAnimation(); // The container getting smaller
  const textAnim = useAnimation(); // Text

  const containerRef = useRef(null);

  const textRef = useRef(null);
  const textinView = useInView(textRef, {once: true});

  // U may add words here, or delete some if you want, those are the ones being switched through

  const words: string[] = [
    "Programmers",
    "Creating sites",
    "Sleep deprived",
    "Working hard",
  ];
  const [curText, cycleCurText] = useCycle(...words);

  // Calculating the width of the longest word:
  const [longestWordWidth, setLongestWordWidth] = useState(0);

  useEffect(() => {
    const words = [
      "programming",
      "web",
      "developing",
      "fullstack",
      "developers",
    ];
    let maxWidth = 0;

    // Calculate the width of each word and find the maximum width
    words.forEach((word) => {
      const wordWidth = getTextWidth(word);
      maxWidth = Math.max(maxWidth, wordWidth);
    });

    setLongestWordWidth(maxWidth);
  }, []);

  function getTextWidth(text: string) {
    const maxLetterWidth = 40;
    const wordWidth: number = text.split("").length * maxLetterWidth;

    return wordWidth;
  }

  // Fires when the actual text is in view
  useEffect(() => {
    if (textinView) {
      textAnim.start("show");
      ContainerAnim.start("show");
    } else {
      ContainerAnim.set("hidden");
    }
  }, [textinView]);

  // Fires when text rotates
  useEffect(() => {
    setTimeout(async () => {
      sliderAnim.set("hiddenRight");
      sliderAnim.start("rightToLeft");
      setTimeout(cycleCurText, 750);
    }, 4000);
  }, [curText]);

  const phrase = text;
  const title = "About us";

  const textWords = phrase.split(" ").map((char, index) => {
    return (
      <motion.p
        className={styles.text}
        variants={textVariants}
        style={{ position: "relative", marginRight: ".4em" }}
        key={index}
      >
        {char}
      </motion.p>
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
    <motion.div id="section-aboutUs" className={styles.container} >

      <div style={{width: "100%"}}>
        <div className={styles.we_are}>
            <h1>We are </h1>

            <motion.h1
              animate={sliderAnim}
              className={styles.slider_container}
              style={{ width: longestWordWidth }}
            >
              {curText}

              <motion.div
                variants={sliderVarients}
                className={styles.slider_1}
              ></motion.div>
            </motion.h1>
          </div>
      </div>

      <motion.div
        ref={textRef}
        initial="hidden"
        animate={textAnim}
        variants={{ show: { transition: { staggerChildren: 0.06 } } }}
        className={styles.text_container}
      >
        {textWords}
      </motion.div>
    </motion.div>
  );
}
