import React, { useEffect, useState } from "react";
import eyeOpen from "../../../assets/LoginImages/ojo-abierto.png";
import eyeClosed from "../../../assets/LoginImages/ojo-cerrado.png";
import { IRole } from "../../../types/types";

export const RegisterForm = () => {
  const [first_name, setFirstname] = useState("");
  const [last_name, setLastname] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [data, setData] = useState<IRole[]>([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:3001/api/v1/roles");
      const jsonData = await response.json();
      setData(jsonData.data);
    } catch (error) {
      console.error("Error al recuperar datos:", error);
    }
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "http://localhost:3001/api/v1/auth/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            role,
            first_name,
            last_name,
            email,
            password,
            username,
          }),
        }
      );
      await response.json();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    const { value } = e.target as HTMLInputElement;
    setRole(value);
  };
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <form className=" md:space-y-1" action="#" onSubmit={handleSubmit}>
      <div>
        <label
          htmlFor="email"
          className="block mb-2 text-sm text-left font-medium text-gray-900 "
        >
          Nombre
        </label>
        <input
          type="text"
          name="usuario"
          id="usuario"
          required
          className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
          placeholder="Nombre"
          onChange={(e) => setFirstname(e.target.value)}
        />
      </div>
      <div>
        <label
          htmlFor="email"
          className="block mb-2 text-sm text-left font-medium text-gray-900 "
        >
          Apellido
        </label>
        <input
          type="text"
          name="email"
          required
          id="email"
          className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
          placeholder="Apellido"
          onChange={(e) => setLastname(e.target.value)}
        />
      </div>
      <div>
        <label
          htmlFor="email"
          className="block mb-2 text-sm text-left font-medium text-gray-900 "
        >
          Usuario
        </label>
        <input
          type="text"
          name="email"
          id="email"
          className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5    "
          placeholder="Usuario"
          required
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div>
        <label
          htmlFor="email"
          className="block mb-2 text-sm text-left font-medium text-gray-900 "
        >
          Correo electronico
        </label>
        <input
          type="email"
          name="email"
          id="email"
          required
          className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
          placeholder="Correo electronico"
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div className="relative">
        <label
          htmlFor="password"
          className="block mb-2 text-left text-sm font-medium text-gray-900 "
        >
          Contraseña
        </label>
        <input
          type={showPassword ? "text" : "password"}
          name="password"
          id="password"
          placeholder="******"
          required
          className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          type="button"
          onClick={togglePasswordVisibility}
          className="absolute inset-y-0 top-8 right-0 flex items-center px-2 h-10 rounded-r-md focus:outline-none"
        >
          {showPassword ? (
            <img src={eyeOpen} alt="open eye" />
          ) : (
            <img src={eyeClosed} alt="close eye" />
          )}
        </button>
      </div>

      <div className="flex items-center space-x-1">
        {data.map((item) => (
          <div key={item._id} onChange={handleChange}>
            <input
              id="default-radio-1"
              type="radio"
              value={item._id}
              name="default-radio"
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 "
            />
            <label
              htmlFor="default-radio-1"
              className="ms-2 text-sm font-medium text-gray-900 "
            >
              {item.name}
            </label>
          </div>
        ))}
      </div>
      <div className="flex items-center justify-between">
        <div className="flex items-start">
          <div className="flex items-center h-5">
            <input
              id="remember"
              aria-describedby="remember"
              type="checkbox"
              className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300  "
              required
            />
          </div>
          <div className="ml-3 text-sm">
            <label htmlFor="remember" className="text-gray-500 ">
              Acepto los{" "}
            </label>
            <a href="#" className="font-medium text-black hover:underline ">
              Terminos y condiciones
            </a>
          </div>
        </div>
      </div>
      <button
        type="submit"
        className="w-full text-black  bg-amber-500 hover:bg-amber-600 focus:ring-4 focus:outline-none focus:ring-primary-300 rounded-2xl text-sm px-5 py-2.5 text-center  font-bold"
      >
        REGISTRARME
      </button>
      <p className="text-sm font-light text-gray-500 ">
        ¿Has olvidado tu contraseña?{" "}
        <a href="#" className="font-medium text-black hover:underline ">
          Recuperar
        </a>
      </p>
    </form>
  );
};
