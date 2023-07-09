import { ReactNode } from "react"
import { JsxElement } from "typescript"

type ourWork = {
    title:string,
    description:string,
    image:string
}

type aboutUs = {
    text: string
}

type contactForm = {
    children: ReactNode,
    required?: boolean,
    title?: string,
}

type mongoContact = {
    email: string,
    first_name: string,
    second_name: string,
    message: string,
}

type NavButton = {
    text: string,
    scrollId: string,
}