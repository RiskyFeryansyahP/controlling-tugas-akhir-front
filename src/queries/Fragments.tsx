import gql from 'graphql-tag'

export const mahasiswaFragment = gql`
    fragment mahasiswaDetail on mahasiswa {
        firstName
        lastName
        college
    }
`

export const dosenFragment = gql`
    fragment dosenDetail on dosen {
        firstName
        lastName
        code
    }
`
