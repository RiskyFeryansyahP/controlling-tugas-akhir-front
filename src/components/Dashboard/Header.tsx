import * as React from 'react'

import AppBar from '@material-ui/core/AppBar'
import Typography from '@material-ui/core/Typography'
import ToolBar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import Fade from '@material-ui/core/Fade'
import AccountCircle from '@material-ui/icons/AccountCircle'
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles'

const drawerWidth = 240

const styles = (theme : any) => ({
    appBar : {
        zIndex : theme.zIndex.drawer + 1,
        transition : theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        })
    },
    appBarShift : {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),  
    },
    grow : {
        flexGrow : 1,
    },
    menuButton: {
        marginLeft: 12,
        marginRight: 36,
    },
    hide: {
        display: 'none',
    },
    menuButtonRight : {
        marginRight : 10
    }
})

const Header = (props : any) => {
    const { classes } = props
    const open = Boolean(props.anchorEl)
    // console.log(classes)
    // console.log(props.open)
    return(
        <AppBar
            position='fixed'
            className={classNames(classes.appBar, {
                [classes.appBarShift] : props.open
            })}
        >
            <ToolBar disableGutters={!props.open}>
                <IconButton
                    color='inherit'
                    aria-label='Open Drawer'
                    onClick={props.handleDrawerOpen}
                    className={classNames(classes.menuButton, {
                        [classes.hide] : props.open
                    })}
                >
                      <MenuIcon />
                </IconButton>
                <Typography variant="h6" color="inherit" noWrap={true} className={classes.grow}>
                      CONTROLLING TUGAS AKHIR
                </Typography>
                <IconButton
                    color='inherit'
                    aria-label='Logout'
                    onClick={props.handleClickOpenMenu}
                >
                      <AccountCircle className={classes.menuButtonRight} fontSize='large' />
                      <Typography variant='headline' color='inherit'>
                        { props.firstName }
                    </Typography>
                </IconButton>
                <Menu
                    id='fade-menu'
                    anchorEl={props.anchorEl}
                    open={open}
                    onClose={props.handleClickCloseMenu}
                    TransitionComponent={Fade}
                >

                    <MenuItem> Logout </MenuItem>
                </Menu>
            </ToolBar>
        </AppBar>
    )
}

export default withStyles(styles, { withTheme : true })(Header)