import { gql } from "@apollo/client";

export const updateLazyItem = gql`
  mutation UpdateLazyItem(
    $collectionAddress: String!
    $tokenId: String!
    $blockchain: String!
    $lazyTokenId: String!
    $price: Float
    $isAuction: Boolean
    $isLazyMint: Boolean
    $owner: String
    $isMarketplace: Boolean
    $listingId: String
    $metadata: String
  ) {
    updateLazyItem(
      collectionAddress: $collectionAddress
      token_id: $tokenId
      blockchain: $blockchain
      lazy_token_id: $lazyTokenId
      price: $price
      isAuction: $isAuction
      isLazyMint: $isLazyMint
      owner: $owner
      isMarketplace: $isMarketplace
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
