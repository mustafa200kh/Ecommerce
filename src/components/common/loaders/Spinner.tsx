import styles from "./spinner.module.css";
let { loader } = styles;
const Spinner = () => {
  return <span className={loader}></span>;
};

export default Spinner;
