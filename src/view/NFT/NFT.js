import React, { useState, useEffect } from "react";
import { Fragment } from "react";
import { Link, Outlet } from "react-router-dom";
import NFTCard from "../../components/Cards/NFTCard/NFTCard";
import { Dropdown, Space } from "antd";
import { DownOutlined } from "@ant-design/icons";
import { SearchComponent } from "../../components/Header/Header";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { TabGroup } from "@statikly/funk";
import { useTranslation } from "react-i18next";
import Users from "../Users/Users";
import NFTCollectionCard from "../../components/Cards/CollectionNFTCard/CollectionNFT";
import { MdArrowDownward, MdArrowDropUp, MdArrowUpward } from "react-icons/md";
import { BiDownArrow, BiUpArrow } from "react-icons/bi";
import { useQuery } from "@apollo/client";
import PageLoading from "../../components/PageLoading/PageLoading";

const NFT = ({ data, blockchain, collection, buyNowNFT, dataNFT }) => {
  console.log(data, "testdata");
  // useEffect(() => {
  //   window.scrollTo(0, 0);
  // }, []);

  console.log(blockchain, collection, "card bft");
  const [active, setActive] = useState("");
  const [toggle, setToggle] = useState({
    status: false,
    price: false,
    explore: false,
  });
  const [dataSize, setDataSize] = useState(40);
  const [buyNow, setBuyNow] = useState(false);
  const [chainName, setChainName] = useState(false);
  const navigation = [
    // { name: "Collections", current: true },
    { name: "NFTS", to: "/nft", current: false },
    // { name: "Create", to: "/create", current: false },
    { name: "Users", to: "/users", current: false },
  ];
  const { t } = useTranslation();

  const FakeData = [
    {
      url: "https://assets.raribleuserdata.com/prod/v1/image/t_gif_preview/aHR0cHM6Ly9zdG9yYWdlLmdvb2dsZWFwaXMuY29tL2dvYmJsZXJzLmFydGdvYmJsZXJzLmNvbS9naWZzLzE2NjIuZ2lm",
    },
    {
      url: "https://assets.raribleuserdata.com/prod/v1/image/t_gif_preview/aHR0cHM6Ly9zdG9yYWdlLmdvb2dsZWFwaXMuY29tL2dvYmJsZXJzLmFydGdvYmJsZXJzLmNvbS9naWZzLzE0LmdpZg==",
    },
    {
      url: "https://assets.raribleuserdata.com/prod/v1/image/t_gif_preview/aHR0cHM6Ly9zdG9yYWdlLmdvb2dsZWFwaXMuY29tL2dvYmJsZXJzLmFydGdvYmJsZXJzLmNvbS9naWZzLzE1MzEuZ2lm",
    },
    {
      url: "https://assets.raribleuserdata.com/prod/v1/image/t_gif_preview/aHR0cHM6Ly9zdG9yYWdlLmdvb2dsZWFwaXMuY29tL2dvYmJsZXJzLmFydGdvYmJsZXJzLmNvbS9naWZzLzUzNjIuZ2lm",
    },
    {
      url: "https://assets.raribleuserdata.com/prod/v1/image/t_gif_preview/aHR0cHM6Ly9zdG9yYWdlLmdvb2dsZWFwaXMuY29tL2dvYmJsZXJzLmFydGdvYmJsZXJzLmNvbS9naWZzLzU0MDIuZ2lm",
    },
    {
      url: "https://assets.raribleuserdata.com/prod/v1/image/t_gif_preview/aHR0cHM6Ly9zdG9yYWdlLmdvb2dsZWFwaXMuY29tL2dvYmJsZXJzLmFydGdvYmJsZXJzLmNvbS9naWZzLzY3ODMuZ2lm",
    },
    {
      url: "https://assets.raribleuserdata.com/prod/v1/image/t_gif_preview/aHR0cHM6Ly9zdG9yYWdlLmdvb2dsZWFwaXMuY29tL2dvYmJsZXJzLmFydGdvYmJsZXJzLmNvbS9naWZzLzQ5NDQuZ2lm",
    },
    {
      url: "https://assets.raribleuserdata.com/prod/v1/image/t_gif_preview/aHR0cHM6Ly9zdG9yYWdlLmdvb2dsZWFwaXMuY29tL2dvYmJsZXJzLmFydGdvYmJsZXJzLmNvbS9naWZzLzE1MzEuZ2lm",
    },
    {
      url: "https://assets.raribleuserdata.com/prod/v1/image/t_gif_preview/aHR0cHM6Ly9zdG9yYWdlLmdvb2dsZWFwaXMuY29tL2dvYmJsZXJzLmFydGdvYmJsZXJzLmNvbS9naWZzLzUzNjIuZ2lm",
    },
    {
      url: "https://assets.raribleuserdata.com/prod/v1/image/t_gif_preview/aHR0cHM6Ly9zdG9yYWdlLmdvb2dsZWFwaXMuY29tL2dvYmJsZXJzLmFydGdvYmJsZXJzLmNvbS9naWZzLzY3ODMuZ2lm",
    },
    {
      url: "https://assets.raribleuserdata.com/prod/v1/image/t_gif_preview/aHR0cHM6Ly9zdG9yYWdlLmdvb2dsZWFwaXMuY29tL2dvYmJsZXJzLmFydGdvYmJsZXJzLmNvbS9naWZzLzQ5NDQuZ2lm",
    },
    {
      url: "https://assets.raribleuserdata.com/prod/v1/image/t_gif_preview/aHR0cHM6Ly9zdG9yYWdlLmdvb2dsZWFwaXMuY29tL2dvYmJsZXJzLmFydGdvYmJsZXJzLmNvbS9naWZzLzE0LmdpZg==",
    },
    {
      url: "https://assets.raribleuserdata.com/prod/v1/image/t_gif_preview/aHR0cHM6Ly9zdG9yYWdlLmdvb2dsZWFwaXMuY29tL2dvYmJsZXJzLmFydGdvYmJsZXJzLmNvbS9naWZzLzE1MzEuZ2lm",
    },
    {
      url: "https://assets.raribleuserdata.com/prod/v1/image/t_gif_preview/aHR0cHM6Ly9zdG9yYWdlLmdvb2dsZWFwaXMuY29tL2dvYmJsZXJzLmFydGdvYmJsZXJzLmNvbS9naWZzLzUzNjIuZ2lm",
    },
    {
      url: "https://assets.raribleuserdata.com/prod/v1/image/t_gif_preview/aHR0cHM6Ly9zdG9yYWdlLmdvb2dsZWFwaXMuY29tL2dvYmJsZXJzLmFydGdvYmJsZXJzLmNvbS9naWZzLzU0MDIuZ2lm",
    },
  ];
  const items = [];
  if (data) {
    <PageLoading />;
  }

  return (
    <>
      <div className="flex justify-center items-center gap-[20px] md:px-[20px] px-0  md:py-[2rem] py-2"></div>
      <div className="max-w-[1500px]  mx-auto">
        <div className=" ">
          <div className="px-2">
            <div className="md:py-10  py-2">
              <div className="flex flex-col md:flex-row justify-center gap-[40px] max-w-[1500px] mx-auto md:px-[20px] px-0  md:max-h-[700px] h-auto">
                <div className="sticky h-auto  md:top-[120px] top-auto bg-white md:max-h-[700px]">
                  <div className="border-b-2 pb-4">
                    <Dropdown
                      menu={{
                        items,
                      }}
                    >
                      <a
                        onClick={(e) => {
                          e.preventDefault();
                          setToggle({ ...toggle, status: !toggle.status });
                        }}
                      >
                        <Space className="py-3 w-[300px]">
                          <h4 className="capitalize font-bold text-lg p-0 m-0">
                            {t("Status")}
                          </h4>

                          {toggle.status ? (
                            <MdArrowUpward size={20} />
                          ) : (
                            <MdArrowDownward size={20} />
                          )}
                        </Space>
                      </a>
                    </Dropdown>
                    {toggle.status ? (
                      <div className="flex gap-5 flex-wrap pt-5 pb-3 ">
                        <button
                          className="bg-cyan rounded-lg px-4 py-3 text-black capitalize focus:text-white focus:bg-black"
                          onClick={() => setBuyNow(false)}
                        >
                          {t("all")}
                        </button>
                        <button
                          className="bg-cyan rounded-lg px-4 py-3 text-black font-bold capitalize focus:text-white focus:bg-black"
                          onClick={() => setBuyNow(true)}
                        >
                          {t("buy now")}
                        </button>
                      </div>
                    ) : null}
                  </div>

                  <div className="border-b-2 pb-4">
                    <Dropdown
                      menu={{
                        items,
                      }}
                    >
                      <a
                        onClick={(e) => {
                          e.preventDefault();
                          setToggle({ ...toggle, price: !toggle.price });
                        }}
                      >
                        <Space className=" py-3">
                          <h4 className="capitalize font-bold text-lg p-0 m-0">
                            {t("Blockchain")}
                          </h4>

                          {toggle.price ? (
                            <MdArrowUpward size={20} />
                          ) : (
                            <MdArrowDownward size={20} />
                          )}
                        </Space>
                      </a>
                    </Dropdown>
                    {toggle.price ? (
                      <>
                        <div className="flex gap-5  items-center pt-5 pb-3">
                          <button className="bg-cyan rounded-lg px-4 py-3 text-grey font-bold capitalize">
                            {blockchain}
                          </button>
                        </div>
                      </>
                    ) : null}
                  </div>
                </div>
                <div className="flex-1">
                  <div className=" bg-collection-img bg-no-repeat bg-cover pt-3 px-3 max-h-[700px] overflow-y-scroll">
                    <div className="grid  grid-cols-1 sm:grid-cols-2  xl:grid-cols-3 2xl:grid-cols-4 gap-4 grow  ">
                      {!data ? (
                        //  FakeData.map((item, key) => (
                        //     <Link to="/nft/nftpage">
                        //       <NFTCard key={key} data={item} />
                        //     </Link>
                        //   ))
                        <h1> No Data available</h1>
                      ) : null}
                      {buyNow
                        ? // ? data?.map((item, key) => {
                          data?.slice(0, dataSize).map((item, key) => {
                            return (
                              <>
                                <NFTCollectionCard
                                  key={key}
                                  data={item}
                                  buyNow={buyNow}
                                  blockchain={blockchain}
                                  collection={collection}
                                />
                              </>
                            );
                          })
                        : // : data?.map((item, key) => {
                          data?.slice(0, dataSize).map((item, key) => {
                            return (
                              <NFTCollectionCard
                                key={key}
                                data={item}
                                buyNow={buyNow}
                                blockchain={blockchain}
                                collection={collection}
                              />
                            );
                          })}
                    </div>
                    {dataSize <= data.length && (
                      <button
                        onClick={(e) => {
                          setDataSize(dataSize + 12);
                        }}
                        className="bg-gray-100 hover:bg-gray-200 transition-all duration-200  mb-4 text-black w-full bg-no-repeat bg-cover rounded-xl py-3 px-2 mx-auto "
                      >
                        {" "}
                        {t("Show More")}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NFT;
const Language = () => {
  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }
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
          <Menu.Items className=" right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="py-1">
              <Menu.Item>
                {({ active }) => (
                  <Link
                    to="/setting"
                    className={classNames(
                      active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                      "block px-4 py-2 text-sm"
                    )}
                  >
                    English
                  </Link>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <a
                    href="#"
                    className={classNames(
                      active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                      "block px-4 py-2 text-sm"
                    )}
                  >
                    French
                  </a>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <a
                    href="#"
                    className={classNames(
                      active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                      "block px-4 py-2 text-sm"
                    )}
                  >
                    Chinese
                  </a>
                )}
              </Menu.Item>
              <form method="POST" action="#">
                <Menu.Item>
                  {({ active }) => (
                    <button
                      type="submit"
                      className={classNames(
                        active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                        "block w-full px-4 py-2 text-left text-sm"
                      )}
                    >
                      Japanese
                    </button>
                  )}
                </Menu.Item>
              </form>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </>
  );
};
