type Sites = {
    title:string,
    description:string,
    img: string | "image.png" //name of the image, path is selected automatically (its /images/portfolio/{name}) DONT FORGET THE ENDING (.png, .jpg whatever)
}
type Skills = {
    title:string,
    Description:string,
    img:string | 'image.png'
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
    message: string,
    first_name: string,
    second_name: string,
}
type NavButton = {
    text: string,
    scrollId: string,
}

type PortfolioTitle = {
    title: string
  }
