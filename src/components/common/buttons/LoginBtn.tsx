import { Link } from "react-router-dom";

function LoginBtn() {
  return (
    <Link
      to="login"
      className={`inline-block border-gray-800 text-gray-800 dark:text-white dark:border-white btn-primary hover:border-hoverColor hover:text-hoverColor w-full md:w-fit text-center`}
    >
      Login
    </Link>
  );
}

export default LoginBtn;
