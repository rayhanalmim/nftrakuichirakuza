import { gql } from "@apollo/client";

export const getWalletCollection = gql`
  query GetCollectionOfUser($walletAddress: String!, $blockchain: String!) {
    getCollectionOfUser(
      walletAddress: $walletAddress
      blockchain: $blockchain
    ) {
      token_address
      contract_type
      name
      symbol
    }
  }
`;
