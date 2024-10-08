import { lazy, Suspense } from "react";
// Layout
import { createHashRouter, RouterProvider } from "react-router-dom";
//Layouts
const MainLayout = lazy(() => import("@layout/MainLayout/MainLayout"));
const ProfileLayout = lazy(() => import("@layout/ProfileLayout/ProfileLayout"));
// Pages
const Home = lazy(() => import("@pages/Home"));
const Categories = lazy(() => import("@pages/Categories"));
const Products = lazy(() => import("@pages/Products"));
const ContactUs = lazy(() => import("@pages/ContactUs"));
const Login = lazy(() => import("@pages/Login"));
const Register = lazy(() => import("@pages/Register"));
const Cart = lazy(() => import("@pages/Cart"));
const Wishlist = lazy(() => import("@pages/Wishlist"));
const Account = lazy(() => import("@pages/Account"));
const Orders = lazy(() => import("@pages/Orders"));

import Error from "@pages/error/Error";
import ProtectedRoutes from "@components/Auth/ProtectedRoutes";
import { LottieHandler } from "@components/feedback";

const router = createHashRouter([
  {
    path: "/",
    element: (
      <Suspense
        fallback={
          <LottieHandler type="loading" message="Loading Please Wait A Sec" />
        }
      >
        <MainLayout />
      </Suspense>
    ),
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: (
          <Suspense
            fallback={
              <LottieHandler
                type="loading"
                message="Loading Please Wait A Sec"
              />
            }
          >
            <Home />
          </Suspense>
        ),
      },
      {
        path: "categories",
        element: (
          <Suspense
            fallback={
              <LottieHandler
                type="loading"
                message="Loading Please Wait A Sec"
              />
            }
          >
            <Categories />
          </Suspense>
        ),
      },
      {
        path: "wishlist",
        element: (
          <ProtectedRoutes>
            <Suspense
              fallback={
                <LottieHandler
                  type="loading"
                  message="Loading Please Wait A Sec"
                />
              }
            >
              <Wishlist />
            </Suspense>
          </ProtectedRoutes>
        ),
      },
      {
        path: "cart",
        element: (
          <Suspense
            fallback={
              <LottieHandler
                type="loading"
                message="Loading Please Wait A Sec"
              />
            }
          >
            <Cart />
          </Suspense>
        ),
      },

      {
        path: "categories/Products/:prefix",
        element: (
          <Suspense
            fallback={
              <LottieHandler
                type="loading"
                message="Loading Please Wait A Sec"
              />
            }
          >
            <Products />
          </Suspense>
        ),
        loader: ({ params }) => {
          // type of prefix is not defined or not from A-Z
          if (
            typeof params.prefix !== "string" ||
            !/^[a-z]+$/.test(params.prefix)
          ) {
            // What type of Error
            throw new Response("Bad Request", {
              status: 400,
              statusText: "Category Not Found",
            });
          }
          return true;
        },
      },
      {
        path: "contactus",
        element: (
          <Suspense
            fallback={
              <LottieHandler
                type="loading"
                message="Loading Please Wait A Sec"
              />
            }
          >
            <ContactUs />
          </Suspense>
        ),
      },
      {
        path: "login",
        element: (
          <Suspense
            fallback={
              <LottieHandler
                type="loading"
                message="Loading Please Wait A Sec"
              />
            }
          >
            <Login />
          </Suspense>
        ),
      },
      {
        path: "register",
        element: (
          <Suspense
            fallback={
              <LottieHandler
                type="loading"
                message="Loading Please Wait A Sec"
              />
            }
          >
            <Register />
          </Suspense>
        ),
      },
      {
        path: "profile",
        element: (
          <ProtectedRoutes>
            <Suspense
              fallback={
                <LottieHandler
                  type="loading"
                  message="Loading Please Wait A Sec"
                />
              }
            >
              <ProfileLayout />
            </Suspense>
          </ProtectedRoutes>
        ),
        children: [
          {
            index: true,
            element: (
              <Suspense
                fallback={
                  <LottieHandler
                    type="loading"
                    message="Loading Please Wait A Sec"
                  />
                }
              >
                <Account />
              </Suspense>
            ),
          },
          {
            path: "order",
            element: (
              <Suspense
                fallback={
                  <LottieHandler
                    type="loading"
                    message="Loading Please Wait A Sec"
                  />
                }
              >
                <Orders />
              </Suspense>
            ),
          },
        ],
      },
    ],
  },
]);

function AppRouter() {
  return <RouterProvider router={router} />;
}

export default AppRouter;
