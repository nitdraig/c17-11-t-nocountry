import React, { useEffect, useState } from "react";
import eyeOpen from "../../../assets/LoginImages/ojo-abierto.png";
import eyeClosed from "../../../assets/LoginImages/ojo-cerrado.png";
import googleIcon from "../../../assets/LoginImages/google-icon.png";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../services/Api";
import { Spinner } from "@nextui-org/react";
import Swal from "sweetalert2";
export const LoginForm: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!username || !password) {
      Swal.fire({
        icon: "warning",
        title: "Cumpleta todos los campos!",
      });
      return;
    }
    try {
      setIsLoading(true);
      setTimeout(async () => {
        await login(username, password);
        setIsLoading(false);
      }, 2000);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard");
    }
  }, [isAuthenticated, navigate]);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const googleLogin = `${import.meta.env.VITE_GOOGLE_AUTH_URL}`;
  return (
    <>
      {isLoading ? (
        <>
          <div className="items-center justify-center ">
            <Spinner color="warning" label=" Estamos cargando todo" />
          </div>
        </>
      ) : (
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h3 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl ">
            ¡Ingresa a tu cuenta!
          </h3>
          <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="username"
                className="block mb-2 text-sm text-left font-medium text-gray-900 "
              >
                Nombre de usuario o Email
              </label>
              <input
                type="text"
                id="username"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                placeholder="Nombre de usuario o Email"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
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
                id="password"
                placeholder="******"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                value={password}
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
            <div className="flex items-center justify-between">
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="remember"
                    aria-describedby="remember"
                    type="checkbox"
                    className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300   "
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label htmlFor="remember" className="text-gray-500 ">
                    Recordar contraseña
                  </label>
                </div>
              </div>
              <button
                type="button"
                className="text-sm font-medium text-primary-600 hover:underline "
              >
                ¿Olvidaste tu contraseña?
              </button>
            </div>
            <button
              type="submit"
              className="w-full text-black bg-[#FFB740] hover:bg-[#a87f3c] focus:ring-4 focus:outline-none focus:ring-primary-300 rounded-2xl text-sm px-5 py-2.5 text-center    font-bold"
            >
              INGRESAR
            </button>
            <p className="text-sm font-light text-center text-gray-500 ">o</p>

            <a
              href={googleLogin}
              className="flex items-center space-x-2 justify-center w-full text-black bg-gray-200 hover:bg-[#FFB740] focus:ring-4 focus:outline-none focus:ring-primary-300 rounded-2xl text-sm px-5 py-2.5 text-center    font-bold"
            >
              <img src={googleIcon} alt="google icon" />
              <span>INICIAR SESIÓN CON GOOGLE</span>
            </a>
            <p className="text-sm font-light text-gray-500 ">
              ¿Aún no tienes cuenta?{" "}
              <button
                type="button"
                className="font-medium text-black hover:underline "
              >
                Regístrate aquí
              </button>
            </p>
          </form>
        </div>
      )}
    </>
  );
};
