import { gql } from "@apollo/client";

export const getFilteredCollections = gql`
  query GetFilteredCollection($blockchain: String, $sortBy: String) {
    getFilteredCollection(blockchain: $blockchain, sortBy: $sortBy) {
      blockchain
      collectionName
      logo
      description
      collectionAddress
      tokenStandard
      category
      creatorWallet
      sharing
    }
  }
`;
