import { gql } from "@apollo/client";
export const getSearchData = gql`
  query SearchNfts($key: String) {
    searchNfts(key: $key) {
      blockchain
      name
      token_id
      isVideo
      isImage
      isGif
      isAuction
      isMarketplace
      listingId
      metadata
      collectionAddress
    }
  }
`;
