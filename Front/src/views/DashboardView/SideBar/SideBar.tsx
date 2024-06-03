import React, { useState } from "react";

interface SideBarProps {
  handleLinkClick: (component: "profile" | "calendar" | "messages") => void;
}

const SideBar: React.FC<SideBarProps> = ({ handleLinkClick }) => {
  const [activeButton, setActiveButton] = useState<
    "profile" | "calendar" | "messages"
  >("profile");

  const handleButtonClick = (
    component: "profile" | "calendar" | "messages"
  ) => {
    setActiveButton(component);
    handleLinkClick(component);
  };

  return (
    <>
      <div className="lg:hidden mt-[4.3rem] bg-[#90A4AE] mx-6 rounded-xl fixed top-0 left-0 right-0 z-10">
        <ul className="flex justify-around py-2">
          <li>
            <button
              onClick={() => handleButtonClick("profile")}
              className={`px-4 py-2 rounded-xl   ${
                activeButton === "profile"
                  ? "bg-gradient-to-r from-[#FFB740] to-[#FFB740]/80  text-[#010101]"
                  : " text-[#FFB740]"
              }`}
            >
              Perfiles
            </button>
          </li>
          <li>
            <button
              onClick={() => handleButtonClick("calendar")}
              className={`px-4 py-2 rounded-md ${
                activeButton === "calendar"
                  ? "bg-gradient-to-r from-[#FFB740] to-[#FFB740]/80 text-[#010101]"
                  : "text-[#FFB740]"
              }`}
            >
              Calendario
            </button>
          </li>
          <li>
            <button
              onClick={() => handleButtonClick("messages")}
              className={`px-4 py-2 rounded-md  ${
                activeButton === "messages"
                  ? "bg-gradient-to-r from-[#FFB740] to-[#FFB740]/80 text-[#010101]"
                  : "text-[#FFB740]"
              }`}
            >
              Mensajes
            </button>
          </li>
        </ul>
      </div>
      {/* Sidebar for medium and larger screens */}
      <aside className="hidden md:block ml-[-100%] lg:mt-[4.5rem] fixed z-10 top-0 pb-3 px-6 w-full lg:flex flex-col justify-between h-screen border-r bg-[#90A4AE] transition duration-300 md:w-4/12 lg:ml-0 lg:w-[25%] xl:w-[20%] 2xl:w-[15%]">
        <div>
          <ul className="space-y-2 tracking-wide mt-8">
            <li>
              <button
                onClick={() => handleButtonClick("profile")}
                className={`relative px-4 py-3 flex items-center space-x-4 rounded-xl   ${
                  activeButton === "profile"
                    ? "bg-gradient-to-r from-[#FFB740] to-[#FFB740]/80 text-[#010101]"
                    : "text-[#FFB740]"
                }`}
              >
                <span className="-mr-1 font-medium">Perfiles</span>
              </button>
            </li>
            <li>
              <button
                onClick={() => handleButtonClick("calendar")}
                className={`px-4 py-3 flex items-center space-x-4 rounded-md  group ${
                  activeButton === "calendar"
                    ? "bg-gradient-to-r from-[#FFB740] to-[#FFB740]/80 text-[#010101]"
                    : "text-[#FFB740]"
                }`}
              >
                Calendario
              </button>
            </li>
            <li>
              <button
                onClick={() => handleButtonClick("messages")}
                className={`px-4 py-3 flex items-center space-x-4 rounded-md group ${
                  activeButton === "messages"
                    ? "bg-gradient-to-r from-[#FFB740] to-[#FFB740]/80 text-[#010101]"
                    : "text-[#FFB740]"
                }`}
              >
                Mensajes
              </button>
            </li>
          </ul>
        </div>
      </aside>
    </>
  );
};

export default SideBar;
