import React, { useState, useEffect, useRef } from "react";
import { Fragment } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
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
  const { t } = useTranslation();
  const scrollContainerRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();

  // States
  const [active, setActive] = useState("");
  const [toggle, setToggle] = useState({
    status: false,
    price: false,
    explore: false,
  });

  // Get initial dataSize from localStorage or default to 40
  const [dataSize, setDataSize] = useState(() => {
    const savedDataSize = localStorage.getItem("nftDataSize");
    return savedDataSize ? parseInt(savedDataSize) : 40;
  });

  // Get initial buyNow from localStorage or default to false
  const [buyNow, setBuyNow] = useState(() => {
    const savedBuyNow = localStorage.getItem("nftBuyNow");
    return savedBuyNow ? JSON.parse(savedBuyNow) : false;
  });

  const [chainName, setChainName] = useState(false);
  const [selectedNftId, setSelectedNftId] = useState(() => {
    return localStorage.getItem("selectedNftId") || null;
  });

  // Save settings to localStorage when they change
  useEffect(() => {
    localStorage.setItem("nftDataSize", dataSize);
    localStorage.setItem("nftBuyNow", JSON.stringify(buyNow));
    if (selectedNftId) {
      localStorage.setItem("selectedNftId", selectedNftId);
    }
  }, [dataSize, buyNow, selectedNftId]);

  // Restore scroll position when component mounts
  useEffect(() => {
    if (scrollContainerRef.current && data) {
      const savedScrollPosition = localStorage.getItem("nftScrollPosition");

      if (savedScrollPosition) {
        // Use a small timeout to ensure the DOM has fully rendered
        setTimeout(() => {
          scrollContainerRef.current.scrollTop = parseInt(savedScrollPosition);
        }, 100);
      }
    }
  }, [data]);

  // Save scroll position when scrolling
  const handleScroll = () => {
    if (scrollContainerRef.current) {
      localStorage.setItem(
        "nftScrollPosition",
        scrollContainerRef.current.scrollTop
      );
    }
  };

  // Ensure enough items are loaded to show the selected NFT
  useEffect(() => {
    if (data && selectedNftId) {
      const selectedIndex = data.findIndex((item) => item.id === selectedNftId);

      if (selectedIndex >= 0 && selectedIndex >= dataSize) {
        // Calculate how many batches we need to load
        const batchesToLoad = Math.ceil((selectedIndex + 1) / 12);
        setDataSize(batchesToLoad * 12);
      }
    }
  }, [data, selectedNftId]);

  // Handle NFT selection
  const handleNftSelect = (nftId) => {
    setSelectedNftId(nftId);
    localStorage.setItem("selectedNftId", nftId);

    // Other actions like navigation can be done here
    // navigate(`/nft/${nftId}`);
  };

  // Clear selection when filters change
  useEffect(() => {
    setSelectedNftId(null);
    localStorage.removeItem("selectedNftId");
  }, [buyNow, blockchain, collection]);

  // When component unmounts, keep the scroll position and selections
  useEffect(() => {
    return () => {
      if (scrollContainerRef.current) {
        localStorage.setItem(
          "nftScrollPosition",
          scrollContainerRef.current.scrollTop
        );
      }
    };
  }, []);

  const navigation = [
    { name: "NFTS", to: "/nft", current: false },
    { name: "Users", to: "/users", current: false },
  ];

  const items = [];

  if (!data) {
    return <PageLoading />;
  }

  return (
    <>
      <div className="flex justify-center items-center gap-[20px] md:px-[20px] px-0 md:py-[2rem] py-2"></div>
      <div className="max-w-[1500px] mx-auto">
        <div className=" ">
          <div className="px-2">
            <div className="md:py-10 py-2">
              <div className="flex flex-col md:flex-row justify-center gap-[40px] max-w-[1500px] mx-auto md:px-[20px] px-0 md:max-h-[700px] h-auto">
                <div className="sticky h-auto md:top-[120px] top-auto bg-white md:max-h-[700px]">
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
                          className={`rounded-lg px-4 py-3 capitalize ${
                            !buyNow
                              ? "bg-black text-white"
                              : "bg-cyan text-black"
                          }`}
                          onClick={() => {
                            setBuyNow(false);
                            localStorage.setItem("nftScrollPosition", "0");
                          }}
                        >
                          {t("all")}
                        </button>
                        <button
                          className={`rounded-lg px-4 py-3 font-bold capitalize ${
                            buyNow
                              ? "bg-black text-white"
                              : "bg-cyan text-black"
                          }`}
                          onClick={() => {
                            setBuyNow(true);
                            localStorage.setItem("nftScrollPosition", "0");
                          }}
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
                        <div className="flex gap-5 items-center pt-5 pb-3">
                          <button className="bg-cyan rounded-lg px-4 py-3 text-grey font-bold capitalize">
                            {blockchain}
                          </button>
                        </div>
                      </>
                    ) : null}
                  </div>
                </div>
                <div className="flex-1">
                  <div
                    className="bg-collection-img bg-no-repeat bg-cover pt-3 px-3 max-h-[700px] overflow-y-scroll"
                    ref={scrollContainerRef}
                    onScroll={handleScroll}
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4 grow">
                      {!data ? <h1>No Data available</h1> : null}

                      {buyNow
                        ? data?.slice(0, dataSize).map((item, key) => {
                            return (
                              <div
                                key={key}
                                onClick={() => handleNftSelect(item.id)}
                                className={
                                  selectedNftId === item.id
                                    ? "ring-2 ring-blue-500 rounded-lg"
                                    : ""
                                }
                              >
                                <NFTCollectionCard
                                  data={item}
                                  buyNow={buyNow}
                                  blockchain={blockchain}
                                  collection={collection}
                                  isSelected={selectedNftId === item.id}
                                />
                              </div>
                            );
                          })
                        : data?.slice(0, dataSize).map((item, key) => {
                            return (
                              <div
                                key={key}
                                onClick={() => handleNftSelect(item.id)}
                                className={
                                  selectedNftId === item.id
                                    ? "ring-2 ring-blue-500 rounded-lg"
                                    : ""
                                }
                              >
                                <NFTCollectionCard
                                  data={item}
                                  buyNow={buyNow}
                                  blockchain={blockchain}
                                  collection={collection}
                                  isSelected={selectedNftId === item.id}
                                />
                              </div>
                            );
                          })}
                    </div>
                    {dataSize <= data.length && (
                      <button
                        onClick={(e) => {
                          setDataSize(dataSize + 12);
                        }}
                        className="bg-gray-100 hover:bg-gray-200 transition-all duration-200 mb-4 text-black w-full bg-no-repeat bg-cover rounded-xl py-3 px-2 mx-auto"
                      >
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
