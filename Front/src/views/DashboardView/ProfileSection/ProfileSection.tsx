import { Spinner } from "@nextui-org/react";
import { user } from "../../../services/fakeAPI";
import ProfileCard from "./ProfileCard/ProfileCard";
import { useEffect, useState } from "react";

const ProfileSection = () => {
  // const { fetchPendingCares } = useAuth();
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const data = await fetchPendingCares();
  //       console.log(data);
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };

  //   fetchData();
  // }, []);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);
  return (
    <div>
      <div>
        <h3 className="lg:text-4xl lg:mt-20 lg:-mb-10  mt-4 text-2xl uppercase font-semibold text-center">
          Cuidadores disponibles
        </h3>
        <p className="lg:text-xl lg:mt-20 lg:-mb-10  mt-4 text-2xl  font-semibold text-center">
          ¡Aquí te mostramos los perfiles de cuidadores disponibles para tu
          mascota!
        </p>
      </div>
      <div className="lg:mt-16 mt-4 flex ml-auto mb-6 lg:w-[75%] xl:w-[80%] 2xl:w-[85%]">
        <div className="lg:px-14 px-5 pt-2 2xl:container flex flex-wrap">
          {user.map((user) => (
            <div key={user.id} className="md:w-1/2 lg:w-1/3 p-4 ">
              <>
                {isLoading ? (
                  <>
                    <div className="text-center ">
                      <Spinner color="warning" label="Cargando" />
                    </div>
                  </>
                ) : (
                  <ProfileCard user={user} />
                )}
              </>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProfileSection;
