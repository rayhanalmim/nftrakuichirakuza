import { gql } from "@apollo/client";

export const updateItem = gql`
  mutation UpdateItem(
    $collectionAddress: String!
    $tokenId: String!
    $blockchain: String!
    $isMarketplace: Boolean
    $owner: String
    $isAuction: Boolean
    $price: Float
    $listingId: String
    $metadata: String
  ) {
    updateItem(
      collectionAddress: $collectionAddress
      token_id: $tokenId
      blockchain: $blockchain
      isMarketplace: $isMarketplace
      owner: $owner
      isAuction: $isAuction
      price: $price
      listingId: $listingId
      metadata: $metadata
    ) {
      blockchain
      name
      token_id
      isVideo
      isImage
      isGif
      isAuction
      isMarketplace
      signer
      isLazyMint
      listingId
      voucher
      creator {
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
`;
