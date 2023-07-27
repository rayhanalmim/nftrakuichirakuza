import { Disclosure } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

import { NavLink, Link, useNavigate } from "react-router-dom";

import { useLazyQuery } from "@apollo/client";

import ConnectWallet from "../Button/ConnectWallet";

import React, { useState, useEffect, useRef } from "react";
import { getSearchData } from "../../graphql/queries/getSearchData";
import i18next from "i18next";
import { useTranslation } from "react-i18next";

export default function Example({ menu }) {
  const divRef = useRef(null);
  // const [isDivVisible, setIsDivVisible] = useState(false);
  const { t } = useTranslation();
  const [isShow, setIsShow] = useState(true);
  const navigation = [
    // { name: "Collections", current: true },
    // { name: "About", to: "/about", href: "/login", current: false },
    { name: t("Home"), to: "/", href: "/", current: false },
    {
      name: t("Explore"),
      to: "/explore/collection",
      href: "/explore",
      current: false,
    },
    { name: t("Create"), to: "/create", href: "/create", current: false },
    { name: t("Login"), to: "/login", href: "/login", current: false },

    {
      name: t("Dashboard"),
      to: "/mlmdashboard",
      href: "/mlmdashboard",
      current: false,
    },
  ];

  const [suggestionData, setSuggestionData] = useState([]);
  const [resNav, setResNav] = useState(false);
  const [searchData, { loading, error }] = useLazyQuery(getSearchData);

  useEffect(() => {
    window.scrollTo(0, 0);
    i18next.changeLanguage("Japan");
  }, []);
  const handleClick = (lang) => {
    // alert(lang);
    i18next.changeLanguage(lang == "" ? "Japan" : lang);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (divRef.current && !divRef.current.contains(event.target)) {
        setResNav(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, []);

  return (
    <>
      <div className="shadow  flex item-center md:px-[20px] px-0 h-[98px] sticky top-0 bg-white z-[1000]">
        <>
          <div className="mx-auto max-w-[1500px] w-full px-2 ">
            <div className="relative flex items-center justify-between ">
              <div className=" flex-shrink-0 items-center">
                <Link to="/">
                  <img
                    className="block w-auto lg:hidden"
                    src={process.env.PUBLIC_URL + "/assets/logo.png"}
                    alt="Your Company"
                  />
                  <img
                    className="hidden  w-auto lg:block"
                    src={process.env.PUBLIC_URL + "/assets/logo.png"}
                    alt="Your Company"
                  />
                </Link>
              </div>

              <div className="hidden xl:block max-w-[400px] w-full">
                <SearchComponent
                  isShow={isShow}
                  setIsShow={setIsShow}
                  setResNav={setResNav}
                  placeholder={t("Search Items")}
                  onChange={(e) => {
                    setIsShow(true);
                    searchData({
                      variables: {
                        key: e.target.value,
                      },
                    })
                      .then((res) => {
                        console.log(res.data.searchNfts);
                        if (e.target.value) {
                          setSuggestionData(res.data.searchNfts);
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
              <div className="hidden xl:block">
                <div className="flex items-center md:space-x-4 space-x-0">
                  {navigation.map((item) => (
                    <NavLink
                      key={item.name}
                      to={item.to}
                      className={({ isActive }) =>
                        isActive
                          ? "text-[#40a9ff] px-2 py-2 rounded-md md:text-lg text-sm "
                          : "text-[#000]  px-2 py-2 rounded-md md:text-lg text-sm "
                      }
                    >
                      <button>{item.name}</button>
                    </NavLink>
                  ))}
                  <select
                    name="Language"
                    id="cars"
                    class="form-select appearance-none px-3  py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded transition      ease-in-out m-0   focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                    onChange={(e) => handleClick(e.target.value)}
                  >
                    <option value="Japan">日本</option>
                    <option value="en">English</option>
                  </select>
                  <ConnectWallet />
                </div>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                <div className="xl:hidden block">
                  {/* Mobile menu button*/}
                  <button
                    onClick={() => setResNav(!resNav)}
                    className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                  >
                    <span className="sr-only">Open main menu</span>
                    {!resNav ? (
                      <Bars3Icon
                        className="block h-6 w-6"
                        aria-hidden="true"
                        onClick={() => setResNav(true)}
                      />
                    ) : (
                      <XMarkIcon
                        className="block h-6 w-6"
                        aria-hidden="true"
                        onClick={() => setResNav(false)}
                      />
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* <div className="xl:hidden block">
            
          </div> */}
        </>
      </div>
      {resNav
        ? 
            <div
              ref={divRef}
              className="bg-white h-auto sticky top-[98px] w-full z-[101]"
            >
              <div className="space-y-1 px-2 pt-2 pb-3">
                <div className="lg:hidden block">
                  <SearchComponent placeholder={"items"} />
                </div>
        <br/>
                <ConnectWallet />
                <div className="flex flex-col">
                  {navigation.map((item) => (
                    <NavLink
                      onClick={() => setResNav(false)}
                      key={item.name}
                      to={item.to}
                      className={({ isActive }) =>
                        isActive
                          ? "text-[#40a9ff] px-2 py-2 rounded-md md:text-lg text-sm "
                          : "text-[#000]  px-2 py-2 rounded-md md:text-lg text-sm "
                      }
                    >
                      {item.name}
                    </NavLink>
                  ))}
                </div>
                <select
                  name="Langauage"
                  id="cars"
                  onChange={(e) => {
                    handleClick(e.target.value);
                    setResNav(false);
                  }}
                >
                  <option value="japan">日本</option>
                  <option value="en">English</option>
                </select>
              
                {/* <ConnectWallet /> */}
              </div>
            </div>
          
        : null}
    </>
  );
}

export const SearchComponent = ({
  placeholder,
  onChange,
  suggestions,
  isShow,
  setIsShow,
  setResNav,
}) => {
  const navigate = useNavigate();
  // console.log("suggestions", suggestions);
  return (
    <>
      <form className="relative px-2 search-sec">
        <div className="relative">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="absolute top-0 bottom-0 w-6 h-6 my-auto text-[#BC6251]-400 left-3"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          <input
            type="text"
            placeholder={`${placeholder}`}
            onChange={onChange}
            className="w-full py-3 pl-12 pr-4 text-red-500 border rounded-md outline-none  placeholder-red"
            style={{ background: "rgba(0, 0, 0, 0.1)" }}
          />
          {isShow ? (
            <ul
              className={
                suggestions?.length > 0
                  ? `bg-white border-[1px] w-full rounded-lg shadow-lg p-4 absolute max-h-[300px] overflow-y-auto`
                  : "hidden"
              }
            >
              {suggestions?.map((item, key) => {
                return (
                  <li
                    key={item}
                    className="min-h-10 w-full border-b-[1px] border-solid border-l-ray-300 py-2 cursor-pointer"
                    onClick={() => {
                      if (item.collectionName) {
                        console.log("in this");
                        navigate(
                          `/collection/collectiondetails/${item.blockchain}/${item.collectionAddress}`
                        );
                      } else {
                        navigate(
                          `/nft/nftpage/${item.blockchain}/${item.collectionAddress}/${item.token_id}`
                        );
                      }
                      setIsShow(false);
                      setResNav(false);
                      return;
                    }}
                  >
                    {item.name === "" || item.collectionName
                      ? item.collectionName
                      : item.name}
                  </li>
                );
              })}
            </ul>
          ) : null}
        </div>
      </form>
    </>
  );
};
