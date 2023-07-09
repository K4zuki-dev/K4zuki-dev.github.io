type Sites = {
    title:string,
    description:string,

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

type dbContact = {
    email: string,
    first_name: string,
    second_name: string,
    message: string,
}
