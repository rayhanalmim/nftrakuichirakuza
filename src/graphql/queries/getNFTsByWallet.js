import { gql } from "@apollo/client";

export const WalletNFT = gql`
  query GetNftByWallet($walletAddress: String!, $blockchain: String!) {
    getNftByWallet(walletAddress: $walletAddress, blockchain: $blockchain) {
      user {
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
        referral_reward
        isVerified
        level1_referral
        level2_referral
        level3_referral
        parent_referral
        referral_url
        wallet
      }
      nfts {
        token_address
        block_number_minted
        token_id
        contract_type
        name
        symbol
        token_uri
        metadata
        minter_address
        owner_of
      }
    }
  }
`;
