import { gql } from "@apollo/client";

export const signUp = gql`
  mutation SignUp($wallet: String!, $referralUrl: String) {
    signUp(wallet: $wallet, referral_url: $referralUrl) {
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
      referral_url
      wallet
      level1_referral
      level2_referral
      level3_referral
      parent_referral
    }
  }
`;
