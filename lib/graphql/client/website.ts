import { useQuery, useMutation, gql } from '@apollo/client'
import { WebsiteStatus } from '@prisma/client'

interface WebsiteData {
  id: number
  title: string
  location: string
  status: WebsiteStatus
  defaultTheme: string
}

export interface WebsiteVars {
  title: string
  location: string
  status?: WebsiteStatus
  defaultTheme?: string
}

export const CREATE_WEBSITE = gql`
  mutation CreateWebsite($website: WebsiteCreateInput!) {
    createWebsite(data: $website) {
      id
      title
      location
      status
    }
  }
`

export const GET_USER_WEBSITES = gql`
  query {
    websites(orderBy: { updatedAt: desc }) {
      id
      title
      location
      status
      updatedAt
      createdAt
    }
  }
`

export const useCreateWebsiteMutation = (website?: WebsiteVars) =>
  useMutation<{ createWebsite: WebsiteData }, { website: WebsiteVars }>(
    CREATE_WEBSITE,
    {
      variables: {
        website,
      },
    }
  )
