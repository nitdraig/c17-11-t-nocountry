import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { useAuth } from "../services/Api";
import logo from "../assets/logos/black.png";
import logowhite from "../assets/logos/white.png";
import defaultAvatar from "../assets/defaultAvatar.svg";
import {
  Avatar,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";

const Navbar = () => {
  const { isAuthenticated, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  const toggleProfileMenu = () => {
    setShowMenu(!showMenu);
  };

  const handleLogout = () => {
    logout();
    return <Navigate to="/#" />;
  };

  return (
    <nav className="bg-[#FF9F00]/75 w-screen fixed top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2">
        <div className="flex items-center justify-between">
          <div>
            <a href="/#">
              {isAuthenticated ? (
                <img className="rounded-full w-14" src={logo} alt="Logo" />
              ) : (
                <img className="rounded-full w-14" src={logowhite} alt="Logo" />
              )}
            </a>
          </div>
          <div className="hidden md:flex flex-grow ">
            <ul className="flex space-x-6">
              <li>
                <a
                  href="/#nosotros"
                  className="text-[#010101] hover:text-[#010101]/70 px-3 py-2 rounded-md text-lg font-medium"
                >
                  Nosotros
                </a>
              </li>
              <li>
                <a
                  href="/#experiencias"
                  className="text-[#010101] hover:text-[#010101]/70 px-3 py-2 rounded-md text-lg font-medium"
                >
                  Experiencias
                </a>
              </li>
              <li>
                <a
                  href="/#contacto"
                  className="text-[#010101] hover:text-[#010101]/70 px-3 py-2 rounded-md text-lg font-medium"
                >
                  Contacto
                </a>
              </li>
            </ul>
          </div>
          {isAuthenticated ? (
            <Dropdown className="rounded-lg">
              <DropdownTrigger>
                <Avatar
                  src="https://cdn.pixabay.com/photo/2016/11/21/12/42/beard-1845166_1280.jpg"
                  alt="Profile"
                  isBordered
                  size="md"
                />
              </DropdownTrigger>
              <DropdownMenu aria-label="Link Actions">
                <DropdownItem href="/dashboard" key="dashboard">
                  Dashboard
                </DropdownItem>
                <DropdownItem href="/profile" key="profile" color="default">
                  Profile
                </DropdownItem>
                <DropdownItem
                  key="logout"
                  onClick={handleLogout}
                  color="danger"
                >
                  Cerrar sesión
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          ) : (
            <div className="hidden md:flex items-center space-x-2">
              <Link
                to="/login"
                className="text-[#010101] bg-white hover:text-[#010101]/80 px-6 py-2 rounded-full text-lg font-medium"
              >
                Ingresar
              </Link>
              <Link
                to="/register"
                className="text-[#010101] bg-[#F97D05] hover:text-[#010101]/80 rounded-full px-6 py-2 text-lg font-medium"
              >
                Registro
              </Link>
            </div>
          )}
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={toggleNavbar}
              className="inline-flex items-center justify-center p-2 rounded-md text-[#000000] hover:text-black/50 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-black/40"
            >
              <span className="sr-only">Menú</span>
              <svg
                className={`${isOpen ? "hidden" : "block"} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
              <svg
                className={`${isOpen ? "block" : "hidden"} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
      <div className={`${isOpen ? "block" : "hidden"} md:hidden`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 list-none text-center">
          <li>
            <a
              href="/#nosotros"
              className="text-[#010101] hover:text-[#010101]/70 px-3 py-2 rounded-md text-3xl font-medium"
            >
              Nosotros
            </a>
          </li>
          <li>
            <a
              href="/#experiencias"
              className="text-[#010101] hover:text-[#010101]/70 px-3 py-2 rounded-md text-3xl font-medium"
            >
              Experiencias
            </a>
          </li>
          <li>
            <a
              href="/#contacto"
              className="text-[#010101] hover:text-[#010101]/70 px-3 py-2 rounded-md text-3xl font-medium"
            >
              Contacto
            </a>
          </li>
          {isAuthenticated ? (
            <div className="lg:flex hidden items-center space-x-2  relative">
              <img
                src={defaultAvatar}
                alt="Profile"
                className="w-10 h-10 rounded-full cursor-pointer"
                onClick={toggleProfileMenu}
              />
              {showMenu && (
                <div className="absolute right-0 mt-40 w-48 bg-white rounded-md shadow-lg py-1">
                  <Link
                    to="/dashboard"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Dashboard
                  </Link>
                  <Link
                    to="/profile"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Perfil
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Cerrar sesión
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className=" md:flex items-center pt-6 pb-2 space-x-2">
              <Link
                to="/login"
                className="text-[#010101] bg-white hover:text-[#010101]/80 px-6 py-2 rounded-full text-lg font-medium"
              >
                Ingresar
              </Link>
              <Link
                to="/register"
                className="text-[#010101] bg-[#F97D05] hover:text-[#010101]/80 rounded-full px-6 py-2 text-lg font-medium"
              >
                Registro
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
