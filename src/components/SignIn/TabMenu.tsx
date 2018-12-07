import * as React from 'react'
import { connect } from 'react-redux'

// import action reducer
// import { loginUser } from '../../actions/UserAction' 

import { IUserType } from '../../reducers/UserType'

// import @material-ui/core
import AppBar from '@material-ui/core/AppBar'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
// import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import { createStyles, withStyles } from '@material-ui/core'

// import reusable component
import LoginPage from './LoginPage'
import RegisterPage from './RegisterPage'

const styles = (theme : any) => createStyles({
    root : {
        flexGrow : 1,
        backgroundColor : theme.palette.background.paper,
        width : '100%',
    },
    grow : {
        flexGrow : 1
    },
    form : {
        padding : 5
    },
    paper : {
        ...theme.mixins.gutters(),
        paddingTop: theme.spacing.unit * 2,
        paddingBottom: theme.spacing.unit * 2,
        marginTop : 200,
    },
})

interface IProps {
    classes : any
    history : any
    loginUser : any
    user : IUserType
}

interface IState {
    value : number,
    status : string,
    showPassword : boolean
    userLogin : {
        username : string,
        password : string,
        isLoggedin : boolean
    },
    userRegister : {
        username : string,
        password : string,
        firstName : string,
        lastName : string,
        email : string,
        kuliah : string,
        status : string,
    },
    [key : string] : any
}

class TabMenu extends React.Component<IProps, IState> {
    constructor(props : any)
    {
        super(props)
        this.state = {
            value : 0,
            status : 'Mahasiswa',
            showPassword : false,
            userLogin : {
                username : '',
                password : '',
                isLoggedin : false
            },
            userRegister : {
                username : '',
                password : '',
                firstName : '',
                lastName : '',
                email : '',
                kuliah : '',
                status : 'Mahasiswa',
            },
        }
    }

    public componentDidMount()
    {
        if( this.props.user.isLoggedIn)
        {
            this.props.history.push('/user')
        }
    }

    public handleChangeMenu = (event : React.FormEvent, value : any) => {
        this.setState({ value })
    }

    public handleChangeShowPassword = () => {
        this.setState({ showPassword : !this.state.showPassword })
    }

    public changeTextField = (event : React.FormEvent<HTMLInputElement>) : void => {
        this.setState({ userLogin : { ...this.state.userLogin, [event.currentTarget.name] : event.currentTarget.value  }})
    }

    public handleChangeField = (event : React.FormEvent<HTMLInputElement>) : void => {
        this.setState({ userRegister : { ...this.state.userRegister, [event.currentTarget.name] : event.currentTarget.value  }})
    }

    public handleChangeStatus = (event : React.FormEvent<HTMLInputElement>) : void => {
        this.setState({ userRegister : { ...this.state.userRegister, status : event.currentTarget.value } })
    }

    public submitUserRegister = (addUser : any) => {
        addUser({
            variables : {
                username : this.state.userRegister.username, password : this.state.userRegister.password, email : this.state.userRegister.email,
                status : this.state.userRegister.status,  firstName : this.state.userRegister.firstName, lastName : this.state.userRegister.lastName,
                college : this.state.userRegister.kuliah
            }
        })
    }

    public submitUserLogin = (userLogin : any) => {
        // console.log(data)
        userLogin({
            variables : {
                username : this.state.userLogin.username,
                password : this.state.userLogin.password
            }
        }).then((res : any) => {
            if(res.data && res.data.userLogin)
            {
                console.log(res.data.userLogin)
                this.props.loginUser(res.data.userLogin.username, res.data.userLogin.profile.firstName, res.data.userLogin.profile.lastName, res.data.userLogin.id)
                this.props.history.push('/user')
            }
        })
    }

    public handleLoggedIn = () => {
        this.setState({ userLogin : { ...this.state.userLogin, isLoggedin : !this.state.userLogin.isLoggedin } })

        if(this.state.userLogin.isLoggedin)
        {
            this.props.history.push('/user')
        }
    }

    public render()
    {
        const { classes } = this.props
        const { value } = this.state
        // console.log('hey')
        // console.log(this.props)
        return(
            <Grid
                container={true}
                spacing={0}
                direction='column'
                alignItems='center'
                justify='center'
            >
                <Grid item={true} xs={6}>
                    <div className={classes.root}>
                        <AppBar position='static' color='primary' className={classes.paper}>
                            <Typography align='center' variant="h6" color='inherit'>
                               { value === 0 ? 'LOGIN PAGE' : 'REGISTER PAGE' }
                            </Typography>
                        </AppBar>
                        <AppBar position='static' color='inherit'>
                            <Tabs value={value} onChange={this.handleChangeMenu}>
                                <Tab label='Sign In' />
                                <Tab label='Sign Up' />
                            </Tabs>
                        </AppBar>
                        {/* {value === 0 && <LoginPage 
                        username={this.state.username}
                        handleChangeText={this.handleChangeText} 
                        password={this.state.password}
                        />}
                        {value === 1 && 
                        <RegisterPage status={status} 
                        handleChangeStatus={this.handleChangeStatus} 
                        /> } */}
                        {value === 0 ? 
                        <LoginPage 
                            handleChangeShowPassword={this.handleChangeShowPassword} 
                            showPassword={this.state.showPassword}
                            username={this.state.userLogin.username}
                            password={this.state.userLogin.password}
                            changeTextField={this.changeTextField}
                            submitUserLogin={this.submitUserLogin}
                            history={this.props.history}
                            loginUser={this.props.loginUser}
                            handleLoggedIn={this.handleLoggedIn}
                        /> : 
                        <RegisterPage 
                            username={this.state.userRegister.username}
                            password={this.state.userRegister.password}
                            firstName={this.state.userRegister.firstName}
                            lastName={this.state.userRegister.lastName}
                            email={this.state.userRegister.email}
                            kuliah={this.state.userRegister.kuliah}
                            status={this.state.userRegister.status}
                            handleChange={this.handleChangeField}
                            handleChangeStatus={this.handleChangeStatus}
                            submitUserRegister={this.submitUserRegister}
                        />}
                    </div>
                </Grid>
            </Grid>
            
        )
    }
}

const mapDispatchToProps = (dispatch : React.Dispatch<any>) => {
    return {
        loginUser  : (username : string, firstName : string, lastName : string, id : string) => { 
            dispatch({ type : 'LOGIN_USER', username, firstName, lastName, id, isLoggedIn : true})
        },
    }
}

const mapStateTopProps = (state : IUserType) => {
    return {
        user : state
    }
}

export default connect(mapStateTopProps, mapDispatchToProps)(withStyles(styles)(TabMenu))