export const USER_REGISTER_BEGIN = 'USER_REGISTER_BEGIN'
export const USER_REGISTER_SUCCESS = 'USER_REGISTER_SUCCESS'
export const USER_REGISTER_ERROR = 'USER_REGISTER_ERROR'
export const USER_INITIAL_FETCH = 'USER_INITIAL_FETCH'
export const USER_LOGOUT = 'USER_LOGOUT'


export const reducer = (state, action) => {
    switch (action.type) {
        case USER_REGISTER_BEGIN:
            return{
                ...state,
                isLoading: true
            }
        case USER_REGISTER_SUCCESS:
            return{
                ...state,
                isLoading: false,
                user: action.payload
            }
        case USER_REGISTER_ERROR:
            return{
                ...state,
                isLoading: false,
            }   
        case USER_INITIAL_FETCH:
            return{
                ...state,
                isLoading: false,
                user: action.payload
            }     
        case USER_LOGOUT:
            return{
                ...state,
                isLoading: false,
                user: null
            }     
    
        default:
            return state
    }
} 