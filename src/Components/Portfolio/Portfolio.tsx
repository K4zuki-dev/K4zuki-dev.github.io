/* eslint-disable @next/next/no-async-client-component */

import { Variants, easeOut, motion } from "framer-motion";
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
const imageVariant = {
  show: {
    transition: {
      duration: 0.35,
    },
    opacity: 1,
    rotateY: 0,
  },
  flip: {
    transition: {
      duration: 0.35,
    },
    rotateY: 180,
  },
  hidden: {
    opacity: 0,
  },
};
async function getData() {
  const res = await fetch("http://localhost:3000/api/sites", {
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

function GridItem(Site:Sites) {
  return (
    <div key={Site.title} className={styles.wrapper}>
        <div className={styles.flip_card}>
          <div className={styles.flip_card_inner}>

            <div className={styles.flip_card_front}>
              <Image
                src="/images/image.png"
                fill={true}
                alt="hi"
                className={styles.portfolio_image}
                sizes="10em"
              ></Image>
            </div>

            <div className={styles.flip_card_back}>
              <h1>{Site.title}</h1>
              <p>{Site.Description}</p>
            </div>

          </div>
        </div>
      </div>
  )
}

export default function Portfolio() {
  const [data, setData] = useState<Sites[]>([]);

  useEffect(() => {
    async function fetchAndSetData() {
      const data = await getData();
      setData(data);
    }

    fetchAndSetData();
  }, []);

  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      variants={{}}
      className={styles.portfolio_container}
      id="section-portfolio"
    >
      {GridContainer(data)}
    </motion.div>
  );
}
