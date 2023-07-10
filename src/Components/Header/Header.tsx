"use client"

import styles from "./Header.module.css"
import Image from "next/image"

import { Variants, easeOut, motion, useScroll, useTransform } from "framer-motion"



const buttonVarients: Variants = {
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


    return (
        <>
            <header className={styles.header} style={{}}>

                <div className={styles.header_top}>
                    <div className={styles.logo}>
                      
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
            </header>
        </>
    )
}

function HeaderButton({text, scrollId}: NavButton) {

    const scrollToSection = () => {
        const sectionElement = document.getElementById(scrollId);
        if (sectionElement) {
          window.scrollTo({
            top: sectionElement.offsetTop,
            behavior: "smooth",
          });
        }
      };

    return (
        <motion.div whileHover="visible" initial="hidden" variants={{}} className={styles.button_container} onClick={scrollToSection}>
            <motion.button className={styles.navButton}>{text}</motion.button>
            <motion.div variants={buttonVarients} className={styles.button_border}></motion.div>
        </motion.div>
    )
}
