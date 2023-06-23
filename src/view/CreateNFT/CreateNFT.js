import React, { useEffect, useState } from "react";
import { Button, Form, Input, message, Select, Space, Tooltip } from "antd";
import Swal from "sweetalert2";
import useWeb3 from "../../hooks/useWeb3";
import {
  InboxOutlined,
  MinusCircleOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { Switch } from "antd";
import { useWeb3React } from "@web3-react/core";
import { truncateAddress } from "../../utils";
import Dragger from "antd/lib/upload/Dragger";
import { PLATEFORM_FEES } from "../../config/constant";
import { BsFillPatchQuestionFill } from "react-icons/bs";

import useStorage from "../../hooks/useStorage";
import { DatePicker } from "antd";

import { useMutation, useQuery } from "@apollo/client";
import useNFT from "../../hooks/useNFT";

import axios from "axios";
// import { CreateNft } from "../../graphql/mutations/nftMutations";
import CreateLoading from "../../CreateLoading/CreateLoading";

import PageLoading from "../../components/PageLoading/PageLoading";
import { ChainsInfo } from "../../config/config-chains";
import { itemCreateMutation } from "../../graphql/mutations/itemCreateMutation";
import FailureAlert from "../../components/Alerts/FailureAlert";
import NotConnectedPage from "../Home/components/NotConnectedPage";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Web3 from "web3";

// import NotConnectedPage from "../Home/components/NotConnectedPage";

const CreateNFT = () => {
  const { TextArea } = Input;
  const { RangePicker } = DatePicker;
  const { t } = useTranslation();
  const [yenAmount, setYenAmount] = useState("");
  const { Option } = Select;
  const [ethAmount, setEthAmount] = useState("");
  const [payout, setPayout] = useState("");
  const { activate, deactivate, active, account, chainId } = useWeb3React();
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  // const [createNFT] = useMutation(createNft);
  const [previewPrice, setPreviewPrice] = useState(null);

  const [createLoad, setCreateLoad] = useState(true);
  const [unlockableContent, setUnloackableContent] = useState(false);
  const [lazyMint, setLazyMint] = useState(true);
  const [isMarketPlaceMint, setMarketplaceMint] = useState(false);
  const [loading, setLoading] = useState(false);

  const { mintNFT, lazyMintNFT } = useNFT();
  const [createItem] = useMutation(itemCreateMutation);

  const [auction, setAuction] = useState("");
  const [previewName, setPreviewName] = useState(null);
  const [counter, setCounter] = useState("buyer");
  const { signCreate } = useWeb3();
  const [previewURL, setPreviewURL] = useState(null);
  const onChange = (checked) => {
    console.log(`switch to ${checked}`);
  };
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { uploadOnIpfs, downloadJSONOnIpfs } = useStorage();
  const [expand, setExpand] = useState(false);
  // const [createNft] = useMutation(CreateNft);
  const [maticAmount, setMaticAmount] = useState("");

  // const API_URL = `https://www.binance.com/bapi/asset/v1/public/asset-service/product/currency`;
  const ETH_API_URL =
    "https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd";
  const BSC_API_URL =
    "https://api.coingecko.com/api/v3/simple/price?ids=binancecoin&vs_currencies=usd";
  const convertMaticToYen = async (price) => {
    console.log(price);
    console.log("----------------chain id ")
    console.log(chainId)

    if(chainId == 1)
    {
      const ETH_RESPONSE = await fetch(ETH_API_URL);
      const ethData = await ETH_RESPONSE.json();
      console.log(ethData,"<=======")
      const convertedAmount = price * ethData["ethereum"].usd;
      setYenAmount(convertedAmount);
    }
    if(chainId == 56)
    {
      const BSC_RESPONSE = await fetch(BSC_API_URL);
      const bscData = await BSC_RESPONSE.json();
      const convertedAmount = price * bscData["binancecoin"].usd;
      setYenAmount(convertedAmount);
    }
  };

  useEffect(() => {
    if (active) {
      let data = JSON.parse(localStorage.getItem("loggedIn"));
      if (
        localStorage.getItem("loggedIn") == "false" ||
        localStorage.getItem("loggedIn") == undefined
      ) {
        Swal.fire("You Must Sign In to do the transaction");
        navigate("/login");
      } else if (data.wallet != account) {
        Swal.fire("Please Login Again");
        navigate("/login");
      } else {
      }
    }
  }, [active, account]);
  useEffect(() => {
    // Loading function to load data or
    // fake it using setTimeout;
    const loadData = async () => {
      // Wait for two second
      await new Promise((r) => setTimeout(r, 2000));

      // Toggle loading state
      setCreateLoad((createLoad) => !createLoad);
    };

    loadData();
  }, []);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const beforeUpload = (file, fileList) => {
    setFile(file);
    setPreviewURL(URL.createObjectURL(file));
    console.log(file);
    return false;
  };

  const removeUpload = (file, fileList) => {
    setFile(null);
    setPreviewURL(null);
  };
  const handleSubmit = (values) => {
    console.log(values);
    let description = values.description;
    let name = values.name;
    let royalties = values.royalties;

    let charity = values.charity;
    let royaltyWalletAddress = values.royaltyWalletAddress;
    let charityWallet = values.charityWallet;
    let price = previewPrice;
    console.log(
      royalties,
      charity,
      charityWallet,
      royaltyWalletAddress,
      payout,
      price
    );
    let imageFormObj = new FormData();
    imageFormObj.append("image", file);

    const metadata = {
      name: name,
      description: description,
      image: imageFormObj.get("image"),
      creator: account,
      properties: {},
    };
    try {
      if (active) {
        setLoading(true);
        uploadOnIpfs(metadata).then(async (uri) => {
          console.log(uri);
          const data = await downloadJSONOnIpfs(uri);
          if (lazyMint) {
            console.log("in this");
            signCreate(
              account,
              account,
              "100",
              account,
              uri,
              new Web3().utils.toWei(price.toString(), "ether"),
              payout,
              parseInt(new Date().getTime() / 1000).toString(),
              parseInt(
                new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).getTime() / 1000
              ).toString(),
              "100",
              account,
              "100",
              ""
            )
              .then(async (res) => {
                console.log(res, "voucher created");
                let metadata = await downloadJSONOnIpfs(uri);
                createItem({
                  variables: {
                    collectionAddress: ChainsInfo[chainId].NFT_ADDRESS,
                    tokenId:
                      1000 +
                      Math.floor(
                        Math.random() * (new Date().getTime() / 1000)
                      ).toString(),
                    metadata: JSON.stringify(metadata),
                    voucher: JSON.stringify(res.tuple),
                    isLazyMint: true,
                    blockchain: ChainsInfo[chainId].CHAIN_NAME.toLowerCase(),
                    name: name,
                    price: parseFloat(price),
                    signer: res.signer,
                    owner: account,
                  },
                })
                  .then((res) => {
                    setLoading(false);
                    Swal.fire("Success", "NFT Minted Successfully", "success");
                    navigate(`/collection/collectiondetails/${ChainsInfo[chainId].CHAIN_NAME.toLowerCase()}/${ChainsInfo[chainId].NFT_ADDRESS}`)
                  })
                  .catch((err) => {
                    console.log(err);
                    setLoading(false);
                  });
                setLoading(false);
              })

              .catch((err) => {
                console.log(err);
                setLoading(false);
              });
          } else {
            mintNFT(
              uri,
              royaltyWalletAddress,
              charityWallet,
              royalties,
              charity
            )
              .then(async (res) => {
                console.log();
                let metadata = await downloadJSONOnIpfs(uri);
                createItem({
                  variables: {
                    collectionAddress: ChainsInfo[chainId].NFT_ADDRESS,
                    tokenId: res.events.TokensMinted.returnValues.tokenIdMinted,
                    metadata: JSON.stringify(metadata),
                    blockchain: ChainsInfo[chainId].CHAIN_NAME.toLowerCase(),
                    name: name,
                  },
                })
                  .then((res) => {
                    setLoading(false);
                    Swal.fire("Success", "NFT Minted Successfully", "success");
                  })
                  .catch((err) => {
                    console.log(err);
                    setLoading(false);
                  });
                setLoading(false);
              })
              .catch((err) => {
                console.log(err);
              });
          }
        });
      } else {
        Swal.fire("Error", "Please Connect Wallet", "error");
      }
    } catch (error) {
      console.log(error);
      message.error("error");
    }
  };
  if (loading) {
    return <CreateLoading />;
  } else if (createLoad) {
    return <PageLoading />;
  } else if (!active) {
    return <NotConnectedPage />;
  }
  return (
    <div>
      <>
        <div className="max-w-[1100px] mx-auto py-5 px-[40px]">
          <h2 className="text-2xl font-bold capitalize ">
            {t("create new NFT")}
          </h2>
          {/* <p className="text-xl font-semibold capitalize text-grey">
            {t("Single edition on Ethereum")}
          </p> */}

          <div className="flex flex-col md:flex-row gap-[40px]">
            <div className="flex-[2]">
              <div className="pt-5 pb-5">
                {active ? (
                  <>
                    <h2 className="text-xl font-bold capitalize ">
                      {t("Connected wallet")}
                    </h2>
                    <div className="flex items-center justify-between p-3 border-2 rounded-lg">
                      <div className="flex justify-center gap-5">
                        <div
                          className={`p-2 {${
                            !active ? "bg-[#427AE8]" : "bg-[#040404]"
                          }} rounded-full`}
                        >
                          <div>
                            <img
                              src={
                                !active
                                  ? "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRGtj2KeFd3RPaF9MfKUbSx062cu625NTiG25QllHEQGDSpi0j42YA4PVjd4U-mXZ1Dj4s&usqp=CAU"
                                  : process.env.PUBLIC_URL +
                                    ChainsInfo[chainId].LOGO_URL
                              }
                              alt=""
                              className="w-[63%] mx-auto   gap-5"
                            />
                          </div>
                        </div>
                        <div>
                          <p className="p-0 m-0 mt-[8px]">
                            {active
                              ? truncateAddress(account)
                              : "Not Connected"}
                          </p>
                        </div>
                      </div>
                      <div>
                        <button className="">
                          {active ? (
                            <div
                              style={{
                                borderRadius: "4px",
                                padding: "0px 5px",
                                background: "rgba(40, 184, 51, 0.1)",
                              }}
                            >
                              <span
                                style={{
                                  lineHeight: "17px",
                                  color: "rgb(40, 184, 51)",
                                }}
                              >
                                {t("Connected")}
                              </span>
                            </div>
                          ) : (
                            t("Please connect")
                          )}
                        </button>
                      </div>
                    </div>
                  </>
                ) : null}
              </div>
              <Form
                onFinish={(values) => {
                  handleSubmit(values);
                }}
              >
                <div className="pt-5 pb-5">
                  <h2 className="text-xl font-bold capitalize ">
                    {t("upload file")}
                  </h2>

                  <div className="pt-5 pb-5 space-y-40 left__part md:mb-5 upload_file">
                    <Dragger
                      beforeUpload={beforeUpload}
                      accept="image/png, image/gif, image/jpeg"
                      onRemove={removeUpload}
                      maxCount={1}
                    >
                      <p className="ant-upload-drag-icon">
                        <InboxOutlined />
                      </p>
                      <p className="p-3 ant-upload-text">
                        {t("Click or drag file to this area to upload")}
                      </p>
                      <p className="p-5 ant-upload-hint">
                        {t(
                          "Support for a single upload. Strictly prohibit from uploading company data or other band files"
                        )}
                      </p>
                    </Dragger>
                  </div>
                </div>

                <>
                  <Form.Item name="Payout">
                    <h2 className="text-xl font-bold capitalize ">
                      {t("Payout Currency")}
                    </h2>
                    <Select
                      onChange={(value) => {
                        setPayout(value);
                      }}
                      name="Category"
                      placeholder="Please select a category"
                    >
                      <Option value={ChainsInfo[chainId].OVE_COIN}>OVE</Option>
                      <Option value={ChainsInfo[chainId].NATIVE_TOKEN_ADDRESS}>
                        {ChainsInfo[chainId].CURRENCY_SYMBOL}
                      </Option>
                    </Select>
                  </Form.Item>
                  <Form.Item name="price">
                    <div className="pt-5 pb-5">
                      <h2 className="text-xl font-bold capitalize ">
                        {t("price")}
                      </h2>
                      <Input
                        class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                        id="inline-full-name"
                        type="number"
                        onChange={(e) => {
                          setPreviewPrice(e.target.value);
                          convertMaticToYen(e.target.value);
                        }}
                        placeholder={t("Enter price for single nft")}
                        required={true}
                      />
                    </div>
                    $ {yenAmount}
                    <br />
                    {t("Fees are the responsibility of the purchaser.")}
                  </Form.Item>
                </>

                <Form.Item name="name">
                  <div>
                    <h2 className="pb-2 font-bold capitalize text-md ">
                      {t("name")}
                    </h2>
                    <Input
                      class="bg-gray-200 appearance-none border-2 placeholder-grey-50 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                      id="inline-full-name"
                      onChange={(e) => setPreviewName(e.target.value)}
                      type="text"
                      required
                      placeholder={t("Redeemable T-Shirt with logo&quot")}
                    />
                  </div>
                </Form.Item>

                <Form.Item name="royalties">
                  <div className="pt-5 pb-5">
                    <h2 className="pb-2 font-bold capitalize text-md ">
                      {t("Royalties")}
                    </h2>
                    <Input
                      class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-black leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                      id="inline-full-name"
                      type="number"
                      placeholder="10%"
                      required
                    />
                  </div>
                </Form.Item>
                {console.log(lazyMint)}

                <Form.Item name="royaltyWalletAddress">
                  <div className="pt-5 pb-5">
                    <h2 className="pb-2 font-bold capitalize text-md ">
                      {t("Royalty Wallet Address")}
                    </h2>
                    <Input
                      class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-black leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                      id="inline-full-name"
                      type="text"
                      rules={[
                        {
                          required: true,
                          message: t("Royalty Wallet Address is required"),
                        },
                        {
                          pattern: /^0x[a-fA-F0-9]{40}$/,
                          message: t("Not A Valid Address"),
                        },
                      ]}
                      placeholder={t("Please Enter Royalty Wallet Address")}
                      required
                    />
                  </div>
                </Form.Item>
                <Form.Item name="charity">
                  <div className="pt-5 pb-5">
                    <h2 className="pb-2 font-bold capitalize text-md ">
                      {t("Charity")}
                    </h2>
                    <Input
                      class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-black leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                      id="inline-full-name"
                      type="number"
                      placeholder="10%"
                    />
                  </div>
                </Form.Item>
                <Form.Item name="charityWallet">
                  <div className="pt-5 pb-5">
                    <h2 className="pb-2 font-bold capitalize text-md ">
                      {t("Charity Wallet Address")}
                    </h2>
                    <Input
                      class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-black leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                      id="inline-full-name"
                      type="text"
                      placeholder={t("Charity Wallet Address")}
                    />
                  </div>
                </Form.Item>

                {/* <div>
                  <Button
                    className="w-full p-4 font-bold text-center text-black border rounded-lg"
                    onClick={() => setExpand(!expand)}
                    style={{ height: "50px " }}
                  >
                    {expand ? (
                      <span>{t("Hide advanced settings")}</span>
                    ) : (
                      <span className="m-2">{t("Show advanced settings")}</span>
                    )}
                  </Button>
                  {expand ? (
                    <>
                      <Form.List name="users" className="p-2">
                        {(fields, { add, remove }) => (
                          <>
                            {fields.map(({ key, name, ...restField }) => (
                              <Space
                                key={key}
                                style={{
                                  display: "flex",
                                  marginTop: 8,
                                  marginBottom: 8,
                                }}
                                align="baseline"
                              >
                                <Form.Item
                                  {...restField}
                                  name={[name, "Traits"]}
                                  className="p-3"
                                  rules={[
                                    {
                                      required: true,
                                      message: "properties",
                                    },
                                  ]}
                                >
                                  <Input placeholder="Traits" />
                                </Form.Item>
                                <Form.Item
                                  {...restField}
                                  name={[name, "Value"]}
                                  rules={[
                                    {
                                      required: true,
                                      message: "Missing properties",
                                    },
                                  ]}
                                >
                                  <Input placeholder="Value" />
                                </Form.Item>
                                <MinusCircleOutlined
                                  onClick={() => remove(name)}
                                />
                              </Space>
                            ))}
                            <Form.Item>
                              <Button
                                type="dashed"
                                className="mt-2"
                                onClick={() => add()}
                                block
                                icon={<PlusOutlined />}
                              >
                                {t("Add Properties")}
                              </Button>
                            </Form.Item>
                          </>
                        )}
                      </Form.List>
                    </>
                  ) : null}
                </div> */}
                <Form.Item name="description">
                  <div className="pt-5 pb-5">
                    <h2 className="pb-2 font-bold capitalize text-md ">
                      {t("Description (Optional)")}
                    </h2>
                    <TextArea rows={5}
                      class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                      id="inline-full-name"
                      type="text"
                      placeholder={t(
                        "Purchasing you'll be able to get the real T-Shirt"
                      )}
                    />
                  </div>
                </Form.Item>
                <h2 className="pb-2 font-bold text-[red] capitalize text-md ">
                  {t("*It cannot be deleted after uploading")}
                </h2>
                <div className="flex items-center justify-between">
                  <Button
                    className="px-3 py-2 my-6 text-center text-black capitalize border rounded-lg"
                    htmlType="submit"
                  >
                    {t("Create item")}
                  </Button>
                </div>
              </Form>
            </div>

            <div className="flex-1">
              <div className="pt-5 pb-5">
                <h2 className="text-xl font-bold capitalize ">
                  {t("preview")}
                </h2>
                <div className="p-3 rounded-lg">
                  <p className="text-center max-w-[400px] mx-auto p-5">
                    <>
                      <div>
                        <PreviewNFTCard
                          imageurl={previewURL}
                          onRemove={removeUpload}
                          name={previewName}
                          price={previewPrice}
                          chainId={chainId}
                        />
                      </div>
                    </>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
      )
    </div>
  );
};

export default CreateNFT;

const PreviewNFTCard = ({ imageurl, onRemove, name, price, chainId }) => {
  console.log(imageurl, "imageurl");
  const { t } = useTranslation();

  return (
    <>
      <div className="w-full max-w-[300px] mx-auto px-3 py-4 border rounded-xl bg-white mb-4">
        <div className="rounded-xl">
          <img
            className="w-full rounded-xl "
            src={
              imageurl
                ? imageurl
                : "https://gurukul.s3.ap-south-1.amazonaws.com/wp-content/uploads/2020/01/12120938/default-placeholder.png"
            }
            alt={name}
          />
        </div>
        <div>
          <div className="flex justify-between py-1">
            <p className="text-sm font-black text-black">{name} </p>
            <p className="text-sm font-black text-black">
              {/* {price} {ChainsInfo[chainId].CURRENCY_SYMBOL} */}
            </p>
          </div>
          <div className="w-full px-2 py-3 text-black bg-no-repeat bg-cover bg-cyan rounded-xl hover:bg-button-img hover:bg-no-repeat hover:bg-cover hover:text-white ">
            {t("Buy Now")}
          </div>
        </div>
      </div>
    </>
  );
};
