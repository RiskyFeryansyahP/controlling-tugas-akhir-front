import gql from 'graphql-tag'

export const mahasiswaFragment = gql`
    fragment mahasiswaDetail on mahasiswa {
        id
        firstName
        lastName
        college
    }
`

export const dosenFragment = gql`
    fragment dosenDetail on dosen {
        id
        firstName
        lastName
        code
    }
`

export const tugasFragment = gql`
    fragment tugasDetail on tugas {
        id
        judul
        keterangan
    }
`
