"use client"

import styles from "./AboutUs.module.css"
import { easeInOut, motion } from "framer-motion"

const textVariants = {
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

const textContainerVariants = {
    show: {
        width: ["0%", "100%"], 
        height: ["0vh", "100vh"],
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

const titleVariants = {
    show: {
        scaleY: 1,
        transition: {
            duration: 1
        }
    },

    hidden: {
        scaleY: 0,
    }
}

const textStaggerVariants = {
    show: {transition: {staggerChildren: .03}}
}

export default function AboutUs({text}: aboutUs) {


    const phrase = text
    const title = "About us"

    const textWords = phrase.split(" ").map((char, index) => {
        return (
            <motion.h2 className={styles.text} variants={textVariants} style={{position: "relative", marginRight: ".4em"}} key={index}>{char}</motion.h2>
        )
    })

    const titleWords = title.split(" ").map((char, index) => {
            return (
                <motion.h1 className={styles.text} variants={textVariants} style={{position: "relative", marginRight: ".4em"}} key={index}>{char}</motion.h1>
            )
        })


    return (
        <motion.div initial="hidden" whileInView="show" variants={{show: {transition: {staggerChildren: 1}}}} id="section-aboutUs" className={styles.container}>

                <motion.div variants={textContainerVariants} className={styles.animation_object}></motion.div>

                <motion.div variants={textStaggerVariants} className={styles.title}>
                    {titleWords}
                </motion.div>

                <motion.div className={styles.we_are}>
                    <h1>We are </h1>
                    <motion.div>
                        <motion.h1>Full-stack developers</motion.h1>
                    </motion.div>
                </motion.div>

                <motion.div variants={textStaggerVariants} className={styles.text_container}>
                    {textWords}
                </motion.div>

        </motion.div>
    )
}