import { Disclosure } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { Divider } from "antd";
import { NavLink, Link } from "react-router-dom";

import { Drawer, Button } from "antd";
import { MenuOutlined } from "@ant-design/icons";
import React, { useState, useEffect } from "react";
import { SearchComponent } from "../../components/Header/Header";
import ConnectWallet from "../../components/Button/ConnectWallet";
import { useTranslation } from "react-i18next";
function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const MLMNavbar = ({ menu, topics }) => {
  const { t } = useTranslation();
  const navigation = [
    { name: t("MLMDashboard"), href: "/", current: true },
    { name: t("Explore"), to: "/explore", href: "/explore", current: false },
    { name: t("Create"), to: "/create", href: "/create", current: false },
    { name: t("Login"), to: "/login", href: "/login", current: false },
  ];
  const [visible, setVisible] = useState("");

  return (
    <div>
      <Disclosure
        as="nav"
        className="shadow md:px-[20px] px-0 sticky top-0 bg-white z-[1000]"
      >
        {({ open }) => (
          <>
            <div className="mx-auto max-w-[1900px] w-full px-2 ">
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
                <div className="hidden">
                  <Button
                    className="menu bg-0 border-0 text-white  "
                    icon={<MenuOutlined />}
                    onClick={() => setVisible(true)}
                  />

                  <Drawer
                    title="Topics"
                    placement="left"
                    onClick={() => setVisible(false)}
                    onClose={() => setVisible(false)}
                    visible={visible}
                  >
                    {menu}
                  </Drawer>
                </div>

                <div className="   hidden sm:block max-w-[400px] w-full">
                  <SearchComponent placeholder={"items"} />
                </div>
                <div className="  hidden sm:block">
                  <div className="flex  items-center md:space-x-4 space-x-0">
                    {navigation.map((item) => (
                      <NavLink
                        key={item.name}
                        to={item.to}
                        className={({ isActive }) =>
                          isActive
                            ? "text-[#40a9ff]   px-2 py-2 rounded-md md:text-lg text-sm "
                            : "text-[#000]  px-2 py-2 rounded-md md:text-lg text-sm "
                        }
                      >
                        {item.name}
                      </NavLink>
                    ))}

                    <ConnectWallet />
                  </div>
                </div>
                <div className=" md:hidden  absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                  <div className="sm:hidden">
                    {/* Mobile menu button*/}
                    <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white ml-[2rem]">
                      <span className="sr-only">Open main menu</span>
                      {open ? (
                        <XMarkIcon
                          className="block h-6 w-6"
                          aria-hidden="true"
                        />
                      ) : (
                        <Bars3Icon
                          className="block h-6 w-6"
                          aria-hidden="true"
                        />
                      )}
                    </Disclosure.Button>
                  </div>
                </div>
              </div>
            </div>

            <Disclosure.Panel className="sm:hidden">
              <div className="space-y-1 px-2 pt-2 pb-3">
                <div className="  md:hidden block">
                  <SearchComponent placeholder={"items"} />
                </div>
                {navigation.map((item) => (
                  <Disclosure.Button
                    key={item.name}
                    as="a"
                    href={item.to}
                    className="block px-3 py-2 rounded-md text-base font-medium text-black focus:[#40a9ff] "
                    aria-current={item.current ? "page" : undefined}
                  >
                    {item.name}
                  </Disclosure.Button>
                ))}
                <ConnectWallet />
              </div>
              <hr className=" mx-5" />
              <div>{menu}</div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
    </div>
  );
};

export default MLMNavbar;
