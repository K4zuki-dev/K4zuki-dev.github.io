"use client"
import styles from "./landing-div.module.css"
import { ReactNode, useEffect, useRef } from "react"
import { easeInOut, motion, useAnimation, useInView, useMotionValue, useScroll, useSpring, useTransform } from "framer-motion"
import Image from "next/image"

const delaySentence: number = 3
const delayWithUs: number = delaySentence+1.5

type LandingProps = {
    imgAnimation: number[]
}

const container = {
    show: {
      transition: {
        staggerChildren: 0.1,
        delayChildren: delaySentence,
      }
    }
}

const item = {
    hidden: {
        opacity: 0,
        y: "-3em"
    },
    show: { 
        opacity: 1,
        y: "0" 
    }
}

const item2 = {
    hidden: {
     y: "3em",
     opacity: 0,
},
    show: {
        y: "0em",
        opacity: 1,
        transition: {
            ease: easeInOut,
            duration: .2,
        }
}
}


export default function Landing({imgAnimation}: LandingProps) {
    const startAnim = useAnimation()
    const containerRef = useRef(null)
    const startInView = useInView(containerRef, {once: true})

    const {scrollYProgress} = useScroll({
        target: containerRef,
        offset: ["start start", "end start"]
    })

    const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"])
    const textY = useTransform(scrollYProgress, [0, 1], ["0%", "200%"])

    const [moveX] = imgAnimation

    useEffect(() => {
        if (startInView) {
            setTimeout(() => {
                startAnim.start("show")
            }, delaySentence*1000)
        }
    }, [startAnim, startInView])

    const words: string[] = ["Bring", "your", "dreams", "and", "ambitions", "to", "life"]
    const elems: ReactNode[] = words.map((word) => {
        return <motion.h1 variants={item} key={word} className={`${styles.landing_fade_in} ${(word === "ambitions" || word === "life" || word === "dreams") ? (styles.color_accent) : (styles.color_white)}`}>{word}</motion.h1>
    })


    return (
        <>

        <div ref={containerRef} className={styles.landing_div} id="section-landingdiv">

            <motion.div style={{x: moveX, y: backgroundY}} className={styles.parallax_background}>
                <Image
                    src={`/images/parallax_background.jpg?ver=${Date.now()}`}
                    alt="Test"
                    fill={true}
                >
                </Image>
            </motion.div>

            <motion.div style={{x: -moveX/2, y: textY}} className={styles.landing_div_text}>

                <motion.div initial="hidden" animate={startAnim} variants={container} className={styles.landing_div_sentence}>
                            {elems}
                </motion.div>

                <motion.div initial="hidden" animate={startAnim} variants={{show: {transition: {staggerChildren: .2, delayChildren: delayWithUs}}}} style={{display: "flex", alignItems: "center", gap: ".2rem", justifyContent: "center"}}>
                    <motion.h1 variants={item2} className={styles.color_accent}>With</motion.h1> 
                    <motion.h1 variants={item2} className={styles.color_accent}>us.</motion.h1>
                </motion.div>

            </motion.div>

            <div className={styles.parallax}>
                <Image
                    src={`/images/parallax.png?ver=${Date.now()}`}
                    alt="Parallax Effect Picture"
                    fill={true}
                ></Image>
            </div>

        </div>


        </>
    )
}