import { Dropdown, Space } from "antd";
import { useCallback, useContext, useEffect, useRef } from "react";
import React, { useState } from "react";
import { RiArrowUpDownFill } from "react-icons/ri";
import NotDetails from "../../components/404Page/NoDetails";
import { BsArrowLeft, BsFillGrid3X2GapFill } from "react-icons/bs";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";
import { DatePicker } from "antd";
import { useTranslation } from "react-i18next";
import { MdClose } from "react-icons/md";
import {
  AiFillHeart,
  AiOutlineEye,
  AiOutlineFileText,
  AiFillRedEnvelope,
} from "react-icons/ai";
import { MdLocalOffer } from "react-icons/md";
import { BsListNested } from "react-icons/bs";
import { BiTransfer } from "react-icons/bi";
import { IoMdCart } from "react-icons/io";
import NFTCard from "../../components/Cards/NFTCard/NFTCard";

import { useNavigate, useParams } from "react-router-dom";
import { useLazyQuery, useMutation, useQuery } from "@apollo/client";
import { itemPageQuery } from "../../graphql/queries/itemPageQuery";
import { truncateAddress } from "../../utils";
import { useWeb3React } from "@web3-react/core";
import useNFT from "../../hooks/useNFT";
import moment from "moment";
import Web3 from "web3";
import { ethers } from "ethers";
import { updateItem } from "../../graphql/mutations/updateItem";
import PageLoading from "../../components/PageLoading/PageLoading";
import { ChainsInfo } from "../../config/config-chains";
import Swal from "sweetalert2";
import CounterComponent from "../../components/Counter/Counter";
import { getRewardsUser } from "../../graphql/queries/getRewardsUser";
import { updateRewards } from "../../graphql/queries/updateRewards";
import { updateLazyItem } from "../../graphql/mutations/updateLazyItem";
import { AuthContext } from "../Login/context/Auth.context";
import {
  getErc20Contract,
  getErc721Contract,
} from "../../utils/contractHelper";

import {
  TwitterShareButton,
  FacebookShareButton,
  PinterestShareButton,
  HatenaShareButton,
  FacebookIcon,
  TwitterIcon,
  PinterestIcon,
  HatenaIcon,
  LineShareButton,
  LineIcon,
  WhatsappShareButton,
  WhatsappIcon,
} from "react-share";

