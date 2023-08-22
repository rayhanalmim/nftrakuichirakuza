import { gql } from "@apollo/client";

export const updateUser = gql`
  mutation UpdateUser(
    $username: String
    $firstName: String
    $websiteUrl: String
    $twitterUrl: String
    $bgImage: String
    $aboutDetails: String
    $avatarUrl: String
    $displayName: String
    $lastName: String
    $facebookUrl: String
    $isVerified: Boolean
    $wallet: String!
  ) {
    updateUser(
      username: $username
      firstName: $firstName
      websiteUrl: $websiteUrl
      twitterUrl: $twitterUrl
      bg_image: $bgImage
      about_details: $aboutDetails
      avatar_url: $avatarUrl
      displayName: $displayName
      lastName: $lastName
      facebookUrl: $facebookUrl
      isVerified: $isVerified
      wallet: $wallet
    ) {
      address
      displayName
      imageUrl
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
      level1_referral
      level2_referral
      level3_referral
      parent_referral
      referral_url
      wallet
    }
  }
`;
