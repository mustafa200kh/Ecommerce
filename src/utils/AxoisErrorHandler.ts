import axios from "axios";

const AxoisErrorHandler = (error: unknown) => {
  if (axios.isAxiosError(error)) {
    return (
      error.response?.data || error.response?.data.message || error.message
    );
  } else {
    return "An unexpected Error";
  }
};

export default AxoisErrorHandler;
