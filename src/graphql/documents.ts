import gql from "graphql-tag";
export const SIGNIN_MUTATION = gql`
  mutation SigninMutation($email: String!, $password: String!) {
    signIn(email: $email, password: $password) {
      user {
        _id
        firstName
        lastName
        username
        email
      }
      token
    }
  }
`;

export const SIGNUP_MUTATION = gql`
  mutation SignupMutation(
    $firstName: String!
    $lastName: String!
    $username: String!
    $email: String!
    $password: String!
  ) {
    signUp(
      firstName: $firstName
      lastName: $lastName
      username: $username
      email: $email
      password: $password
    ) {
      user {
        _id
        firstName
        lastName
        username
        email
      }
      token
    }
  }
`;

export const GET_ROADMAP_QUERY = gql`
  query GetRoadmap($id: ID!) {
    getRoadmap(_id: $id) {
      _id
      title
      description
      tags
      likes
    }
  }
`;

export const GET_ROADMAPS_QUERY = gql`
  query GetRoadmaps($search: String, $page: Int, $limit: Int) {
    getRoadmaps(search: $search, page: $page, limit: $limit) {
      roadmaps {
        _id
        description
        tags
        title
        userId
        elements
        likes
      }
      currentPage
      totalPages
    }
  }
`;

export const GET_ROADMAPS_OF_USER_QUERY = gql`
  query GetRoadmapsOfUser($userId: ID!) {
    getRoadmapsOfUser(userId: $userId) {
      _id
      description
      tags
      title
      userId
      elements
      likes
    }
  }
`;

export const CREATE_ROADMAP_MUTATION = gql`
  mutation CreateRoadmap(
    $title: String!
    $description: String!
    $tags: [String!]
    $elements: String!
    $userId: String!
  ) {
    createRoadmap(
      title: $title
      description: $description
      tags: $tags
      elements: $elements
      userId: $userId
    ) {
      _id
      title
      description
      tags
      elements
      userId
    }
  }
`;

export const LIKE_ROADMAP_MUTATION = gql`
  mutation LikeRoadmap($id: ID!) {
    likeRoadmap(_id: $id) {
      _id
      description
      elements
      likes
      tags
      title
      userId
    }
  }
`;
