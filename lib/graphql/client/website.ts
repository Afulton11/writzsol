import { gql } from '@apollo/client'
import { WebsiteStatus } from '../server'

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
  mutation createWebsite(
    $title: String!
    $location: String!
    $defaultTheme: String
    $status: WebsiteStatus
  ) {
    createWebsite(
      title: $title
      location: $location
      defaultTheme: $defaultTheme
      status: $status
    ) {
      id
      title
      location
      status
      defaultTheme
      updatedAt
      createdAt
    }
  }
`

export const GET_WEBSITE_BY_LOCATION = gql`
  query getWebsiteByLocation($location: String!) {
    getWebsiteByLocation(location: $location) {
      id
      title
      location
      status
      defaultTheme
      updatedAt
      createdAt
    }
  }
`

export const GET_WEBSITE_BY_ID = gql`
  query getWebsiteById($id: String!) {
    getWebsiteById(id: $id) {
      id
      title
      location
      status
      defaultTheme
      updatedAt
      createdAt
    }
  }
`

export const GET_WEBSITES = gql`
  query {
    websites(orderBy: { updatedAt: DESC }) {
      id
      title
      location
      status
      updatedAt
      createdAt
    }
  }
`
