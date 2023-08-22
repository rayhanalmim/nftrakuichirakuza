import { gql } from "@apollo/client";

export const getUserCollection = gql`
  query GetCollectionOfUser($walletAddress: String!, $blockchain: String!) {
    getCollectionOfUser(
      walletAddress: $walletAddress
      blockchain: $blockchain
    ) {
      token_address
      contract_type
      name
      symbol
      creatorWallet
    }
  }
`;
