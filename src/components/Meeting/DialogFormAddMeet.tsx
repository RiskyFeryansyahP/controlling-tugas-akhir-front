import * as React from 'react'
import { Query, Mutation } from 'react-apollo'

// import query graphql
import { getMahasiswaQuery, MahasiswaAddMeetWithDosenMutation } from '../../queries/Query'

// import component @material-ui/core
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'


const DialogFormAddMeet = (props : any) => {
    console.log('props id ', props.id_mahasiswa)
    console.log('props tgl', props.tgl)
    return(
        <React.Fragment>
            <Query
                query={getMahasiswaQuery}
                variables={{ id :  props.id_mahasiswa}}
            >
                {({ data, loading }) => {
                    console.log(data)
                    return(
                        <Dialog
                            open={props.open}
                            onClose={props.handleClose}
                            aria-labelledby="Form Add Dosen"
                        >
                            <DialogTitle> BUAT JADWAL BERTEMU DENGAN DOSEN </DialogTitle>
                            <DialogContent>
                                <DialogContentText>
                                    Silahkan membuat jadwal janji bertemu anda untuk konsul dengan dosen
                                </DialogContentText>
                                <TextField 
                                    autoFocus={true}
                                    margin='dense'
                                    id='keterangan'
                                    name='keterangan'
                                    label='Keterangan'
                                    type='text'
                                    value={props.keterangan}
                                    fullWidth={true}
                                    onChange={props.handleChange}
                                />
                                <TextField 
                                    margin='dense'
                                    id='tgl'
                                    name='tgl'
                                    label='Tanggal'
                                    placeholder='contoh : 07/11/2019'
                                    type='date'
                                    defaultValue={props.tgl}
                                    InputLabelProps={{
                                        shrink : true
                                    }}
                                    fullWidth={true}
                                    onChange={props.handleChange}
                                />
                                <TextField 
                                    margin='dense'
                                    id='jam_awal'
                                    name='jam_awal'
                                    label='Jam Awal'
                                    placeholder='contoh : 08:00'
                                    type='time'
                                    defaultValue='08:00'
                                    InputLabelProps={{
                                        shrink : true
                                    }}
                                    inputProps={{
                                        step : 300 // 5 menit
                                    }}
                                    fullWidth={true}
                                    onChange={props.handleChange}
                                />
                                <TextField 
                                    margin='dense'
                                    id='jam_akhir'
                                    name='jam_akhir'
                                    label='Jam Akhir'
                                    placeholder='contoh : 10:00'
                                    type='time'
                                    defaultValue='09:00'
                                    InputLabelProps={{
                                        shrink : true
                                    }}
                                    inputProps={{
                                        step : 300 // 5 menit
                                    }}
                                    fullWidth={true}
                                    onChange={props.handleChange}
                                />
                                <TextField 
                                    margin='dense'
                                    id='dosen'
                                    name='dosen_code'
                                    label='Kode Dosen'
                                    disabled={true}
                                    type='text'
                                    value={data.mahasiswa.dosen.code}
                                    fullWidth={true}
                                    onChange={props.handleChange}
                                />
                            </DialogContent>
                            <DialogActions>
                                <Mutation
                                    mutation={MahasiswaAddMeetWithDosenMutation}
                                >
                                    {(mahasiswaAddMeetwithDosen) => {
                                        const submitMeetDosen = () => props.onSubmitMeetDosen(mahasiswaAddMeetwithDosen)
                                        return(
                                            <Button type='submit' onClick={submitMeetDosen}> TAMBAHKAN </Button>
                                        )
                                    }}
                                </Mutation>
                            </DialogActions>
                        </Dialog>
                    )
                }}
            </Query>
        </React.Fragment>
    )
}

export default DialogFormAddMeet