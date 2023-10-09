'use client'
import Landing from "@/Components/Landing-Div/landing-div";
import Portfolio from "@/Components/Portfolio/Portfolio";
import Contact from "@/Components/Contact/Contact";
import AboutUs from "@/Components/AboutUs/AboutUs";
import Skills from "@/Components/Skills/Skills";

import {useState, useEffect, useRef} from "react"
import Header from "@/Components/Header/Header";
import Footer from "@/Components/Footer/Footer";

import styles from "./page.module.css"
import { motion, useAnimate, useAnimation, Variants } from "framer-motion";

const loadingVariants: Variants = {
  start: {
    backgroundColor: "var(--clr-invalid)",
    y: "0em"
  },

  loading: {
    backgroundColor: "var(--clr-invalid)",
    y: ["0em", "-2em", "0em"], 
    transition: {
      repeat: Infinity,
      ease: "easeOut",
      duration: .5,
      repeatDelay: 1
    }
  },

  done: {
    backgroundColor: "var(--clr-primary)",
    y: "0em"
  },
}

const removeLoadingVariants: Variants = {
  start: {
    scaleY: 1
  },
  remove: {
    scaleY: 0,
    transition: {
      ease: "easeOut",
    }
  }
}

export default function Main() {
  // Starting animation:
  
  const loadingAnimControls = useAnimation()

  useEffect(() => {
    // Loading animation and block scrolling so you think its still loading
    loadingAnimControls.start("loading")
    document.documentElement.style.overflow = "hidden"

    setTimeout(() => {
      // Finishing up
      loadingAnimControls.start("done")
      console.log("test")

      setTimeout(() => {
        // Removing the Loading screen, showing page
        document.documentElement.style.overflow = "scroll"
        loadingAnimControls.start("remove")
      }, 2000)
    }, 3000)
  }, [])

  
  // The thememode switch
  const [theme, setTheme] = useState("dark");

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  useEffect(() => {
    document.body.dataset.theme = theme;
  }, [theme]);

  const aboutUsText: string =
    "Step into our world of full-stack development as we unleash our passion for turning ideas into digital realities. With a commitment to transforming your online presence, we specialize in crafting captivating websites and intuitive web applications. Our seamless user experiences are designed to leave a lasting impression. Explore our portfolio and join us on an exciting journey of innovation and creativity. Together, let's unlock the full potential of your digital vision with our unrivaled expertise!";

  // Landing Div Parallax
  const [[moveX, moveY], setMove] = useState([0, 0])

  function handleMouseMove(e: { clientX: number; clientY: number; }) {
    const { clientX, clientY } = e
    const offsetFactor = 15
    const moveX = (clientX - window.innerWidth / 2) / offsetFactor
    const moveY = (clientY - window.innerHeight / 2) / offsetFactor

    setMove([moveX, moveY])
}

  return (
    <>
        <motion.div animate={loadingAnimControls} initial="start" variants={removeLoadingVariants} transition={{staggerChildren: .15}} onMouseMove={handleMouseMove} className={styles.container}>
          <motion.div variants={loadingVariants} className={styles.ball}></motion.div>
          <motion.div variants={loadingVariants} className={styles.ball}></motion.div>
          <motion.div variants={loadingVariants} className={styles.ball}></motion.div>
        </motion.div>

      <main>
        <Header toggleTheme={toggleTheme} />

        <Landing imgAnimation={[moveX, moveY]}/>
        <AboutUs text={aboutUsText} />
        <Skills />
        <Portfolio />
        <Contact />

        <Footer />
      </main>
    </>
  );
}
