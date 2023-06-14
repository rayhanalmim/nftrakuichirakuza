import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import Web3 from "web3";
import { Button } from "../Button/Primary";
import { useWeb3React } from "@web3-react/core";
import useAuth from "../../hooks/useAuth";
import { Link } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { signIn } from "../../graphql/queries/signIn";
import { useTranslation } from "react-i18next";
const ConnectWallet = () => {
  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }
  const { active, account } = useWeb3React();
  const { t } = useTranslation();
  const { loading, error, data } = useQuery(signIn, {
    skip: !account,
    variables: { wallet: account },
  });

  const { login, logout } = useAuth();
  const web3_ = new Web3(window.ethereum);
  const items = [
    {
      label: "Event",
    },
  ];
  return (
    <div>
      {!active ? (
        <button
          className="last: bg-[url('/assets/buttonbg.png')] bg-no-repeat rounded-lg  text-white  xl:text-lg text-md  px-2 sm:px-1  py-2 capitalize  justify-center items-center z-[100] w-max	"
          onClick={() => {
            login();
          }}
        >
          {t("Connect Wallet")}
        </button>
      ) : (
        //  <Button title={"Disconnect"} />

        <Menu as="div" className="relative inline-block text-left">
          <div>
            <Menu.Button className="inline-flex w-full justify-center rounded-md bg-white px-4 py-2 text-sm font-medium text-gray-700  ">
              <div
                className={`rounded-full p-5 h-[20px] w-[20px] bg-[url(${
                  loading
                    ? ""
                    : data?.signIn?.avatar_url?.includes("ipfs")
                    ? data?.signIn?.avatar_url?.replace(
                        "ipfs://",
                        "https://gateway.ipfscdn.io/ipfs/"
                      )
                    : data?.signIn?.avatar_url == ""
                    ? ""
                    : data?.signIn?.avatar_url
                })] bg-no-repeat bg-cover`}
              ></div>
              <ChevronDownIcon
                className="mr-1 ml-2 mt-2 h-5 w-5"
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
            <Menu.Items className="absolute right-0 z-10 mt-2 w-[55px} origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
              <div className="py-1">
                <Menu.Item>
                  {({ active }) => (
                    <>
                      <Link
                        to="/setting"
                        className={classNames(
                          active
                            ? "bg-gray-100 text-gray-900"
                            : "text-gray-700",
                          "block px-4 py-2 text-sm"
                        )}>
                        {t("Settings")}
                      </Link>
                      <Link
                        to="/mycollections"
                        className={classNames(
                          active
                            ? "bg-gray-100 text-gray-900"
                            : "text-gray-700",
                            "block px-4 py-2 text-sm"
                        )}
                      >
                        {t("User Collections")}
                      </Link>
                      <p
                        className={classNames(
                          active
                            ? "bg-gray-100 text-gray-900"
                            : "text-gray-700",
                          "block px-4 py-2 text-sm cursor-pointer"
                        )}
                        onClick={() => logout()}
                      >
                        {t("Disconnect")}
                      </p>
                    </>
                  )}
                </Menu.Item>
              </div>
            </Menu.Items>
          </Transition>
        </Menu>
      )}
    </div>
  );
};

export default ConnectWallet;
