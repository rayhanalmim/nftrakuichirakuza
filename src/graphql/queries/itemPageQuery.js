import { gql } from "@apollo/client";

export const itemPageQuery = gql`
  query ItemPageQuery(
    $blockchain: String!
    $collectionAddress: String!
    $tokenId: String!
  ) {
    ItemPageQuery(
      blockchain: $blockchain
      collectionAddress: $collectionAddress
      token_id: $tokenId
    ) {
      owner
      nft {
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
      event {
        block_number
        block_timestamp
        block_hash
        transaction_hash
        value
        contract_type
        transaction_type
        token_address
        token_id
        from_address
        to_address
      }
      isListedOnMarketplace
      lazyMinting
    }
  }
`;
