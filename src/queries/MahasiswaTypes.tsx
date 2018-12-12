export interface IDosen {
    mahasiswa : {
        dosen : IItemDosen
    }
}

interface IItemDosen {
    id : string
    firstName : string
    lastName : string
    code : string
}