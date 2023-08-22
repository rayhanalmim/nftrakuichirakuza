import React from "react";
import { Table } from "antd";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { data } from "jquery";
import { truncateAddress } from "../../utils";
import { useTranslation } from "react-i18next";

const Level1 = ({ level1Data }) => {
  const navigate = useNavigate();
  console.log(level1Data);
  const { t } = useTranslation();
  return (
    <div className="bg-cyan">
      <div className="mx-auto max-w-[1500px] w-full  ">
        <div className="px-5 py-[2rem] max-w-[300px] w-full rounded  bg-[#1C96E8] shadow text-white my-[3rem] mx-5 ">
          <h3 className="text-2xl font-semibold text-white">{t("Level 1")}</h3>
          <p className="py-2 text-lg">{t("*Yet To Calculated")}</p>
        </div>
        <div className="px-4  pb-[3rem]">
          <div className="mt-5">
            {level1Data.length > 0 ? (
              <div className="overflow-x-auto">
                <div className="inline-block min-w-full shadow-md rounded-lg overflow-hidden">
                  <div className="bg-cyan">
                    <div className="mx-auto max-w-[1500px] w-full  ">
                      <div className="px-4  pb-[3rem]">
                        <div className="mt-5">
                          <div className="overflow-x-auto">
                            <div className="inline-block min-w-full shadow-md rounded-lg overflow-hidden">
                              <table className="min-w-full leading-normal">
                                <thead>
                                  <tr>
                                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider ">
                                      {t("Referral Name")}
                                    </th>
                                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider ">
                                      {t("Referral URL")}
                                    </th>
                                    {/* <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider ">
                                        {t("Referral Date")}
                                      </th> */}
                                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider ">
                                      {t("Status")}
                                    </th>
                                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100" />
                                  </tr>
                                </thead>
                                <tbody>
                                  {level1Data != undefined &&
                                    level1Data?.map((item, index) => {
                                      return (
                                        <>
                                          <tr>
                                            <td
                                              className="px-5 py-5 border-b border-gray-200 bg-white text-sm"
                                              href
                                            >
                                              <div className="flex">
                                                <div className="flex-shrink-0 w-10 h-10">
                                                  <a href="/users/userpage">
                                                    <img
                                                      className="w-full h-full rounded-full"
                                                      src={item.avatar_url}
                                                      alt
                                                    />
                                                  </a>
                                                </div>
                                                <div className="ml-3">
                                                  <p className="text-gray-900 whitespace-no-wrap ">
                                                    {" "}
                                                    {item?.displayName}
                                                  </p>
                                                </div>
                                              </div>
                                            </td>
                                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                              <p className="text-gray-900 whitespace-no-wrap">
                                                {truncateAddress(
                                                  item?.referral_url
                                                )}
                                              </p>
                                            </td>

                                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                              <span className="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
                                                <span
                                                  aria-hidden="true"
                                                  className="absolute inset-0 bg-green-200 opacity-50 rounded-full"
                                                />
                                                <span className="relative">
                                                  Success
                                                </span>
                                              </span>
                                            </td>
                                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-right" />
                                          </tr>
                                        </>
                                      );
                                    })}
                                </tbody>
                              </table>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div />
                      <div></div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              "No Data Found"
            )}
          </div>
        </div>
        <div />
        <div></div>
      </div>
    </div>
  );
};

export default Level1;
