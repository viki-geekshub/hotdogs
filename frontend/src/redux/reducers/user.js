const userReducer = (state = {}, action) => {
    switch (action.type) {
        case 'LOGIN':
        case 'LOGOUT': 
        case 'GET_USER':
        case 'SET_USER':
            return {
                ...state,
                user: action.payload
            }
        case 'GET_ALL_USERS':
            return {
               ...state,
                users: action.payload
            }  
        case 'GET_ALL_USERS_MATCHS':
            return{
                ...state,
                matchs: action.payload
            }
        case 'CLEAN_USERS':
            return{
                ...state,
                users: action.payload
            }
        case 'CLEAN_USERS_MATCHS':
            return{
                ...state,
                matchs: action.payload
            }
        case 'FOLLOW':
        case 'UNFOLLOW':
            return {
                ...state
            }
        default:
            return state;
    }
};
export default userReducer;