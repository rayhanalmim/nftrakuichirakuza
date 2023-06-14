import React, { useEffect } from "react";
import { UploadOutlined } from "@ant-design/icons";
import { message, Upload } from "antd";
import { Button } from "../../components/Button/Primary";
import useStorage from "../../hooks/useStorage";
import { useState } from "react";
import Dragger from "antd/lib/upload/Dragger";
import {
  InboxOutlined,
  MinusCircleOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import useWeb3 from "../../hooks/useWeb3";
import { useWeb3React } from "@web3-react/core";
import { useMutation } from "@apollo/client";
import { createCollection } from "../../graphql/mutations/createCollection";
import { ChainsInfo } from "../../config/config-chains";
import CreateLoading from "../../CreateLoading/CreateLoading";
import NotConnectedPage from "../Home/components/NotConnectedPage";
import PageLoading from "../../components/PageLoading/PageLoading";
import Swal from "sweetalert2";
import { Navigate, useNavigate } from "react-router-dom";
import { getAllCollections } from "../../graphql/queries/getAllCollections";
import { useTranslation } from "react-i18next";

const CreateCollection = () => {
  const { uploadOnIpfs, downloadJSONOnIpfs } = useStorage();
  const { deployContract } = useWeb3();
  const { t } = useTranslation();
  const [createLoad, setCreateLoad] = useState(true);
  const { account, active, chainId } = useWeb3React();
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);
  const [createCollectionData] = useMutation(createCollection);
  const navigate = useNavigate();
  const props = {
    name: "file",
    action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
    headers: {
      authorization: "authorization-text",
    },
    onChange(info) {
      if (info.file.status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === "done") {
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };
  const beforeUpload = (file, fileList) => {
    setImage(file);
    return false;
  };
  useEffect(() => {
    if (active) {
      let data = JSON.parse(localStorage.getItem("loggedIn"));
      if (localStorage.getItem("loggedIn") == "false") {
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
  if (loading) {
    return <CreateLoading />;
  } else if (createLoad) {
    return <PageLoading />;
  } else if (!active) {
    return <NotConnectedPage />;
  }
  return (
    <div>
      <div className="max-w-[700px] mx-auto w-full px-5 py-5 ">
        <h2 className="text-white">{t("Collection ERC-721")}</h2>
        <div className="flex  gap-5 items-start py-4">
          <div>
            <h2 className="font-bold capitalize text-lg ">
              {t("Collection Image (required)")}
            </h2>
            <h5>
              {t("At least 300x300 pixels, max. size 5MB, GIF, JPEG or PNG")}
            </h5>
            <Dragger
              beforeUpload={beforeUpload}
              accept="image/png, image/gif, image/jpeg"
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
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (image) {
              uploadOnIpfs(image).then(async (uri) => {
                console.log(uri);
                setLoading(true);
                deployContract([
                  e.target[0].value,
                  e.target[1].value,
                  uri,
                  account,
                  // ChainsInfo[chainId].OVE_COIN,
                  account,
                  "0",
                  "0",
                  account,
                ])
                  .then((res) => {
                    console.log(res);
                    createCollectionData({
                      variables: {
                        blockchain: ChainsInfo[
                          chainId
                        ].CHAIN_NAME.toLowerCase(),
                        collectionAddress: res,
                        collectionName: e.target[0].value,
                        tokenStandard: "ERC721",
                        creatorWallet: account,
                        logo: uri,
                      },
                      refetchQueries: [
                        {
                          query: getAllCollections,
                        },
                      ],
                    })
                      .then((res) => {
                        console.log(res);
                        navigate("/");
                        setLoading(false);
                      })
                      .catch((err) => {
                        console.log(err);
                        setLoading(false);
                      });
                  })
                  .catch((err) => {
                    console.log(err);
                    setLoading(false);
                  });
              });
            } else {
              Swal.fire("Warning", "Please Fill Required Values", "warning");
            }
          }}
        >
          <div className="pt-3 pb-3">
            <h2 className="font-bold capitalize text-lg ">
              {t("Display name (required)")}
            </h2>
            <input
              className="bg-gray-200 appearance-none border-2 placeholder-grey-50 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="inline-full-name"
              type="text"
              placeholder={t("Enter collection name")}
              name="name"
              required
            />
            <p>{t("Token name cannot be changed in future")}</p>
          </div>
          <div className="pt-3 pb-3">
            <h2 className="font-bold capitalize text-lg ">
              {t("Symbol(required)")}
            </h2>
            <input
              className="bg-gray-200 appearance-none border-2 placeholder-grey-50 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="inline-full-name"
              type="text"
              placeholder={t("Enter token symbol")}
              name="symbol"
              required
            />
          </div>
          <div className="pt-3 pb-3">
            <h2 className="font-bold capitalize text-lg ">
              {t("Description (optional)")}
            </h2>
            <textarea rows={4}
              className="bg-gray-200 appearance-none border-2 placeholder-grey-50 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="inline-full-name"
              type="text"
              placeholder={t("Spread some words about your token collection")}
              name="description"
              required
            />
          </div>
          <div className="pt-3 pb-3">
            <h2 className="font-bold capitalize text-lg ">{t("short url")}</h2>
            <input
              className="bg-gray-200 appearance-none border-2 placeholder-grey-50 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="inline-full-name"
              type="text"
              placeholder="www.com"
              name="url"
              required
            />
          </div>


          <div className="pt-3 pb-3">
          <h1 className="font-bold capitalize ">
          {t("Created collections cannot be deleted.")} <br/>
          {t("Please click the Approve button on Metamask only once.")}

          </h1>
          </div>


          <div className="my-5">
            <Button title={t("create collection")} type="submit" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateCollection;
