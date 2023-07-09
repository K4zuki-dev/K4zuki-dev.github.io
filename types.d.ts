type ourWork = {
    title:string,
    description:string,
    image:string
}

type aboutUs = {
    text: string
}

type contactForm = {
    title: string,
    type: string,
    name: string,
    id: string,
    emailUseState: [string, Function],
    textUseState: [string, Function],
    validUseState: [boolean, Function],
    placeholder?: string
}

type mongoContact = {
    email: string,
    content: string
}