"use client"

import styles from "./Header.module.css"
import Image from "next/image"

import { Variants, easeOut, motion, useScroll, useTransform } from "framer-motion"
import { useEffect, useState } from "react"

const buttonVariants: Variants = {
    hidden: {
        scaleX: 0
    },

    visible: {
        scaleX: 1   ,
        transition: {
            duration: .2,
            ease: easeOut
        }
    }
}

export default function Header() {
    const {scrollYProgress} = useScroll()
    const {scrollY} = useScroll()

    const [divHeight, setDivHeight]: [number, Function] = useState(0)

    useEffect(() => {
        setDivHeight(document.getElementById("section-landingdiv")?.getBoundingClientRect().bottom as number)
    }, [setDivHeight])

    const opacityFade = useTransform(scrollY, [divHeight-300, divHeight-200], [0, 1])

    function scrollUp() {
        window.scrollTo({top: 0, behavior: "smooth"})
    }

    return (
        <>
            <motion.header className={styles.header} style={{opacity: opacityFade}}>

                <div className={styles.header_top}>
                    <div onClick={scrollUp} className={styles.logo}>
                      
                        <Image src="/images/logo.jpg" alt="Our Logo" fill={true} sizes="5em" className={styles.logo} />

                    </div>

                    <nav className={styles.navBar}>
                        <HeaderButton text="About us" scrollId="section-aboutUs"></HeaderButton>
                        <HeaderButton text="Skills" scrollId="section-skills"></HeaderButton>
                        <HeaderButton text="Portfolio" scrollId="section-portfolio"></HeaderButton>
                        <HeaderButton text="Contact" scrollId="section-contact"></HeaderButton>
                    </nav>
                </div>

                <motion.div style={{scaleX: scrollYProgress}} className={styles.header_bottom}></motion.div>
            </motion.header>
        </>
    )
}

function HeaderButton({text, scrollId}: NavButton) {

    const scrollToSection = () => {
        const sectionElement = document.getElementById(scrollId);
        if (sectionElement) {
          window.scrollTo({
            top: sectionElement.offsetTop-100,
            behavior: "smooth",
          });
        }
      };

    return (
        <motion.div whileHover="visible" initial="hidden" variants={{}} className={styles.button_container} onClick={scrollToSection}>
            <motion.button className={styles.navButton}>{text}</motion.button>
            <motion.div variants={buttonVariants} className={styles.button_border}></motion.div>
        </motion.div>
    )
}
