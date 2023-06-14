import React, { useState } from "react";
import NFTCard from "../../../components/Cards/NFTCard/NFTCard";
import { t } from "i18next";
const FeaturedSection = ({heading}) => {
  const [like, setLike] = useState("");

  const FeatureData = [
    {
      imgUrl: "./assets/img1.png",
    },
    {
      imgUrl: "./assets/img2.png",
    },
    {
      imgUrl: "./assets/img3.png",
    },
    {
      imgUrl: "./assets/img1.png",
    },
  ];
  // const likenft = () => {
  //   setLike(!like);
   
  // };
  return (
    <div>
      <section className="collection-sec py-[3rem] ">
        <div className=" max-w-[400px] w-full mx-auto text-center  pb-5">
          <h2 className="capitalize text-3xl font-black text-center pb-2 text-black ">
          {t('Latest Artworks')}
          </h2>
          <p className="text-lg text-violet ">
          {heading}
          </p>
          {/* <button onClick={likenft} className="border p-3 rounded-lg">
            {like ? (
              <div>
                <FcLike />
              </div>
            ) : (
              <div>
                <AiOutlineHeart />
              </div>
            )}
          </button> */}
        </div>
        <div className="max-w-[1500px] mx-auto w-full">
          <div
            className="flex flex-col md:flex-row gap-[20px] justify-between  items-center"
            style={{ margin: "0 42px" }}
          >
            {FeatureData.map((data, index) => {
              return (
                <>
                  <div className="w-full max-w-[400px]  px-3 py-4 border rounded-xl bg-white mb-4 shadow-lg">
                    <div className="rounded-xl">
                      <img className="rounded-xl w-full " src={data.imgUrl} />
                    </div>
                    <div>
                      <div className="flex justify-between py-1 pt-5 gap-3">
                        <p>@Jonny</p>
                        <p> Current Bid </p>
                      </div>
                      <div className="flex justify-between py-1 gap-3 ">
                        <p className="font-black text-sm text-black">
                          Yellow Painting{" "}
                        </p>
                        <p className="font-black text-sm text-black">
                          0.00012 ETH
                        </p>
                      </div>
                      <button className="bg-cyan text-black  w-full bg-no-repeat bg-cover rounded-xl py-3 px-2 hover:bg-button-img hover:bg-no-repeat hover:bg-cover hover:text-white ">
                      {t('Place a Bid')}
                      </button>
                    </div>
                  </div>
                </>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};

export default FeaturedSection;