import facebook from "../../images/facebook.svg";
import twitter from "../../images/twitter.svg";
import pinterest from "../../images/pinterest.svg";
const NFTPage = () => {
  const { t } = useTranslation();
  const { RangePicker } = DatePicker;
  const [diffrence, setDiffrence] = useState();
  const [icon, setIcon] = useState("");
  const { blockchain, collection, tokenId } = useParams();
  const { active, chainId, account } = useWeb3React();

  const {
    OwnerOfToken,
    putOnSale,
    putOnAuction,
    removeFromSale,
    approveMarketplace,
    checkApproval,
    GetListingData,
    lazyMintNFT,
    purchaseNFT,
  } = useNFT();
  const [icon1, setIcon1] = useState("");
  const [expand1, setExpand1] = useState("");
  const { library } = useWeb3React();
  const [expand, setExpand] = useState("");
  const [listingData, setListingData] = useState("");
  const [transactionLength, setTransactionLength] = useState(0);
  const [dropdown, setDropdown] = useState("");
  const [refresh, setRefresh] = useState(false);
  const [listState, setListState] = useState({
    listingAvailable: false,
  });
  const [price, setPrice] = useState("");
  const [buyLoad, setBuyLoad] = useState("");
  const navigate = useNavigate();
  const [time, setTime] = useState("");
  const { state: ContextState, logout } = useContext(AuthContext);
  const [owner, setOwner] = useState("");
  const [updateItemSale] = useMutation(updateItem);
  const [updateLazyItemNFT] = useMutation(updateLazyItem);
  const [updateRewardsData] = useLazyQuery(updateRewards);
  const [currentImage, setCurrentImage] = useState(0);
  const [isViewerOpen, setIsViewerOpen] = useState(false);

  const { loading, error, data } = useQuery(itemPageQuery, {
    variables: {
      blockchain: blockchain,
      collectionAddress: collection,
      tokenId: tokenId,
    },
  });

  const refinfo = useQuery(getRewardsUser, {
    skip: !account,
    variables: {
      wallet: account,
    },
  });
  let DataRef = refinfo?.data?.getRefInformation?.parentRef;
  let tokenMetadata =
    !loading && !error ? data?.ItemPageQuery?.nft?.tokenMetadata : null;
  let metadata =
    !loading && !error
      ? JSON.parse(data?.ItemPageQuery?.nft?.tokenMetadata?.metadata)
      : null;
  let lazyMetadata =
    !loading && !error ? JSON.parse(data?.ItemPageQuery?.nft?.metadata) : null;
  let activity = !loading && !error ? data?.itemPageQuery?.event : null;
  let nftData = !loading && !error ? data?.ItemPageQuery?.nft : null;
  let signer = !loading && !error ? data?.ItemPageQuery?.nft?.signer : "";
  let voucher =
    !loading && !error
      ? data?.ItemPageQuery?.nft?.voucher == ""
        ? ""
        : JSON.parse(data?.ItemPageQuery?.nft?.voucher)
      : "";

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

    if (active) {
      let dataToken = JSON.parse(localStorage.getItem("loggedIn"));
      if (
        localStorage.getItem("loggedIn") == "false" ||
        localStorage.getItem("loggedIn") == undefined
      ) {
        logout();
        Swal.fire("You Must Sign In to do the transaction");
        navigate("/login");
      } else if (dataToken.wallet != account) {
        Swal.fire("Please Login Again");
        navigate("/login");
      } else {
        if (data?.ItemPageQuery?.lazyMinting == true) {
          return;
        } else {
          OwnerOfToken(tokenId, collection)
            .then((res) => {
              setOwner(res);
            })
            .catch((err) => {});
          setTransactionLength(data?.ItemPageQuery?.event[0].block_timestamp);
          if (data?.ItemPageQuery?.nft.listingId != "") {
            GetListingData(
              parseInt(data?.ItemPageQuery?.nft?.listingId),
              collection
            )
              .then((res) => {
                setListingData({
                  assetContract: res.assetContract,
                  buyoutPricePerToken: res.buyoutPricePerToken,
                  currency: res.currency,
                  endTime: res.endTime,
                  listingId: res.listingId,
                  listingType: res.listingType,
                  quantity: res.quantity,
                  reservePricePerToken: res.reservePricePerToken,
                  rewardBps: res.rewardBps,
                  startTime: res.startTime,
                  tokenId: res.tokenId,
                  tokenOwner: res.tokenOwner,
                  tokenType: res.tokenType,
                });
              })
              .catch((err) => {
                console.log(err);
              });
          }
        }
      }
    } else {
    }
  }, [loading, active, account, data?.ItemPageQuery?.nft.listingId]);
  const onDateChange = (value, dateString) => {};
  const onOk = async (value) => {
    let d1 = moment(value[0]._d);
    let d2 = moment(value[1]._d);

    setTime(d1);

    let seconds = d2.diff(d1, "seconds");
    setDiffrence(seconds);
  };
  const SaleNFT = async (price) => {
    function getChainIdFromName(chainName) {
      const chain = Object.values(ChainsInfo).find(
        (info) => info.CHAIN_NAME.toLowerCase() === chainName.toLowerCase()
      );
      if (chain) {
        return chain.CHAIN_ID;
      }
      return null; // Chain name not found
    }
    const chainName = data ? data.ItemPageQuery.nft.blockchain : null;
    const id = getChainIdFromName(chainName);

    if (chainId != id) {
      alert("Connected to wrong network");
    } else {
      if (data?.ItemPageQuery?.lazyMinting) {
        if (voucher && voucher[6] == ChainsInfo[chainId].OVE_COIN) {
          getErc20Contract(ChainsInfo[chainId].OVE_COIN, library.provider)
            .methods.balanceOf(account)
            .call()
            .then((res) => {
              if (res == 0) {
                Swal.fire(
                  "Insufficient Fund",
                  "Wallet Don't Have OVE",
                  "warning"
                );
                return false;
              } else if (parseInt(res) < parseInt(voucher[5])) {
                Swal.fire(
                  "Insufficient Fund",
                  "Wallet Don't Have Enough OVEs for transaction",
                  "warning"
                );
                return false;
              } else {
                return getErc20Contract(
                  ChainsInfo[chainId].OVE_COIN,
                  library.provider
                )
                  .methods.approve(ChainsInfo[chainId].NFT_ADDRESS, voucher[5])
                  .send({
                    from: account,
                  })
                  .then((res) => {
                    setBuyLoad(true);
                    getErc721Contract(
                      ChainsInfo[chainId].NFT_ADDRESS,
                      library.provider
                    )
                      .methods.mintWithSignature(voucher, signer)
                      .send({
                        from: account,
                      })
                      .then((res) => {
                        updateLazyItemNFT({
                          variables: {
                            collectionAddress: collection,
                            tokenId:
                              res?.events?.TokensMintedWithSignature.returnValues?.tokenIdMinted.toString(),
                            blockchain: blockchain,
                            isLazyMint: false,
                            lazyTokenId: tokenId,
                            price: parseFloat(0),
                            isMarketplace: false,
                            listingId: "",
                            owner: account,
                          },
                          refetchQueries: [
                            {
                              query: itemPageQuery,
                              variables: {
                                blockchain: blockchain,
                                collectionAddress: collection,
                                tokenId:
                                  res?.events?.TokensMintedWithSignature.returnValues?.tokenIdMinted.toString(),
                              },
                            },
                          ],
                        })
                          .then((res) => {
                            navigate(
                              `/nft/nftpage/polygon/${collection}/${res.data?.updateLazyItem?.token_id}`
                            );
                            setBuyLoad(false);
                          })
                          .catch((err) => {
                            setBuyLoad(false);
                          });
                      })
                      .catch((err) => {
                        console.log(err);
                      });
                  })
                  .catch((err) => {
                    console.log(err);
                  });
              }
            })
            .catch((err) => {
              console.log(err);
            });
        } else {
          lazyMintNFT(
            data?.ItemPageQuery?.nft?.voucher,
            data?.ItemPageQuery?.nft?.signer
          )
            .then((res) => {
              setBuyLoad(true);

              updateLazyItemNFT({
                variables: {
                  collectionAddress: collection,
                  tokenId:
                    res?.events?.TokensMintedWithSignature.returnValues?.tokenIdMinted.toString(),
                  blockchain: blockchain,
                  isLazyMint: false,
                  lazyTokenId: tokenId,
                  price: parseFloat(0),
                  isMarketplace: false,
                  listingId: "",
                  owner: account,
                },
                refetchQueries: [
                  {
                    query: itemPageQuery,
                    variables: {
                      blockchain: blockchain,
                      collectionAddress: collection,
                      tokenId:
                        res?.events?.TokensMintedWithSignature.returnValues?.tokenIdMinted.toString(),
                    },
                  },
                ],
              })
                .then((res) => {
                  navigate(
                    `/nft/nftpage/polygon/${collection}/${res.data?.updateLazyItem?.token_id}`
                  );
                  setBuyLoad(false);
                })
                .catch((err) => {
                  console.log(err);
                  setBuyLoad(false);
                });
            })
            .catch((err) => {
              console.log(err);
            });
        }
      } else {
        if (await checkApproval(collection)) {
          setBuyLoad(true);
          putOnSale(
            collection,
            tokenId,
            parseInt(new Date(time).getTime() / 1000),
            diffrence,
            new Web3().utils.toWei(price.toString(), "ether"),
            "100"
          )
            .then(async (res) => {
              updateItemSale({
                variables: {
                  collectionAddress: collection,
                  tokenId: tokenId,
                  blockchain: blockchain,
                  price: parseFloat(price),
                  isMarketplace: true,
                  listingId:
                    res?.events?.ListingAdded?.returnValues?.listingId.toString(),
                  owner: owner,
                },
                refetchQueries: [
                  {
                    query: itemPageQuery,
                    variables: {
                      blockchain: blockchain,
                      collectionAddress: collection,
                      tokenId: tokenId,
                    },
                  },
                ],
              })
                .then((res) => {
                  console.log(res);

                  setBuyLoad(false);
                })
                .catch((err) => {
                  console.log(err);
                  setBuyLoad(false);
                });
              console.log(res);
            })
            .catch((err) => {
              console.log(err);
              setBuyLoad(false);
            });
        } else {
          setBuyLoad(true);
          approveMarketplace(tokenId, collection)
            .then((res) => {
              putOnSale(
                collection,
                tokenId,
                parseInt(new Date(time).getTime() / 1000),
                diffrence,
                new Web3().utils.toWei(price.toString(), "ether"),
                "100"
              )
                .then(async (res) => {
                  updateItemSale({
                    variables: {
                      collectionAddress: collection,
                      tokenId: tokenId,
                      blockchain: blockchain,
                      price: parseFloat(price),
                      isMarketplace: true,
                      listingId:
                        res?.events?.ListingAdded?.returnValues?.listingId?.toString(),
                    },
                    refetchQueries: [
                      {
                        query: itemPageQuery,
                        variables: {
                          blockchain: blockchain,
                          collectionAddress: collection,
                          tokenId: tokenId,
                        },
                      },
                    ],
                  })
                    .then((res) => {
                      setBuyLoad(false);
                      console.log(res);
                    })
                    .catch((err) => {
                      setBuyLoad(false);
                      console.log(err);
                    });
                })
                .catch((err) => {
                  setBuyLoad(false);
                  console.log(err);
                });
            })
            .catch((err) => {
              console.log(err);
            })
            .catch((err) => {
              console.log(err);
            });
        }
      }
    }
  };
  const handleSale = async () => {
    if (active) {
      if (
        account == owner &&
        !loading &&
        !error &&
        data?.ItemPageQuery?.isListedOnMarketplace == true &&
        isListed(
          parseInt(listingData?.startTime),
          moment.unix(new Date(transactionLength).getTime() / 1000)
        ) == 3
      ) {
        setBuyLoad(true);
        removeFromSale(parseInt(nftData?.listingId))
          .then((res) => {
            updateItemSale({
              variables: {
                collectionAddress: collection,
                tokenId: tokenId,
                blockchain: blockchain,
                price: parseFloat(price),
                isMarketplace: false,
                listingId: null,
                owner: owner,
              },
              refetchQueries: [
                {
                  query: itemPageQuery,
                  variables: {
                    blockchain: blockchain,
                    collectionAddress: collection,
                    tokenId: tokenId,
                  },
                },
              ],
            })
              .then((res) => {
                console.log(res);
                setBuyLoad(false);
              })
              .catch((err) => {
                console.log(err);
                setBuyLoad(false);
              });
          })
          .catch((err) => {
            console.log(err);
          });
      } else if (
        listingData?.endTime > new Date().getTime() / 1000 == false &&
        account == owner
      ) {
        setBuyLoad(true);
        approveMarketplace(tokenId, collection)
          .then((res) => {
            putOnSale(
              collection,
              tokenId,
              parseInt(new Date(time).getTime() / 1000),
              diffrence,
              new Web3().utils.toWei(price.toString(), "ether"),
              "100"
            )
              .then(async (res) => {
                updateItemSale({
                  variables: {
                    collectionAddress: collection,
                    tokenId: tokenId,
                    blockchain: blockchain,
                    price: parseFloat(price),
                    isMarketplace: true,
                    listingId:
                      res?.events?.ListingAdded?.returnValues?.listingId?.toString(),
                  },
                  refetchQueries: [
                    {
                      query: itemPageQuery,
                      variables: {
                        blockchain: blockchain,
                        collectionAddress: collection,
                        tokenId: tokenId,
                      },
                    },
                  ],
                })
                  .then((res) => {
                    setBuyLoad(false);
                    console.log(res);
                  })
                  .catch((err) => {
                    setBuyLoad(false);
                    console.log(err);
                  });
              })
              .catch((err) => {
                setBuyLoad(false);
                console.log(err);
              });
          })
          .catch((err) => {
            console.log(err);
          })
          .catch((err) => {
            console.log(err);
          });
      } else if (listingData?.endTime > new Date().getTime() / 1000 == false) {
        Swal.fire("Warning", "Sale is over", "warning");
      } else if (
        account != owner &&
        nftData?.listingId != "" &&
        !loading &&
        !error &&
        data?.ItemPageQuery?.isListedOnMarketplace == true &&
        isListed(
          parseInt(listingData?.startTime),
          moment.unix(new Date(transactionLength).getTime() / 1000)
        ) == 3
      ) {
        setBuyLoad(true);
        purchaseNFT(
          parseInt(nftData?.listingId),
          listingData?.buyoutPricePerToken
        )
          .then((res) => {
            updateItemSale({
              variables: {
                collectionAddress: collection,
                tokenId: tokenId,
                blockchain: blockchain,
                price: parseFloat(price),
                isMarketplace: false,
                listingId: null,
              },
              refetchQueries: [
                {
                  query: itemPageQuery,
                  variables: {
                    blockchain: blockchain,
                    collectionAddress: collection,
                    tokenId: tokenId,
                  },
                },
              ],
            })
              .then((res) => {
                updateRewardsData({
                  variables: {
                    walletAddress: account,
                    price:
                      parseFloat(listingData?.buyoutPricePerToken) /
                      Math.pow(10, 18),
                  },
                })
                  .then((res) => {
                    console.log(res);
                    setBuyLoad(false);
                  })
                  .catch((err) => {
                    setBuyLoad(false);
                  });
                setBuyLoad(false);
                console.log(res);
              })
              .catch((err) => {
                setBuyLoad(false);
                console.log(err);
              });
          })
          .catch((err) => {
            setBuyLoad(false);
            console.log(err);
          });
      } else {
        if (time != "" && diffrence != "" && price != "" && account == owner) {
          SaleNFT(price);
        } else if (
          account != owner &&
          isListed(
            parseInt(listingData?.startTime),
            moment.unix(new Date(transactionLength).getTime() / 1000)
          ) == 2
        ) {
          return;
        } else {
          Swal.fire("Warning", "Please Input Date & Time", "warning");
        }
      }
    }
  };

  const AccrodianData = [
    {
      Icon: <BsListNested size={25} className="text-grey" />,
      title: t("Description"),
      key: "item-1",
      content: (
        <div>
          <p className="py-4 px-6 text-md p-0 m-0  text-md">
            {metadata?.description}
          </p>
        </div>
      ),
    },
    {
      Icon: <AiOutlineFileText size={25} className="text-grey" />,
      title: t("Details"),
      key: "item-2",

      content: (
        <div>
          <p className="py-4 px-6 text-md p-0 m-0  text-md">
            <div className="  p-3 ">
              <div className="flex  gap-[40px]  justify-between items-center">
                <h4 className="capitalize text-lg">{t("contract address")}</h4>
                <h4 className="text-lg  font-bold uppercase">
                  {tokenMetadata?.token_address
                    ? truncateAddress(tokenMetadata?.token_address)
                    : "No Address"}
                </h4>
              </div>

              <div className="flex  gap-[40px] justify-between  items-center">
                <h4 className="capitalize  text-lg">{t("token ID")}</h4>
                <h4 className="text-lg  font-bold uppercase">{tokenId}</h4>
              </div>

              <div className="flex  gap-[40px] justify-between  items-center">
                <h4 className="capitalize text-lg">{t("token standard")}</h4>
                <h4 className="text-lg  font-bold uppercase">ERC-721</h4>
              </div>
              <div className="flex  gap-[40px] justify-between  items-center">
                <h4 className="capitalize  text-lg">{t("chain")}</h4>
                <h4 className="text-lg  font-bold capitalize">{blockchain}</h4>
              </div>
              <div className="flex  gap-[40px] justify-between  items-center">
                <h4 className="capitalize  text-lg">
                  {t("View On Block Explorer")}
                </h4>
                <a
                  className="capitalize  text-lg"
                  href={
                    chainId
                      ? ChainsInfo[chainId].BLOCK_EXPLORER_URL + collection
                      : null
                  }
                  target="_blank"
                >
                  {t("View Collection")}
                </a>
              </div>
            </div>
          </p>
        </div>
      ),
    },
    {
      Icon: <RiArrowUpDownFill size={25} className="text-black" />,
      title: t("item activity"),
      content: (
        <div>
          <div className="border rounded-lg  mt-4 mx-3"> </div>

          <div className="overflow-x-auto relative">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th
                    scope="col"
                    className="py-3 px-6 capitalize text-grey text-lg "
                  >
                    {t("event")}
                  </th>

                  <th
                    scope="col"
                    className="py-3 px-6 capitalize text-grey text-lg"
                  >
                    {t("from")}
                  </th>
                  <th
                    scope="col"
                    className="py-3 px-6 capitalize text-grey text-lg"
                  >
                    {t("to")}
                  </th>
                  <th
                    scope="col"
                    className="py-3 px-6 capitalize text-grey text-lg"
                  >
                    {t("date")}
                  </th>
                </tr>
              </thead>
              <tbody>
                {console.log(data?.ItemPageQuery?.event)}
                {data?.ItemPageQuery?.event?.map((dataActivity, index) => {
                  return (
                    <>
                      <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                        <th
                          scope="row"
                          className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                        >
                          <div className="flex items-center gap-5">
                            <div>{<BiTransfer size={30} />}</div>

                            <h4 className="text-lg text-grey p-0 m-0 capitalize">
                              {t("Transfer")}
                            </h4>
                          </div>
                        </th>

                        <td className="py-4 px-6 text-blue text-lg">
                          {truncateAddress(dataActivity.from_address)}
                        </td>
                        <td className="py-4 px-6 text-blue text-lg">
                          {truncateAddress(dataActivity.to_address)}
                        </td>
                        <td className="py-4 px-6 text-blue text-lg">
                          {moment(dataActivity?.block_timestamp).fromNow()}
                        </td>
                      </tr>
                    </>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      ),
    },
  ];
  const isListed = (ListingTime, TransactionTime) => {
    let transTime = TransactionTime._i / 1000;

    if (isNaN(ListingTime)) {
      return 2;
    }
    if (parseInt(transTime) > parseInt(ListingTime)) {
      return 2;
    } else {
      return 3;
    }
  };

  const openImageViewer = useCallback((index) => {
    setCurrentImage(index);
    setIsViewerOpen(true);
  }, []);

  const closeImageViewer = () => {
    setCurrentImage(0);
    setIsViewerOpen(false);
  };

  const transformIpfsUrl = (originalUrl) => {
    if (!originalUrl || !originalUrl.includes("ipfs")) {
      return originalUrl;
    }

    try {
      // Extract the CID and filename
      const urlParts = originalUrl.split("/");
      const filename = urlParts[urlParts.length - 1];

      // Extract CID from the hostname
      const hostname = urlParts[2]; // e.g., "bafybeicahxczdqkttjzhf3dmv2jle6yknfmjgnbw6yrfqmv3cxmi4cc37e.ipfs.cf-ipfs.com"
      const cid = hostname.split(".")[0]; // Get the CID part

      // Construct new URL
      return `https://ipfs.io/ipfs/${cid}/${filename}`;
    } catch (error) {
      console.error("Error transforming IPFS URL:", error);
      return originalUrl;
    }
  };

  const currentUrl = window.location.href;

  useEffect(() => {}, []);

  if (buyLoad || loading) {
    return <PageLoading />;
  }

  console.log("lazyMetadata-->", lazyMetadata);
  console.log("data-->", data);

  return (
    <div className="mt-7 md:mt-0 relative">
      {error ? (
        <NotDetails />
      ) : (
        <div className="max-w-[1500px] mx-auto">
          <button
            className="px-2 py-1 mx-10 my-4 border border-gray-300 rounded flex items-center gap-3"
            onClick={() => navigate(-1)} // Go back to the previous page
          >
            <BsArrowLeft />
            {t("Back")}
          </button>
          <div className="flex flex-col md:flex-row justify-center items-center gap-[20px] py-5 px-5 h-auto w-full  top-[100px] bg-white">
            <div className="flex-1">
              {
                <>
                  <img
                    src={
                      lazyMetadata?.image?.includes("ipfs.cf-ipfs.com")
                        ? lazyMetadata?.image?.replace(
                            /^https:\/\/([^.]+)\.ipfs\.cf-ipfs\.com\/(.+)$/,
                            "https://ipfs.io/ipfs/$1/$2"
                          )
                        : lazyMetadata?.image?.replace(
                            "https://ipfs.thirdwebcdn.com/ipfs/",
                            `https://${process.env.REACT_APP_THIRDWEB_CLIENT_ID}.ipfscdn.io/ipfs/`
                          ) ||
                          "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/1024px-No_image_available.svg.png"

                      // lazyMetadata?.image
                      //   ? lazyMetadata?.image.includes("http")
                      //     ? transformIpfsUrl(
                      //         lazyMetadata?.image.replace(
                      //           "https://ipfs.thirdwebcdn.com/ipfs/",
                      //           `https://${process.env.REACT_APP_THIRDWEB_CLIENT_ID}.ipfscdn.io/ipfs/`
                      //         )
                      //       )
                      //     : lazyMetadata?.image
                      //   : "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/1024px-No_image_available.svg.png"
                    }
                    alt=""
                    className="w-full object-contain mx-auto max-h-[400px]"
                    onClick={() => openImageViewer(0)}
                    onError={() => (
                      <div className="animate-pulse w-full h-[400px] bg-gray-200 rounded-lg"></div>
                    )}
                  />
                </>
              }
              {isViewerOpen && (
                <div
                  onClick={() => setIsViewerOpen(false)}
                  className="absolute bg-black h-[100vh] w-full top-0 left-0 flex item-center justify-center"
                >
                  <img
                    className="w-[90%] h-full object-contain"
                    onClick={() => setIsViewerOpen(false)}
                    src={
                      lazyMetadata?.image?.includes("ipfs.cf-ipfs.com")
                        ? lazyMetadata?.image?.replace(
                            /^https:\/\/([^.]+)\.ipfs\.cf-ipfs\.com\/(.+)$/,
                            "https://ipfs.io/ipfs/$1/$2"
                          )
                        : lazyMetadata?.image?.replace(
                            "https://ipfs.thirdwebcdn.com/ipfs/",
                            `https://${process.env.REACT_APP_THIRDWEB_CLIENT_ID}.ipfscdn.io/ipfs/`
                          ) ||
                          "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/1024px-No_image_available.svg.png"
                    }
                    // src={
                    //   lazyMetadata && lazyMetadata?.image.includes("ipfs")
                    //     ? lazyMetadata?.image.replace(
                    //         "https://ipfs.thirdwebcdn.com/ipfs/",
                    //         "https://0a7fb2c625dc7ba2c0696fc825ec1c78.ipfscdn.io/ipfs/"
                    //       )
                    //     : lazyMetadata?.image.includes("http")
                    //     ? lazyMetadata?.image.replace(
                    //         "https://ipfs.thirdwebcdn.com/ipfs/",
                    //         "https://0a7fb2c625dc7ba2c0696fc825ec1c78.ipfscdn.io/ipfs/"
                    //       )
                    //     : "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/1024px-No_image_available.svg.png"
                    // }
                  />
                </div>
              )}
            </div>
            <div className=" flex-1">
              <h6
                className="text-darkblue text-2xl font-bold"
                onClick={() => {
                  const ownerAddress = data?.ItemPageQuery?.lazyMinting
                    ? data?.ItemPageQuery?.owner
                    : tokenMetadata?.owner_of;

                  if (ownerAddress) {
                    navigate(`/users/userpage/${ownerAddress}`);
                  }
                }}
              >
                {/* {lazyMetadata?.name} */}
                <h6 className="text-darkblue text-2xl font-bold">
                  {lazyMetadata?.name
                    ? lazyMetadata.name.replace(/\s+/g, "_")
                    : "Default_Name"}
                </h6>
              </h6>
              <h4 className="text-lg text-black text-xl">
                {t("Token Id")}: #{tokenId}
              </h4>
              <div className="flex items-center gap-4 py-4">
                <div className="flex gap-[30px]">
                  <div className="flex m-1 items-center gap-[10px]">
                    <img
                      className="rounded-full w-[30px]"
                      src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iNDBweCIgaGVpZ2h0PSI0MHB4IiB2aWV3Qm94PSIwIDAgODAgODAiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgPGRlZnM+CiAgICA8bGluZWFyR3JhZGllbnQgeDE9IjAlIiB5MT0iMCUiIHgyPSIxMDAlIiB5Mj0iMTAwJSIgaWQ9IjUyNDUwMTg1MDE2MSI+CiAgICAgIDxzdG9wIHN0b3AtY29sb3I9InJnYigyMzgsIDI1NSwgMCkiIG9mZnNldD0iMCUiPjwvc3RvcD4KICAgICAgPHN0b3Agc3RvcC1jb2xvcj0icmdiKDAsIDIzOCwgMjU1KSIgb2Zmc2V0PSIxMDAlIj48L3N0b3A+CiAgICA8L2xpbmVhckdyYWRpZW50PgogIDwvZGVmcz4KICA8ZyBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMSIgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj4KICAgIDxyZWN0IGlkPSJSZWN0YW5nbGUiIGZpbGw9InVybCgjNTI0NTAxODUwMTYxKSIgeD0iMCIgeT0iMCIgd2lkdGg9IjgwIiBoZWlnaHQ9IjgwIj48L3JlY3Q+CiAgPC9nPgo8L3N2Zz4="
                    />
                    <h5 className="text-grey">
                      {t("Owned By")} <br />
                      <span className="text-blue">
                        {data?.ItemPageQuery?.lazyMinting ? (
                          truncateAddress(data?.ItemPageQuery?.owner)
                        ) : (
                          <>
                            {tokenMetadata?.owner_of
                              ? truncateAddress(tokenMetadata?.owner_of)
                              : null}
                          </>
                        )}
                      </span>
                    </h5>
                  </div>

                  <div className="flex m-1 items-center gap-[10px]">
                    <img
                      className="rounded-full w-[30px]"
                      src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iMjRweCIgaGVpZ2h0PSIyNHB4IiB2aWV3Qm94PSIwIDAgODAgODAiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgPGRlZnM+CiAgICA8bGluZWFyR3JhZGllbnQgeDE9IjAlIiB5MT0iMCUiIHgyPSIxMDAlIiB5Mj0iMTAwJSIgaWQ9IjY1MjI4MjE1MjQyNCI+CiAgICAgIDxzdG9wIHN0b3AtY29sb3I9InJnYig2OCwgMCwgMjU1KSIgb2Zmc2V0PSIwJSI+PC9zdG9wPgogICAgICA8c3RvcCBzdG9wLWNvbG9yPSJyZ2IoMjU1LCA2OCwgMCkiIG9mZnNldD0iMTAwJSI+PC9zdG9wPgogICAgPC9saW5lYXJHcmFkaWVudD4KICA8L2RlZnM+CiAgPGcgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+CiAgICA8cmVjdCBpZD0iUmVjdGFuZ2xlIiBmaWxsPSJ1cmwoIzY1MjI4MjE1MjQyNCkiIHg9IjAiIHk9IjAiIHdpZHRoPSI4MCIgaGVpZ2h0PSI4MCI+PC9yZWN0PgogIDwvZz4KPC9zdmc+"
                    />
                    <h5 className="text-grey">
                      {t("Created By")} <br />
                      <span className="text-blue">
                        {data?.ItemPageQuery?.lazyMinting ? (
                          <>
                            {data?.ItemPageQuery?.owner
                              ? truncateAddress(data?.ItemPageQuery?.owner)
                              : null}
                          </>
                        ) : (
                          <>
                            {metadata?.creator
                              ? truncateAddress(metadata?.creator)
                              : null}
                          </>
                        )}
                      </span>
                    </h5>
                  </div>
                </div>
                <div className="flex justify-center items-center gap-5"></div>
              </div>
              <div className=" p-3 rounded-lg">
                {account == owner &&
                !loading &&
                !error &&
                isListed(
                  parseInt(listingData?.startTime),
                  moment.unix(new Date(transactionLength).getTime() / 1000)
                ) == 2 ? (
                  <>
                    <label>Enter Time</label>

                    <Space direction="vertical" size={12}>
                      <RangePicker
                        showTime={{
                          format: "HH:mm",
                        }}
                        format="YYYY-MM-DD HH:mm"
                        defaultValue={new Date()}
                        onChange={onDateChange}
                        onOk={onOk}
                      />
                    </Space>
                    <label>Enter Price</label>
                    <input
                      className="border w-full p-2 rounded-lg m-1 mb-2"
                      placeholder={
                        owner && nftData?.isMarketplace
                          ? listingData?.buyoutPricePerToken / Math.pow(10, 18)
                          : "Enter price"
                      }
                      type="number"
                      min={0}
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                    />
                  </>
                ) : null}
                <div className="max-w-[300px] w-full">
                  {account != owner &&
                  isListed(
                    parseInt(listingData?.startTime),
                    moment.unix(new Date(transactionLength).getTime() / 1000)
                  ) != 2 &&
                  listingData?.endTime ? (
                    <>
                      <p className="m-1 text-sm">Sale Will End In</p>
                      <CounterComponent endDate={listingData?.endTime} />
                    </>
                  ) : null}
                </div>
                <div className="flex justify-center items-center gap-2 border rounded-lg p-2 max-w-[300px] w-full make-offer ">
                  <MdLocalOffer className="text-darkblue" />

                  {data?.ItemPageQuery?.lazyMinting ? (
                    <>
                      {console.log(data?.itemPageQuery)}
                      {account == data?.ItemPageQuery?.owner ? (
                        <>
                          <p className="capitalize text-darkblue p-0 mb-[0rem] font-bold cursor-pointer">
                            NFT Owner
                          </p>
                        </>
                      ) : (
                        <>
                          <p
                            className="capitalize text-darkblue p-0 mb-[0rem] font-bold cursor-pointer"
                            onClick={SaleNFT}
                          >
                            {console.log(listingData?.endTime)}
                            {t("Buy Now At")} &nbsp;
                            {voucher &&
                              parseFloat(voucher[5] / Math.pow(10, 18))}
                            {ChainsInfo[chainId]?.OVE_COIN == voucher[6]
                              ? "OVE"
                              : ChainsInfo[chainId]?.CURRENCY_SYMBOL}
                          </p>
                        </>
                      )}
                    </>
                  ) : (
                    <>
                      <p
                        className="capitalize text-darkblue p-0 mb-[0rem] font-bold cursor-pointer"
                        onClick={handleSale}
                      >
                        {account == owner &&
                          !loading &&
                          !error &&
                          isListed(
                            parseInt(listingData?.startTime),
                            moment.unix(
                              new Date(transactionLength).getTime() / 1000
                            )
                          ) == 2 &&
                          "Put On Sale"}
                        {account == owner &&
                          isListed(
                            parseInt(listingData?.startTime),
                            moment.unix(
                              new Date(transactionLength).getTime() / 1000
                            )
                          ) == 3 &&
                          "Remove From Marketplace"}
                        {account != owner &&
                          !loading &&
                          !error &&
                          isListed(
                            parseInt(listingData?.startTime),
                            moment.unix(
                              new Date(transactionLength).getTime() / 1000
                            )
                          ) == 2 &&
                          "Not Listed"}
                        {account != owner &&
                          listingData?.endTime > new Date().getTime() / 1000 &&
                          isListed(
                            parseInt(listingData?.startTime),
                            moment.unix(
                              new Date(transactionLength).getTime() / 1000
                            )
                          ) == 3 &&
                          "Buy Now At"}
                        {/* {listingData?.endTime > new Date().getTime() / 1000 ==
                          false &&
                          account == owner &&
                          "Put On Sale"} */}
                        {listingData?.endTime > new Date().getTime() / 1000 ==
                          false &&
                          account != owner &&
                          "Sale is over"}
                        {account != owner &&
                          listingData?.endTime > new Date().getTime() / 1000 &&
                          isListed(
                            parseInt(listingData?.startTime),
                            moment.unix(
                              new Date(transactionLength).getTime() / 1000
                            )
                          ) == 3 &&
                          `${
                            listingData?.buyoutPricePerToken / Math.pow(10, 18)
                          }` +
                            " " +
                            ChainsInfo[chainId].CURRENCY_SYMBOL}
                        {console.log(
                          listingData?.endTime > new Date().getTime() / 1000,
                          "End Time"
                        )}
                        {data?.ItemPageQuery?.lazyMinting ? (
                          <>
                            {parseFloat(
                              voucher && voucher[5] / Math.pow(10, 18)
                            ).toFixed(4)}
                            <button onClick={SaleNFT}>Buy Now</button>
                          </>
                        ) : null}
                      </p>
                    </>
                  )}
                </div>
                <div className="mt-10 flex item-center justify-start gap-5">
                  <FacebookShareButton url={currentUrl}>
                    <FacebookIcon size={40} round />
                  </FacebookShareButton>

                  <TwitterShareButton url={currentUrl}>
                    <TwitterIcon size={40} round />
                  </TwitterShareButton>

                  <HatenaShareButton url={currentUrl}>
                    <HatenaIcon round size={40} />
                  </HatenaShareButton>

                  <LineShareButton url={currentUrl}>
                    <LineIcon round size={40} />
                  </LineShareButton>
                </div>
              </div>
            </div>
          </div>
          <div className="my-10  items-center   mx-[30px]">
            {AccrodianData.map((item, key) => (
              <div className="my-4 border rounded-lg">
                <Accordian
                  Icon={item.Icon}
                  title={item.title}
                  content={item.content}
                  key={item.key}
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default NFTPage;

const Accordian = ({ title, content, Icon, key }) => {
  const [icon, setIcon] = useState("");
  const [expand, setExpand] = useState("");

  const handleClick = () => {
    setIcon(!icon);
    setExpand(!expand);
  };
  return (
    <>
      <div className="flex  items-center justify-between gap-5 px-3 ">
        <div className="flex gap-4 items-center px-2 py-3">
          <a onClick={(e) => e.preventDefault()}>
            <Space className="  px-3 py-3">
              <div className="flex gap-4 items-center ">{Icon} </div>
            </Space>
          </a>

          <h4 className="capitalize text-grey font-bold text-lg p-0 m-0">
            {title}
          </h4>
        </div>

        <button onClick={handleClick}>
          {!icon ? <IoIosArrowDown size={20} /> : <IoIosArrowUp size={20} />}
        </button>
      </div>

      {expand && <div>{content}</div>}
    </>
  );
};
