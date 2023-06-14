import { gql } from "@apollo/client";

export const SearchCollection = gql`
  query SearchCollections($key: String) {
    searchCollections(key: $key) {
      collectionAddress
      collectionName
      blockchain
      logo
    }
  }
`;
