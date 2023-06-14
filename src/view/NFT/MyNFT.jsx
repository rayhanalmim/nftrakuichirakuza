import React, { Fragment } from "react";
import { useEffect, useRef, useState } from "react";
import CollectionPage from "../Collections/CollectionModal";
import NFT from "./NFT";
import { RiArrowDropDownLine } from "react-icons/ri";
import SelectBar from "./SelectBar";
import CollectionModal from "../Collections/CollectionModal";
import { useLocation } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { WalletNFT } from "../../graphql/queries/getNFTsByWallet";
import { ChainsInfo } from "../../config/config-chains";
import { useWeb3React } from "@web3-react/core";
import PageLoading from "../../components/PageLoading/PageLoading";
import NotConnectedPage from "../Home/components/NotConnectedPage";

const MyNFT = () => {
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const [tabUnderlineWidth, setTabUnderlineWidth] = useState(0);
  const { active, account, chainId } = useWeb3React();
  const [tabUnderlineLeft, setTabUnderlineLeft] = useState(0);
  const location = useLocation();
  const { loading, data, error } = useQuery(WalletNFT, {
    skip: !account,
    variables: {
      walletAddress: account,
      blockchain: active ? ChainsInfo[chainId].CHAIN_NAME.toLowerCase() : null,
    },
  });

  console.log(data);

  const tabsRef = useRef([]);
  useEffect(() => {
    function setTabPosition() {
      const currentTab = tabsRef.current[activeTabIndex];
      setTabUnderlineLeft(currentTab?.offsetLeft ?? 0);
      setTabUnderlineWidth(currentTab?.clientWidth ?? 0);
    }
    setTabPosition();
    window.addEventListener("resize", setTabPosition);

    return () => window.removeEventListener("resize", setTabPosition);
  }, [activeTabIndex]);

  const tabsData = [
    {
      label: "Owned",
      content: (
        <>
          <NFT />
        </>
      ),
    },
    {
      label: "On sale",
      content:
        "Fugiat dolor et quis in incididunt aute. Ullamco voluptate consectetur dolor officia sunt est dolor sint.",
    },
    {
      label: "Activity",
      content:
        "Ut irure mollit nulla eiusmod excepteur laboris elit sit anim magna tempor excepteur labore nulla.",
    },
    {
      label: (
        <>
          <div className="flex justify-center items-center">
            <label>Collections</label>
            <RiArrowDropDownLine size={20} />
          </div>
        </>
      ),

      content: <CollectionModal />,
    },
  ];
  if (!active) {
    return <NotConnectedPage />;
  } else if (loading) {
    return <PageLoading />;
  }
  return (
    <div className="mynft">
      <div className="max-w-[1500px] mx-auto w-full py-5 px-5">
        <div className="relative  ">
          <img
            src={process.env.PUBLIC_URL + "/assets/settingbg.png"}
            className=" relative w-full mx-auto "
          />
          <img
            src={process.env.PUBLIC_URL + "/assets/settingdp.png"}
            className=" absolute md:left-[40px]  left-[35px] bottom-[-17%] mx-auto  md:w-auto  w-[25%] px-5 "
          />
        </div>

        <div className="flex justify-between items-center flex-col md:flex-row gap-5 pt-14  md:px-[40px] px-[20px] ">
          <div className="flex-1 md:max-w-[800px] px-2  w-full ">
            <div className="flex items-center gap-4 py-4p px-4">
              <h1 className="capitalize text-2xl text-black ">
                gods unchained
              </h1>
            </div>

            <div className="flex items-center gap-5 md:flex-nowrap   justify-start  flex-wrap ">
              <button
                className={`  mx-2 my-2  px-[30px] py-2 capitalize rounded-lg ${
                  location.pathname === "/mynfts"
                    ? "bg-cyan text-black"
                    : "bg-black text-white"
                } `}
              >
                {location.pathname === "/mynfts"
                  ? "edit profile"
                  : "create a marketplace"}
              </button>

              <div className="p-3 bg-cyan rounded-lg">
                <img
                  src={process.env.PUBLIC_URL + "/assets/download.png"}
                  className="w-full mx-auto"
                />
              </div>
              <div className="p-3 bg-cyan rounded-lg">
                <img
                  src={process.env.PUBLIC_URL + "/assets/dots.png"}
                  className="w-full mx-auto "
                />
              </div>
            </div>
          </div>

          <div className="  border p-5 rounded-lg justify-between  px-5 w-full md:w-auto ">
            <div className="flex  gap-[40px]  justify-between items-center">
              <h4 className="capitalize text-grey text-sm">followers</h4>
              <h4 className="text-sm  font-bold uppercase">19.9 K </h4>
            </div>
            <div className="flex  gap-[40px] justify-between items-center pb-2">
              <h4 className="capitalize text-grey text-sm">following</h4>
              <h4 className="text-sm  font-bold uppercase">42</h4>
            </div>

            <hr />
            <div className="flex  gap-[40px] justify-between items-center pt-5">
              <h4 className="capitalize text-grey text-sm">Address</h4>
              <h4 className="text-sm  font-bold uppercase">0xacb...fe2c </h4>
            </div>
          </div>
        </div>

        <div className="flex pt-20  px-4 ">
          <div className=" w-full flex-1  ">
            <div className="relative">
              <div className="flex md:gap-[40px] gap-[20px] border-b">
                {tabsData.map((tab, idx) => {
                  return (
                    <button
                      key={idx}
                      ref={(el) => (tabsRef.current[idx] = el)}
                      className="pt-2 pb-3 text- text-sm font-normal"
                      onClick={() => setActiveTabIndex(idx)}
                    >
                      {tab.label}
                    </button>
                  );
                })}
              </div>
              <span
                className="absolute bottom-0 block h-1 bg-black transition-all duration-300"
                style={{ left: tabUnderlineLeft, width: tabUnderlineWidth }}
              />
            </div>
            <div className="py-4 ">
              <p>{tabsData[activeTabIndex].content}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyNFT;
