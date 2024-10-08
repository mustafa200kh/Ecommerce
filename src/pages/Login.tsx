// components
import { PageHeader } from "@components/common";
// lotties
import { LottieHandler } from "@components/feedback";

import Input from "@form/Input";
// react-router-dom
import { Navigate } from "react-router-dom";

import useLogin from "@hooks/useLogin";
const Login = () => {
  const {
    accessToken,
    handleSubmit,
    onSubmit,
    register,
    formState: { errors },
    searchParams,
    loading,
    error,
  } = useLogin();

  if (accessToken) {
    <Navigate to={"/"} />;
  }
  return (
    <>
      <div className="mb-5 text-center text-mainColor md:font-semibold ">
        <PageHeader title="User Login" />
      </div>

      <div className="p-3 md:p-0 md:w-1/2 mx-auto">
        <LottieHandler type="login" size="sm" />
        <form onSubmit={handleSubmit(onSubmit)}>
          {searchParams.get("message") == "account_created" ? (
            <p className="p-4 bg-green-100 border border-green-500 rounded-md mb-5">
              Your account has been created. Now Login{" "}
            </p>
          ) : (
            ""
          )}
          <Input
            name="email"
            register={register}
            error={errors.email?.message}
            label="Email"
            placeholder="ex:jhon@mail.com"
          />
          <Input
            name="password"
            register={register}
            error={errors.password?.message}
            type="password"
            label="Password"
            placeholder="Your Password"
          />
          <div className="w-full flex justify-center items-center my-5">
            <button
              type="submit"
              className="w-fit px-4 py-3 text-white rounded-md bg-blue-500 hover:bg-blue-700 focus:ring-4"
              disabled={loading === "pending" ? true : false}
            >
              {loading === "pending" ? "loading..." : "login"}
            </button>
          </div>
          {error && <p className="text-red-600 text-sm"> {error} </p>}
        </form>
      </div>
    </>
  );
};

export default Login;
