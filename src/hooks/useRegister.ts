import { useAppDispatch, useAppSelector } from "@store/hooks";
import { useNavigate } from "react-router-dom";
// react hook form
import { useForm, SubmitHandler } from "react-hook-form";
// zod validation
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema, TRegisterInputs } from "@validation/registerSchema";

// redux
import { actAuthRegister, resetMyState } from "@store/auth/authSlice";

// custom hooks for checking on email
import useCheckEmailAvailbilityStatus from "./useCheckEmailAvailbilityStatus";
import { useEffect } from "react";

const useRegister = () => {
  const dispatch = useAppDispatch();

  const { loading, error, accessToken } = useAppSelector((state) => state.auth);

  const navigate = useNavigate();

  const {
    checkEmailAvalibility,
    emailAvalibilityStatus,
    resetDataOnInvalidInput,
    enteredEmail,
  } = useCheckEmailAvailbilityStatus();

  const {
    register,
    handleSubmit,
    trigger,
    getFieldState,
    formState: { errors },
  } = useForm<TRegisterInputs>({
    mode: "onBlur",
    resolver: zodResolver(registerSchema),
  });

  const onSubmit: SubmitHandler<TRegisterInputs> = async (data) => {
    const { firstname, lastname, email, password } = data;
    dispatch(actAuthRegister({ firstname, lastname, email, password }))
      .unwrap()
      .then(() => {
        navigate("/login?message=account_created");
      });
  };

  // Email on Blur Handling

  const emailOnBlurHandling = async (e: React.FocusEvent<HTMLInputElement>) => {
    // getFieldState gets the state of specific field by passing its name as an argument
    // isDirty = returns ture when the field has value
    // invalid = true when the validation of the field fails
    await trigger("email"); // let the validtion checks on the email first before the isdirty & invalid starts
    const value = e.target.value;
    const { isDirty, invalid } = getFieldState("email");
    if (isDirty && !invalid && enteredEmail !== value) {
      // checking if the field of email is full and valid (validation is true)
      checkEmailAvalibility(value);
    }
    // we need to reset the values when the invlaid is true
    if (isDirty && invalid && enteredEmail) {
      resetDataOnInvalidInput();
    }
  };

  useEffect(() => {
    dispatch(resetMyState());
  }, [dispatch]);

  return {
    loading,
    error,
    accessToken,
    emailAvalibilityStatus,
    register,
    handleSubmit,
    formState: { errors },
    onSubmit,
    emailOnBlurHandling,
  };
};
export default useRegister;
