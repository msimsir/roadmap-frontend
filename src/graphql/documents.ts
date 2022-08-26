import gql from "graphql-tag";
export const SIGNIN_MUTATION = gql`
  mutation SigninMutation($email: String!, $password: String!) {
    signIn(email: $email, password: $password) {
      user
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
      id
      username
      email
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
    }
  }
`;
