import { RECEIVE_TWEETS, TOGGLE_TWEET, ADD_TWEET } from '../actions/tweets'

export default function tweets(state = {}, action) {
    switch (action.type) {
        case RECEIVE_TWEETS:
            return {
                ...state,
                ...action.tweets
            }
        case TOGGLE_TWEET:
            return {
                // if a user is liking id for first time, want to add their username to likes array
                // if unliking, want to remove from likes array
                ...state,
                [action.id]: {
                    ...state[action.id],
                    likes: action.hasLiked === true
                        ? state[action.id].likes.filter((uid) => uid !== action.authedUser)
                        : state[action.id].likes.concat([action.authedUser])
                }
            }
        case ADD_TWEET:
            const { tweet } = action

            let replyingTo = {}
            if (tweet.replyingTo !== null) {
                replyingTo = {
                    [tweet.replyingTo]: {
                        ...state[tweet.replyingTo],
                        replies: state[tweet.replyTo].replies.concat([tweet.id])
                    }
                }
            }
            return {
                ...state,
                // take tweet and add it to the tweets array, or tweets slice of state
                [action.tweet.id]: action.tweet,
                // if brand new tweet is in reply to another tweet, 
                // want to spread previous properties onto new tweet, 
                // concatonate onto replies array new reply we create, 
                // and then spread whole new object onto tweets array.
                ...replyingTo,
            }
        default:
            return state
    }
} 