import * as React from 'react'

// Import @material-ui/core
import AppBar from '@material-ui/core/AppBar'
import ToolBar from '@material-ui/core/Toolbar'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
// import Button from '@material-ui/core/Button'
// import Add from '@material-ui/icons/Add'
import { withStyles, createStyles } from '@material-ui/core/styles'

// import reusable component
import MahasiswaProfile from './MahasiswaProfile'
import DosenProfile from './DosenProfile'
import ProgressTugasAkhir from './ProgressTugasAkhir'

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

const Content = (props : any) => {
    const { classes } = props
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
                                <MahasiswaProfile />
                            </Typography>
                        </Paper>
                    </Grid>
                    <Grid item={true} xs={6}>
                        <AppBar position='static'>
                            <ToolBar>
                                <Typography variant='h6' color='inherit' align='left' className={classes.grow}> 
                                    Dosen Terkait
                                </Typography>
                                {/* <Button variant='fab' color='secondary' aria-label='Add' mini={true}> */}
                                    {/* <Add />
                                </Button> */}
                            </ToolBar>
                        </AppBar>
                        <Paper className={classes.paper}> 
                            <Typography variant='headline' align='center'>
                                <DosenProfile />
                            </Typography>
                        </Paper>
                    </Grid>
                </Grid>
            </div>
        </main>
    )
}

export default withStyles(styles)(Content)