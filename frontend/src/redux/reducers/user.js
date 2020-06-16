const userReducer = (state = {}, action) => {
    switch (action.type) {
        case 'LOGIN':
        case 'LOGOUT': 
        case 'GET_USER':
        case 'FOLLOW':
        case 'UNFOLLOW':
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
        default:
            return state;
    }
};
export default userReducer;