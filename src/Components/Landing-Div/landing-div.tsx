"use client"

import styles from "./landing-div.module.css"
import { ReactNode, useEffect, useRef } from "react"
import { easeInOut, motion, useAnimation, useInView } from "framer-motion"

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
        }
}
}


export default function Landing() {

    const startAnim = useAnimation()
    const containerRef = useRef(null)
    const startInView = useInView(containerRef, {once: true})

    useEffect(() => {
        if (startInView) {
            setTimeout(() => {
                startAnim.start("show")
            }, 1000)
        }
    }, [startInView])

    const words: string[] = ["Bring", "your", "dreams", "and", "ambitions", "to", "life"]
    const elems: ReactNode[] = words.map((word) => {
        return <motion.h1 variants={item} key={word} className={`${styles.landing_fade_in} ${styles.active} ${(word === "ambitions" || word === "life" || word === "dreams") ? (styles.color_accent) : (styles.color_white)}`}>{word}</motion.h1>
    })


    return (
        <>
        <div ref={containerRef} className={styles.landing_div} id="section-landingdiv">

            <div className={styles.overlay}>

            </div>

            <div className={styles.landing_div_text}>

                <motion.div initial="hidden" animate={startAnim} variants={container} className={styles.landing_div_sentence}>
                        {elems}
                </motion.div>

                <motion.div initial="hidden" animate={startAnim} variants={{show: {transition: {staggerChildren: .2, delayChildren: delayWithUs}}}} className={styles.withus}>
                    <motion.h1 variants={item2} className={styles.color_accent}>With</motion.h1> 
                    <motion.h1 variants={item2} className={styles.color_accent}>us.</motion.h1>
                </motion.div>

            </div>

            <div className={styles.overlay}></div>

        </div>

        </>
    )
}