import styles from "./StartButton.module.css"

import Image from "next/image"

export default function StartButton() {
    return (
        <div className={styles.button}>
            {/* <svg className={styles.svg_container}>
                <Image src="/svgs/arrow.png" fill={true} alt="Arrow"></Image>
            </svg> */}
        </div>
    )
}