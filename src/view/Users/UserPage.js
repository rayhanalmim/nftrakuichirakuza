import React, { useState, useRef, useEffect } from "react";
import NFTCard from "../../components/Cards/NFTCard/NFTCard";
import { SearchComponent } from "../../components/Header/Header";
import { Dropdown, Space } from "antd";
import { DownOutlined } from "@ant-design/icons";
import copy from "copy-to-clipboard";
import { useQuery } from "@apollo/client";
import { allUsersData } from "../../graphql/queries/getAllUsers";
import { useParams, useNavigate } from "react-router-dom";
import { getUserData } from "../../graphql/queries/getUser";
import PageLoading from "../../components/PageLoading/PageLoading";
import { truncateAddress } from "../../utils";
import { useWeb3React } from "@web3-react/core";

const UserPage = () => {
  const { wallet } = useParams();
  const navigate = useNavigate();
  const { activate, deactivate, active, account, chainId } = useWeb3React();
  const [nfts, setNfts] = useState([]);
  const [loading, setLoading] = useState(false);

  console.log(wallet);
  const {
    data,
    loading: userLoading,
    error,
  } = useQuery(getUserData, {
    skip: !wallet,
    variables: {
      wallet: wallet,
    },
  });

  const userInfo = !userLoading && !error && data?.getUser;
  console.log(data);
  const items = [
    {
      //   label: "Event",
    },
  ];

  useEffect(() => {
    if (!wallet) return;

    const fetchNFTs = async () => {
      try {
        setLoading(true);

        // Get the chain identifier for OpenSea API
        const chain = getChainIdentifier(chainId);

        // Updated OpenSea API endpoint (v2)
        const apiUrl = `https://api.opensea.io/v2/chain/${chain}/account/${wallet}/nfts?limit=50`;

        const response = await fetch(apiUrl, {
          headers: {
            "X-API-KEY": process.env.REACT_APP_OPENSEA_API_KEY,
            Accept: "application/json",
          },
        });

        if (!response.ok) {
          throw new Error(
            `OpenSea API responded with status: ${response.status}`
          );
        }

        const data = await response.json();
        console.log(data, "nftResponse from OpenSea");

        // Transform OpenSea V2 data format to match your app's format
        const formattedNfts = data.nfts.map((nft) => ({
          url: nft.image_url || nft.metadata?.image || "",
          name: nft.name || `NFT #${nft.identifier}`,
          token_id: nft.identifier,
          collection_name: nft.collection,
          contract_address: nft.contract,
          description: nft.description || nft.metadata?.description || "",
          // Add any other properties you need
        }));

        setNfts(formattedNfts);
      } catch (error) {
        // setNfts([]);
        console.error("Error fetching NFTs from OpenSea:", error);

        // // Try the alternative Moralis API if OpenSea fails
        // try {
        //   await fetchNFTsFromMoralis(wallet, chainId);
        // } catch (moralisError) {
        //   console.error("Both OpenSea and Moralis APIs failed:", moralisError);
        //   // Fallback to fake data if both APIs fail
        //   setNfts([]);
        // }
      } finally {
        setLoading(false);
        console.log("NFT fetching complete");
      }
    };

    // Alternative API to fetch NFTs using Moralis
    const fetchNFTsFromMoralis = async (walletAddress, chainId) => {
      const chain = getMoralisChain(chainId);
      const apiUrl = `https://deep-index.moralis.io/api/v2/${walletAddress}/nft?chain=${chain}&format=decimal`;

      const response = await fetch(apiUrl, {
        headers: {
          "X-API-KEY": process.env.REACT_APP_MORALIS_API_KEY,
        },
      });

      if (!response.ok) {
        throw new Error(
          `Moralis API responded with status: ${response.status}`
        );
      }

      const data = await response.json();
      console.log(data, "nftResponse from Moralis");

      // Transform Moralis data format
      const formattedNfts = data.result.map((nft) => {
        let metadata = {};
        try {
          metadata = nft.metadata ? JSON.parse(nft.metadata) : {};
        } catch (e) {
          console.error("Error parsing metadata:", e);
        }

        return {
          url: metadata.image || "",
          name: metadata.name || `NFT #${nft.token_id}`,
          token_id: nft.token_id,
          collection_name: nft.name,
          contract_address: nft.token_address,
          description: metadata.description || "",
        };
      });

      setNfts(formattedNfts);
    };

    fetchNFTs();
  }, [wallet, chainId]);

  // Helper function to convert chainId to OpenSea chain identifier
  const getChainIdentifier = (chainId) => {
    switch (chainId) {
      case 1:
        return "ethereum";
      case 137:
        return "matic";
      case 56:
        return "bsc";
      case 42161:
        return "arbitrum";
      case 10:
        return "optimism";
      case 43114:
        return "avalanche";
      default:
        return "ethereum"; // Default to Ethereum
    }
  };

  // Helper function to convert chainId to Moralis chain format
  const getMoralisChain = (chainId) => {
    switch (chainId) {
      case 1:
        return "eth";
      case 137:
        return "polygon";
      case 56:
        return "bsc";
      case 42161:
        return "arbitrum";
      case 10:
        return "optimism";
      case 43114:
        return "avalanche";
      default:
        return "eth"; // Default to Ethereum
    }
  };

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  if (userLoading || loading) {
    return <PageLoading />;
  }

  const FakeData = [
    {
      url: "https://assets.raribleuserdata.com/prod/v1/image/t_gif_preview/aHR0cHM6Ly9zdG9yYWdlLmdvb2dsZWFwaXMuY29tL2dvYmJsZXJzLmFydGdvYmJsZXJzLmNvbS9naWZzLzE2NjIuZ2lm",
      name: "NFT #1662",
      collection_name: "Art Gobblers",
    },
    {
      url: "https://assets.raribleuserdata.com/prod/v1/image/t_gif_preview/aHR0cHM6Ly9zdG9yYWdlLmdvb2dsZWFwaXMuY29tL2dvYmJsZXJzLmFydGdvYmJsZXJzLmNvbS9naWZzLzE0LmdpZg==",
      name: "NFT #14",
      collection_name: "Art Gobblers",
    },
    {
      url: "https://assets.raribleuserdata.com/prod/v1/image/t_gif_preview/aHR0cHM6Ly9zdG9yYWdlLmdvb2dsZWFwaXMuY29tL2dvYmJsZXJzLmFydGdvYmJsZXJzLmNvbS9naWZzLzE1MzEuZ2lm",
      name: "NFT #1531",
      collection_name: "Art Gobblers",
    },
    {
      url: "https://assets.raribleuserdata.com/prod/v1/image/t_gif_preview/aHR0cHM6Ly9zdG9yYWdlLmdvb2dsZWFwaXMuY29tL2dvYmJsZXJzLmFydGdvYmJsZXJzLmNvbS9naWZzLzUzNjIuZ2lm",
      name: "NFT #5362",
      collection_name: "Art Gobblers",
    },
    {
      url: "https://assets.raribleuserdata.com/prod/v1/image/t_gif_preview/aHR0cHM6Ly9zdG9yYWdlLmdvb2dsZWFwaXMuY29tL2dvYmJsZXJzLmFydGdvYmJsZXJzLmNvbS9naWZzLzU0MDIuZ2lm",
      name: "NFT #5402",
      collection_name: "Art Gobblers",
    },
    {
      url: "https://assets.raribleuserdata.com/prod/v1/image/t_gif_preview/aHR0cHM6Ly9zdG9yYWdlLmdvb2dsZWFwaXMuY29tL2dvYmJsZXJzLmFydGdvYmJsZXJzLmNvbS9naWZzLzY3ODMuZ2lm",
      name: "NFT #6783",
      collection_name: "Art Gobblers",
    },
    {
      url: "https://assets.raribleuserdata.com/prod/v1/image/t_gif_preview/aHR0cHM6Ly9zdG9yYWdlLmdvb2dsZWFwaXMuY29tL2dvYmJsZXJzLmFydGdvYmJsZXJzLmNvbS9naWZzLzQ5NDQuZ2lm",
      name: "NFT #4944",
      collection_name: "Art Gobblers",
    },
    {
      url: "https://assets.raribleuserdata.com/prod/v1/image/t_gif_preview/aHR0cHM6Ly9zdG9yYWdlLmdvb2dsZWFwaXMuY29tL2dvYmJsZXJzLmFydGdvYmJsZXJzLmNvbS9naWZzLzE1MzEuZ2lm",
      name: "NFT #1531",
      collection_name: "Art Gobblers",
    },
    {
      url: "https://assets.raribleuserdata.com/prod/v1/image/t_gif_preview/aHR0cHM6Ly9zdG9yYWdlLmdvb2dsZWFwaXMuY29tL2dvYmJsZXJzLmFydGdvYmJsZXJzLmNvbS9naWZzLzUzNjIuZ2lm",
      name: "NFT #5362",
      collection_name: "Art Gobblers",
    },
    {
      url: "https://assets.raribleuserdata.com/prod/v1/image/t_gif_preview/aHR0cHM6Ly9zdG9yYWdlLmdvb2dsZWFwaXMuY29tL2dvYmJsZXJzLmFydGdvYmJsZXJzLmNvbS9naWZzLzY3ODMuZ2lm",
      name: "NFT #6783",
      collection_name: "Art Gobblers",
    },
    {
      url: "https://assets.raribleuserdata.com/prod/v1/image/t_gif_preview/aHR0cHM6Ly9zdG9yYWdlLmdvb2dsZWFwaXMuY29tL2dvYmJsZXJzLmFydGdvYmJsZXJzLmNvbS9naWZzLzQ5NDQuZ2lm",
      name: "NFT #4944",
      collection_name: "Art Gobblers",
    },
    {
      url: "https://assets.raribleuserdata.com/prod/v1/image/t_gif_preview/aHR0cHM6Ly9zdG9yYWdlLmdvb2dsZWFwaXMuY29tL2dvYmJsZXJzLmFydGdvYmJsZXJzLmNvbS9naWZzLzE0LmdpZg==",
      name: "NFT #14",
      collection_name: "Art Gobblers",
    },
    {
      url: "https://assets.raribleuserdata.com/prod/v1/image/t_gif_preview/aHR0cHM6Ly9zdG9yYWdlLmdvb2dsZWFwaXMuY29tL2dvYmJsZXJzLmFydGdvYmJsZXJzLmNvbS9naWZzLzE1MzEuZ2lm",
      name: "NFT #1531",
      collection_name: "Art Gobblers",
    },
    {
      url: "https://assets.raribleuserdata.com/prod/v1/image/t_gif_preview/aHR0cHM6Ly9zdG9yYWdlLmdvb2dsZWFwaXMuY29tL2dvYmJsZXJzLmFydGdvYmJsZXJzLmNvbS9naWZzLzUzNjIuZ2lm",
      name: "NFT #5362",
      collection_name: "Art Gobblers",
    },
  ];

  // Use the fetched NFTs or fallback to fake data if none are available
  // const displayNfts = nfts.length > 0 ? nfts : FakeData;
  const displayNfts = nfts;

  return (
    <div>
      <div className="max-w-[1500px] mx-auto py-5">
        {/* back button */}
        <div className="md:px-[40px] px-[20px] mb-3">
          <button
            onClick={() => navigate("/explore/users")}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
          </button>
        </div>
        <div className="relative  md:px-[40px] px-[20px]">
          <img
            src={
              userInfo.bg_image?.includes("ipfs")
                ? userInfo.bg_image?.replace(
                    "ipfs://",
                    `https://${process.env.REACT_APP_THIRDWEB_CLIENT_ID}.ipfscdn.io/ipfs/`
                  )
                : userInfo.bg_image
            }
            className=" relative w-full h-[400px] mx-auto "
          />
          <img
            src={
              userInfo.avatar_url?.includes("ipfs")
                ? userInfo.avatar_url?.replace(
                    "ipfs://",
                    `https://${process.env.REACT_APP_THIRDWEB_CLIENT_ID}.ipfscdn.io/ipfs/`
                  )
                : userInfo.avatar_url
            }
            className="absolute left-[50px] bottom-[-14%] mx-auto  md:w-auto w-40 h-40 px-5 bg-white p-2"
          />
        </div>

        <div className="flex justify-between items-center flex-col md:flex-row gap-5 pt-14  md:px-[40px] px-[20px] ">
          <div className="flex-1 md:max-w-[800px] px-2  w-full ">
            <div className="flex items-center gap-4 ">
              <h1 className="capitalize text-2xl text-black ">
                {userInfo.displayName}
              </h1>
            </div>

            <p>{userInfo.about_details}</p>
            <div className="flex items-center gap-5 md:flex-nowrap   justify-start  flex-wrap ">
              <button className="capitalize bg-black  px-[30px] py-2 text-white rounded-lg text-md">
                + follow
              </button>
            </div>
          </div>

          <div className="  border p-5 rounded-lg justify-between  px-5 w-full md:w-auto ">
            <div className="flex gap-[40px] justify-between items-center pt-5">
              <h4 className="capitalize text-grey text-sm">Address</h4>
              <h4 className="text-sm  font-bold uppercase">
                {truncateAddress(userInfo.wallet)}
              </h4>
            </div>
          </div>
        </div>

        <div className="flex max-w-[1500px] p-2 flex-col md:flex-row  mx-auto justify-center gap-[20px] md:max-h-[700px] h-auto w-full   md:px-[40px] px-[20px] ">
          <div className="sticky md:h-screen h-auto md:top-[120px] top-0 z-[100] bg-white  max-h-[700px] ">
            <div className="border-b-2 pb-4">
              <Dropdown
                menu={{
                  items,
                }}
              >
                <a onClick={(e) => e.preventDefault()}>
                  <Space className=" px-3 py-3">
                    <h4 className="capitalize font-bold text-lg p-0 m-0">
                      status
                    </h4>

                    <DownOutlined />
                  </Space>
                </a>
              </Dropdown>
              <div className="flex gap-5  pt-5 pb-3">
                <button className="bg-black rounded-lg px-4 py-3 text-white capitalize">
                  all
                </button>
              </div>
            </div>
            <div className="border-b-2 pb-4">
              <Dropdown
                menu={{
                  items,
                }}
              >
                <a onClick={(e) => e.preventDefault()}>
                  <Space className=" px-3 py-3">
                    <h4 className="capitalize font-bold text-lg p-0 m-0">
                      Blockchain
                    </h4>

                    <DownOutlined />
                  </Space>
                </a>
              </Dropdown>
              <div className="flex gap-5  items-center pt-5 pb-3">
                <button className="bg-cyan rounded-lg px-4 py-3 text-grey font-bold capitalize">
                  Polygon
                </button>

                <button className="bg-cyan rounded-lg px-4 py-3 text-grey font-bold capitalize">
                  Binance
                </button>
                <button className="bg-cyan rounded-lg px-4 py-3 text-grey font-bold capitalize">
                  Etherum
                </button>
              </div>
              <button className="bg-cyan rounded-lg px-4 py-3 text-black font-bold capitalize w-auto  md:w-full ">
                Apply
              </button>
            </div>
          </div>
          <div className="max-h-[700px] overflow-y-scroll w-full">
            <div className="grid  grid-cols-1 sm:grid-cols-2  xl:grid-cols-3 2xl:grid-cols-4 gap-4 ">
              {displayNfts.length > 0 ? (
                displayNfts.map((item, key) => (
                  <NFTCard key={key} data={item} />
                ))
              ) : (
                <div className="flex justify-center">
                  <h1 className="text-center">"NO Nft Found"</h1>
                </div>
              )}
              {/* {displayNfts.map((item, key) => (
                <NFTCard key={key} data={item} />
              ))} */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserPage;
