import React from "react";
import { appDetails } from "../../../services/fakeAPI";

const AboutComponent: React.FC = () => {
  return (
    <section
      className="bg-[#90A4AE] body-font lg:h-screen h-full w-full"
      id="nosotros"
    >
      <div className="container px-5 py-16 mx-auto">
        <h3
          className="text-center text-[#010101] lg:text-4xl text-2xl uppercase font-bold lg:mt-8 mb-16"
          data-aos="zoom-out-right"
          data-aos-duration="2000"
        >
          Acerca de MascoCuidado
        </h3>
        <div className="flex flex-wrap -m-4">
          {appDetails.map((detail, index) => (
            <div
              key={index}
              className="lg:w-1/3 lg:mb-0 mb-6 p-4"
              data-aos="zoom-out-right"
              data-aos-duration="3000"
            >
              <div className="h-full text-center">
                <img
                  alt="testimonial"
                  className="w-32 h-32 mb-8 object-cover object-center rounded-full inline-block border-2 border-gray-200 bg-gray-100"
                  src={detail.imageSrc}
                />
                <p className="leading-relaxed text-[#010101]/90 text-[1.3rem] ">
                  {detail.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutComponent;
