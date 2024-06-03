import React, { useState } from "react";
import SideBar from "./SideBar/SideBar";
import Calendario from "./Calendar/Calendar";
import Messages from "./Messages/Messages";
import ProfileSection from "./ProfileSection/ProfileSection";

const DashboardView: React.FC = () => {
  const [activeComponent, setActiveComponent] = useState<
    "profile" | "calendar" | "messages"
  >("profile");

  const handleLinkClick = (component: "profile" | "calendar" | "messages") => {
    setActiveComponent(component);
  };

  return (
    <div className="flex min-h-screen">
      <SideBar handleLinkClick={handleLinkClick} />
      <div className="flex flex-col flex-1">
        <div className="lg:mt-6 ml-6 mt-36 md:mt-30 ">
          {activeComponent === "profile" && <ProfileSection />}
          {activeComponent === "calendar" && <Calendario />}
          {activeComponent === "messages" && <Messages />}
        </div>
      </div>
    </div>
  );
};

export default DashboardView;
