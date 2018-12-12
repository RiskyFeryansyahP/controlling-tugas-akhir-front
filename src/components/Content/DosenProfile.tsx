import * as React from 'react'
// import { Query } from 'react-apollo'

// import query mahasiswa on graphql server
// import { MahasiswaQuery } from '../../queries/Query'

// import @material-ui/component
import ExpansionPanel from '@material-ui/core/ExpansionPanel'
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary'
import Typography from '@material-ui/core/Typography'
import { withStyles, createStyles } from '@material-ui/core/styles'

const styles = (theme : any) => createStyles({
    root : {
        width : '100%'
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
})

const DosenProfile = (props : any) => {
    console.log("render")
    const { classes } = props
    return (
        <div className={classes.root} >
            <ExpansionPanel>
                <ExpansionPanelSummary>
                    <Typography align='left' className={classes.heading}>Nama Depan</Typography>
                    <Typography className={classes.secondaryHeading}>Addin</Typography>
                </ExpansionPanelSummary>
            </ExpansionPanel>
            <ExpansionPanel>
                <ExpansionPanelSummary>
                    <Typography align='left' className={classes.heading}>Nama Belakang</Typography>
                    <Typography className={classes.secondaryHeading}>Aditya</Typography>
                </ExpansionPanelSummary>
            </ExpansionPanel>
            <ExpansionPanel>
                <ExpansionPanelSummary>
                    <Typography align='left' className={classes.heading}>Username</Typography>
                    <Typography className={classes.secondaryHeading}>addin</Typography>
                </ExpansionPanelSummary>
            </ExpansionPanel>
            <ExpansionPanel>
                <ExpansionPanelSummary>
                    <Typography align='left' className={classes.heading}>Password</Typography>
                    <Typography className={classes.secondaryHeading}>addin</Typography>
                </ExpansionPanelSummary>
            </ExpansionPanel>
        </div>
    )
}

export default withStyles(styles)(DosenProfile)