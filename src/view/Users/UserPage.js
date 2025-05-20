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
import { FaTwitter, FaDiscord, FaInstagram, FaGlobe } from "react-icons/fa";
import { BsArrowLeft } from "react-icons/bs";

const UserPage = () => {
  const { wallet } = useParams();
  const navigate = useNavigate();
  const { activate, deactivate, active, account, chainId } = useWeb3React();
  const [nfts, setNfts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [lastNFTPage, setLastNFTPage] = useState(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    // Check if we have stored NFT page data
    const storedPage = sessionStorage.getItem('lastNFTPage');
    if (storedPage) {
      setLastNFTPage(JSON.parse(storedPage));
      // Clear the stored data after retrieving it
      sessionStorage.removeItem('lastNFTPage');
    }
  }, []);

  const {
    data,
    loading: userLoading,
    error: userError,
  } = useQuery(getUserData, {
    skip: !wallet,
    variables: {
      wallet: wallet,
    },
  });

  const userInfo = !userLoading && !userError && data?.getUser;

  // Fetch NFTs when wallet is available
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
          throw new Error(`OpenSea API responded with status: ${response.status}`);
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
        }));

        setNfts(formattedNfts);
      } catch (error) {
        console.error("Error fetching NFTs from OpenSea:", error);
        // Fallback to fake data if API fails
        setNfts(FakeData);
      } finally {
        setLoading(false);
      }
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

  // Fallback data for testing
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
    // Add more fake data as needed
  ];

  const handleBackToNFT = () => {
    if (lastNFTPage) {
      navigate(`/nft/nftpage/${lastNFTPage.blockchain}/${lastNFTPage.collection}/${lastNFTPage.tokenId}`);
    }
  };

  const handleCopyAddress = () => {
    copy(wallet);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Helper function to transform IPFS URLs
  const transformIpfsUrl = (url) => {
    if (!url) return "https://via.placeholder.com/150";
    if (url.includes("ipfs://")) {
      return url.replace(
        "ipfs://",
        `https://${process.env.REACT_APP_THIRDWEB_CLIENT_ID}.ipfscdn.io/ipfs/`
      );
    }
    return url;
  };

  if (userLoading || loading) {
    return <PageLoading />;
  }

  if (userError || !userInfo) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h2 className="text-2xl font-bold text-red-500 mb-4">Error Loading User Data</h2>
        <button 
          onClick={() => navigate(-1)}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-[1500px] mx-auto py-5">
        {/* Back button */}
        <div className="md:px-[40px] px-[20px] mb-3">
          <button
            onClick={() => navigate(-1)}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors flex items-center gap-2"
          >
            <BsArrowLeft className="h-5 w-5" />
            <span>Back</span>
          </button>
        </div>

        {/* Profile Header */}
        <div className="relative md:px-[40px] px-[20px]">
          <div className="relative h-[400px] w-full rounded-xl overflow-hidden">
            <img
              src={transformIpfsUrl(userInfo.bg_image)}
              className="w-full h-full object-cover"
              alt="Profile Background"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "https://via.placeholder.com/1500x400";
              }}
            />
          </div>
          <div className="absolute -bottom-16 left-[50px]">
            <div className="relative">
              <img
                src={transformIpfsUrl(userInfo.avatar_url)}
                className="w-32 h-32 rounded-full border-4 border-white bg-white p-1"
                alt="Profile Avatar"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "https://via.placeholder.com/150";
                }}
              />
            </div>
          </div>
        </div>

        {/* Profile Info */}
        <div className="mt-20 md:px-[40px] px-[20px]">
          <div className="flex flex-col md:flex-row justify-between gap-8">
            {/* Left Column - User Info */}
            <div className="flex-1 space-y-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">
                  {userInfo.displayName || 'Unnamed User'}
                </h1>
                <p className="text-gray-500 mt-2">
                  {userInfo.about_details || 'No description provided'}
                </p>
              </div>

              {/* Social Links */}
              <div className="flex gap-4">
                {userInfo.twitter && (
                  <a href={userInfo.twitter} target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-blue-400">
                    <FaTwitter size={24} />
                  </a>
                )}
                {userInfo.discord && (
                  <a href={userInfo.discord} target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-indigo-400">
                    <FaDiscord size={24} />
                  </a>
                )}
                {userInfo.instagram && (
                  <a href={userInfo.instagram} target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-pink-400">
                    <FaInstagram size={24} />
                  </a>
                )}
                {userInfo.website && (
                  <a href={userInfo.website} target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-green-400">
                    <FaGlobe size={24} />
                  </a>
                )}
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 py-4">
                <div className="text-center">
                  <h3 className="text-2xl font-bold">{nfts.length}</h3>
                  <p className="text-gray-500">NFTs</p>
                </div>
                <div className="text-center">
                  <h3 className="text-2xl font-bold">0</h3>
                  <p className="text-gray-500">Followers</p>
                </div>
                <div className="text-center">
                  <h3 className="text-2xl font-bold">0</h3>
                  <p className="text-gray-500">Following</p>
                </div>
              </div>
            </div>

            {/* Right Column - Wallet Info */}
            <div className="md:w-80 w-full">
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <h3 className="text-lg font-semibold mb-4">Wallet Information</h3>
                <div className="space-y-4">
                  <div>
                    <p className="text-gray-500 text-sm">Address</p>
                    <div className="flex items-center gap-2 mt-1">
                      <p className="font-mono text-sm">{truncateAddress(userInfo.wallet)}</p>
                      <button
                        onClick={handleCopyAddress}
                        className="text-blue-500 hover:text-blue-600"
                      >
                        {copied ? 'Copied!' : 'Copy'}
                      </button>
                    </div>
                  </div>
                  <div>
                    <p className="text-gray-500 text-sm">Joined</p>
                    <p className="text-sm mt-1">
                      {new Date(userInfo.created_at).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* NFT Collection */}
        <div className="mt-12 md:px-[40px] px-[20px]">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">NFT Collection</h2>
            <div className="flex gap-4">
              <button className="px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">
                All
              </button>
              <button className="px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">
                Created
              </button>
              <button className="px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">
                Collected
              </button>
            </div>
          </div>

          {nfts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {nfts.map((nft, index) => (
                <NFTCard 
                  key={index} 
                  data={nft}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "https://via.placeholder.com/300";
                  }}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <h3 className="text-xl text-gray-500">No NFTs found</h3>
              <p className="text-gray-400 mt-2">This user hasn't collected any NFTs yet</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserPage;
