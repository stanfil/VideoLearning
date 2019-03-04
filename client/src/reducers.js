import C from './constants'

const defaultUser = {
    username: '',
    password: '',
    email: '',
    isLoggedIn: false,
    purchased: []
}

export const courses = (state=[], action) => {
    switch (action.type) {
        case C.GET_ALL_COURSES:
            return action.courses
        default:
            return state
    }
}

export const user = (state=defaultUser, action)=> {
    switch (action.type) {
        case C.CHANGE_LOGIN_STATUS:
            return {
                ...state,
                isLoggedIn: action.status
            }
        case C.CHANGE_USER:
            return {
                ...state,
                [action.infoType]: action.value
            }
        default:
            return state
    }
}

