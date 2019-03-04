import C from './constants'
export const changeUser = (infoType, value) => ({
    type: C.CHANGE_USER,
    infoType,
    value,
})

export const changeLoginStatus = (status) => ({
    type: C.CHANGE_LOGIN_STATUS,
    status
})

export const getAllCourses = (courses) => ({
    type: C.GET_ALL_COURSES,
    courses
})