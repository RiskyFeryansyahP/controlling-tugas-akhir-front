const userState = {
    username : '',
    firstName : '',
    lastName : '',
    id : '',
    isLoggedIn : false
}

const UserReducer = (state = userState, action : any) => {
    // console.log("before update state : ", state)
    switch(action.type)
    {
        case 'LOGIN_USER':
        console.log("action :", action)
            return {
                ...state,
                username : action.username,
                firstName : action.firstName,
                lastName : action.lastName,
                id : action.id,
                isLoggedIn : action.isLoggedIn
            }
        default: 
        return state
    }
}

export default UserReducer