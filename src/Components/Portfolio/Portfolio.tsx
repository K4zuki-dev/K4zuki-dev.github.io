/* eslint-disable @next/next/no-async-client-component */

import { easeOut, motion } from "framer-motion";
import { ReactNode, useState } from "react";
import styles from "./Portfolio.module.css";
import Image from "next/image";
import { useEffect } from "react";

const container = {
  show: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 1,
      duration: 0.5,
      ease: easeOut,
      type: "bounce",
    },
    right: "0",
  },
  hidden: {
    right: "10em",
  },
};
const leftToRight = {
  show: {
    transition: {
      duration: 0.5,
    },

    left: "0",
    opacity: 1,
  },
  hidden: {
    left: "10em",
    opacity: 0,
  },
};
const rightToLeft = {
  show: {
    transition: {
      duration: 0.5,
    },
    right: "0",
    opacity: 1,
  },
  hidden: {
    right: "10em",
    opacity: 0,
  },
};
const imageFade = {
  show: {
    transition: {
      duration: 0.5,
    },
    opacity: 1,
  },

  hidden: {
    opacity: 0,
  },
};
async function getData() {
  const res = await fetch("https://k4zuki-dev-github-io.vercel.app/api/sites", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data: Sites[] = await res.json();

  return data;
} 
function Pagination(data:Sites[]) {

  const paginatedWork: ReactNode[] = data.map((Site) => {
    return (
      <div key={Site.title} className={styles.wrapper}>
        <motion.h1 variants={leftToRight} style={{ position: "relative" }}>
          {Site.title}
        </motion.h1>

        <motion.div
          variants={imageFade}
          initial="hidden"
          whileInView="show"
          className={styles.image_container}
        >
            <Image
              src="/images/image.png"
              fill={true}
              alt="hi"
              className={styles.portfolio_image}
              sizes="10em"
            ></Image>

        </motion.div>

        <motion.p variants={rightToLeft} style={{ position: "relative" }}>
          {Site.description}
        </motion.p>
      </div>
    );
  });

  return paginatedWork ;
}

export default function Portfolio() {
  const [data,setData] = useState<Sites[]>([]);
  
  useEffect(() => {
    async function fetchAndSetData() {
       const data = await getData();
       setData(data);
    }
    
   fetchAndSetData()

 }, []);
 
  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      variants={{}}
      className={styles.portfolio_container}
      id="section-portfolio"
    >
      {Pagination(data)}
    </motion.div>
  );
}
