import {gql} from "@apollo/client"


export const LOGIN = gql`
    mutation Login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
    value
  }
}
`
export const REGISTER = gql`
mutation Mutation($username: String, $email: String, $name: String, $profilePhoto: String, $password: String) {
  addUser(username: $username, email: $email, name: $name, profilePhoto: $profilePhoto, password: $password) {
    username
    psswdHash
    profilePhoto
  }
}
`