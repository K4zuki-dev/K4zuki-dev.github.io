/* eslint-disable react-hooks/exhaustive-deps */
import {  useRef, useState, useEffect } from "react"
import { useHover } from "usehooks-ts"
import Image from "next/image"
import styles from "./Contact.module.css"
import { Variants, motion, useAnimation } from "framer-motion"


export default function Contact() {
    return (

        <div className={styles.container} id="section-contact">

            <div className={styles.background}>
                <Image src="/images/Contact.jpg" alt="Illustration of Vectorart" fill={true} sizes="50em"></Image>
            </div>

            <div className={styles.contact_form}>

                <Form></Form>

            </div>
        </div>

    )
}

const inputVariants: Variants = {
    show: {
        borderBottom: "1px solid gray",
        transition: {
            duration: .5,
        }
    },
    hidden: {
        borderBottom: "1px solid red"
    }
}

function Form() {
    const [emailValue, setEmailValue] = useState("")
    const [validEmail, setValidEmail] = useState(false)
    const [textValue, setTextValue] = useState("")
    const [buttonText, setButtonText] = useState("Submit")
    const [loading, setLoading] = useState(false)
    const [firstName, setFirstName] = useState("")
    const [secondName, setSecondName] = useState("")

    const invalidButtonVariants: Variants = {
        show: {
            x: [0, 10, -10, 0],
            transition: {
                duration: .2,
                ease: "easeInOut",
            }
        },
        hidden: {
            position: "relative",
            left: 0,
            width: "15em",
            color: "var(--clr-background)",
            borderRadius: "1em",
            backgroundColor: "var(--clr-accent)",
            transition: {
                duration: .2,
            }
        },
        loading: {
            position: "relative",
            left: ["5em", "-5em", "5em"],
            borderRadius: "100%",
            width: "4em",
            backgroundColor: "var(--clr-accent)",
            transition: {
                duration: .8,
                ease: "easeInOut",
                repeat: Infinity
            }
        }
    }

    const validButtonVariants: Variants = {
        show: {
            position: "relative",
            scale: 1.1,
            color: "var(--clr-background)",
            transition: {
                duration: .3,
            }
        },
        hidden: {
            position: "relative",
            scale: 1,
            color: "var(--clr-background)",
            width: "15em",
            x: 0,
            backgroundColor: "var(--clr-accent)",
        },
    }

    const errorVariants: Variants = {
        show: {display: "block"},
        hidden: {display: "none"}
    }

    const validAnim = useAnimation()
    const validRef = useRef(null)

    const errorAnim = useAnimation()
    const errorRef = useRef(null)

    const buttonAnim = useAnimation()
    const buttonRef = useRef(null)
    const buttonHover = useHover(buttonRef)

    const validation =  emailValue !== "" && validEmail && textValue !== "" && firstName !== "" && secondName !== "" ? (true) : (false)

    // Shows the button

    function showAnim() {
        if (!loading) {
            buttonAnim.set("hidden")
            buttonAnim.start("show")
        }
    }


    // Runs when button is clicked

    function clickHandler() {
        showAnim()
        submit()
    }

    useEffect(() => {
        if (loading) {
            buttonAnim.set("loading")
            buttonAnim.start("loading")
        } else if (!loading) {
            buttonAnim.start("hidden")
        }
    }, [loading, buttonAnim])

    useEffect(() => {
        // Animate if hovering and its not loading currently
        if (buttonHover && !loading)  {
            buttonAnim.start("show")
        } else if (!buttonHover && !loading) {
            buttonAnim.start("hidden")
        }
    }, [buttonHover, buttonAnim])

    useEffect(() => {
        // As soon as the form is valid / invalid it will reload the animation so that it will show valid or unvalid
        if (!loading) {
            buttonAnim.start("hidden")
        }
    }, [validation])

    async function submit() {

        if (validation) {

            setLoading(true)
            setButtonText("") // Looks more beautiful if button is empty

            const res = await fetch("/api/addContact", {
                method: "POST",
                body: JSON.stringify({email: emailValue, message: textValue, first_name: firstName, second_name: secondName })
            })

            // Changing every value back to 0 so you can re-submit

            const response = await res.json()


            if (response.status == "200") { // check if the response was OK, if not it will show something went wrong
                setEmailValue("")
                setFirstName("")
                setSecondName("")
                setTextValue("")
                setValidEmail(false)
            } else {
                errorAnim.set("show")
                setTimeout(() => {
                    errorAnim.set("hidden")     // We want this to play after the button is back again and something went wrong
                }, 4000)
            }


            setTimeout(async () => {
                setButtonText("Submit") // Changing button text back to "submit"
                setLoading(false)
                buttonAnim.start("hidden")

                validAnim.set("show")
                setTimeout(() => {
                    validAnim.set("hidden")
                }, 4000)

            }, 4000)

        }
    }


    function updateEmailValidation(event: React.ChangeEvent<HTMLInputElement>) {
        setValidEmail(event.currentTarget.validity.valid)
    }

    function updateEmailValue(event: React.ChangeEvent<HTMLInputElement>) {
        setEmailValue(event.currentTarget.value)
        updateEmailValidation(event)
    }

    function updateFirstName(event: React.ChangeEvent<HTMLInputElement>) {
        setFirstName(event.currentTarget.value)
    }

    function updateSecondName(event: React.ChangeEvent<HTMLInputElement>) {
        setSecondName(event.currentTarget.value)
    }

    function updateTextValue(event: React.ChangeEvent<HTMLTextAreaElement>) {
        setTextValue(event.currentTarget.value)
    }

    return (
        <div className={styles.form}>

            <div className={styles.form_wrapper}>

                <h1 className={styles.title}>Contact us:</h1>


                <Input required={true}>
                    <input style={!validEmail && emailValue != "" ? ({borderBottom: "1px solid var(--clr-invalid)"}) : ({borderBottom: "1px solid gray"})} type="email" value={emailValue} onChange={updateEmailValue} className={styles.input} name="form" id={styles.emailInput} placeholder="Email"/>
                </Input>

                <Input required={true}>
                    <div style={{display: "flex", gap: "1em"}}>
                        <input type="text" value={firstName} onChange={updateFirstName} className={styles.input} name="form" id={styles.firstNameInput} autoComplete="off" placeholder="First Name"/>
                        <input type="text" value={secondName} onChange={updateSecondName} className={styles.input} name="form" id={styles.secondNameInput} autoComplete="off" placeholder="Second Name"/>
                    </div>
                </Input>

                <Input required={true}>
                    <textarea value={textValue} onChange={updateTextValue} className={styles.input} id={styles.textInput} placeholder="Explain your Project briefly" autoComplete="off"></textarea>
                </Input>


                <div className={styles.button_wrapper}>
                    <motion.button onClick={clickHandler} ref={buttonRef} animate={buttonAnim} variants={
                            !validation || loading?
                            (
                                invalidButtonVariants
                            ) : (
                                validButtonVariants
                            )
                        }
                        className={styles.submitButton} type="submit" name="form"><h1>{buttonText}</h1>
                        </motion.button>
                </div>

                <motion.p ref={errorRef} initial="hidden" variants={errorVariants} animate={errorAnim} style={{color: "red"}}>Error, something went wrong, try again later</motion.p>
                <motion.p ref={validRef} initial="hidden" variants={errorVariants} animate={validAnim} style={{color: "green"}}>Successfully submitted!</motion.p>
                {/* Here we are using Variants "ErrorVariants" for both, because they do the same thing, show / dont show */}

            </div>

            <div className={styles.contact_information}>
                    <h1 className={styles.title}>Information: </h1>

                    <p style={{fontSize: "var(--text-size)"}}>Write us an Contact form and we will answer you per E-Mail</p>

                    <div className={styles.contact_information_element}>

                        <div className={styles.icon_container}>
                            <Image src="/images/icons/discord.png" alt="discord icon" fill={true} sizes="2em"></Image>
                        </div>

                        <p>K4zuki. | Harique</p>
                    </div>
            </div>

        </div>
    )
}

function Input({children, title, required}: contactForm) {

    return (
    <div className={styles.input_wrapper}>
        <div className={styles.text_wrapper}>
            {title? (<h1>{title}</h1>) : (null)}
        </div>
        {children}
    </div>
    )
}
