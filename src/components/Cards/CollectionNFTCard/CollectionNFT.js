/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useRef, useState } from "react";
import { t } from "i18next";
import { Link } from "react-router-dom";
/* eslint-disable jsx-a11y/alt-text, jsx-a11y/img-redundant-alt */
function NFTCollectionCard({ blockchain, collection, data }) {
  let metadata = JSON.parse(data?.metadata);
  //link logic

  // Reference to user cards
  const nftRefs = useRef({});

  // Effect to scroll to previously selected user
  useEffect(() => {
    const lastVisitedNftId = localStorage.getItem("lastVisitedNft");
    console.log("inside useeffect");
    if (lastVisitedNftId && nftRefs.current[lastVisitedNftId]) {
      console.log("inside useeffect2");

      setTimeout(() => {
        nftRefs.current[lastVisitedNftId].scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }, 500); // Delay scrolling to ensure elements are fully rendered
    }
  }, [metadata]); // Runs when user data is available
  return (
    <div className="w-full max-w-[300px] mx-auto px-3 py-4 border rounded-xl bg-white mb-4">
      <div
        className="rounded-xl"
        ref={(el) => (nftRefs.current[data.token_id] = el)}
      >
        {/* <img
          className="rounded-xl w-[250px] h-[200px]"
          src={
            metadata && metadata?.image.includes("ipfs")
              ? metadata.image.replace(
                  "ipfs://",
                  "https://0a7fb2c625dc7ba2c0696fc825ec1c78.ipfscdn.io/ipfs/"
                )
              : metadata?.image?.includes("https")
              ? metadata?.image:metadata.image
          }
          
        /> */}
        <Link
          to={`/nft/nftpage/${blockchain}/${collection}/${data.token_id}`}
          onClick={() => localStorage.setItem("lastVisitedNft", data.token_id)}
        >
          {/* <img
            className="rounded-xl w-[250px] h-[200px] object-contain cursor-pointer "
            src={
              metadata?.image?.includes("https")
                ? metadata?.image?.replace(
                    "https://ipfs.thirdwebcdn.com/ipfs/",
                    "https://0a7fb2c625dc7ba2c0696fc825ec1c78.ipfscdn.io/ipfs/"
                  )
                : metadata?.image?.replace(
                    "https://ipfs.thirdwebcdn.com/ipfs/",
                    "https://0a7fb2c625dc7ba2c0696fc825ec1c78.ipfscdn.io/ipfs/"
                  )
            }
          /> */}
          <img
            loading="lazy"
            className="rounded-xl w-[250px] h-[200px] object-contain cursor-pointer "
            src={
              metadata?.image?.includes("ipfs.cf-ipfs.com")
                ? metadata?.image?.replace(
                    /^https:\/\/([^.]+)\.ipfs\.cf-ipfs\.com\/(.+)$/,
                    "https://ipfs.io/ipfs/$1/$2"
                  )
                : metadata?.image?.replace(
                    "https://ipfs.thirdwebcdn.com/ipfs/",
                    `https://${process.env.REACT_APP_THIRDWEB_CLIENT_ID}.ipfscdn.io/ipfs/`
                  )
            }
            // src={
            //   metadata?.image?.includes("ipfs.thirdwebstorage.com")
            //     ? metadata?.image?.replace(
            //         "ipfs.thirdwebstorage.com",
            //         "ipfs.cf-ipfs.com"
            //       )
            //     : metadata?.image?.replace(
            //         "https://ipfs.thirdwebcdn.com/ipfs/",
            //         `https://${process.env.REACT_APP_THIRDWEB_CLIENT_ID}.ipfscdn.io/ipfs/`
            //       )
            // }
          />
        </Link>
      </div>

      <div>
        <div className="flex justify-between py-1 pt-5 gap-3">
          <p className="text-grey">{metadata?.name}</p>
        </div>
        <div className="flex justify-between py-1 gap-3 mb-2">
          <p className="font-black text-sm text-black">
            {metadata?.description?.slice(0, 50)}
          </p>
        </div>
        <Link
          to={`/nft/nftpage/${blockchain}/${collection}/${data.token_id}`}
          className="bg-cyan text-black  w-full bg-no-repeat bg-cover rounded-xl py-3 px-2 hover:bg-button-img hover:bg-no-repeat hover:bg-cover hover:text-white "
          onClick={() => localStorage.setItem("lastVisitedNft", data.token_id)}
        >
          {t("Show Details")}
        </Link>
      </div>
    </div>
  );
}

export default NFTCollectionCard;
