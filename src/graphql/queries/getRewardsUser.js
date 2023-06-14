import { gql } from "@apollo/client";

export const getRewardsUser = gql`
  query GetUser($wallet: String!) {
    getRefInformation(wallet: $wallet) {
      parentRef {
        displayName
        referral_url
        wallet
      }
    }
  }
`;
