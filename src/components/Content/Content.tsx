import * as React from 'react'
import { connect } from 'react-redux'
import { Query } from 'react-apollo'

// import RootQuery Graphql
import { getMahasiswaQuery } from '../../queries/Query'

// import types reducer & graphql
import { IUserType } from '../../reducers/UserType'
import { IDosen } from '../../queries/MahasiswaTypes'

// Import @material-ui/core
import AppBar from '@material-ui/core/AppBar'
import ToolBar from '@material-ui/core/Toolbar'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import { withStyles, createStyles } from '@material-ui/core/styles'

// import reusable component
import MahasiswaProfile from './MahasiswaProfile'
import DosenProfile from './DosenProfile'
import ProgressTugasAkhir from './ProgressTugasAkhir'
import DialogFormAddDosen from './DialogFormAddDosen'

const styles = (theme : any) => createStyles({
    root : {
        flexGrow : 1
    },
    toolbar: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '0 4px',
        ...theme.mixins.toolbar,
      },
      content: {
        padding: theme.spacing.unit * 10,
        width: '100%'
      },
      paper : {
        padding: theme.spacing.unit * 2,
        textAlign: 'center',
        color: theme.palette.text.secondary,
      },
      grow : {
          flexGrow : 1,
      },
})

interface IProps {
    classes : any
    user : IUserType
}

interface IState {
    open : boolean
    code : string
    id_mahasiswa : string
}

class Content extends React.Component<IProps, IState> {
    constructor(props : IProps)
    {
        super(props)
        this.state = {
            open : false,
            code : '',
            id_mahasiswa : this.props.user.id_mahasiswa
        }
    }

    public handleClickOpen = () => {
        this.setState({ open : true })
    }

    public handleClose = () => {
        this.setState({ open : false })
    }

    public submitCodeDosen = (event : React.SyntheticEvent ,addDosenToMahasiswa : any) => {
        console.log(this.props.user.id_mahasiswa)
        event.preventDefault()
        addDosenToMahasiswa({
            variables : {
                code : this.state.code,
                id : this.props.user.id_mahasiswa
            },
            refetchQueries : [{ query : getMahasiswaQuery, variables : { id : this.state.id_mahasiswa } }]
        })
        this.setState({ open : false })
    }

    public handleChange = (event : React.FormEvent<HTMLInputElement>) => {
        this.setState({ code : event.currentTarget.value })
    }
    
    public render()
    {
        const { classes } = this.props
        return(
            <main className={classes.content}>
                <div className={classes.root}>
                    <Grid container={true} spacing={24}>
                        <Grid item={true} xs={12}>
                            <Paper className={classes.paper}> 
                                <Typography variant='headline' align='center'>
                                    Progress Tugas Akhir
                                </Typography>
                                <ProgressTugasAkhir />
                            </Paper>
                        </Grid>
                        <Grid item={true} xs={6}>
                            <AppBar position='static'>
                                <ToolBar>
                                    <Typography variant='h6' color='inherit' align='right'> 
                                        Profile Mahasiswa
                                    </Typography>
                                </ToolBar>
                            </AppBar>
                            <Paper className={classes.paper}> 
                                <Typography variant='headline' align='center'>
                                    <MahasiswaProfile 
                                        firstName={this.props.user.firstName} 
                                        lastName={this.props.user.lastName} 
                                        username={this.props.user.username}
                                    />
                                </Typography>
                            </Paper>
                        </Grid>
                        <Grid item={true} xs={6}>
                            <AppBar position='static'>
                                <ToolBar>
                                    <Typography variant='h6' color='inherit' align='left' className={classes.grow}> 
                                        Dosen Terkait
                                    </Typography>
                                    <Fab color='secondary' aria-label='Add' onClick={this.handleClickOpen}>
                                        <AddIcon />
                                    </Fab>
                                    <DialogFormAddDosen 
                                        open={this.state.open}
                                        handleClose={this.handleClose}
                                        submitCodeDosen={this.submitCodeDosen}
                                        handleChange={this.handleChange}
                                        code={this.state.code}
                                    />
                                </ToolBar>
                            </AppBar>
                            <Paper className={classes.paper}> 
                                <Typography variant='headline' align='center' className={classes.grow}>
                                    <Query<IDosen>
                                    query={getMahasiswaQuery}
                                    variables={{ id : this.state.id_mahasiswa }}
                                    >
                                        {({ data, loading }) => {
                                            console.log(data)
                                            if(loading || !data || data.mahasiswa.dosen === null)
                                            {
                                                return( <div>Loading....!</div> )
                                            }

                                            return(
                                                <DosenProfile 
                                                    dosen={data.mahasiswa.dosen}
                                                />
                                            )
                                        }}
                                    </Query>
                                </Typography>
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

export default connect(mapStateToProps)(withStyles(styles)(Content))