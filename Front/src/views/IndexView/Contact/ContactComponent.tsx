import React, { useState } from "react";
import Swal from "sweetalert2";

const ContactComponent: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    {
      Swal.fire(
        "Gracias por contactarnos",
        "Pronto te responderemos",
        "success"
      );
      setTimeout(() => {
        window.location.href = "/dashboard";
      }, 3000);
    }
  };

  return (
    <section className=" bg-[#90A4AE] body-font relative" id="contacto">
      <div
        className="container px-10 py-24 mx-auto"
        data-aos="fade-down-right"
        data-aos-duration="3000"
      >
        <div className="flex flex-col text-center w-full mb-10">
          <h3 className="text-center text-[#010101] lg:text-4xl text-2xl uppercase font-bold mb-6">
            Contacta con nosotros
          </h3>
          <p className="lg:w-2/3 mx-auto leading-relaxed text-base">
            Queremos tu opinión, y cualquier duda que tengas. Responderemos
            cuanto antes
          </p>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="lg:w-1/2 md:w-2/3 mx-auto">
            <div className="flex flex-wrap -m-2">
              <div className="p-2 w-full">
                <div className="relative">
                  <label
                    htmlFor="name"
                    className="leading-7 text-sm text-[#010101]/80"
                  >
                    Nombre
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full bg-white rounded-lg rounded border border-gray-300 focus:border-[#FF9F00] focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  />
                </div>
              </div>
              <div className="p-2 w-full">
                <div className="relative">
                  <label
                    htmlFor="email"
                    className="leading-7 text-sm text-[#010101]/80"
                  >
                    Tu mejor correo
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full bg-white rounded-lg  border border-gray-300 focus:border-[#FF9F00] focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  />
                </div>
              </div>
              <div className="p-2 w-full">
                <div className="relative">
                  <label
                    htmlFor="message"
                    className="leading-7 text-sm text-[#010101]/80"
                  >
                    Mensaje
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    className="w-full bg-white rounded-lg border border-gray-300 focus:border-[#FF9F00] focus:ring-2 focus:ring-indigo-200 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"
                  ></textarea>
                </div>
              </div>
              <div className="p-2 w-full">
                <button
                  type="submit"
                  className="flex mx-auto text-black bg-[#FF9F00] border-0 py-2 px-8 focus:outline-none hover:bg-[#926e35] rounded-full text-lg"
                >
                  Enviar
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
};

export default ContactComponent;
