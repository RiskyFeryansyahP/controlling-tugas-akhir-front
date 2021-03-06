import * as React from 'react'
import { Mutation, withApollo } from 'react-apollo'
import { connect } from 'react-redux'

// import query from server
import { addTugasToMahasiswaMutation, getMahasiswaQuery, findTugas } from '../../queries/Query'

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
    },
})

interface IProps {
    classes : any
    user : IUserType
    client : any
}

interface IState {
    judul : string
    keterangan : string
    seminar1 : string
    seminar2 : string
    open : boolean
    error : boolean
    disable : boolean
    [key : string] : any
}

class CreateTugas extends React.Component<IProps, IState> {
    
    constructor(props : IProps)
    {
        super(props)
        this.state = {
            judul : '',
            keterangan : '',
            seminar1 : '',
            seminar2: '',
            open : false,
            error : false,
            disable : true
        }
    }

    public componentWillMount()
    {
        const waktu = new Date()
        waktu.setDate(waktu.getDate() + 30)
        const now : string = waktu.toISOString().slice(0,10)
        waktu.setDate(waktu.getDate() + 30)
        const monthLater : string = waktu.toISOString().slice(0,10)
        this.setState({ seminar1 : now, seminar2 : monthLater })
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
                seminar1 : this.state.seminar1,
                seminar2 : this.state.seminar2
            },
            refetchQueries : [{ query : getMahasiswaQuery, variables : { id : this.props.user.id_mahasiswa } }]
        })
        .then((res : any) => {
            if(res.data && res.data.addTugasMahasiswa)
            {
                this.setState({ open : true })
            }
        })
    }

    public checkTugas = () =>
    {
        this.props.client.query({
            query : findTugas,
            variables : { judul : this.state.judul }
        }).
        then(( res : any) => {
            console.log(res.data.findTugas.length === 0)
            if(res.data.findTugas.length === 0)
            {
                this.setState({ disable : false, error : false })
            }
            else
            {
                this.setState({ error : true })
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
                                        error={this.state.error}
                                    />
                                    <Button variant="outlined" onClick={this.checkTugas} color="primary" className={classes.button}>
                                        CEK
                                    </Button>
                                </Grid>
                                <Grid item={true} xs={12}>
                                    <TextField 
                                        id="keterangan"
                                        label="Abstrak / Keterangan Tugas Akhir"
                                        className={classNames(classes.textField, classes.dense)}
                                        margin='dense'
                                        name='keterangan'
                                        value={this.state.keterangan}
                                        onChange={HandleChange}
                                        disabled={this.state.disable}
                                    />
                                </Grid>
                                <Grid item={true} xs={12}>
                                    <TextField 
                                        id="seminar1"
                                        label="Seminar 1"
                                        className={classNames(classes.textField, classes.dense)}
                                        margin='dense'
                                        name='seminar1'
                                        disabled={true}
                                        value={this.state.seminar1}
                                        onChange={HandleChange}
                                    />
                                </Grid>
                                <Grid item={true} xs={12}>
                                    <TextField 
                                        id="seminar2"
                                        label="Seminar 2"
                                        className={classNames(classes.textField, classes.dense)}
                                        margin='dense'
                                        name='seminar2'
                                        disabled={true}
                                        value={this.state.seminar2}
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

export default connect(mapStateToProps)(withApollo(withStyles(style)(CreateTugas)))