import React from "react";
import { Link } from "react-router-dom";

export default function PleaseLogin() {
  return (
    <div>
      {" "}
      <div className="hero-sec bg-hero-img bg-no-repeat bg-cover">
        <div className=" flex items-center justify-center max-w-[1800px] w-full h-screen">
          <div className="px-4 lg:py-12">
            <div className="lg:gap-4 lg:flex">
              <div className="flex flex-col items-center justify-center md:py-24 lg:py-32">
                <h1 className="font-bold text-blue-600 text-7xl">
                  USER NOT FOUND
                </h1>
                <p className="mb-2 text-2xl font-bold text-center text-gray-800 md:text-3xl">
                  <span className="text-red-500">Oops!</span> There is no user{" "}
                  <br /> kindly create one user to proceed
                </p>
                <p className="mb-8 text-center text-gray-500 md:text-lg">
                  Please Create User To Proceed
                </p>
                <Link
                  to="/login"
                  className="px-6 py-2 text-sm font-semibold text-blue-800 bg-blue-100"
                >
                  Create User
                </Link>
              </div>
              <div className="mt-4">
                <img
                  src="https://img.icons8.com/ios/512/user-not-found.png"
                  alt="img"
                  className="object-cover w-full h-full"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
