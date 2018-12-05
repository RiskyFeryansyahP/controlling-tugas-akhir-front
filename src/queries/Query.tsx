import { gql } from 'apollo-boost'

import { mahasiswaFragment, dosenFragment } from './Fragments'

export const RegisterUserMutation = gql`
    mutation($username : String!, $password : String!, $email : String!, $status : String!, $firstName : String!, $lastName : String!, $college : String!) {
        addUser(username : $username, password : $password, email : $email, status : $status, firstName : $firstName, lastName : $lastName, college : $college) {
            username
            password
            profile {
                ...mahasiswaDetail
                ...dosenDetail
            }
        }
    }
    ${mahasiswaFragment}
    ${dosenFragment}
`

export const LoginUserMutation = gql`
    mutation($username : String!, $password : String!) {
        userLogin(username : $username, password : $password) {
            status,
            profile {
                ... mahasiswaDetail
                ... dosenDetail
            }
        }
    }
    ${mahasiswaFragment}
    ${dosenFragment}
`