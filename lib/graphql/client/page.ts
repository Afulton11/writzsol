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

export const GET_PAGE_BY_ID = gql`
  query getPageById($id: String!) {
    getPageById(id: $id) {
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
  mutation createPage($page: CreatePageInput!) {
    createPage(page: $page) {
      id
      path
      blocks
      isPublished
      createdAt
      updatedAt

      website {
        location
      }
    }
  }
`

export const SAVE_PAGE = gql`
  mutation savePage($page: SavePageInput!) {
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
  mutation deletePage($pageId: String!) {
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
