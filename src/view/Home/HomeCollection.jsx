import React, { useEffect, useState } from "react";
import { getFilteredCollections } from "../../graphql/queries/getFilteredCollections";
import { useQuery } from "@apollo/client";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const HomeCollection = () => {
  const { t } = useTranslation();
  const [filters, setFilters] = useState({
    blockchain: "",
    sortBy: "latest",
  });

  // Use filters in the query
  const { data, loading, error } = useQuery(getFilteredCollections, {
    variables: filters,
  });

  const [isMobile, setIsMobile] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // Reset pagination when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [filters]);

  // Check if mobile device
  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(/Mobi|Android/i.test(navigator.userAgent));
    };

    checkIsMobile();
    window.addEventListener("resize", checkIsMobile);

    return () => {
      window.removeEventListener("resize", checkIsMobile);
    };
  }, []);

  // Calculate pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data?.getFilteredCollection
    ? data.getFilteredCollection.slice(indexOfFirstItem, indexOfLastItem)
    : [];
  const totalPages = data?.getFilteredCollection
    ? Math.ceil(data.getFilteredCollection.length / itemsPerPage)
    : 0;

  // Split items into two columns for desktop view
  const leftColumnItems = currentItems.slice(
    0,
    Math.ceil(currentItems.length / 2)
  );
  const rightColumnItems = currentItems.slice(
    Math.ceil(currentItems.length / 2)
  );

  // Handle page change
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const nextPage = () =>
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  const prevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));

  // Handle filter changes
  const handleFilterChange = (name, value) => {
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Pagination component
  const Pagination = ({
    currentPage,
    totalPages,
    paginate,
    nextPage,
    prevPage,
  }) => {
    // Function to determine which page numbers to display
    const getPageNumbers = () => {
      const pageNumbers = [];

      if (totalPages <= 7) {
        // If total pages is 7 or less, show all pages
        for (let i = 1; i <= totalPages; i++) {
          pageNumbers.push(i);
        }
      } else {
        // Always add first page
        pageNumbers.push(1);

        // Calculate range around current page
        let startPage = Math.max(2, currentPage - 1);
        let endPage = Math.min(totalPages - 1, currentPage + 1);

        // Adjust to ensure we show 3 pages in the middle
        if (startPage === 2) endPage = Math.min(4, totalPages - 1);
        if (endPage === totalPages - 1) startPage = Math.max(2, totalPages - 3);

        // Add ellipsis before middle pages if needed
        if (startPage > 2) pageNumbers.push("...");

        // Add middle pages
        for (let i = startPage; i <= endPage; i++) {
          pageNumbers.push(i);
        }

        // Add ellipsis after middle pages if needed
        if (endPage < totalPages - 1) pageNumbers.push("...");

        // Always add last page
        pageNumbers.push(totalPages);
      }

      return pageNumbers;
    };

    return (
      <div className="flex justify-center items-center mt-8 mb-4">
        {/* Previous button as arrow */}
        <button
          onClick={prevPage}
          disabled={currentPage === 1}
          className={`px-3 py-2 mx-1 rounded flex items-center justify-center ${
            currentPage === 1
              ? "bg-gray-200 text-gray-400 cursor-not-allowed"
              : "bg-blue-500 text-white hover:bg-blue-600"
          }`}
          aria-label={t("Previous Page")}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </svg>
        </button>

        {/* Page numbers with ellipsis */}
        <div className="flex mx-2">
          {getPageNumbers().map((pageNumber, index) =>
            pageNumber === "..." ? (
              <span
                key={`ellipsis-${index}`}
                className="w-8 h-8 mx-1 flex items-center justify-center text-gray-500"
              >
                ...
              </span>
            ) : (
              <button
                key={`page-${pageNumber}`}
                onClick={() => paginate(pageNumber)}
                className={`w-8 h-8 mx-1 rounded flex items-center justify-center ${
                  currentPage === pageNumber
                    ? "bg-blue-500 text-white font-medium"
                    : "bg-gray-200 hover:bg-gray-300"
                }`}
              >
                {pageNumber}
              </button>
            )
          )}
        </div>

        {/* Next button as arrow */}
        <button
          onClick={nextPage}
          disabled={currentPage === totalPages}
          className={`px-3 py-2 mx-1 rounded flex items-center justify-center ${
            currentPage === totalPages
              ? "bg-gray-200 text-gray-400 cursor-not-allowed"
              : "bg-blue-500 text-white hover:bg-blue-600"
          }`}
          aria-label={t("Next Page")}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>
    );
  };

  // Filter components
  const FilterSection = () => (
    <div className="flex flex-col md:flex-row gap-4 mb-6 px-2">
      <div className="flex flex-col">
        <label className="text-sm font-medium mb-1">{t("Blockchain")}</label>
        <select
          className="p-2 border rounded-md bg-white"
          value={filters.blockchain}
          onChange={(e) => handleFilterChange("blockchain", e.target.value)}
        >
          <option value="">{t("All Blockchains")}</option>
          <option value="ethereum">Ethereum</option>
          <option value="binance">Binance</option>
          <option value="polygon">Polygon</option>
        </select>
      </div>

      <div className="flex flex-col">
        <label className="text-sm font-medium mb-1">{t("Sort By")}</label>
        <select
          className="p-2 border rounded-md bg-white"
          value={filters.sortBy}
          onChange={(e) => handleFilterChange("sortBy", e.target.value)}
        >
          <option value="latest">{t("Latest")}</option>
          <option value="oldest">{t("Oldest")}</option>
        </select>
      </div>

      <div className="flex items-end">
        <button
          onClick={() => setFilters({ blockchain: "", sortBy: "latest" })}
          className="p-2 border rounded-md bg-gray-200 hover:bg-gray-300"
        >
          {t("Reset Filters")}
        </button>
      </div>
    </div>
  );

  // Header component for reuse
  const ColumnHeader = () => (
    <div className="flex flex-row-reverse justify-between pb-3 gap-[20px] md:gap-[20px] px-2">
      <h4 className="text-grey font-bold capitalize md:w-[100px]">
        {t("Collection")}
      </h4>
      <h4 className="text-grey md:flex hidden font-bold capitalize">
        {t("Blockchain")}
      </h4>
      <h4 className="text-grey md:flex hidden font-bold capitalize">
        {t("Token Standard")}
      </h4>
      <h4 className="text-grey font-bold capitalize">{t("Collection Logo")}</h4>
    </div>
  );

  // Collection item component
  const CollectionItem = ({ data, index }) => (
    <Link
      key={index}
      to={`/collection/collectiondetails/${data.blockchain}/${data.collectionAddress}`}
    >
      <div className="border rounded-lg flex flex-row-reverse justify-between items-center gap-[20px] md:gap-[10px] my-3 hover:bg-cyan hover:rounded-lg p-2">
        <div className="justify-center">
          <h2 className="font-bold capitalize w-[100px] text-sm">
            {data.collectionName}
          </h2>
        </div>
        <div className="md:flex hidden gap-2 w-[50px] items-center justify-center">
          <h2 className="font-bold text-right capitalize text-sm">
            {data.blockchain}
          </h2>
        </div>
        <div className="md:flex hidden gap-2 items-center w-[50px] justify-center">
          <h2 className="font-bold capitalize text-sm">{data.tokenStandard}</h2>
        </div>
        <div className="flex flex-wrap gap-2">
          <img
            src={
              data.logo?.includes("ipfs")
                ? data.logo.replace(
                    "ipfs://",
                    `https://${process.env.REACT_APP_THIRDWEB_CLIENT_ID}.ipfscdn.io/ipfs/`
                  )
                : "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/1024px-No_image_available.svg.png"
            }
            alt={data.collectionName}
            className="max-w-[80px] w-full mx-auto"
          />
        </div>
      </div>
    </Link>
  );

  return (
    <div className="max-w-[1500px] w-full mx-auto rounded-lg">
      {loading ? (
        <div className="flex justify-center items-center h-[60vh]">
          <p className="text-xl">{t("Loading collections...")}</p>
        </div>
      ) : error ? (
        <div className="flex justify-center items-center h-[60vh]">
          <p className="text-xl text-red-500">
            {t("Error loading collections")}
          </p>
        </div>
      ) : data?.getFilteredCollection?.length > 0 ? (
        <div className="pt-5 md:pt-[2rem] px-5">
          {/* Filter Section */}
          <FilterSection />

          {/* Mobile view - single column */}
          <div className="md:hidden">
            <ColumnHeader />
            {currentItems.map((item, index) => (
              <CollectionItem key={index} data={item} index={index} />
            ))}
          </div>

          {/* Desktop view - two columns */}
          <div className="hidden md:grid md:grid-cols-2 gap-6">
            {/* Left Column */}
            <div>
              <ColumnHeader />
              {leftColumnItems.map((item, index) => (
                <CollectionItem
                  key={`left-${index}`}
                  data={item}
                  index={index}
                />
              ))}
            </div>

            {/* Right Column */}
            <div>
              <ColumnHeader />
              {rightColumnItems.map((item, index) => (
                <CollectionItem
                  key={`right-${index}`}
                  data={item}
                  index={index}
                />
              ))}
            </div>
          </div>

          {/* Updated Pagination Controls */}
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            paginate={paginate}
            nextPage={nextPage}
            prevPage={prevPage}
          />

          <div className="text-center text-gray-500 mb-4">
            {t("Showing")} {indexOfFirstItem + 1}-
            {Math.min(
              indexOfLastItem,
              data?.getFilteredCollection?.length || 0
            )}{" "}
            {t("of")} {data?.getFilteredCollection?.length} {t("items")}
          </div>
        </div>
      ) : (
        <div className="flex justify-center items-center h-[60vh]">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <p className="text-xl text-center mb-2">
              {t("No Collection Found")}
            </p>
            <p className="text-lg text-center mb-3">{t("Having Trouble?")}</p>
            <div className="text-center">
              <Link
                to="/create"
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                {t("Create One")}
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomeCollection;
