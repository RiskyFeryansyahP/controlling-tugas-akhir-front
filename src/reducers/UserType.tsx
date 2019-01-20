export interface IUserType {
    firstName : string
    lastName : string
    id : string
    id_mahasiswa : string
    username : string
    isLoggedIn : boolean
}

export interface ITugasType {
    findTugas : ItemTugasType[]
}

export interface ItemTugasType {
    judul : string
    id : string
}