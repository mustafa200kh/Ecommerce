import { useState } from "react";

import axios from "axios";

// defines the type of email status
type TEmailStatus =
  | "idle"
  | "checking"
  | "avaliable"
  | "notAvaliable"
  | "failed";

const useCheckEmailAvailbilityStatus = () => {
  // define the state of avalibility status of the email
  const [emailAvalibilityStatus, setEmailAvalibilityStatus] =
    useState<TEmailStatus>("idle");
  // define the state of the entered email by the user
  const [enteredEmail, setEnteredEmail] = useState<null | string>(null);

  // now we make the check from the data base in  this function
  const checkEmailAvalibility = async (email: string) => {
    setEmailAvalibilityStatus("checking");
    setEnteredEmail(email);
    try {
      const response = await axios.get(`/users?email=${email}`);
      if (!response.data.length) {
        setEmailAvalibilityStatus("avaliable");
      } else {
        setEmailAvalibilityStatus("notAvaliable");
      }
    } catch (error) {
      setEmailAvalibilityStatus("failed");
    }
  };
  const resetDataOnInvalidInput = () => {
    setEmailAvalibilityStatus("idle");
    setEnteredEmail(null);
  };
  return {
    checkEmailAvalibility,
    emailAvalibilityStatus,
    enteredEmail,
    resetDataOnInvalidInput,
  };
};

export default useCheckEmailAvailbilityStatus;
