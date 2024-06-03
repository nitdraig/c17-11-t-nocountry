import { LoginForm } from "./LoginForm/LoginForm";

const LoginView = () => {
  return (
    <section>
      <div className="flex flex-col items-center justify-center px-6 mt-20 py-10 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0">
          <LoginForm />
        </div>
      </div>
    </section>
  );
};

export default LoginView;
