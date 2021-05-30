import { GET_PROFILE , PROFILE_ERROR, CLEAR_PROFILE, UPDATE_PROFILE, GET_PROFILES, FOLLOW_ERROR,FOLLOW , UNFOLLOW} from "../actions/types";

const initialState = {
    profile: null,
    profiles: [],
    loading: true,
    error: {}
}

export default function(state = initialState, action){
    const {type, payload} = action;

    switch(type){
        case GET_PROFILE:
        case UPDATE_PROFILE:
        case GET_PROFILE:
            return {
                ...state,
                profile: payload,
                loading: false
            };
        case GET_PROFILES:
            return {
                ...state,
                profiles: payload,
                loading: false
            }
        case FOLLOW:
            return{
                ...state,
                loading: false,
                profiles: state.profiles.map(profile=> profile._id===payload.id? {...profile, following: payload.following}: profile)
            }
        case UNFOLLOW:
            return{
                ...state,
                loading: false,
                profiles: state.profiles.map(profile=> profile._id===payload.id? {...profile, following: payload.following}: profile)
            }
        case FOLLOW_ERROR:
            return {
                ...state,
                loading: false,
                error: payload
            }
        case PROFILE_ERROR:
            return {
                ...state,
                error:payload,
                loading: false,
                profile: null
            };
        case CLEAR_PROFILE:
            return {
                ...state,
                profile: null,
                loading: false
            }
        default: 
            return state;
    }
}