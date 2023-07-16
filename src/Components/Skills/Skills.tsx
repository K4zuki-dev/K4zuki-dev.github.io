import styles from "./Skills.module.css";
import {
  Variants,
  easeOut,
  motion,
  useAnimation,
  useInView,
} from "framer-motion";
import Image from "next/image";
import { ReactNode, useRef, useState,useEffect } from "react";

const gridItemVariants: Variants = {
  show: {
    opacity: 1,
    top: "0em",
    transition: { duration: 0.5, ease: easeOut },
  },

  hidden: { opacity: 0, top: "5em" },
};

async function getData() {
  const res = await fetch("/api/Skills", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data: Skills[] = await res.json();

  return data;
}
function GridContainer(data: Skills[]) {
    const paginatedWork: ReactNode[] = data.map((Skill) => {
      return GridItem(Skill);
    });
  
    return paginatedWork;
}
function GridItem({
  title = "Default",
  img = "image.png",
  Description = "defaultdefaultdefault",
}: Skills) {
    const src = img
    console.log(src)
  return (
    
    <div
      className={styles.wrapper}
    >
      <div className={styles.skill_card}>

        <div className={styles.skill_card_top}>
            
            <Image
            src={`/images/icons/${src}`}
            width={50}
            height={50}
            alt="Image of one of our Skills"
            className={styles.skills_image}
            ></Image>

            <div className={styles.text}>
                <h2 style={{margin:"0"}}>{title}</h2>
            </div>
            

        </div>
        <div className={styles.text}>
            <p>{Description}</p>
        </div>
      </div>
    </div>
  );
}
export default function Skills() {
    const [data, setData] = useState<Skills[]>([]);

    useEffect(() => {
        async function fetchAndSetData() {
          const data = await getData();
          setData(data);
        }
        fetchAndSetData();
    }, []);

  return(
  <div id="section-skills" className={styles.container}>
    
    <div className={styles.title}>
      <h1>Our skills</h1>
    </div>

    <div className={styles.card_container}>
      {GridContainer(data)}
    </div>
  </div>
  ) 
}