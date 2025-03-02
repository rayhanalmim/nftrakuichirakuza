import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { gql } from "@apollo/client";

// Define the query to get user data
const GET_USER = gql`
  query GetUser($identifier: String!) {
    getUserByWalletOrUsername(identifier: $identifier) {
      _id
      displayName
      username
      avatar_url
      about_details
      bg_image
      twitterUrl
      facebookUrl
      websiteUrl
      isVerified
      following_list
      follower_list
      wallet
    }
  }
`;

// Query to get user's NFTs
const GET_USER_NFTS = gql`
  query GetUserNfts($walletAddress: String!, $blockchain: String!) {
    getNftByWallet(walletAddress: $walletAddress, blockchain: $blockchain) {
      nfts {
        token_address
        token_id
        name
        symbol
        metadata
      }
    }
  }
`;

const UserProfileDetail = () => {
  const { identifier } = useParams(); // either username or wallet address
  const [activeTab, setActiveTab] = useState("collected");
  const [blockchain, setBlockchain] = useState("ethereum"); // Default blockchain

  // Fetch user data
  const {
    loading: userLoading,
    error: userError,
    data: userData,
  } = useQuery(GET_USER, {
    variables: { identifier },
  });

  // Fetch user NFTs after we have the user data
  const {
    loading: nftsLoading,
    error: nftsError,
    data: nftsData,
  } = useQuery(GET_USER_NFTS, {
    variables: {
      walletAddress: userData?.getUserByWalletOrUsername?.wallet || "",
      blockchain,
    },
    skip: !userData?.getUserByWalletOrUsername?.wallet,
  });

  if (userLoading) return <div>Loading user data...</div>;
  if (userError) return <div>Error loading user: {userError.message}</div>;

  const user = userData?.getUserByWalletOrUsername;
  if (!user) return <div>User not found</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Cover Image */}
      <div className="w-full h-64 bg-gray-200 rounded-lg overflow-hidden mb-6">
        <img
          src={
            user.bg_image
              ? user.bg_image.includes("ipfs://")
                ? user.bg_image.replace(
                    "ipfs://",
                    `https://${process.env.REACT_APP_THIRDWEB_CLIENT_ID}.ipfscdn.io/ipfs/`
                  )
                : user.bg_image
              : "/assets/default-cover.png"
          }
          alt="Cover"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Profile Info */}
      <div className="flex flex-col md:flex-row items-start md:items-center -mt-20 relative z-10">
        <div className="md:ml-8">
          {/* <img
            src={user.avatar_url}
            alt={user.displayName}
            className="w-32 h-32 rounded-full border-4 border-white"
          /> */}

          <img
            src={
              user.avatar_url
                ? user.avatar_url.includes("ipfs://")
                  ? user.avatar_url.replace(
                      "ipfs://",
                      `https://${process.env.REACT_APP_THIRDWEB_CLIENT_ID}.ipfscdn.io/ipfs/`
                    )
                  : user.avatar_url
                : "/assets/default-avatar.png"
            }
            alt={user.displayName}
            className="w-8 h-8 rounded-full mr-2"
          />
        </div>

        <div className="md:ml-6 mt-4 md:mt-0">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold">{user.displayName}</h1>
            {user.isVerified && (
              <span className="ml-2 bg-blue-500 text-white rounded-full p-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
            )}
          </div>
          <p className="text-gray-600">
            @{user.username || user.wallet.substring(0, 10)}...
          </p>
          <p className="mt-2">{user.about_details}</p>

          <div className="flex mt-4 space-x-4">
            <div>
              <span className="font-bold">
                {user.follower_list?.length || 0}
              </span>{" "}
              followers
            </div>
            <div>
              <span className="font-bold">
                {user.following_list?.length || 0}
              </span>{" "}
              following
            </div>
          </div>

          <div className="flex mt-4 space-x-4">
            {user.twitterUrl && (
              <a
                href={user.twitterUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500"
              >
                Twitter
              </a>
            )}
            {user.facebookUrl && (
              <a
                href={user.facebookUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500"
              >
                Facebook
              </a>
            )}
            {user.websiteUrl && (
              <a
                href={user.websiteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500"
              >
                Website
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200 mt-8">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab("collected")}
            className={`${
              activeTab === "collected"
                ? "border-blue-500 text-blue-600"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
          >
            Collected
          </button>
          <button
            onClick={() => setActiveTab("created")}
            className={`${
              activeTab === "created"
                ? "border-blue-500 text-blue-600"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
          >
            Created
          </button>
        </nav>
      </div>

      {/* NFT Grid */}
      <div className="mt-8">
        {nftsLoading ? (
          <div>Loading NFTs...</div>
        ) : nftsError ? (
          <div>Error loading NFTs: {nftsError.message}</div>
        ) : nftsData?.getNftByWallet?.nfts?.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {nftsData.getNftByWallet.nfts.map((nft) => {
              let metadata = {};
              try {
                metadata = JSON.parse(nft.metadata);
                console.log(metadata, "metadatanft");
              } catch (e) {
                console.error("Error parsing metadata:", e);
              }

              return (
                <div
                  key={`${nft.token_address}-${nft.token_id}`}
                  className="bg-white rounded-lg overflow-hidden shadow hover:shadow-lg transition-shadow"
                >
                  <div className="h-48 bg-gray-200">
                    {metadata.image ? (
                      // <img
                      //   src={metadata.image}
                      //   alt={nft.name}
                      //   className="h-full w-full object-cover"
                      // />
                      <img
                        src={
                          metadata.image
                            ? metadata.image.includes("ipfs://")
                              ? metadata.image.replace(
                                  "ipfs://",
                                  `https://${process.env.REACT_APP_THIRDWEB_CLIENT_ID}.ipfscdn.io/ipfs/`
                                )
                              : metadata.image
                            : "/assets/default-nft.png"
                        }
                        alt={nft.name}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full text-gray-500">
                        No image
                      </div>
                    )}
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-lg">
                      {nft.name || "Unnamed NFT"}
                    </h3>
                    <p className="text-sm text-gray-500 truncate">
                      {metadata.description || "No description"}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500">No NFTs found</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserProfileDetail;
