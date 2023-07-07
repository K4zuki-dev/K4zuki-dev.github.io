/* eslint-disable @next/next/no-async-client-component */
"use client"

import { easeOut, motion } from "framer-motion";
import { ReactNode } from "react";
import styles from "./Portfolio.module.css";
import Image from "next/image";

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

export default async function Portfolio() {

  async function getData() {
    const res = await fetch("http://localhost:3000/api/sites", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data: ourWork[] = await res.json();

    console.log(data)

    return data;
  }

  async function Pagination() {
    const unpaginatedData = await getData();

    const paginatedWork: ReactNode[] = unpaginatedData.map((Site) => {
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

    return paginatedWork;
  }

  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      variants={{}}
      className={styles.portfolio_container}
      id="section-portfolio"
    >
      {await Pagination()}
    </motion.div>
  );
}
