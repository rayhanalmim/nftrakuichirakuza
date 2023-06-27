import { useWeb3React } from "@web3-react/core";
import Web3 from "web3";
import { ChainsInfo } from "../config/config-chains";
import {
  getMarketplaceContract,
  getErc720Contract,
  getErc721Contract,
  rewardContract,
  getErc20Contract,
} from "../utils/contractHelper";
import Swal from "sweetalert2";

function useNFT() {
  const { account, library, chainId, active } = useWeb3React();

  const mintNFT = (
    metadata,
    collectionAddress,
    royaltyAddress,
    royaltyCut,
    charityAddress,
    charityCut
  ) => {
    console.log(
      metadata,
      collectionAddress,
      charityAddress,
      charityCut,
      royaltyAddress,
      royaltyCut,
      "<=========== metadata"
    );
    return getErc721Contract(
      !collectionAddress ? ChainsInfo[chainId].NFT_ADDRESS : collectionAddress,
      library.provider
    )
      .methods.mintTo("0x0Aa22B76E4C4445b7b44a8c5dB946F0db28FE749", metadata,account,0,account,0)
      .send({ from: account });
  };
  const rewardClaim = (voucher) => {
    return rewardContract(
      ChainsInfo[chainId].WITHDRAWAL_CONTRACT_ADDRESS,
      library.provider
    )
      .methods.redeem(voucher)
      .send({ from: account });
  };
  const lazyMintNFT = async (voucher, signer) => {
    let arr = JSON.parse(voucher);
    console.log(arr, signer);

    return getErc721Contract(ChainsInfo[chainId].NFT_ADDRESS, library.provider)
      .methods.mintWithSignature(arr, signer)
      .send({
        from: account,
        value: arr[5],
      });
  };

  const busdApprove = (amount) => {
    return getErc720Contract(ChainsInfo[chainId].BUSD_ADDRESS, library.provider)
      .methods.approve(
        ChainsInfo[chainId].NFT_MARKETPLACE_ADDRESS,
        new Web3().utils.toWei(amount.toString(), "ether")
      )
      .send({ from: account });
  };
  const checkApproval = (collection) => {
    console.log(collection);
    return getErc721Contract(
      !collection ? ChainsInfo[chainId].NFT_ADDRESS : collection,
      library.provider
    )
      .methods.isApprovedForAll(
        account,
        ChainsInfo[chainId].NFT_MARKETPLACE_ADDRESS
      )
      .call();
  };
  const approveMarketplace = (tokenId, collection) => {
    return getErc721Contract(
      !collection ? ChainsInfo[chainId].NFT_ADDRESS : collection,
      library.provider
    )
      .methods.setApprovalForAll(
        ChainsInfo[chainId].NFT_MARKETPLACE_ADDRESS,
        tokenId
      )
      .send({ from: account });
  };
  const putOnSale = (
    assetContract,
    tokenId,
    startTime,
    secondsUntilEndTime,
    buyoutPricePerToken,
    rewardBps
  ) => {
    console.log([
      assetContract,
      tokenId,
      startTime,
      secondsUntilEndTime,
      1,
      ChainsInfo[chainId].NATIVE_TOKEN_ADDRESS,
      ChainsInfo[chainId].NATIVE_TOKEN_ADDRESS,
      buyoutPricePerToken,
      rewardBps,
      0,
    ]);
    return getMarketplaceContract(
      ChainsInfo[chainId].NFT_MARKETPLACE_ADDRESS,
      library.provider
    )
      .methods.createListing(
        [
          assetContract,
          tokenId,
          startTime,
          secondsUntilEndTime,
          1,
          ChainsInfo[chainId].NATIVE_TOKEN_ADDRESS,
          ChainsInfo[chainId].NATIVE_TOKEN_ADDRESS,
          buyoutPricePerToken,
          rewardBps,
          0,
        ],
        "0x8bd10480896525bC0Ac8e28835a4E5FA3fd7e7fe",
        "500"
      )
      .send({ from: account });
  };

  const purchaseNFT = (listingId, price, collection) => {
    return getMarketplaceContract(
      !collection ? ChainsInfo[chainId].NFT_MARKETPLACE_ADDRESS : collection,
      library.provider
    )
      .methods.buy(
        listingId,
        account,
        1,
        ChainsInfo[chainId].NATIVE_TOKEN_ADDRESS,
        price
      )
      .send({
        from: account,
        value: price,
      });
  };

  const cancelAuction = (tokenId) => {
    return getMarketplaceContract(
      ChainsInfo[chainId].NFT_MARKETPLACE_ADDRESS,
      library.provider
    )
      .methods.cancelAuction(tokenId)
      .send({
        from: account,
      });
  };
  const stringToBytes = () => {
    return getErc721Contract(ChainsInfo[chainId].NFT_ADDRESS, library.provider)
      .methods.stringToBytes32((new Date().getTime() / 1000).toString())
      .call();
  };
  const removeFromSale = (listingId, collection) => {
    return getMarketplaceContract(
      !collection ? ChainsInfo[chainId].NFT_MARKETPLACE_ADDRESS : collection,
      library.provider
    )
      .methods.cancelDirectListing(listingId)
      .send({
        from: account,
      });
  };

  const putOnAuction = async (
    assetContract,
    tokenId,
    startTime,
    secondsUntilEndTime,
    reservePricePerToken,
    rewardBps
  ) => {
    return getMarketplaceContract(
      ChainsInfo[chainId].NFT_MARKETPLACE_ADDRESS,
      library.provider
    )
      .methods.createListing([
        assetContract,
        tokenId,
        startTime,
        secondsUntilEndTime,
        1,
        ChainsInfo[chainId].OVE_COIN,
        reservePricePerToken,
        reservePricePerToken,
        rewardBps,
        1,
      ])
      .send({
        from: account,
      });
  };
  const PlaceBid = async (tokenId, bidPrice) => {
    return getMarketplaceContract(
      ChainsInfo[chainId].NFT_MARKETPLACE_ADDRESS,
      library.provider
    )
      .methods.bid(tokenId, new Web3().utils.toWei(bidPrice, "ether"))
      .send({
        from: account,
      });
  };
  const AuctionDataset = async (tokenId) => {
    return getMarketplaceContract(
      ChainsInfo[chainId].NFT_MARKETPLACE_ADDRESS,
      library.provider
    )
      .methods.AuctionDataset(tokenId)
      .call();
  };
  const OwnerOfToken = async (tokenId, collection) => {
    return await getErc721Contract(
      !collection ? ChainsInfo[chainId].NFT_ADDRESS : collection,
      library.provider
    )
      .methods.ownerOf(tokenId)
      .call();
  };
  const GetListingData = async (listingId) => {
    return await getMarketplaceContract(
      ChainsInfo[chainId].NFT_MARKETPLACE_ADDRESS,
      library.provider
    )
      .methods.listings(listingId)
      .call();
  };

  return {
    mintNFT,
    lazyMintNFT,
    busdApprove,
    checkApproval,
    putOnAuction,
    OwnerOfToken,
    PlaceBid,
    putOnSale,
    AuctionDataset,
    cancelAuction,
    approveMarketplace,
    purchaseNFT,
    removeFromSale,
    rewardClaim,
    GetListingData,
    stringToBytes,
  };
}

export default useNFT;
