import { Link } from "react-router-dom";

function RegisterBtn() {
  return (
    <Link
      className="btn-primary text-white bg-mainColor hover:bg-hoverColor border-mainColor hover:border-hoverColor inline-block w-full md:w-fit text-center"
      to="register"
    >
      Register
    </Link>
  );
}

export default RegisterBtn;
