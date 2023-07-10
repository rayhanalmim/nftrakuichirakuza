import { gql } from "@apollo/client";

export const refInfo = gql`
  query getRefInformation($wallet: String!) {
    getRefInformation(wallet: $wallet) {
      user {
        username
        referral_reward
        referral_url
        level1_referral
        level2_referral
        level3_referral
        parent_referral
        avatar_url
        referral_reward
        displayName
      }
      level1User {
        avatar_url
        displayName
        referral_url
        createdAt
      }
      level2User {
        avatar_url
        displayName
        referral_url
        createdAt
      }
      level3User {
        avatar_url
        displayName
        referral_url
        createdAt
      }
      parentRef {
        avatar_url
        displayName
        referral_url
      }
    }
  }
`;
