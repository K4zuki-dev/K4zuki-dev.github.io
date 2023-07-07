'use client'
import styles from "./workComponent.module.css"

export default function OurWork() {

    async function onclick(){
        const res = await fetch("http://localhost:3000/api/sites", {
            method:"GET",
            headers:{
                'Content-Type': 'application/json'
            }
        });
        

    }


    return (
    <div className={styles.portfolio_container} id="section-ourWork">
        <button onClick={onclick}></button>
        <h1>hi</h1>
    </div>
    )
}