// components
import { PageHeader } from "@components/common";
import Input from "@form/Input";

// react-router-dom
import { Navigate } from "react-router-dom";

// custom hook
import useRegister from "@hooks/useRegister";

const Register = () => {
  const {
    loading,
    error,
    accessToken,
    emailAvalibilityStatus,
    register,
    handleSubmit,
    formState: { errors },
    onSubmit,
    emailOnBlurHandling,
  } = useRegister();

  if (accessToken) {
    return <Navigate to={"/"} />;
  }

  return (
    <>
      <div className="mb-5 text-center text-mainColor md:font-semibold ">
        <PageHeader title="Registeration" />
      </div>
      <div className="px-3 md:w-3/4 mx-auto">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex items-start gap-5">
            <div className="basis-1/2">
              <Input
                error={errors.firstname?.message}
                name="firstname"
                register={register}
                label={"First Name"}
                placeholder="Jhon"
              />
            </div>
            <div className="basis-1/2">
              <Input
                error={errors.lastname?.message}
                name="lastname"
                register={register}
                label={"Last Name"}
                placeholder="Doe"
              />
            </div>
          </div>
          <Input
            error={
              errors.email?.message
                ? errors.email?.message
                : emailAvalibilityStatus === "notAvaliable"
                ? "this email is already in use"
                : ""
            }
            name="email"
            register={register}
            label={"Email"}
            onBlur={emailOnBlurHandling}
            placeholder="jhondoe@mail.com"
            formText={
              emailAvalibilityStatus === "checking"
                ? "we're chcecking if the email availbilty. Please wait a moment"
                : ""
            }
            success={
              emailAvalibilityStatus === "avaliable"
                ? "this email avaliable for use"
                : ""
            }
          />
          <Input
            error={errors.password?.message}
            name="password"
            register={register}
            label={"Password"}
            placeholder="Choose 8 character or more for strong password"
            type="password"
          />
          <Input
            error={errors.confirmpassword?.message}
            name="confirmpassword"
            register={register}
            label={"Confirm Password"}
            placeholder="Re-write your choosen password here"
            type="password"
          />
          <div className="w-full flex justify-center items-center my-5">
            <button
              type="submit"
              className="w-fit px-4 py-3 text-white rounded-md bg-blue-500 hover:bg-blue-700 focus:ring-4"
              disabled={
                emailAvalibilityStatus === "checking"
                  ? true
                  : loading === "pending"
                  ? true
                  : false
              }
            >
              {loading === "pending" ? "loading..." : "submit"}
            </button>
          </div>
          {error && <p className="text-red-600 text-sm"> {error} </p>}
        </form>
      </div>
    </>
  );
};

export default Register;
