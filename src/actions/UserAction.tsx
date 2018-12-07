export const loginUser = (username : string, firstName : string, lastName : string, id : string) => {
    return {
        type : 'LOGIN_USER',
        username,
        firstName,
        lastName,
        id,
    }
}