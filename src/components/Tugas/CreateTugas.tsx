import * as React from 'react'
import { Mutation } from 'react-apollo'
import { connect } from 'react-redux'

// import query from server
import { addTugasToMahasiswaMutation } from '../../queries/Query'

// import reducer types
import { IUserType } from '../../reducers/UserType'

// import @material-ui/core
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Snackbar from '@material-ui/core/Snackbar'
import classNames from 'classnames'
import { withStyles, createStyles } from '@material-ui/core/styles'

// customize component
import MySnackbarContentWrapper from '../Snackbar/MySnackbarContent'

const style = (theme : any) => createStyles({
    root : {
        flexGrow : 1,
    },
    content: {
        padding: theme.spacing.unit * 10,
        width: '100%',
        height: '100%',
    },
    dense : {
        marginTop : 19,
    },
    textField: {
        width : '50%',
        marginLeft : 10,
        paddingBottom : 10
    },
    button: {
        margin: theme.spacing.unit,
    },
    paper : {
        height : '50vh',
    }
})

interface IProps {
    classes : any
    user : IUserType
}

interface IState {
    judul : string
    keterangan : string
    open : boolean
    [key : string] : any
}

class CreateTugas extends React.Component<IProps, IState> {
    
    constructor(props : IProps)
    {
        super(props)
        this.state = {
            judul : '',
            keterangan : '',
            open : false
        }
    }

    public handleChange = (e : React.FormEvent<HTMLInputElement>) : void => {
        this.setState({[e.currentTarget.name] : e.currentTarget.value })
    }

    public handleClose = (event : any, reason : any) => {
        if(reason === 'clickaway')
        {
            return;
        }
        this.setState({ open : false })
    }

    public submitTugasToMahasiswa = (addTugasMahasiswa : any) => {
        addTugasMahasiswa({
            variables : {
                id : this.props.user.id_mahasiswa,
                judul : this.state.judul,
                keterangan : this.state.keterangan,
            }
        })
        .then((res : any) => {
            if(res.data && res.data.addTugasMahasiswa)
            {
                this.setState({ open : true })
            }
        })
    }

    public render()
    {
        console.log(this.props.user)
        const HandleChange = (e : any) => this.handleChange(e)
        const { classes } = this.props
        return(
            <main className={classes.content}>
                <div className={classes.root}>
                    <Grid container={true}>
                        <Grid item={true} xs={12}>
                            <Paper className={classes.paper}>
                                <Typography variant='headline' align='center'>
                                    Form Pembuatan Tugas Akhir Untuk Controlling
                                </Typography>
                                <Grid item={true} xs={12}>
                                    <TextField 
                                        id="judul"
                                        label="Judul Tugas Akhir"
                                        className={classNames(classes.textField, classes.dense)}
                                        margin='dense'
                                        name='judul'
                                        value={this.state.judul}
                                        onChange={HandleChange}
                                    />
                                </Grid>
                                <Grid item={true} xs={12}>
                                    <TextField 
                                        id="keterangan"
                                        label="Keterangan Tugas Akhir"
                                        className={classNames(classes.textField, classes.dense)}
                                        margin='dense'
                                        name='keterangan'
                                        value={this.state.keterangan}
                                        onChange={HandleChange}
                                    />
                                </Grid>
                                <Grid item={true} xs={12}>
                                    <Mutation
                                        mutation={addTugasToMahasiswaMutation}
                                    >
                                        {(addTugasMahasiswa) => {
                                            const submitTugasMahasiswa = () => this.submitTugasToMahasiswa(addTugasMahasiswa)
                                            return(
                                                <Button 
                                                    variant='contained' 
                                                    color='primary' 
                                                    className={classes.button}
                                                    onClick={submitTugasMahasiswa}
                                                >
                                                    Ajukan
                                                </Button>
                                            )
                                        }}
                                    </Mutation>
                                    <Snackbar
                                        anchorOrigin={{
                                            vertical:'top',
                                            horizontal:'center'
                                        }}
                                        open={this.state.open}
                                        autoHideDuration={6000}
                                        onClose={this.handleClose}
                                    >
                                        <MySnackbarContentWrapper 
                                            variant='success'
                                            onClose={this.handleClose}
                                            message='Berhasil Mengajukan Judul Tugas Akhir'
                                        />
                                    </Snackbar>
                                </Grid>
                            </Paper>
                        </Grid>
                    </Grid>
                </div>
            </main>
        )
    }
}

const mapStateToProps = (state : IUserType) => {
    return {
        user : state
    }
}

export default connect(mapStateToProps)(withStyles(style)(CreateTugas))