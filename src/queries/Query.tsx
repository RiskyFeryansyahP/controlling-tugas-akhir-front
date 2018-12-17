import { gql } from 'apollo-boost'

import { mahasiswaFragment, dosenFragment, tugasFragment } from './Fragments'

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
            id,
            username,
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

export const AddDosenToMahasiswaMutation = gql`
    mutation AddDosenToMahasiswa($id : String, $code : String) {
        addDosenToMahasiswa(id : $id, code : $code) {
            ... mahasiswaDetail
            ... dosenDetail
        }
    }
    ${mahasiswaFragment}
    ${dosenFragment}
`

export const addTugasToMahasiswaMutation = gql`
    mutation AddTugasToMahasiswa($id : String!, $judul : String!, $keterangan : String!) {
        addTugasMahasiswa(id : $id, judul : $judul, keterangan : $keterangan) {
            ... mahasiswaDetail
            ... tugasDetail
        }
    }
    ${mahasiswaFragment}
    ${tugasFragment}
`

export const getMahasiswasQuery = gql`
    {
        mahasiswas {
            firstName
            lastName
            college
            dosen {
                id
                firstName
                lastName
                code
            }
        }
    }
`

export const getMahasiswaQuery = gql`
    query Mahasiswa($id : String!) {
        mahasiswa(id : $id) {
            id
            firstName
            lastName
            dosen {
                id
                firstName
                lastName
                code
            }
        }
    }
`