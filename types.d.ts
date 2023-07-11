type Sites = {
    title:string,
    Description:string,

}

type aboutUs = {
    text: string
}

type contactForm = {
    children: ReactNode,
    required?: boolean,
    title?: string,
}

type dbContact = {
    email: string,
    content: string
}
type NavButton = {
    text: string,
    scrollId: string,
}
