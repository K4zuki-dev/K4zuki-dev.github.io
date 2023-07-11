/* eslint-disable @next/next/no-async-client-component */

import { Variants, easeOut, motion, useAnimation, useInView } from "framer-motion";
import { ReactNode, useRef, useState } from "react";
import styles from "./Portfolio.module.css";
import Image from "next/image";
import { useEffect } from "react";

const gridItemVariants: Variants = {
  show: {opacity: 1, top: "0em", transition: {duration: .5, ease: easeOut}},
  
  hidden: {opacity: 0, top: "5em"}
}

async function getData() {
  const res = await fetch("/api/portfolio", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data: Sites[] = await res.json();

  return data;
}

function GridContainer(data: Sites[]) {
  const paginatedWork: ReactNode[] = data.map((Site) => {
    return (
      GridItem(Site)
    );
  });

  return paginatedWork;
}

function GridItem({title="Default", img="image.png", description="defaultdefaultdefault"}:Sites) {
  const src = img

  return (
    <motion.div variants={gridItemVariants} key={title} className={styles.wrapper}>
        <div className={styles.flip_card}>
          <div className={styles.flip_card_inner}>

            <div className={styles.flip_card_front}>
              <Image
                src={`/images/portfolio/${src}`}
                fill={true}
                alt="Image of one of our Project website"
                className={styles.portfolio_image}
                sizes="(max-width: 700px) 100vw, (max-width: 1200px) 50vw, 33vw"
              ></Image>
            </div>

            <div className={styles.flip_card_back}>
              <div className={styles.flip_card_back_text}>
                <h1>{title}</h1>
                <p>{description}</p>
              </div>
            </div>

          </div>
        </div>
      </motion.div>
  )
}

function AnimatedTitle({title}: PortfolioTitle) {
  const charVariants: Variants = {
    show: {
      opacity: 1,
      bottom: "0",
      transition: {
        duration: .3,
        type: "spring",
        stiffness: 100
      }
    },
    hidden: {
      opacity: 0,
      bottom: "3em"
    }
  }

  const letters = title.split("").map((char, index) => {
      return <motion.h1 key={index} variants={charVariants} style={{position: "relative"}}>{char}</motion.h1>
  })

  return letters
}

export default function Portfolio() {
  const [data, setData] = useState<Sites[]>([]);

  const portfolioAnim = useAnimation()
  const portfolioRef = useRef(null) // An reference to an element
  const portfolioInView = useInView(portfolioRef, {once: true})

  const titleAnim = useAnimation()
  const containerRef = useRef(null)
  const containerInView = useInView(containerRef)

  useEffect(() => {
    portfolioAnim.start("show")
  }, [portfolioInView, portfolioAnim])

  useEffect(() => {

    containerInView ? (titleAnim.start("show")) : (titleAnim.set("hidden"))

  }, [containerInView, titleAnim])

  useEffect(() => {
    async function fetchAndSetData() {
      const data = await getData();
      setData(data);
    }

    fetchAndSetData();
  }, []);

  return (
    <div ref={containerRef}>
      <motion.div initial="hidden" animate={portfolioAnim} variants={{}} transition={{staggerChildren: .2}} style={{display: "flex", backgroundColor: "var(--clr-background)", padding: "0 15vw", fontSize: "200%"}}>
          <AnimatedTitle title="Portfolio"></AnimatedTitle>
      </motion.div>
      
      <motion.div
          ref={portfolioRef} // This will tell the useRef what the Element is and where it is

          initial="hidden" // This gets passed
          animate={portfolioAnim} // Those get passed to the children IF VARIANTS IS DEFINED

          variants={{}} // U use this if you want the children to animate in an orchestration with the parent
          transition={{staggerChildren: .5}}
          className={styles.portfolio_container}
          id="section-portfolio"
        >
          {GridContainer(data)}
      </motion.div>
    </div>
  );
}
