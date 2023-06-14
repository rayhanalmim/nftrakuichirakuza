import { gql } from "@apollo/client";
export const itemCreateMutation = gql`
  mutation ItemCreateMutation(
    $collectionAddress: String!
    $tokenId: String!
    $signer: String
    $isVideo: Boolean
    $isImage: Boolean
    $properties: String
    $voucher: String
    $isLazyMint: Boolean
    $isGif: Boolean
    $isAuction: Boolean
    $metadata: String
    $price: Float
    $blockchain: String
    $name: String
    $description: String
    $owner: String
  ) {
    ItemCreateMutation(
      collectionAddress: $collectionAddress
      token_id: $tokenId
      signer: $signer
      isVideo: $isVideo
      isImage: $isImage
      properties: $properties
      voucher: $voucher
      isLazyMint: $isLazyMint
      isGif: $isGif
      isAuction: $isAuction
      metadata: $metadata
      price: $price
      blockchain: $blockchain
      name: $name
      description: $description
      owner: $owner
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
