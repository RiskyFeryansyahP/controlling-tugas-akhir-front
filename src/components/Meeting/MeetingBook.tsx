import * as React from 'react'
import { connect } from 'react-redux'

import { Query } from 'react-apollo'

// import query from graphql query client
import { getMeetDosen } from '../../queries/Query'

// import types for react-redux
import { IUserType } from '../../reducers/UserType'

// import @material-ui/core
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import ExpansionPanel from '@material-ui/core/ExpansionPanel'
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails'
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary'
import Tooltip from '@material-ui/core/Tooltip'
import Fab from '@material-ui/core/Fab'
import AddIcon from '@material-ui/icons/Add'
import Grid from '@material-ui/core/Grid'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import { withStyles, createStyles } from '@material-ui/core/styles'

import DialogFormAddMeet from './DialogFormAddMeet'

const styles = (theme : any) => createStyles({
    root : {
        flexGrow : 1
    },
    content: {
        padding: theme.spacing.unit * 10,
        width: '100%',
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        flexBasis: '33.33%',
        flexShrink: 0,
    },
    secondaryHeading: {
        fontSize: theme.typography.pxToRem(15),
        color: theme.palette.text.secondary,
    },
    grid : {
        paddingTop : 5
    },
    absolute : {
        position : 'absolute',
        bottom : theme.spacing.unit * 2,
        right : theme.spacing.unit * 3,
    },
})

interface IMeet {
    meetDosen : any[]
}

// interface IMeetItem {
//     jam_awal : string
//     jam_akhir : string
//     keterangan : string
// }

interface IProps {
    classes : any
    user : IUserType
}

interface IState {
    expanded : any
    open : boolean
    id_mahasiswa : string
    keterangan : string
    jam_awal : string
    jam_akhir : string
    tgl : string
    dosen_code : string
    [key : string] : any
}

class MeetingBook extends React.Component<IProps, IState> {
    constructor(props : IProps)
    {
        super(props)
        this.state = {
            expanded : null,
            open : false,
            id_mahasiswa : this.props.user.id_mahasiswa,
            keterangan : '',
            jam_awal : '',
            jam_akhir : '',
            tgl : '',
            dosen_code : ''
        }
    }

    public componentWillMount()
    {
        const waktu = new Date()
        const now = waktu.toISOString().slice(0,10)
        this.setState({ tgl : now })
    }

    public handleChange = (panel : any) => (event : any, expanded : any) => {
        this.setState({
            expanded: expanded ? panel : false,
        })
    }

    public handleChangeText = (event : React.FormEvent<HTMLInputElement>) => {
        this.setState({ [event.currentTarget.name] : event.currentTarget.value })
    }
    
    public handleClickOpenDialog = () => {
        this.setState({ open : true })
    }

    public handleCloseDialog = () => {
        this.setState({ open : false })
    }

    public submitMeetDosen = (mahasiswaAddMeetWithDosen : any) => {
        mahasiswaAddMeetWithDosen({
            variables : {
                id_mahasiswa : this.state.id_mahasiswa,
                dosen_code : this.state.dosen_code,
                jam_awal : this.state.jam_awal,
                jam_akhir : this.state.jam_akhir,
                tgl : this.state.tgl,
                keterangan : this.state.keterangan
            },
            refetchQueries : [{ query :  getMeetDosen, variables : { id_mahasiswa : this.state.id_mahasiswa }}]
        })
        .then((res : any) => {
            this.setState({ open : false })
        })
    }

    public render()
    {
        let no = 0;
        console.log(this.props.user)
        const {classes} = this.props
        const {expanded} = this.state
        return(
            <main className={classes.content}>
                <div className={classes.root}>
                    <Grid container={true} alignItems='center' spacing={24}>
                        <Grid item={true} xs={12}>
                            <Typography variant='headline' align='center'>
                                Meeting Book
                            </Typography>
                            <Grid item={true} xs={12} className={classes.grid}>
                                <Paper >
                                        <Query<IMeet>
                                            query={getMeetDosen}
                                            variables={{ id_mahasiswa : this.state.id_mahasiswa }}
                                        >
                                            {({ data, loading }) => {
                                                console.log("Meeting ", data)
                                                if(loading || !data || data.meetDosen === null)
                                                {
                                                    return(<Typography variant='headline' align='center'> 
                                                        Buatlah Janji Bertemu Dengan Dosen Dahulu dengan menekan button di kanan bawah
                                                    </Typography>)
                                                }

                                                return(
                                                    <div>
                                                        {data.meetDosen.map(meet => {
                                                            no++
                                                            return(
                                                                <ExpansionPanel
                                                                    expanded={expanded === 'panel'+no}
                                                                    onChange={this.handleChange('panel'+no)}
                                                                    key={meet.id}
                                                                >
                                                                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                                                                        <Typography className={classes.heading}>Meeting</Typography>
                                                                        <Typography className={classes.secondaryHeading}> {no} </Typography>
                                                                    </ExpansionPanelSummary>
                                                                    <ExpansionPanelDetails>
                                                                        <Typography variant='subtitle2'>Keterangan : { meet.keterangan }</Typography>
                                                                    </ExpansionPanelDetails>
                                                                    <ExpansionPanelDetails>
                                                                        <Typography variant='subtitle2'> Jam Awal : {meet.jam_awal} </Typography>
                                                                    </ExpansionPanelDetails>
                                                                    <ExpansionPanelDetails>
                                                                        <Typography variant='subtitle2'> Jam Akhir : {meet.jam_akhir} </Typography>
                                                                    </ExpansionPanelDetails>
                                                                    <ExpansionPanelDetails>
                                                                        <Typography variant='subtitle2'> Tanggal : {meet.tgl} </Typography>
                                                                    </ExpansionPanelDetails>
                                                                    <ExpansionPanelDetails>
                                                                        <Typography variant='subtitle2'> Dosen : {meet.mahasiswa.dosen.firstName} </Typography>
                                                                    </ExpansionPanelDetails>
                                                                </ExpansionPanel>
                                                            )
                                                        })}
                                                    </div>
                                                )
                                            }}
                                        </Query>
                                </Paper>
                                <Tooltip title='Add Meeting' aria-label='Add'>
                                    <Fab color='secondary' className={classes.absolute} onClick={this.handleClickOpenDialog}>
                                        <AddIcon />
                                    </Fab>
                                </Tooltip>
                                <DialogFormAddMeet 
                                    open={this.state.open} 
                                    handleClose={this.handleCloseDialog}
                                    id_mahasiswa={this.props.user.id_mahasiswa} 
                                    keterangan={this.state.keterangan}
                                    jam_awal={this.state.jam_awal}
                                    jam_akhir={this.state.jam_akhir}
                                    tgl={this.state.tgl}
                                    dosen_code={this.state.dosen_code}
                                    handleChange={this.handleChangeText}
                                    onSubmitMeetDosen={this.submitMeetDosen}
                                />
                            </Grid>
                        </Grid>
                    </Grid>
                </div>
            </main>
        )
    }
}

const mapStateToProps = (state : IUserType) => {
    return{
        user : state
    }
}

export default connect(mapStateToProps)(withStyles(styles)(MeetingBook))