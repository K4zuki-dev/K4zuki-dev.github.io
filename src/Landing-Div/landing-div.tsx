import styles from "./landing-div.module.css"

export default function Landing() {
    
    return (
        <>
        <div className={styles.landing_div}>
            <div className={styles.landing_div_text}>
                <div className={styles.landing_div_sentence}>
                    <h1 className={`${styles.landing_fade_in} ${styles.color_white}`}>Bring</h1>
                    <h1 className={`${styles.landing_fade_in} ${styles.color_white}`}>your</h1>
                    <h1 className={`${styles.landing_fade_in} ${styles.color_accent}`}>dreams</h1>
                    <h1 className={`${styles.landing_fade_in} ${styles.color_white}`}>and</h1>
                    <h1 className={`${styles.landing_fade_in} ${styles.color_accent}`}>ambitions</h1>
                    <h1 className={`${styles.landing_fade_in} ${styles.color_white}`}>to</h1>
                    <h1 className={`${styles.landing_fade_in} ${styles.color_accent}`}>life</h1>
                </div>

                <div id={styles.withus}>
                    <h1>With us</h1>
                </div>

            </div>
        </div>

        <div >
            <h1>Test</h1>
        </div>
        </>
    )
}