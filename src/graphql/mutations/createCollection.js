import { gql } from "@apollo/client";

export const createCollection = gql`
  mutation CreateCollection(
    $blockchain: String!
    $collectionName: String!
    $collectionAddress: String!
    $creatorWallet: String!
    $logo: String
    $description: String
    $tokenStandard: String
    $category: String
  ) {
    createCollection(
      blockchain: $blockchain
      collectionName: $collectionName
      collectionAddress: $collectionAddress
      creatorWallet: $creatorWallet
      logo: $logo
      description: $description
      tokenStandard: $tokenStandard
      category: $category
    ) {
      blockchain
      collectionName
      logo
      description
      collectionAddress
      tokenStandard
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
        listingId
        creator {
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
          wallet
        }
        metadata
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
