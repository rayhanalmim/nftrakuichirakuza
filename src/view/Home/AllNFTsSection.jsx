import React, { useState, useEffect, useRef } from "react";
import { useQuery } from "@apollo/client";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Select, Spin, Empty, Pagination } from "antd";
import { getAllNFTsWithFilters } from "../../graphql/queries/getAllNFTsWithFilters";

const { Option } = Select;

const AllNFTsSection = () => {
  const { t } = useTranslation();
  const [sortBy, setSortBy] = useState("time");
  const [sortOrder, setSortOrder] = useState("desc");
  const [blockchain, setBlockchain] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isFilterLoading, setIsFilterLoading] = useState(false);
  const [imageLoadStatus, setImageLoadStatus] = useState({});
  const previousData = useRef(null);
  const pageSize = 8;

  // Calculate offset based on pagination
  const offset = (currentPage - 1) * pageSize;

  const { loading, error, data, refetch } = useQuery(getAllNFTsWithFilters, {
    variables: {
      sortBy,
      sortOrder,
      blockchain: blockchain || undefined,
      limit: pageSize,
      offset,
    },
  });

  // Check if data has changed
  useEffect(() => {
    if (data && JSON.stringify(data) !== JSON.stringify(previousData.current)) {
      previousData.current = data;
      // Reset image load status for new data
      setImageLoadStatus({});
      // Keep loading state for a bit longer to allow images to load
      setIsFilterLoading(true);
      const timer = setTimeout(() => {
        setIsFilterLoading(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [data]);

  // Apply filters and reset pagination
  const applyFilters = () => {
    setIsFilterLoading(true);
    setImageLoadStatus({}); // Clear all image load statuses
    setCurrentPage(1);
    refetch({
      sortBy,
      sortOrder,
      blockchain: blockchain || undefined,
      limit: pageSize,
      offset: 0,
    });
  };

  useEffect(() => {
    // Refetch when pagination changes
    setIsFilterLoading(true);
    setImageLoadStatus({}); // Clear image load statuses when any filter changes
    refetch({
      sortBy,
      sortOrder,
      blockchain: blockchain || undefined,
      limit: pageSize,
      offset,
    });
  }, [currentPage, refetch, sortBy, sortOrder, blockchain, offset]);

  // Enhanced image URL extraction from metadata
  const getNftImage = (nft) => {
    try {
      let metadataObj = !loading && !error ? JSON.parse(nft.metadata) : null;
      console.log(metadataObj, "metadataObj");

      if (!metadataObj || !metadataObj.image) {
        return "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/1024px-No_image_available.svg.png";
      }

      // Process the image URL based on its format
      let imageUrl = metadataObj.image;

      if (imageUrl.includes("ipfs.cf-ipfs.com")) {
        return imageUrl.replace(
          /^https:\/\/([^.]+)\.ipfs\.cf-ipfs\.com\/(.+)$/,
          "https://ipfs.io/ipfs/$1/$2"
        );
      } else {
        return imageUrl.replace(
          "https://ipfs.thirdwebcdn.com/ipfs/",
          `https://${process.env.REACT_APP_THIRDWEB_CLIENT_ID}.ipfscdn.io/ipfs/`
        );
      }
    } catch (error) {
      console.error("Error parsing metadata:", error);
      // return "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/1024px-No_image_available.svg.png";
    }
  };

  // Handle image load status with unique keys including current filter values
  const handleImageLoad = (id, uniqueKey) => {
    setImageLoadStatus((prev) => ({
      ...prev,
      [uniqueKey]: "loaded",
    }));
  };

  const handleImageError = (id, uniqueKey) => {
    setImageLoadStatus((prev) => ({
      ...prev,
      [uniqueKey]: "error",
    }));
  };

  return (
    <div className="max-w-[1500px] mx-auto pt-5 md:pt-[2rem] px-5">
      <div className="flex flex-wrap justify-between items-center mb-6">
        {/* <h2 className="text-2xl font-bold mb-0">{t("All NFTs")}</h2> */}
        <div className="flex gap-4">
          {/* Sort By Filter */}
          <div>
            <label className="block text-sm font-medium mb-1">
              {t("Sort By")}
            </label>
            <Select
              value={sortBy}
              onChange={setSortBy}
              style={{ width: 120 }}
              onSelect={applyFilters}
            >
              <Option value="time">{t("Time")}</Option>
              <Option value="price">{t("Price")}</Option>
              <Option value="name">{t("Name")}</Option>
            </Select>
          </div>

          {/* Sort Order Filter */}
          <div>
            <label className="block text-sm font-medium mb-1">
              {t("Order")}
            </label>
            <Select
              value={sortOrder}
              onChange={setSortOrder}
              style={{ width: 120 }}
              onSelect={applyFilters}
            >
              <Option value="asc">{t("Ascending")}</Option>
              <Option value="desc">{t("Descending")}</Option>
            </Select>
          </div>

          {/* Blockchain Filter */}
          <div>
            <label className="block text-sm font-medium mb-1">
              {t("Blockchain")}
            </label>
            <Select
              value={blockchain}
              onChange={setBlockchain}
              style={{ width: 120 }}
              allowClear
              placeholder={t("All")}
              onSelect={applyFilters}
              onClear={applyFilters}
            >
              <Option value="ethereum">{t("Ethereum")}</Option>
              <Option value="polygon">{t("Polygon")}</Option>
              <Option value="binance">{t("Binance")}</Option>
            </Select>
          </div>
        </div>
      </div>

      {loading || isFilterLoading ? (
        <div className="flex justify-center items-center h-64">
          <Spin size="large" />
        </div>
      ) : error ? (
        <div className="text-center text-red-500">
          <p>{t("Error loading NFTs")}</p>
          <p>{error.message}</p>
        </div>
      ) : data?.getAllNFTsWithFilters?.length > 0 ? (
        <>
          <div className="flex flex-col gap-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {data.getAllNFTsWithFilters.map((nft, index) => {
                const nftId = `${nft.collectionAddress}-${nft.token_id}`;
                // Create a more unique key that includes current filter state
                const uniqueKey = `${nftId}-${sortBy}-${sortOrder}-${blockchain}-${currentPage}-${index}`;
                const imageUrl = getNftImage(nft);

                return (
                  <Link
                    to={`/nft/nftpage/${nft.blockchain}/${nft.collectionAddress}/${nft.token_id}`}
                    key={uniqueKey}
                    className="block w-full"
                  >
                    <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow duration-300">
                      {/* Image Cell with loading state */}
                      <div className="w-[80px] h-full sm:w-18 sm:h-18 flex-shrink-0 bg-gray-100 relative">
                        {!imageLoadStatus[uniqueKey] && (
                          <div className="absolute inset-0 flex items-center justify-center">
                            <Spin size="small" />
                          </div>
                        )}
                        <img
                          alt={nft.name}
                          src={imageUrl}
                          className="w-full h-full object-cover"
                          onLoad={() => handleImageLoad(nftId, uniqueKey)}
                          onError={() => handleImageError(nftId, uniqueKey)}
                          style={{
                            display:
                              imageLoadStatus[uniqueKey] === "error"
                                ? "none"
                                : "block",
                          }}
                        />
                        {imageLoadStatus[uniqueKey] === "error" && (
                          <div className="w-full h-full flex items-center justify-center bg-gray-200">
                            <span className="text-xs text-gray-500">
                              No image
                            </span>
                          </div>
                        )}
                      </div>

                      {/* NFT Info */}
                      <div className="flex-grow p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between">
                        <div className="flex flex-grow justify-evenly items-center flex-col md:flex-row">
                          <h3 className="font-bold text-lg">{nft.name}</h3>
                          <span className="text-sm text-gray-500 block mt-1">
                            {nft.blockchain}
                          </span>
                          <span className="text-xs text-gray-400 block mt-1">
                            ID: {nft.token_id}
                          </span>
                        </div>

                        <div className="mt-2 sm:mt-0 flex flex-col sm:items-end">
                          {nft.buyPrice > 0 && (
                            <span className="font-bold text-lg">
                              {nft.buyPrice} ETH
                            </span>
                          )}
                          {nft.isMarketplace && (
                            <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded mt-1">
                              {t("For Sale")}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>

          <div className="flex justify-center mt-8">
            <Pagination
              current={currentPage}
              onChange={setCurrentPage}
              pageSize={pageSize}
              total={100}
              showSizeChanger={false}
            />
          </div>
        </>
      ) : (
        <Empty description={t("No NFTs found")} />
      )}
    </div>
  );
};

export default AllNFTsSection;
