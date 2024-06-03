import { UserProfile } from "../../../types/types";

export const Review = ({ user }: { user: UserProfile }) => {
  return (
    <div className="my-4 flex flex-col 2xl:flex-row space-y-4 2xl:space-y-0 2xl:space-x-4">
      <div className="w-full flex flex-col 2xl:w-1/3 shadow-lg shadow-[#F97D05] hover:rotate-1 transition duration-600">
        <div className="flex-1 bg-white rounded-lg shadow-xl p-8 lg:text-lg text-sm">
          <h4 className="text-center lg:text-2xl text-lg text-gray-900 font-bold mb-4">
            Opiniones del cuidad@r
          </h4>
          <h5 className="font-bold uppercase text-xl">Irene</h5>
          <p className="text-gray-700">
            {user.first_name} cuidó muy bien de mi perrita. Nos mantuvo al tanto
            de sus paseos, sus actividades y estados de ánimo. Nos sentimos muy
            tranquilos durante la semana que se quedó con ella. Fue paciente con
            mi perrita con todo y las noches. Al final Tuvo la amabilidad de
            lavar la camita.
          </p>
          <h4 className="font-bold uppercase text-xl">Sofia</h4>
          <p className="text-gray-700">
            Mi perrita Missy estuvo muy bien cuidada y consentida por Aranza y
            su abuelita. Se ve que {user.first_name} tiene experiencia en el
            cuidado de mascotas. No dudaría en volver a dejar a Missy con ellas.
            Gracias por cuidarla tan bien, como yo lo haría.
          </p>
        </div>
      </div>
    </div>
  );
};
