import { Link } from "react-router-dom";
import Logo from "../Logo/Logo";

const Footer = () => {
  return (
    <div className="footer bg-lighttheme dark:bg-darktheme pt-5 pb-2 px-3 dark:text-darktext">
      <div className="py-5 flex items-center justify-between flex-wrap gap-2">
        <div className="basis-full md:basis-1/2 lg:basis-1/4 text-center">
          <Logo />
        </div>
        <div className="self-start basis-full md:basis-1/2 lg:basis-[12%]">
          <h2 className="font-semibold hover:text-mainColor">Categories</h2>
          <ul className="">
            <li>
              <Link
                to={"/categories/Products/men"}
                className="hover:text-mainColor"
              >
                Men
              </Link>
            </li>
            <li>
              <Link
                to={"/categories/Products/women"}
                className="hover:text-mainColor"
              >
                Women
              </Link>
            </li>
            <li>
              <Link
                to={"/categories/Products/sport"}
                className="hover:text-mainColor"
              >
                Sport
              </Link>
            </li>
            <li>
              <Link
                to={"/categories/Products/kids"}
                className="hover:text-mainColor"
              >
                Kids
              </Link>
            </li>
            <li>
              <Link
                to={"/categories/Products/baby"}
                className="hover:text-mainColor"
              >
                Baby
              </Link>
            </li>
          </ul>
        </div>
        <div className="self-start basis-full md:basis-1/2 lg:basis-1/4">
          <h2 className="font-semibold hover:text-mainColor">Contact</h2>
          <ul className="">
            <li>
              <a
                href="mailto:mostafakhashan3@gmail.com"
                className="hover:text-mainColor"
              >
                mostafakhashan3@gmail.com
              </a>
            </li>
            <li>
              <a href="tell:0964784917" className="hover:text-mainColor">
                +963 964 784 917
              </a>
            </li>
          </ul>
        </div>
        <div className="basis-full md:basis-1/2 lg:basis-1/4">
          <h1 className="text-lg dark:text-white mb-2"> Send Message</h1>
          <div>
            <input
              type="text"
              placeholder=""
              className="w-full inline-block p-1 mb-2 bg-white border-[1px] border-solid border-x-darktext outline-none rounded-md"
            />
            <button className="btn-primary border-blue-600 bg-blue-600 text-white font-normal hover:scale-105">
              Send
            </button>
          </div>
        </div>
      </div>
      <hr className="w-full h-[2px] rounded-sm bg-darktheme dark:bg-lighttheme my-2 " />
      <p className="text-center">
        Made with 💙 by
        <span className="cursor-pointer"> Mustafa Jazieh</span>
      </p>
    </div>
  );
};

export default Footer;
