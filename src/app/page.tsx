import Image from "next/image";

import Landing from "@/app/Landing-Div/landing-div";
import OurWork from "@/our-work/workComponent";
import Contact from "@/contact/contact";

export default function Main() {
    return (
      <>
        <Landing></Landing>
        <OurWork></OurWork>
        <Contact></Contact>
      </>
    )
}