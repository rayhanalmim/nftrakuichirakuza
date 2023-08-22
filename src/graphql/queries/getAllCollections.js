import { gql } from "@apollo/client";

export const getAllCollections = gql`
  query GetAllCollection {
    getAllCollection {
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
