import Swal from "sweetalert2";
import StarRating from "../../../components/StarCalification";
import { UserProfile } from "../../../types/types";

export const Header = ({ user }: { user: UserProfile }) => {
  const handleReject = () => {
    {
      Swal.fire({
        title: "Genial, mira otros perfiles de cuidadores",
        icon: "info",
        confirmButtonColor: "#F97D05",
        confirmButtonText: "Entendido",
      });

      setTimeout(() => {
        window.location.href = "/dashboard";
      }, 2000);
    }
  };

  const handleContact = () => {
    {
      setTimeout(() => {
        window.location.href = "/dashboard";
      }, 500);
    }
  };

  const handleAccept = () => {
    Swal.fire({
      title: "¿Quieres agendar una cita?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Confirmar",
      cancelButtonText: "Cancelar",
      cancelButtonColor: "#f90505",
      confirmButtonColor: "#F97D05",
      denyButtonText: `Rechazar`,
      denyButtonColor: "#c06000",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Cita agendada, revisa tu agenda personal", "", "success");
      } else if (result.isDenied) {
        Swal.fire("Genial, mira otros perfiles de cuidadores", "", "info");
        setTimeout(() => {
          window.location.href = "/dashboard";
        }, 2000);
      }
    });
  };

  return (
    <>
      <div className="flex flex-col items-center mt-20">
        <img
          src={user.picture}
          className="w-52 h-52 border-4 border-white rounded-full"
        />
        <div className="flex items-center space-x-2 mt-2">
          <p className="lg:text-3xl text-2xl uppercase text-black">
            {user.first_name} {user.last_name}
          </p>
          <span className="bg-[#F97D05]/80 rounded-full p-1" title="Verified">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="text-gray-100 h-2.5 w-2.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="4"
                d="M5 13l4 4L19 7"
              ></path>
            </svg>
          </span>
        </div>
        <p className="text-sm text-gray-200">{user.address}</p>
        <StarRating totalStars={5} />
      </div>
      <div className="flex-1 flex flex-col justify-center items-center lg:px-8 mt-2">
        <div className="flex items-center justify-center space-x-4 mt-2">
          <button
            onClick={handleAccept}
            className="flex items-center bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-full text-sm lg:text-lg space-x-2 transition duration-100"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M17.707 5.293a1 1 0 010 1.414l-9 9a1 1 0 01-1.414 0l-5-5a1 1 0 111.414-1.414L8 13.586l8.293-8.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
            <span>Aceptar</span>
          </button>

          <button
            onClick={handleReject}
            className="flex items-center bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-full text-sm lg:text-lg space-x-2 transition duration-100"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M3.293 3.293a1 1 0 011.414 0L10 8.586l5.293-5.293a1 1 0 111.414 1.414L11.414 10l5.293 5.293a1 1 0 01-1.414 1.414L10 11.414l-5.293 5.293a1 1 0 01-1.414-1.414L8.586 10 3.293 4.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
            <span>Rechazar</span>
          </button>
        </div>

        <div className="flex items-center justify-center mt-2">
          <button
            onClick={handleContact}
            className="flex items-center bg-[#F97D05] hover:bg-[#bb630b] hover:text-white text-gray-900 px-4 py-2 rounded-full text-sm lg:text-lg space-x-2 transition duration-100"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M18 5v8a2 2 0 01-2 2h-5l-5 4v-4H4a2 2 0 01-2-2V5a2 2 0 012-2h12a2 2 0 012 2zM7 8H5v2h2V8zm2 0h2v2H9V8zm6 0h-2v2h2V8z"
                clipRule="evenodd"
              ></path>
            </svg>
            <span>Contactar</span>
          </button>
        </div>
      </div>
    </>
  );
};
