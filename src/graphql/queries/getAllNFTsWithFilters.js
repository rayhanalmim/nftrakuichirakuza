import { gql } from "@apollo/client";

export const getAllNFTsWithFilters = gql`
  query GetAllNFTsWithFilters(
    $sortBy: String
    $sortOrder: String
    $blockchain: String
    $limit: Int
    $offset: Int
  ) {
    getAllNFTsWithFilters(
      sortBy: $sortBy
      sortOrder: $sortOrder
      blockchain: $blockchain
      limit: $limit
      offset: $offset
    ) {
      blockchain
      name
      token_id
      isVideo
      isImage
      isGif
      isAuction
      isMarketplace
      collectionAddress
      metadata
      tokenMetadata {
        metadata
        name
        token_address
        token_id
        owner_of
      }
    }
  }
`;
