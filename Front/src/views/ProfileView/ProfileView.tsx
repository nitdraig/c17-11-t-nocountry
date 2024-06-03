import { user } from "../../services/fakeAPI";
import { Header } from "./Header/Header";
import { PersonalInfo } from "./Personalnfo/PersonalInfo";
import { Photos } from "./Photos/Photos";
import { Review } from "./Review/Review";
import { ServicesInfo } from "./ServicesInfo/ServicesInfo";

const ProfileView = () => {
  return (
    <>
      {user.map((user) => (
        <>
          <div className="h-full bg-[#90A4AE] p-8 pt-10 sticky ">
            <Header user={user} />
            <div className="grid grid-cols-3 gap-3 max-sm:grid-cols-1">
              <PersonalInfo user={user} />
              <div className="grid grid-cols-1">
                <Photos />
                <Review user={user} />
              </div>
              <ServicesInfo user={user} />
            </div>
          </div>
        </>
      ))}
    </>
  );
};

export default ProfileView;
