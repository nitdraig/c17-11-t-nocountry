import React from "react";
import { UserProfile } from "../../../../types/types";

interface ProfileCardProps {
  user: UserProfile;
}

const ProfileCard: React.FC<ProfileCardProps> = ({ user }) => {
  const { last_name, first_name, description, address, picture, time } = user;

  return (
    <div className="flex flex-col justify-between h-[28rem] lg:w-[16rem] w-full py-8 px-6 space-y-6 rounded-lg border border-[#F97D05]/50 shadow-lg shadow-[#F97D05]/40 bg-white text-center hover:rotate-3 transition duration-600">
      <img
        alt="profilePic"
        className="w-20 h-20 mx-auto mb-0 object-cover rounded-full border-2 border-gray-200 bg-gray-100"
        src={picture}
      />
      <div className="">
        <h5 className="text-lg hover:text-xl -mt-4 text-gray-800 transition duration-600">
          {first_name} {last_name}
        </h5>
        <div className="mt-0">
          <h3 className="text-sm font-bold text-gray-700">{address}</h3>
          <p className="text-gray-500 mt-1  text-sm">{description}</p>
        </div>
        <span className="block text-gray-800 mt-2 text-sm">
          Horarios: {time}
        </span>
      </div>
      <a
        href="/profile"
        className="bg-[#F97D05] hover:bg-[#a5703c] text-white font-bold py-2 px-4 rounded-full "
      >
        Leer más
      </a>
    </div>
  );
};

export default ProfileCard;
