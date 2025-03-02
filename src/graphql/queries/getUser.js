import { gql } from "@apollo/client";

export const getUserData = gql`
  query GetUser($wallet: String!) {
    getUser(wallet: $wallet) {
      displayName
      avatar_url
      about_details
      bg_image
      twitterUrl
      createdAt
      facebookUrl
      websiteUrl
      firstName
      lastName
      username
      isVerified
      referral_url
      wallet
    }
  }
`;
