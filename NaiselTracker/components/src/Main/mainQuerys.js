import { gql } from '@apollo/client';

export const IS_USER_PREMIUM = gql`
  query IsUserPremium {
    isUserPremium
  }
`;


export const ME = gql`
query Me {
  me {
    id
    name
    premium
    username
  }
}
`

//Usage
//
//const { loading, error, data } = useQuery(IS_USER_PREMIUM);