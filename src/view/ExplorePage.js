import React, { useState, useEffect } from "react";
import { Fragment } from "react";
import { NavLink, Link, Outlet } from "react-router-dom";
import i18next from "i18next";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { useTranslation } from "react-i18next";
import { SearchComponent } from "../components/Header/Header";
import { getSearchData } from "../graphql/queries/getSearchData";
import { useLazyQuery } from "@apollo/client";
import { SearchCollection } from "../graphql/queries/searchCollection";

const ExplorePage = () => {
  const [active, setActive] = useState(false);
  const [searchData, { loading, error }] = useLazyQuery(SearchCollection);
  const [suggestionData, setSuggestionData] = useState([]);
  const { t } = useTranslation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>
      <div className="max-w-[1500px]  mx-auto px-[20px] md:px-0 py-5 ">
        <div className=" ">
          <div className="px-2">
            <div></div>
            <div className="flex gap-5 justify-between  items-center md:px-[20px] px-0 ">
              <div className="flex gap-5 py-4 justify-center items-center">
                <NavLink
                  to="/explore/collection"
                  className={({ isActive }) =>
                    isActive
                      ? "text-[#40a9ff] text-2xl"
                      : "text-[#000] text-2xl"
                  }
                >
                  {t("Collections")}
                </NavLink>
                <NavLink
                  to="/explore/users"
                  className={({ isActive }) =>
                    isActive
                      ? "text-[#40a9ff] text-2xl"
                      : "text-[#000] text-2xl"
                  }
                >
                  {t("Users")}
                </NavLink>
              </div>
              <div className="hidden md:block max-w-[400px] w-full">
                <SearchComponent
                  placeholder={t("Search Collections")}
                  onChange={(e) => {
                    searchData({
                      variables: {
                        key: e.target.value,
                      },
                    })
                      .then((res) => {
                        console.log(res.data.searchCollections);
                        if (e.target.value) {
                          setSuggestionData(res.data.searchCollections);
                        } else {
                          setSuggestionData();
                        }
                      })
                      .catch((err) => {
                        console.log(err);
                      });
                  }}
                  suggestions={suggestionData}
                />
              </div>
            </div>

            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExplorePage;

const Language = () => {
  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }
  const { t } = useTranslation();
  const handleClick = (lang) => {
    i18next.changeLanguage(lang);
  };

  return (
    <>
      <Menu as="div" className="relative inline-block text-left -lg my-5">
        <div>
          <Menu.Button className="inline-flex w-full justify-center border rounded-md bg-white px-4 py-2 text-sm font-medium text-gray-700  ">
            <div className="">Language</div>
            <ChevronDownIcon
              className="-mr-1 ml-2 h-5 w-5"
              aria-hidden="true"
            />
          </Menu.Button>
        </div>

        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="py-1">
              <Menu.Item>
                {({ active }) => (
                  <a
                    className={classNames(
                      active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                      "block px-4 py-2 text-sm"
                    )}
                    onClick={() => handleClick("en")}
                  >
                    English
                  </a>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <a
                    className={classNames(
                      active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                      "block px-4 py-2 text-sm"
                    )}
                    onClick={() => handleClick("ko")}
                  >
                    Korean
                  </a>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <a
                    className={classNames(
                      active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                      "block px-4 py-2 text-sm"
                    )}
                    onClick={() => handleClick("japan")}
                  >
                    Japanese
                  </a>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <a
                    className={classNames(
                      active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                      "block px-4 py-2 text-sm"
                    )}
                  >
                    Chinese
                  </a>
                )}
              </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
      <p>
        <h3>{t("Thanks.1")}</h3> <h3>{t("Why.1")}</h3>
      </p>
    </>
  );
};
