export const TASK_CREATING_BEGIN = 'TASK_CREATING_BEGIN'
export const TASK_CREATING_SUCCESS = 'TASK_CREATING_SUCCESS'
export const TASK_CREATING_ERROR = 'TASK_CREATING_ERROR'

export const ALL_TASK_FETCHING = 'ALL_TASK_FETCHING'
export const TASK_SESSION_ENDING = 'TASK_SESSION_ENDING'


export const reducer = (state, action) => {
    switch (action.type) {
        case TASK_CREATING_BEGIN:
            return {
                ...state, 
                isLoading: true
            }
        case TASK_CREATING_SUCCESS:
            return {
                ...state, 
                isLoading: false,
            }
        case TASK_CREATING_ERROR:
            return {
                ...state, 
                isLoading: false
            }   
         case ALL_TASK_FETCHING:
            return {
                ...state, 
                isLoading: false,
                task: action.payload
            }          
        case TASK_SESSION_ENDING:
            return {
                ...state, 
                isLoading: false,
                task: null
            }    
        default:
            return state
    }
} 