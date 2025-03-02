import { gql } from "@apollo/client";

export const getCollectionNFT = gql`
  query GetCollectionNft($collectionAddress: String!, $blockchain: String!) {
    getCollectionNft(
      collectionAddress: $collectionAddress
      blockchain: $blockchain
    ) {
      blockchain
      collectionName
      logo
      description
      collectionAddress
      tokenStandard
      sharing
      category
      creatorWallet
      items {
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
      isMarketplaceNft {
        blockchain
        name
        token_id
        isVideo
        isImage
        isGif
        isAuction
        isMarketplace
        isLazyMint
        listingId
        voucher
        creator {
          wallet # Instead of address
          displayName
          avatar_url # Instead of imageUrl
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
        metadata
        collectionAddress
        tokenMetadata {
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
        properties {
          traitType
          value
        }
      }
    }
  }
`;
