import React from "react";
import { Button } from "../../../components/Button/Primary";

import { useQuery } from "@apollo/client";
import { getUserData } from "../../../graphql/queries/getUser";
import { allUsersData } from "../../../graphql/queries/getAllUsers";
import { Link } from "react-router-dom";
import PageLoading from "../../../components/PageLoading/PageLoading";
import { useTranslation } from "react-i18next";
// import Slider from "react-slick";
const CreatorSection = ({ heading, userData }) => {
  const { t } = useTranslation();
  const settings = {
    dots: false,
    arrow: true,
    infinite: false,
    speed: 700,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: false,
    margin: 20,
    responsive: [
      {
        breakpoint: 4000,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1.5,
          infinite: true,

          dots: false,
        },
      },
      {
        breakpoint: 1100,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  const CreatorData = [
    {
      creatorImg: "./assets/creator1.png",
      profileImg: "./assets/profile1.png",
      Name: <>{t("John Wick")}</>,
      para: " Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    },
    {
      creatorImg: "./assets/creator2.png",
      profileImg: "./assets/profile2.png",
      Name: <>{t("John Wick")}</>,
      para: " Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    },

    {
      creatorImg: "./assets/creator3.png",
      profileImg: "./assets/profile3.png",
      Name: <>{t("John Wick")}</>,
      para: " Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    },
    {
      creatorImg: "./assets/creator1.png",
      profileImg: "./assets/profile1.png",
      Name: <>{t("John Wick")}</>,
      para: " Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    },
  ];
  return (
    <div>
      <section className="creator-sec bg-creator-img bg-no-repeat bg-cover rounded-lg py-[3rem]">
        {/* <div className=" max-w-[400px] w-full mx-auto text-center  pb-5">
          <h2 className="capitalize text-3xl font-black text-center pb-2 ">
            {t("top creator")}
          </h2>
          <p className="text-lg text-violet">{heading}</p>
        </div> */}
        <div className="max-w-[1500px] w-full mx-auto px-[40px] rounded-lg">
          {/* <div className="flex justify-center items-center flex-col md:flex-row gap-5">
            {userData &&
              userData?.slice(0, 4).map((data, index) => {
                return (
                  <>
                    <div className=" w-full shadow-full  ">
                      <div>
                        <img
                          src={
                            data?.bg_image?.includes("ipfs")
                              ? data?.bg_image?.replace(
                                  "ipfs://",
                                  "https://ipfs.io/ipfs"
                                )
                              : data?.bg_image
                          }
                          className="w-full  rounded-t-xl "
                        />
                      </div>

                      <div className="bg-white px-4 py-10 text-center rounded-b-xl h-[240px]">
                        <div className="justify-center items-center ">
                          <img
                            src={
                              data?.avatar_url?.includes("ipfs")
                                ? data?.avatar_url?.replace(
                                    "ipfs://",
                                    "https://ipfs.io/ipfs"
                                  )
                                : data?.avatar_url
                            }
                            className="rounded-full w-full mx-auto mt-[-5rem] max-w-[100px] "
                          />
                        </div>
                        <div className="pt-5 pb-5">
                          <h4 className="font-bold capitalize text-xl">
                            {data.displayName}
                          </h4>
                          <p className="font-semibold w-full ">
                            {data.about_details.slice(0, 20) + "..."}
                          </p>

                          <Button title={t("+ follow ")}></Button>
                        </div>
                      </div>
                    </div>
                  </>
                );
              })}
          </div> */}

          <div className="text-white text-center bg p-[2rem] mt-5 rounded-lg">
            <h3 className="text-white text-3xl max-w-[350px] mx-auto">
              {t("Let's create digital assets with NFT")}
            </h3>
            <Link
              to="/create"
              className="capitalize text-white text-xl mt-3 bg-grey rounded-lg p-2"
            >
              {t("get started")}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CreatorSection;
