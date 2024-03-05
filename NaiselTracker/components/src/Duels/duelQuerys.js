import { gql } from "@apollo/client"


export const DUEL_REQUESTS_PENDING = gql`
query DuelRequestsPending {
    duelRequestsPending {
      id
      status
      duel {
        id
        habits {
          id
          name
          desc
          subTasks {
            id
            name
            lastCompletedDate
          }
        }
      }
      from {
        id
        username
        name
      }
      to {
        id
        username
        name
      }
    }
  }
`


export const ACTIVE_DUELS = gql`
query ActiveDuels {
    activeDuels {
      id
      startTime
      finishTime
      points
      name
      challenger {
        id
        username
        name
      }
      challenged {
        id
        username
        name
      }
    }
  }  
`

export const DUEL_DETAILS = gql`
query DuelDetails($duelId: ID!) {
    duelDetails(duelId: $duelId) {
      id
      startTime
      finishTime
      challengerLastCompletedDate
      challengedLastCompletedDate
      habits {
        id
        name
        subTasks {
          id
          name
          completed
        }
      }
      challenger {
        id
        username
        name
      }
      challenged {
        id
        username
        name
      }
    }
  }  
`


export const SEARCH_USER = gql`
query SearchUsers($searchString: String!) {
    searchUsers(searchString: $searchString) {
      id
      username
      name
    }
  }  
`


export const ACCEPT_DUEL_REQUEST = gql`
mutation AcceptDuelRequest($requestId: ID!) {
    acceptDuelRequest(requestId: $requestId) {
      id
      startTime
      finishTime
      challenger {
        id
        username
      }
      challenged {
        id
        username
      }
    }
  }  
`

export const COMPLETE_DUEL_HABIT = gql`
mutation CompleteHabit($duelId: ID!, $habitId: ID!) {
    completeHabit(duelId: $duelId, habitId: $habitId) {
      id
      name
      lastCompletedDate
      challengerLastCompletedDate
      challengedLastCompletedDate
    }
  }
  
`

