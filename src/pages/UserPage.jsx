import UserAppointments from "../components/user/UserAppointments";
import UserForm from "../components/user/UserForm";
import UserPets from "../components/user/UserPets";
import "../assets/styles/User.scss";

const UserPage = () => {
  return (
    <>
      <UserForm />
      <UserPets />
      <UserAppointments />
    </>
  );
};

export default UserPage;
