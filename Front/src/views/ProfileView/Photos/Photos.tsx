import dog from "../../../assets/perro.jpg";
export const Photos = () => {
  return (
    <div className="my-4 flex flex-col 2xl:flex-row space-y-4 2xl:space-y-0 2xl:space-x-4">
      <div className="w-full flex flex-col 2xl:w-1/3 shadow-lg shadow-[#F97D05] hover:rotate-1 transition duration-600">
        <div className="flex-1 bg-white rounded-lg shadow-xl p-8">
          <h4 className="text-center lg:text-2xl text-lg text-gray-900 font-bold mb-">
            Fotos
          </h4>
          <img
            src={dog}
            alt="mascota perro"
            className="rounded-lg shadow-lg shadow-black "
          />
        </div>
      </div>
    </div>
  );
};
