import { Link, isRouteErrorResponse, useRouteError } from "react-router-dom";
import { LottieHandler } from "@components/feedback/index";
function Error() {
  const error = useRouteError();
  let status: number; //makes sure that the status code is number
  let statusText: string; // makes sure that status text is string
  if (isRouteErrorResponse(error)) {
    status = error.status;
    statusText = error.statusText;
  } else {
    status = 404;
    statusText = "Page Not Found";
  }
  return (
    <div className="center-by-translation text-center">
      <LottieHandler type="error" message={statusText} />
      <div>
        <p className="dark:text-white mb-2"> {status} </p>
        <Link
          className="text-center text-white bg-hoverColor p-2 rounded-lg"
          to="/"
          replace={true}
        >
          Go Home Back
        </Link>
      </div>
    </div>
  );
}

export default Error;
