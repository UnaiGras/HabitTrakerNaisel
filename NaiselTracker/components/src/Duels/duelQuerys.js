import { gql } from "@apollo/client"


export const DUEL_REQUESTS_PENDING = gql`
query DuelRequestsPending {
    duelRequestsPending {
      id
      status
      duel {
        id
        name
        habits {
          id
          name
          desc
          icon
          color
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
        username
        name
      }
      challenged {
        username
        name
      }
    }
  }  
`

export const DUEL_DETAILS = gql`
query DuelDetails($duelId: String) {
  duelDetails(duelId: $duelId) {
      id
      startTime
      finishTime
      challengerPoints
      challengedPoints
      durationDays
      points
      habits {
        id
        name
        icon
        color
        points
        challengerLastCompletedDate
        challengedLastCompletedDate
        subTasks {
          id
          name
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
mutation AcceptDuelRequest($requestId: String) {
    acceptDuelRequest(requestId: $requestId) {
      id
      name
    }
  }  
`

export const COMPLETE_DUEL_HABIT = gql`
mutation CompleteHabit($duelId: String, $habitId: String) {
    completeHabit(duelId: $duelId, habitId: $habitId) {
      id
      name
      lastCompletedDate
      challengerLastCompletedDate
      challengedLastCompletedDate
    }
  }
  
`

