import { UserProfile } from "../../../types/types";

export const ServicesInfo = ({ user }: { user: UserProfile }) => {
  return (
    <div className="my-4 flex flex-col 2xl:flex-row space-y-4 2xl:space-y-0 2xl:space-x-4">
      <div className="w-full flex flex-col 2xl:w-1/3 shadow-lg shadow-[#F97D05] hover:rotate-1 transition duration-600">
        <div className="flex-1 bg-white rounded-lg shadow-xl p-8">
          <h4 className="text-center lg:text-2xl text-lg text-gray-900 font-bold mb-4">
            Servicios
          </h4>
          {user.services.map((service, index) => (
            <div
              className="space-y-2 border-10  text-center border-b border-gray-900"
              key={index}
            >
              <h5 className="font-semibold mt-1 ">{service.name}</h5>
              <p className="font-thin ">
                Descrpción del servicio: {service.description}
              </p>
              <p className="">${service.price}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
