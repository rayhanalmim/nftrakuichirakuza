import React from "react";
import { Link } from "react-router-dom";

export default function NoCollection() {
  return (
    <div>
      {" "}
      <div className="hero-sec bg-hero-img bg-no-repeat bg-cover">
        <div className=" flex items-center justify-center max-w-[1800px] w-full h-screen">
          <div className="px-4 lg:py-12">
            <div className="lg:gap-4 lg:flex">
              <div className="flex flex-col items-center justify-center md:py-24 lg:py-32">
                <h1 className="font-bold text-blue-600 text-7xl">
                  Collection Not Found
                </h1>
                <p className="mb-2 text-2xl font-bold text-center text-gray-800 md:text-3xl">
                  <span className="text-red-500">Oops!</span> There is no
                  collection to mint nft <br /> kindly create one collection to
                  proceed
                </p>
                <p className="mb-8 text-center text-gray-500 md:text-lg">
                  Please Create Collection To Proceed
                </p>
                <Link
                  to="/CreateCollection"
                  className="px-6 py-2 text-sm font-semibold text-blue-800 bg-blue-100"
                >
                  Create Collection
                </Link>
              </div>
              <div className="mt-4">
                <img
                  src="https://i0.wp.com/nft-art-studio.com/wp-content/uploads/2022/01/Webdesign-NFT-Art-Studio-Logo.gif?fit=500%2C500&ssl=1"
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
