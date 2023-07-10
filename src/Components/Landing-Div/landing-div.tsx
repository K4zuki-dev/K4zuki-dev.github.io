"use client"

import styles from "./landing-div.module.css"
import { ReactNode } from "react"
import { easeInOut, motion } from "framer-motion"

const delaySentence: number = .5
const delayWithUs: number = delaySentence+1

const container = {
    show: {
      transition: {
        staggerChildren: 0.1,
        delayChildren: delaySentence,
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
            delay: delayWithUs,
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
        <div className={styles.landing_div} id="section-landingdiv">

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

        </>
    )
}