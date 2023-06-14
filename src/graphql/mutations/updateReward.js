import { gql } from "@apollo/client";

export const updateReward = gql`
  mutation UpdateUser($wallet: String!, $referralReward: Float) {
    updateUser(wallet: $wallet, referral_reward: $referralReward) {
      referral_url
      wallet
    }
  }
`;
