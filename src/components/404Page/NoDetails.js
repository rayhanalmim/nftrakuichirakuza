import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

export default function NotDetails() {
  const { t } = useTranslation();
  return (
    <div className="bg-gradient-to-r from-purple-300 to-blue-200">
      <div className="w-9/12 m-auto py-16 min-h-screen flex items-center justify-center">
        <div className="bg-white shadow overflow-hidden sm:rounded-lg pb-8">
          <div className="border-t border-gray-200 text-center pt-8">
            <h1 className="text-5xl font-bold text-purple-400">
              {t("Not Your Collection")}
            </h1>
            <h1 className="text-4xl font-medium py-8">
              {t("Oops! Details Not Found")}
            </h1>
            <p className="text-2xl pb-8 px-12 font-medium">
              {t(
                "Oops! The details you are looking for does not exist. It might have been moved or deleted."
              )}
            </p>
            <button className="bg-gradient-to-r from-purple-400 to-blue-500 hover:from-pink-500 hover:to-orange-500 text-white font-semibold px-6 py-3 rounded-md mr-6">
              {t("HOME")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
