import * as React from 'react'
import { Link } from 'react-router-dom'

// import @material-ui/core 
import Drawer from '@material-ui/core/Drawer'
import IconButton from '@material-ui/core/IconButton'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import AccountBox from '@material-ui/icons/AccountBox'
import Book from '@material-ui/icons/Book'
import Divider from '@material-ui/core/Divider'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import classNames from 'classnames'
import { withStyles, createStyles } from '@material-ui/core/styles'

const drawerWidth = 240

const styles = (theme : any) => createStyles({
    drawerPaper: {
        position: 'relative',
        whiteSpace: 'nowrap',
        overflow: 'auto',
        height : '100vh',
        width: drawerWidth,
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.enteringScreen,
        }),
      },
      drawerPaperClose: {
        overflowX: 'hidden',
        height : '100vh',
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing.unit * 7,
        [theme.breakpoints.up('sm')]: {
          width: theme.spacing.unit * 9,
        },
      },
      toolbar: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '0 8px',
        ...theme.mixins.toolbar,
      },
})

const Menu = (props : any) => {
    const { classes, theme } = props

    return(
        <Drawer
        variant='permanent'
        classes={{
            paper: classNames(classes.drawerPaper, !props.open && classes.drawerPaperClose),
        }}
        open={props.open}
        >
            <div
            className={classes.toolbar}
            >
                <IconButton
                onClick={props.handleDrawerClose}
                >
                    {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                </IconButton>
            </div>
            <Divider />
            <List>
                {/* {['Inbox', 'Starred', 'Sends email', 'Drafts'].map((text, index) => (
                <ListItem button key={text}>
                    <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                    <ListItemText primary={text} />
                </ListItem>
                ))} */}
                <Link to='/tugas' style={{ textDecoration: 'none' }}>
                    <ListItem button={true}>
                        <ListItemIcon>
                            <AccountBox />
                        </ListItemIcon>
                        <ListItemText primary={'Create Tugas Akhir'} />
                    </ListItem>
                </Link>

                <ListItem button={true}>
                    <ListItemIcon>
                        <Book />
                    </ListItemIcon>
                    <ListItemText primary={'Meeting Book'} />
                </ListItem>
            </List>
        </Drawer>
    )
}

export default withStyles(styles, { withTheme : true })(Menu)
