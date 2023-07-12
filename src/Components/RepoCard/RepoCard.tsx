import React from "react";
import styles from "./RepoCard.module.css";

type Mode = "user" | "profile" | "repo";

type Licence = {
  name: string;
  key: string;
};

export interface IProfile {
  html_url: string;
  login: string;
  name?: string;
  avatar_url: string;
  following: string;
  followers: string;
  location?: string;
  public_repos: number;
  public_gists: number;
  bio?: string;
}

export interface IRepository {
  html_url: string;
  name: string;
  description: string;
  language: string;
  stargazers_count: number;
  watchers?: number;
  forks_count?: number;
  default_branch?: string;
  license?: Licence;
}

export interface IProps {
  type: Mode;
  name: string;
  repository: string;
  useCache?: boolean;
  widht?: number;
  height?: number;
}

export interface ILanguage {
  backgroundColor: string;
  height: number;
  width: number;
  borderRadius: string;
  display: string;
}

const languageColors: { [key: string]: string } = {
  TypeScript: "#3178c6",
  Shell: "#89e051",
  JavaScript: "#f1e05a",
  HTML: "#e34c26",
  CSS: "#563d7c",
  Java: "#b07219",
  Python: "#3572A5",
  "C++": "#f34b7d",
  Ruby: "#701516",
  Go: "#00ADD8",
  PHP: "#4F5D95",
  Swift: "#ffac45",
  Kotlin: "#F18E33",
  Rust: "#DEA584",
  Svelte: "#FF3E00",
  Vue: "#41B883",
  React: "#61DAFB",
  "C#": "#178600",
  Lua: "#000080",
};

const setLanguageColor = (language: string): ILanguage => {
  let dotStyle = {
    height: 10,
    width: 10,
    backgroundColor: "#bbb",
    borderRadius: "50%",
    display: "inline-block",
    marginTop: 4,
  };

  const backgroundColor = languageColors[language] || "#f1e05a";
  return { ...dotStyle, backgroundColor };
};

const RepoCard = (repository: IRepository) => {
  const trimmedDescription = (description: string | null, maxLength: number) => {
    if (description && description.length <= maxLength) {
      return description;
    } else if (description) {
      return `${description.substring(0, maxLength)}...`;
    } else {
      return "";
    }
  };

  return (
    <section className="repoContainer">
      <div className={styles.repoCard}>
        <a
          className={styles.repoLink}
          href={repository.html_url}
          target="_blank"
          rel="noreferrer"
        >
          <div className={styles.repoHeader}>
            <span className={styles.repoIcon}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="18"
                height="18"
              >
                <path fill="none" d="M0 0h24v24H0z" />
                <path
                  d="M13 21v2.5l-3-2-3 2V21h-.5A3.5 3.5 0 0 1 3 17.5V5a3 3 0 0 1 3-3h14a1 1 0 0 1 1 1v17a1 1 0 0 1-1 1h-7zm0-2h6v-3H6.5a1.5 1.5 0 0 0 0 3H7v-2h6v2zm6-5V4H6v10.035A3.53 3.53 0 0 1 6.5 14H19zM7 5h2v2H7V5zm0 3h2v2H7V8zm0 3h2v2H7v-2z"
                  fill="rgba(118,131,144,1)"
                />
              </svg>
            </span>
            <span className={styles.repoName}>{repository.name}</span>
          </div>

          <div className={styles.repoDescription}>
          {trimmedDescription(repository.description, 50)}
        </div>

          <div className={styles.repoDetails}>
            <div className={styles.language}>
              <div
                className={styles.languageColor}
                style={setLanguageColor(repository.language)}
              ></div>
              <div className={styles.languageText}>{repository.language}</div>
            </div>
              <div className={styles.repoStat}>
                <span className={styles.repoStatIcon}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="15"
                    height="15"
                  >
                    <path fill="none" d="M0 0h24v24H0z" />
                    <path
                      d="M12 18.26l-7.053 3.948 1.575-7.928L.587 8.792l8.027-.952L12 .5l3.386 7.34 8.027.952-5.935 5.488 1.575 7.928L12 18.26zm0-2.292l4.247 2.377-.949-4.773 3.573-3.305-4.833-.573L12 5.275l-2.038 4.42-4.833.572 3.573 3.305-.949 4.773L12 15.968z"
                      fill="rgba(118,131,144,1)"
                    />
                  </svg>
                </span>
                <span className={styles.repoStatText}>
                  {repository.stargazers_count}
                </span>
              </div>
          </div>
        </a>
      </div>
    </section>
  );
};

export default RepoCard;
