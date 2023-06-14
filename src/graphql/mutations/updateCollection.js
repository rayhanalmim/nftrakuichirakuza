import { gql } from "@apollo/client";

export const updateCollection = gql`
  mutation UpdateCollection(
    $collectionAddress: String!
    $blockchain: String!
    $sharing: Boolean
  ) {
    updateCollection(
      collectionAddress: $collectionAddress
      blockchain: $blockchain
      sharing: $sharing
    ) {
      blockchain
      collectionName
      logo
      contract_type
      name
      symbol
      description
      collectionAddress
      tokenStandard
      token_address
      category
      creatorWallet
      sharing
    }
  }
`;
