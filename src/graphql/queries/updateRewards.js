import { gql } from "@apollo/client";

export const updateRewards = gql`
  query GetUserReward($walletAddress: String!, $price: Float!) {
    getUserReward(walletAddress: $walletAddress, price: $price) {
      level1Reward
      level2Reward
      level3Reward
    }
  }
`;
