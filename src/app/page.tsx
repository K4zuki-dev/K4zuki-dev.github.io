'use client'
import Landing from "@/Components/Landing-Div/landing-div";
import Portfolio from "@/Components/Portfolio/Portfolio";
import Contact from "@/Components/Contact/Contact";
import AboutUs from "@/Components/AboutUs/AboutUs";
import Skills from "@/Components/Skills/Skills";

export default function Main() {
  const aboutUsText: string =
    "Step into our world of full-stack development as we unleash our passion for turning ideas into digital realities. With a commitment to transforming your online presence, we specialize in crafting captivating websites and intuitive web applications. Our seamless user experiences are designed to leave a lasting impression. Explore our portfolio and join us on an exciting journey of innovation and creativity. Together, let's unlock the full potential of your digital vision with our unrivaled expertise!";

  const username = "K4zuki-dev";

  return (
    <>
      <Landing />
      <AboutUs text={aboutUsText} />
      <Skills />
      <Portfolio username={username} />
      <Contact />
    </>
  );
}
