import { useLazyQuery, useQuery } from "@apollo/client";
import { useWeb3React } from "@web3-react/core";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PageLoading from "../../components/PageLoading/PageLoading";
import { ChainsInfo } from "../../config/config-chains";
import { getCollectionNFT } from "../../graphql/queries/getCollectionNFT";
import { truncateAddress } from "../../utils";
import MyNFT from "../NFT/MyNFT";
import NFT from "../NFT/NFT";
import CopyToClipboard from "react-copy-to-clipboard";
import { useTranslation } from "react-i18next";

const CollectionDetails = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const { t } = useTranslation();
  const { blockchain, collectionAddress } = useParams();
  const [copied, setCopied] = useState(false);
  console.log(blockchain, collectionAddress, "collection");
  const { active, account, chainId } = useWeb3React();

  const { data, loading, error } = useQuery(getCollectionNFT, {
    skip: !collectionAddress,
    variables: {
      blockchain: blockchain,
      collectionAddress: collectionAddress,
    },
  });

  console.log(data, error);
  useEffect(() => {
    console.log(data, error);
  }, [loading]);
  if (loading) {
    return <PageLoading />;
  }
  return (
    <div>
      <div className="max-w-[1500px] mx-auto w-full py-5 px-5">
        <div className="relative  ">
          <img
            src={process.env.PUBLIC_URL + "/assets/tanakaCover.png"}
            className="md:object-cover xs:`object-contain xs:h-auto relative max-w-[1500px] w-full 2xl:h-[500px] mx-auto "
          />
          <img
            src={
              data && data?.getCollectionNft?.logo.includes("ipfs")
                ? data?.getCollectionNft?.logo.replace(
                    "ipfs://",
                    "https://0a7fb2c625dc7ba2c0696fc825ec1c78.ipfscdn.io/ipfs/"
                  )
                : data?.getCollectionNft?.logo.includes("http")
                ? data?.getCollectionNft?.logo
                : "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/1024px-No_image_available.svg.png"
            }
            className=" absolute md:left-[40px]  left-[35px] bottom-[-13%] mx-auto  md:w-[260px]  w-[25%] px-5 "
          />
        </div>

        <div className="flex justify-between items-center flex-col md:flex-row gap-5 pt-14  px-5">
          <div className="flex-1 md:max-w-[800px] px-2  w-full ">
            <div className="flex items-center gap-4 py-4 px-4"></div>

            <div className="flex items-center gap-5 md:flex-nowrap   justify-start  flex-wrap ">
              <button className="mx-2 my-2  px-[30px] py-2 capitalize rounded-lg bg-black text-white ">
                {data?.getCollectionNft?.collectionName}
              </button>
              {active ? (
                <div className="p-3 bg-cyan rounded-lg">
                  <a
                    href={`${
                      ChainsInfo[chainId].BLOCK_EXPLORER_URL + collectionAddress
                    }`}
                    target="_blank"
                  >
                    <img
                      src={process.env.PUBLIC_URL + "/assets/download.png"}
                      className="w-full mx-auto"
                    />
                  </a>
                </div>
              ) : null}
            </div>
          </div>

          <div className="  border p-5 rounded-lg justify-between  px-5 w-full md:w-auto ">
            <div className="flex  gap-[40px] justify-between items-center pt-5">
              <h4 className="capitalize text-grey text-sm">{t("Address")}</h4>
              <h4 className="text-sm  font-bold uppercase">
                {truncateAddress(collectionAddress)}
              </h4>
            </div>
            {data?.getCollectionNft?.sharing ? (
              <>
                <div className="flex  gap-[40px] justify-between items-center pt-5">
                  <h4 className="capitalize text-grey text-sm">
                    {t("Share My Collection")}
                  </h4>
                  <h4 className="text-sm  font-bold uppercase">
                    <CopyToClipboard
                      text={`http://localhost:3000/collection/collectiondetails/${blockchain}/${collectionAddress}`}>
                      <button
                        onClick={() => setCopied(!copied)}
                        className="capitalize text-sm border bg-white p-3 rounded-lg px-5"
                      >
                     { t("Share Collection")}
                      </button>
                    </CopyToClipboard>
                  </h4>
                </div>
              </>
            ) : null}

            {copied ? (
              <p className="text-[red]">{t("Collection Address Copied")} !</p>
            ) : null}
          </div>
        </div>

        <div>
          <NFT
            data={
              !data
                ? null
                : data?.getCollectionNft?.isMarketplaceNft.length == 0
                ? data?.getCollectionNft?.items
                : data?.getCollectionNft?.isMarketplaceNft
            }
            buyNowNFT={!data ? null : data?.getCollectionNft?.isMarketplaceNft}
            blockchain={data?.getCollectionNft?.blockchain}
            collection={collectionAddress}
          />
        </div>
      </div>
    </div>
  );
};

export default CollectionDetails;
