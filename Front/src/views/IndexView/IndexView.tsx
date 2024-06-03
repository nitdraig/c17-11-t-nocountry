import HeroComponent from "./Hero/HeroComponent";
import AboutComponent from "./About/About";
import ExperiencesComponent from "./Experiences/ExperiencesComponent";
import ContactComponent from "./Contact/ContactComponent";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
const IndexView = () => {
  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <>
      <HeroComponent
        title="MascoCuidado"
        description="Te ayudamos a encontrar el mejor cuidado para tu mascota"
      />
      <AboutComponent />
      <ExperiencesComponent />
      <ContactComponent />
    </>
  );
};

export default IndexView;
