import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import NotConnected from "../../../components/Wallet/NotConnected";

export default function NotConnectedPage() {
  const { t } = useTranslation();
  return (
    <div>
      {" "}
      <div className="hero-sec bg-hero-img bg-no-repeat bg-cover">
        <div className=" flex items-center justify-center max-w-[1800px] w-full h-screen">
          <div className="px-4 lg:py-12">
            <div className="lg:gap-4 lg:flex">
              <div className="flex flex-col items-center justify-center md:py-24 lg:py-32">
                <h1 className="font-bold text-blue-600 text-7xl">
                  {t("Connection Lost")}
                </h1>
                <p className="mb-2 text-2xl font-bold text-center text-gray-800 md:text-3xl">
                  <span className="text-red-500">{t("Oops!")}</span>{" "}
                  {t("Please Connect Wallet")}
                </p>
                <p className="mb-8 text-center text-gray-500 md:text-lg">
                  {t("Please Connect Wallet To Proceed")}
                </p>
                <Link
                  to="/"
                  className="px-6 py-2 text-sm font-semibold text-blue-800 bg-blue-100"
                >
                  Home
                </Link>
              </div>
              <div className="mt-4">
                <img
                  src="https://cdn.dribbble.com/users/1373100/screenshots/5521407/eth_drib_v1.gif"
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
