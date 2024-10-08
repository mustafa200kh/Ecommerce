import { useEffect, useState } from "react";

const useTheme = () => {
  let [darkTheme, setDarkTheme] = useState<boolean>(false);

  useEffect(() => {
    if (darkTheme === true) {
      document.body.classList.add("dark");
    } else if (darkTheme === false) {
      document.body.classList.remove("dark");
    }
  }, [darkTheme]);
  return { darkTheme, setDarkTheme };
};

export default useTheme;
