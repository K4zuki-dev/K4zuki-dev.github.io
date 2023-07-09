import {  useRef, useState, useEffect } from "react"
import { useHover } from "usehooks-ts"

import Image from "next/image"
import styles from "./Contact.module.css"
import { motion, useAnimation } from "framer-motion"




export default function Contact() {
    return (

        <div className={styles.container} id="section-contact">
            <h1>Contact us:</h1>

            <div className={styles.background}>
                <Image src="/images/Contact.jpg" alt="Illustration of Vectorart" fill={true} sizes="50em"></Image>
            </div>

            <div className={styles.form}>

                <Form></Form>

            </div>
        </div>

    )
}

function Form() {
    const [emailValue, setEmailValue] = useState("")
    const [validEmail, setValidEmail] = useState(false)
    const [textValue, setTextValue] = useState("")
    const [buttonText, setButtonText] = useState("Submit")
    const [loading, setLoading] = useState(false)
    const [invalid, setINVALID] = useState(false)

    const invalidButtonVariants = {
        show: {
            x: [0, 10, -10, 0],
            transition: {
                duration: .2,
                ease: "easeInOut",
                repeat: 1
            }
        },
        hidden: {
            position: "relative",
            left: 0,
            width: "15em",
            color: "gray",
            backgroundColor: "rgb(120, 0, 0)",
            transition: {
                duration: .2,
                repeat: null
            }
        },
        loading: {
            position: "relative",
            left: ["0em", "5em", "0em", "-5em", "0em"],
            borderRadius: "5em",
            width: ["4em", "4em", "4em", "4em"],
            backgroundColor: "rgb(120, 0, 0)",
            transition: {
                duration: 2,
                ease: "easeInOut",
                repeat: Infinity
            }
        }
    }
    
    const validButtonVariants = {
        show: {
            scale: 1.2,
            color: "white",
            borderRadius: "5em",
            transition: {
                duration: .2,
            }
        },
        hidden: {
            scale: 1,
            color: "white",
            width: "15em",  
            x: 0,
            borderRadius: "5em",
            backgroundColor: "rgb(0,120,0)",
        }
    }

    const buttonAnim = useAnimation()
    const buttonRef = useRef(null)
    const buttonHover = useHover(buttonRef)

    const invalidation =  emailValue === "" || emailValue == null || !validEmail || textValue === "" || textValue == null ? (true) : (false)

    async function showAnim() {
        if (!loading) {
            buttonAnim.set("hidden")
            buttonAnim.start("show")
        }
    }

    function clickHandler() {
        showAnim()
        submit()
    }

    useEffect(() => {
        // Check if the loading aniamtion is currently playing
        if (loading) {
            // No transformation, you have to SET it before you START it or else it will change colors, annoying I worked untill 6 am for this bullshit
            buttonAnim.set("loading")
            buttonAnim.start("loading")
        } else {
            buttonAnim.start("hidden")
        }

    }, [loading])

    useEffect(() => {
        // Animate if hovering and its not loading currently
        if (buttonHover && !loading)  {
            buttonAnim.start("hidden")
            buttonAnim.mount()
            buttonAnim.start("show")
        }
    }, [buttonHover, buttonAnim])

    useEffect(() => {
        if (!loading) {
            buttonAnim.start("hidden")
        }
    }, [invalidation])

    async function submit() {
        const email: string = emailValue
        const message: string = textValue

        if (!invalidation) {
            console.log("Submited!")
            await fetch("http://localhost:3000/api/addContact", {
                method: "POST",
                body: JSON.stringify({email: email, content: message})
            })

            setButtonText("")
            setEmailValue("")
            setTextValue("")
            setValidEmail(false)
            setINVALID(true)

            setLoading(true)

            setTimeout(async () => {
                setButtonText("Submit")
                setLoading(false)
            }, 6000)

        }
    }

    return (
        <>
            <Input validUseState={[validEmail, setValidEmail]} emailUseState={[emailValue, setEmailValue]} textUseState={[textValue, setTextValue]} title="Email" type="email" id={styles.emailInput} name="form" placeholder="sophie@example.com"></Input>
            <Input validUseState={[validEmail, setValidEmail]} emailUseState={[emailValue, setEmailValue]} textUseState={[textValue, setTextValue]} title="Message" type="text" id={styles.textInput} name="form" placeholder="I want a website with..."></Input>

            <div className={styles.button_wrapper}>
                <motion.button onClick={clickHandler} ref={buttonRef} animate={buttonAnim} variants={ // I dont fucking know whats wrong here??? Fix it if u can / I will do it
                        invalidation || loading || invalid ?
                        (
                            invalidButtonVariants
                        ) : (
                            validButtonVariants
                        )
                    } 
                    className={styles.submitButton} type="submit" name="form"><h1>{buttonText}</h1>
                    </motion.button>
            </div>

        </>
    )
}

function Input({title, type, id, name, placeholder, emailUseState, textUseState, validUseState}: contactForm) {

    function updateEmailValidation(event: React.ChangeEvent<HTMLInputElement>) {
        validUseState[1](event.currentTarget.validity.valid)
    }

    function updateEmailValue(event: React.ChangeEvent<HTMLInputElement>) {
        emailUseState[1](event.currentTarget.value)
        updateEmailValidation(event)
    }

    function updateTextValue(event: React.ChangeEvent<HTMLTextAreaElement>) {
        textUseState[1](event.currentTarget.value)
    }

    return (
    <div className={styles.input_wrapper}>
        <div className={styles.text_wrapper}>
            <h1>{title}</h1>
            <p className={styles.required_text}>*required</p>
        </div>
        {type === "text" ? 
        (
            <textarea value={textUseState[0]} onChange={updateTextValue} className={styles.input} name={name} id={id} placeholder={placeholder} />
        ) : (
            <input value={emailUseState[0]} onChange={updateEmailValue} className={styles.input} type={type} name={name} id={id} placeholder={placeholder} />
        )
    }
    </div>
    )
}