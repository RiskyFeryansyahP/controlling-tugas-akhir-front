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
    mutation AddTugasToMahasiswa($id : String!, $judul : String!, $keterangan : String!, $seminar1 : String!, $seminar2 : String!) {
        addTugasMahasiswa(id : $id, judul : $judul, keterangan : $keterangan, seminar1 : $seminar1, seminar2 : $seminar2) {
            ... mahasiswaDetail
            ... tugasDetail
        }
    }
    ${mahasiswaFragment}
    ${tugasFragment}
`

export const MahasiswaAddMeetWithDosenMutation = gql`
    mutation MahasiswaAddMeetWithDosen($id_mahasiswa : String!, $dosen_code : String!, $jam_awal : String!, $jam_akhir : String!, $tgl : String!, $keterangan : String!) {
        mahasiswaAddMeetWithDosen(id_mahasiswa : $id_mahasiswa, dosen_code : $dosen_code, jam_awal : $jam_awal, jam_akhir : $jam_akhir, tgl : $tgl, keterangan : $keterangan) {
            jam_awal,
            jam_akhir,
            keterangan
        }
    }
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
            tugas {
                judul
                bab1
                bab2
                bab3
                bab4
                bab5
            }
        }
    }
`

export const getMeetDosen = gql`
    query MeetDosen($id_mahasiswa : String!) {
        meetDosen(id_mahasiswa : $id_mahasiswa) {
            id
            jam_awal
            jam_akhir
            tgl
            keterangan
            status
            mahasiswa {
                dosen {
                    firstName
                }
            }
        }
    }
`