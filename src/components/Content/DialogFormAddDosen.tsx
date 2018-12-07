import * as React from 'react'

// import @material-ui/core
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'

const DialogForm = (props : any) => {
    return(
        <React.Fragment>
            <Dialog
                open={props.open}
                onClose={props.handleClose}
                aria-labelledby="Form Add Dosen"
            >
                <DialogTitle> TAMBAHKAN DOSEN PEMBIMBING </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Silahkan tambahkan dosen pembimbing anda dengan menggunakan code yang telah diberikan oleh dosen anda
                    </DialogContentText>
                    <TextField 
                        autoFocus={true}
                        margin='dense'
                        id='code'
                        name='code'
                        label='Code Dosen'
                        type='text'
                        fullWidth={true}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={props.handleClose}> TAMBAHKAN </Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    )
}

export default DialogForm