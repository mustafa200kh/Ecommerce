import styles from "./spinner.module.css";
let { loader } = styles;
const LikeSpinner = () => {
  return <span className={loader}></span>;
};

export default LikeSpinner;
