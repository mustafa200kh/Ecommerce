// React Hook Form
import { useForm, SubmitHandler } from "react-hook-form";
// zod Validation
import { loginSchema, TLoginForm } from "@validation/LoginSchema";
import { zodResolver } from "@hookform/resolvers/zod";

// react-router-dom
import { useSearchParams, useNavigate } from "react-router-dom";

// hooks
import { useEffect } from "react";
// redux
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { actAuthLogin, resetMyState } from "@store/auth/authSlice";

const useLogin = () => {
  let navigate = useNavigate();

  const dispatch = useAppDispatch();

  const { loading, error, accessToken } = useAppSelector((state) => state.auth);

  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    return () => {
      setSearchParams("");
      dispatch(resetMyState());
    };
  }, [dispatch]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TLoginForm>({
    mode: "onBlur",
    resolver: zodResolver(loginSchema),
  });
  const onSubmit: SubmitHandler<TLoginForm> = async (data) => {
    const { email, password } = data;
    dispatch(actAuthLogin({ email, password }))
      .unwrap()
      .then(() => {
        navigate("/");
      });
  };
  return {
    accessToken,
    handleSubmit,
    onSubmit,
    register,
    formState: { errors },
    searchParams,
    loading,
    error,
  };
};

export default useLogin;
