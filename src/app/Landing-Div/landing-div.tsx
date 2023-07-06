"use client"

import styles from "./landing-div.module.css"
import { ReactNode } from "react"
import { easeInOut, motion } from "framer-motion"

import Header from "@/Header/Header"

const container = {
    show: {
      transition: {
        staggerChildren: 0.1,
        delayChildren: 1,
      }
    }
}

const item = {
    hidden: { },
    show: { top: "0px" }
}

const item2 = {
    hidden: { y: "3em" },
    show: { 
        y: "0em",
        transition: {
            ease: easeInOut,
            duration: .2,
            delay: 2.5,
        }
}
}


export default function Landing() {

    const words: string[] = ["Bring", "your", "dreams", "and", "ambitions", "to", "life"]
    const elems: ReactNode[] = words.map((word) => {
        return <motion.h1 variants={item} key={word} className={`${styles.landing_fade_in} ${styles.active} ${(word === "ambitions" || word === "life" || word === "dreams") ? (styles.color_accent) : (styles.color_white)}`}>{word}</motion.h1>
    })


    return (
        <>
        <div className={styles.landing_div}>

            <div className={styles.overlay}>

            </div>

            <div className={styles.landing_div_text}>
                
                <motion.div initial="hidden" animate="show" variants={container} className={styles.landing_div_sentence}>
                        {elems}
                </motion.div>
                    
                <motion.div>
                    <motion.h1 initial="hidden" animate="show" variants={item2} id={styles.withUs}>With us.</motion.h1>
                </motion.div>

            </div>

            <div className={styles.overlay}></div>

        </div>

        <Header></Header>

        </>
    )
}