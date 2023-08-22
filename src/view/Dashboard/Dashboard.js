import React from "react";

import Level1 from "../Dashboard/Level1";
import Level2 from "../Dashboard/Level2";
import Level3 from "../Dashboard/Level3";
import { Dialog, Transition } from "@headlessui/react";

import { Link } from "react-router-dom";
import { useEffect, useRef, useState, Fragment } from "react";
import DashboardPage from "./DashboardPage";
import { useQuery } from "@apollo/client";
import { refInfo } from "../../graphql/queries/getReffralInfo";
import { useWeb3React } from "@web3-react/core";
import NotConnectedPage from "../Home/components/NotConnectedPage";
import PageLoading from "../../components/PageLoading/PageLoading";
import PleaseLogin from "../Home/components/PleaseLogin";
import { useTranslation } from "react-i18next";

const Dashboard = () => {
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const { active, account } = useWeb3React();
  const [tabUnderlineWidth, setTabUnderlineWidth] = useState(0);
  const [tabUnderlineLeft, setTabUnderlineLeft] = useState(0);
  const { data, loading, error } = useQuery(refInfo, {
    skip: !account,
    variables: {
      wallet: account,
    },
  });
  const { t } = useTranslation();
  console.log(!loading && data);
  const level_1_data = !loading && data?.getRefInformation?.level1User;
  const level_2_data = !loading && data?.getRefInformation?.level2User;
  const level_3_data = !loading && data?.getRefInformation?.level3User;
  console.log(level_1_data);
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
      label: t("Dashboard"),
      content: (
        <>
          <DashboardPage level1Data={level_1_data} />
        </>
      ),
    },
    {
      label: t("Level 1"),
      content: (
        <>
          <Level1 level1Data={level_1_data} />
        </>
      ),
    },
    {
      label: t("Level 2"),
      content: (
        <>
          <Level2 level2Data={level_2_data} />
        </>
      ),
    },
    {
      label: t("Level 3"),
      content: (
        <>
          <Level3 level3Data={level_3_data} />
        </>
      ),
    },
  ];
  if (!active) {
    return <NotConnectedPage />;
  } else if (loading) {
    return <PageLoading />;
  }
  return (
    <>
      {data ? (
        <div className=" bg-cyan  px-5 py-5 justify-start items-center ">
          <div className="max-w-[1500px] w-full mx-auto">
            <div className="relative">
              <div className="flex md:gap-[40px] gap-5  px-5 flex-wrap">
                {tabsData.map((tab, idx) => {
                  return (
                    <button
                      key={idx}
                      ref={(el) => (tabsRef.current[idx] = el)}
                      className="pt-2 pb-3 text-secondary text-lg font-bold"
                      onClick={() => setActiveTabIndex(idx)}
                    >
                      {tab.label}
                    </button>
                  );
                })}
              </div>
              <span
                className="absolute bottom-0 block h-1 bg-black  transition-all duration-300"
                style={{ left: tabUnderlineLeft, width: tabUnderlineWidth }}
              />
            </div>
            <div className="py-4 ">
              <p>{tabsData[activeTabIndex].content}</p>
            </div>
          </div>
        </div>
      ) : (
        <PleaseLogin />
      )}
    </>
  );
};

export default Dashboard;
