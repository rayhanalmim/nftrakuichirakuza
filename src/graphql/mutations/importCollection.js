import { gql } from "@apollo/client"

export const importCollection = gql`
mutation AddCollection($collectionAddress: String!, $blockchain: String!) {
    addCollection(collectionAddress: $collectionAddress, blockchain: $blockchain) {
      blockchain
      collectionName
      logo
      description
      collectionAddress
      tokenStandard
      category
    }
  }
`