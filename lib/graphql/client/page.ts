import { gql } from '@apollo/client'

export const GET_PAGE = gql`
  query getPage($path: String!, $location: String!) {
    getPage(path: $path, location: $location) {
      id
      path
      blocks
      isPublished
      createdAt
      updatedAt
    }
  }
`

export const GET_PAGES = gql`
  query getPages($location: String!) {
    getPages(location: $location) {
      id
      path
      blocks
      isPublished
      createdAt
      updatedAt
    }
  }
`

export const CREATE_PAGE = gql`
  query createPage($page: CreatePageInput!) {
    createPage(page: $page) {
      id
      path
      blocks
      isPublished
      createdAt
      updatedAt
    }
  }
`

export const SAVE_PAGE = gql`
  query savePage($page: SavePageInput!) {
    savePage(page: $page) {
      id
      path
      blocks
      isPublished
      updatedAt
      createdAt
    }
  }
`

export const DELETE_PAGE = gql`
  query deletePage($pageId: String!) {
    deletePage(pageId: $pageId) {
      id
      path
      blocks
      isPublished
      createdAt
      updatedAt
    }
  }
`
