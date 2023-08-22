import { gql } from "@apollo/client";

export const signIn = gql`
  query SignIn($wallet: String!) {
    signIn(wallet: $wallet) {
      address
      displayName
      imageUrl
      avatar_url
      about_details
      bg_image
      twitterUrl
      facebookUrl
      websiteUrl
      firstName
      lastName
      username
      isVerified
      level1_referral
      level2_referral
      level3_referral
      parent_referral
      referral_url
      wallet
    }
  }
`;
