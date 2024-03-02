import { gql } from '@apollo/client';

export const IS_USER_PREMIUM = gql`
  query IsUserPremium {
    isUserPremium
  }
`;


//Usage
//
//const { loading, error, data } = useQuery(IS_USER_PREMIUM);