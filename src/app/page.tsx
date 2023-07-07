import Landing from "@/Components/Landing-Div/landing-div";
import Portfolio from "@/Components/Portfolio/Portfolio";
import Contact from "@/Components/Contact/Contact";
import AboutUs from "@/Components/AboutUs/AboutUs";
import Skills from "@/Components/Skills/Skills"

export default function Main() {
    return (
      <>
        <Landing></Landing>

        <AboutUs></AboutUs>
        <Skills></Skills>
        <Portfolio></Portfolio>
        <Contact></Contact>
      </>
    )
}