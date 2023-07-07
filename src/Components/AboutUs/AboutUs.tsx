"use client"

import styles from "./AboutUs.module.css"
import { easeInOut, motion } from "framer-motion"

const textVarients = {
    hidden: {
        opacity: 0, 
        left: "1em"
    },

    show: {
        opacity: 1, 
        left: "0em", 
        transition: {
            duration: .2
        }
    }
}

const textContainerVarients = {
    show: {
        width: ["0%", "100%"], 
        height: ["0%", "100%"],
        borderRadius: ["100%", "0%"],
        transition: {
            delay: 0,
            duration: .6,
            type: "tween",
            stiffeness: 100,
            ease: easeInOut
        }
    },
    hidden: {
        width: "0",
        height: "0",
        borderRadius: "0%",
    }
}

export default function AboutUs({text}: aboutUs) {

    const phrase = text
    const words = phrase.split(" ").map((char, index) => {
        return (
            <motion.h1 className={styles.text} variants={textVarients} style={{position: "relative", marginRight: ".4em"}} key={index}>{char}</motion.h1>
        )
    })

    return (
        <motion.div initial="hidden" whileInView="show" variants={{}} id="section-aboutUs" className={styles.container}>

            <motion.div variants={textContainerVarients} className={styles.animation_object}></motion.div>

            <motion.div variants={{show: {transition: {staggerChildren: .05}}}} className={styles.text_container}>
                {words}
            </motion.div>

        </motion.div>
    )
}