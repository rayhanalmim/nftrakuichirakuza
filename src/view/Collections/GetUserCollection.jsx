/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useEffect, useState } from "react";
import { SearchComponent } from "../../components/Header/Header";
import { Link } from "react-router-dom";
import PageLoading from "../../components/PageLoading/PageLoading";
import { useMutation, useQuery } from "@apollo/client";
import { getAllCollections } from "../../graphql/queries/getAllCollections";
import NotDetails from "../../components/404Page/NoDetails";
import { useTranslation } from "react-i18next";
import { useWeb3React } from "@web3-react/core";
import NotConnectedPage from "../Home/components/NotConnectedPage";
import Swal from "sweetalert2";
import { updateCollection } from "../../graphql/mutations/updateCollection";
import { getCollectionNFT } from "../../graphql/queries/getCollectionNFT";
const UserCollection = ({ number }) => {
  let { data, loding, error } = useQuery(getAllCollections);
  const [updateSharing] = useMutation(updateCollection);
  const { account, active } = useWeb3React();
  // const dataTest = [
  //   {
  //     collectImg: "/assets/collect-img.png",
  //     name: "Art Gobbler",
  //     collectImg2: "/assets/collect1.png",
  //     volume: "393.3k ETH ",
  //     floor_price: "0.039 ETH",
  //     blockchain: "binance",
  //     collectionAddress: "0x68dbda44d2dd6bea1d360929e247e14092ae7fed",
  //     tokenId: "1",
  //   },

  //   {
  //     collectImg: "/assets/collect-img.png",
  //     name: "Art Gobbler",
  //     collectImg2: "/assets/collect1.png",
  //     volume: "393.3k ETH ",
  //     floor_price: "0.039 ETH",
  //     blockchain: "binance",
  //     collectionAddress: "0x68dbda44d2dd6bea1d360929e247e14092ae7fed",
  //     tokenId: "1",
  //   },

  //   {
  //     collectImg: "/assets/collect-img.png",
  //     name: "Art Gobbler",
  //     collectImg2: "/assets/collect1.png",
  //     volume: "393.3k ETH ",
  //     floor_price: "0.039 ETH",
  //     blockchain: "binance",
  //     collectionAddress: "0x68dbda44d2dd6bea1d360929e247e14092ae7fed",
  //     tokenId: "1",
  //   },

  //   {
  //     collectImg: "/assets/collect-img.png",
  //     name: "Art Gobbler",
  //     collectImg2: "/assets/collect1.png",
  //     volume: "393.3k ETH ",
  //     floor_price: "0.039 ETH",
  //     blockchain: "binance",
  //     collectionAddress: "0x68dbda44d2dd6bea1d360929e247e14092ae7fed",
  //     tokenId: "1",
  //   },

  //   {
  //     collectImg: "/assets/collect-img.png",
  //     name: "Art Gobbler",
  //     collectImg2: "/assets/collect1.png",
  //     volume: "393.3k ETH ",
  //     floor_price: "0.039 ETH",
  //     blockchain: "binance",
  //     collectionAddress: "0x68dbda44d2dd6bea1d360929e247e14092ae7fed",
  //     tokenId: "1",
  //   },

  //   {
  //     collectImg: "/assets/collect-img.png",
  //     name: "Art Gobbler",
  //     collectImg2: "/assets/collect1.png",
  //     volume: "393.3k ETH ",
  //     floor_price: "0.039 ETH",
  //     blockchain: "binance",
  //     collectionAddress: "0x68dbda44d2dd6bea1d360929e247e14092ae7fed",
  //     tokenId: "1",
  //   },

  //   {
  //     collectImg: "/assets/collect-img.png",
  //     name: "Art Gobbler",
  //     collectImg2: "/assets/collect1.png",
  //     volume: "393.3k ETH ",
  //     floor_price: "0.039 ETH",
  //     blockchain: "binance",
  //     collectionAddress: "0x68dbda44d2dd6bea1d360929e247e14092ae7fed",
  //     tokenId: "1",
  //   },

  //   {
  //     collectImg: "/assets/collect-img.png",
  //     name: "Art Gobbler",
  //     collectImg2: "/assets/collect1.png",
  //     volume: "393.3k ETH ",
  //     floor_price: "0.039 ETH",
  //     blockchain: "binance",
  //     collectionAddress: "0x68dbda44d2dd6bea1d360929e247e14092ae7fed",
  //     tokenId: "1",
  //   },
  // ];
  const { t } = useTranslation();
  return (
    <>
      {active ? (
        <>
          <div>
            {data?.getAllCollection?.length > 0 ? (
              <div className="max-w-[1500px] mx-auto pt-5 md:pt-[2rem] px-5">
                <div className="flex flex-row-reverse justify-between pt-5  pb-5 gap-[20px] md:gap-[100px] md:px-2 px-2">
                  <h4 className="text-grey  font-bold capitalize">
                    {t("Sharing Status")}
                  </h4>
                  <h4 className="text-grey  font-bold capitalize md:w-[100px]">
                    {t("Collection")}
                  </h4>
                  <h4 className="text-grey md:flex hidden font-bold capitalize">
                    {t("Blockchain")}
                  </h4>
                  <h4 className="text-gre md:flex hidden y font-bold capitalize">
                    {t("Token Standard")}
                  </h4>
                  <h4 className="text-grey  font-bold capitalize">
                    {t("Collection Logo")}
                  </h4>
                </div>
                <div className=" md:px-0 px-2">
                  <div
                    className=" border rounded-lg "
                    style={{ padding: "30px" }}
                  >
                    {number
                      ? data?.getAllCollection
                          ?.slice(0, number)
                          .reverse()
                          .map((data, index) => {
                            return (
                              <>
                                <Link
                                  to={`/collection/collectiondetails/${data.blockchain}/${data.collectionAddress}`}
                                >
                                  <div className="flex flex-row-reverse flex-wrap text-justify justify-between   md:flex-nowrap items-center gap-[20px] md:gap-[10px] my-3 md:my-2  hover:bg-cyan hover:rounded-lg hover:px-0">
                                    <div className="justify-center">
                                      <img
                                        src={
                                          process.env.PUBLIC_URL +
                                          data.collectImg
                                        }
                                        alt=""
                                      />
                                      <h2 className="font-bold capitalize w-[50px] text-sm">
                                        {data.collectionName}
                                      </h2>
                                    </div>
                                    <div className="md:flex hidden gap-2 items-center  justify-center">
                                      <h2 className="font-bold text-right  capitalize text-sm">
                                        {data.blockchain}
                                      </h2>
                                    </div>
                                    <div className="flex gap-2 items-center  justify-center">
                                      <h2 className="font-bold capitalize text-sm">
                                        {data.tokenStandard}
                                      </h2>
                                    </div>

                                    <div className="flex flex-wrap gap-2">
                                      <img
                                        alt="image"
                                        src={
                                          data.logo.includes("ipfs")
                                            ? data.logo.replace(
                                                "ipfs://",
                                                "https://gateway.ipfscdn.io/ipfs/"
                                              )
                                            : "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/1024px-No_image_available.svg.png"
                                        }
                                        className="max-w-[80px] w-full mx-auto"
                                      />
                                    </div>
                                  </div>
                                </Link>
                              </>
                            );
                          })
                      : data?.getAllCollection?.map((data, index) => {
                          console.log(data.creatorWallet === account);
                          if (account === data.creatorWallet) {
                            console.log(data);
                            return (
                              <>
                                {/* <Link
                                  to={`/collection/collectiondetails/${data.blockchain}/${data.collectionAddress}`}
                                > */}
                                <div className="flex flex-row-reverse flex-wrap text-justify justify-between  md:flex-nowrap items-center gap-[20px] md:gap-[10px] my-3 md:my-2  hover:bg-cyan hover:rounded-lg hover:px-0">
                                  <div
                                    className="flex gap-2 items-center cursor-pointer  justify-center"
                                    onClick={() => {
                                      console.log("in this");
                                      Swal.fire({
                                        title: t(
                                          "Are you sure you want to update your collection sharing status?"
                                        ),
                                        text: t(
                                          "You won't be able to revert this!"
                                        ),
                                        icon: "warning",
                                        confirmButtonColor: "#3085d6",
                                        cancelButtonColor: "#d33",
                                        confirmButtonText: t("Yes, Update it!"),
                                      }).then((result) => {
                                        if (result.isConfirmed) {
                                          updateSharing({
                                            variables: {
                                              collectionAddress:
                                                data.collectionAddress,
                                              blockchain: data.blockchain,
                                              sharing: !data.sharing,
                                            },
                                            refetchQueries: [
                                              getAllCollections,
                                              {
                                                query: getCollectionNFT,
                                                variables: {
                                                  blockchain: data.blockchain,
                                                  collectionAddress:
                                                    data.collectionAddress,
                                                },
                                              },
                                            ],
                                          }).then((res) => {
                                            Swal.fire(
                                              "Updated!",
                                              "Your sharing has been updated!",
                                              "success"
                                            );
                                          });
                                        }
                                      });
                                    }}
                                  >
                                    <h2 className="font-bold capitalize text-sm">
                                      {data.sharing == false ? (
                                        <div className="w-10 text-center text-white p-2 h-8 rounded-full bg-[red]">
                                          off
                                        </div>
                                      ) : (
                                        <div className="w-10 text-center text-white p-2 h-8 rounded-full bg-[green]">
                                          On
                                        </div>
                                      )}
                                    </h2>
                                  </div>

                                  <div className="flex gap-2 items-center  justify-center">
                                    <img
                                      src={
                                        process.env.PUBLIC_URL + data.collectImg
                                      }
                                      alt=""
                                    />
                                    <h2 className="font-bold md:w-[100px] w-[50px] capitalize text-sm">
                                      {data.collectionName}
                                    </h2>
                                  </div>
                                  <div className="md:flex hidden gap-2 items-center  justify-center">
                                    <h2 className="font-bold text-left capitalize text-sm">
                                      {data.blockchain}
                                    </h2>
                                  </div>
                                  <div className="md:flex hidden gap-2 items-center  justify-center">
                                    <h2 className="font-bold capitalize text-sm">
                                      {data.tokenStandard}
                                    </h2>
                                  </div>

                                  <div className="flex flex-wrap gap-2">
                                    <img
                                      src={
                                        data.logo.includes("ipfs")
                                          ? data.logo.replace(
                                              "ipfs://",
                                              "https://gateway.ipfscdn.io/ipfs/"
                                            )
                                          : "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/1024px-No_image_available.svg.png"
                                      }
                                      className="max-w-[80px] w-full mx-auto"
                                    />
                                  </div>
                                </div>
                                {/* </Link> */}
                              </>
                            );
                          } else {
                          }
                        })}
                  </div>
                </div>
              </div>
            ) : (
              /* A div that is displayed when there is no collection found. */
              <div className="flex flex-col justify-center p-5 mt-5 bg-[url('https://static0.gamerantimages.com/wordpress/wp-content/uploads/2022/05/Collage-Maker-29-May-2022-0114-PM.jpg')] bg-contain items-center h-[60vh]">
                <div className="bg-white p-3 opacity-[0.9] rounded-lg">
                  <p className="md:text-3xl text-sm text-black">
                    No Collection Found
                  </p>
                  <p className="md:text-3xl text-sm text-black">
                    Having Trouble?
                  </p>
                  <p>
                    <Link to="/create">Create One</Link>
                  </p>
                </div>
              </div>
            )}
          </div>
        </>
      ) : (
        <NotConnectedPage />
      )}
    </>
  );
};

export default UserCollection;
