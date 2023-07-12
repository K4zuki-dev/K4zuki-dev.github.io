import {
  Variants,
  easeOut,
  motion,
  useAnimation,
  useInView,
} from "framer-motion";
import { ReactNode, useEffect, useRef, useState } from "react";
import RepoCard, { IRepository } from "../RepoCard/RepoCard";
import styles from "./Portfolio.module.css";
import axios from "axios";

const gridItemVariants: Variants = {
  show: {
    opacity: 1,
    top: "0em",
    transition: { duration: 0.5, ease: easeOut },
  },
  hidden: { opacity: 0, top: "5em" },
};

async function getRepositories(username: string): Promise<IRepository[]> {
  try {
    const response = await axios.get(
      `https://api.github.com/users/${username}/repos`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching repositories:", error);
    return [];
  }
}

function GridContainer(repositories: IRepository[]): ReactNode[] {
  const rows: ReactNode[] = [];
  for (let i = 0; i < repositories.length; i += 4) {
    const row = repositories.slice(i, i + 4);
    const rowItems = row.map((repo) => (
      <div key={repo.name} className="sm:w-full md:w-1/2 lg:w-1/3 mb-4">
        <RepoCard {...repo} />
      </div>
    ));
    rows.push(
      <div key={`row-${i / 4}`} className="flex flex-wrap justify-between">
        {rowItems}
      </div>
    );
  }
  return rows;
}
interface PortfolioProps {
  username: string;
}

export default function Portfolio({ username }: PortfolioProps) {
  const [repositories, setRepositories] = useState<IRepository[]>([]);

  const portfolioAnim = useAnimation();
  const portfolioRef = useRef(null);
  const portfolioInView = useInView(portfolioRef, { once: true });

  const containerRef = useRef(null);
  const containerInView = useInView(containerRef);
  const titleAnim = useAnimation();

  useEffect(() => {
    portfolioAnim ? portfolioAnim.start("show") : {};
  }, [portfolioInView, portfolioAnim]);

  useEffect(() => {
    containerInView ? titleAnim.start("show") : titleAnim.set("hidden");
  }, [containerInView, titleAnim]);

  useEffect(() => {
    async function fetchRepositories() {
      const repositories = await getRepositories(username);
      setRepositories(repositories);
    }

    fetchRepositories();
  }, [username]);

  const charVariants: Variants = {
    show: {
      opacity: 1,
      bottom: "0",
      transition: {
        duration: 0.1,
        type: "spring",
        stiffness: 100,
      },
    },
    hidden: {
      opacity: 0,
      bottom: "3em",
    },
  };

  return (
    <div
      ref={containerRef}
      id="section-portfolio"
      className={styles.portfolio_container}
    >
      <motion.div
        initial="hidden"
        animate={titleAnim}
        variants={{}}
        transition={{ staggerChildren: 0.1 }}
        style={{
          display: "flex",
          backgroundColor: "var(--clr-background)",
          padding: "0 15vw",
          fontSize: "200%",
          borderBottom: "solid 1px var(--clr-accent)",
        }}
      >
        {"Portfolio".split("").map((char, index) => (
          <motion.h1
            key={index}
            variants={charVariants}
            style={{ position: "relative", color: "var(--clr-text)" }}
          >
            {char}
          </motion.h1>
        ))}
      </motion.div>

      <motion.div
        ref={portfolioRef}
        initial="hidden"
        animate={portfolioAnim}
        variants={{}}
        transition={{ staggerChildren: 0.5 }}
        className={styles.portfolio_container}
      >
        {GridContainer(repositories)}
      </motion.div>
    </div>
  );
}
