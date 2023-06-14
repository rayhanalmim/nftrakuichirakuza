import React, { useEffect, useState } from "react";
import { Button, message, Modal } from "antd";
import { RiArrowDropDownLine } from "react-icons/ri";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useWeb3React } from "@web3-react/core";
import { useMutation } from "@apollo/client";
import { importCollection } from "../../graphql/mutations/importCollection";

import { Divider, notification, Space } from "antd";
import Swal from "sweetalert2";
import NotConnectedPage from "../Home/components/NotConnectedPage";
import PageLoading from "../../components/PageLoading/PageLoading";

import { useTranslation } from "react-i18next";
const Context = React.createContext({
  name: "Default",
});

const CollectionModal = () => {

  const { t } = useTranslation();
  
  const [open, setOpen] = useState(false);
  const { active } = useWeb3React();
  if (!active) {
    return <NotConnectedPage />;
  }
  return (
    <div className=" max-w-[300px] mx-auto w-full justify-center items-center pt-[3rem] ">
      <h4 className="text-2xl font-bold text-center ">No collections found</h4>
      <h5 className="text-grey text-md text-center py-4">
        {" "}
        We couldn't find any of your collections. Looks like you don't have any
      </h5>
      <div className=" flex gap-[20px] flex-col">
        <Link to="/createcollection">
          <button
            className="bg-black py-3 px-5  text-white rounded-xl  max-w-[300px] w-full"
            onClick={() => setOpen(true)}
          >
            Create a Collection
          </button>
          {/* <Modal
     
     centered
     open={open}
  width={300}
  onOk={() => setOpen(false)}
  onCancel={() => setOpen(false)}
     className="py-20 rounded-lg"
   >
     <div className='text-center' >
         <h4 className='text-2xl text-center capitalize'>Enter Collection</h4>
         
         <div className="flex justify-between gap-5 items-start py-3 px-3 border rounded-lg">
             <div className='flex gap-5 items-start '>
             <img src={process.env.PUBLIC_URL +'/assets/download.svg'} className="w-full mx-auto"/>
             <div>
                 <h4>0x938c6...c534</h4>
                 <h6>Ethereum</h6>
             </div>
             </div>
          
         
             <RiArrowDropDownLine size={30} />
            
         </div>
         <div className=' mt-5 text-center'>
           <Link to="/collection">
           <h4 className='border py-3 px-5  text-black rounded-xl capitalize'>continue</h4>
           </Link>

         </div>
     </div>
   </Modal> */}
        </Link>

        <Link to="/import">
          <button className="border py-3 px-5  text-black rounded-xl  max-w-[300px] w-full">
            Import an existing
          </button>
        </Link>
      </div>
    </div>
  );
};

export default CollectionModal;

export const Import = () => {
  const { t } = useTranslation();
  const [api, contextHolder] = notification.useNotification();
  const { address, chainName } = useParams();

  console.log(address);
  const { active, account, chainId } = useWeb3React();
  const navigate = useNavigate();
  const [collectionAddress, setCollectionAddress] = useState("");
  const [importCollectionData] = useMutation(importCollection);
  const [chain, setChain] = useState(chainName);
  const [createLoad, setCreateLoad] = useState(true);
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
  const handleColletionChange = async () => {
    console.log(chain);
    console.log(collectionAddress);
    if (active) {
      importCollectionData({
        variables: {
          collectionAddress: collectionAddress,
          blockchain: chain,
        },
      })
        .then((res) => {
          console.log(res);
          Swal.fire({
            title: "Collection Import Successfull",
            width: 600,
            padding: "3em",
            color: "#716add",
            background: "#fff url(/images/trees.png)",
            backdrop: `
              rgba(0,0,123,0.4)
              url("/images/nyan-cat.gif")
              left top
              no-repeat
            `,
          });
        })
        .catch((err) => {
          alert(err);
          console.log(err);
        });
    } else {
      Swal.fire({
        title: "Please Connect Wallet",
        width: 600,
        padding: "3em",
        color: "#716add",
        backdrop: `
          rgba(0,0,123,0.4)
          url("https://media4.giphy.com/media/XpLdhYseuf3mtwJ5Zy/200w.gif?cid=82a1493bchrc28weuso54806p3y2pb2wcv6o394jb78h2oho&rid=200w.gif&ct=g")
          left top
          no-repeat
        `,
      });
    }
  };
  if (createLoad) {
    return <PageLoading />;
  } else if (!active) {
    return <NotConnectedPage />;
  }

  return (
    /* A fragment. */
    <>
      <div className="max-w-[500px] mx-auto px-5  mt-[2rem] py-[4rem]">
        <h4 className="text-4xl  ">{t("Import Your Collection")}</h4>
        <h5 className="text-grey font-normal text-lg  py-4">
          {t("What is the address of your ERC721 contract on the Ethereum Network?")}
          {/* What is the address of your ERC721 contract on the{" "}
          <span className="text-black">Ethereum </span>Network? */}
        </h5>
        <h5 className="text-black  text-xl">{t("Collection Address")}</h5>
        <div className="pb-4">
          <input
            type="text"
            required
            placeholder={
              address ? address : t("Enter your ERC721 collection address")
            }
            className="bg-cyan rounded-2xl p-4 w-full"
            onChange={(e) =>
              address
                ? setCollectionAddress(address)
                : setCollectionAddress(e.target.value)
            }
            disabled={address ? true : false}
          />
        </div>
        <h5 className="text-black  text-xl">{t("Choose Chain")}</h5>
        <div className="pb-4">
          <select
            type="text"
            placeholder="Enter your ERC721 or ERC1155 collection address"
            className="bg-cyan rounded-2xl p-4 w-full"
            onChange={(e) => setChain(e.target.value)}
            value={chain}
          >
            <option className="bg-cyan rounded-2xl p-4 w-full" value="binance">
              Binance
            </option>
            <option className="bg-cyan rounded-2xl p-4 w-full" value="goerli">
              Ethereum
            </option>
            {/* <option className="bg-cyan rounded-2xl p-4 w-full" value="polygon">
              Mumbai Testnet
            </option> */}
          </select>
        </div>
        <button
          className="bg-black text-white rounded-xl p-3 px-5 capitalize"
          onClick={handleColletionChange}
        >
          {t("Submit")}
        </button>
      </div>
    </>
  );
};
