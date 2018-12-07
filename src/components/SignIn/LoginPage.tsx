import * as React from 'react'
import { Mutation } from 'react-apollo'

// import Query mutation graphql
import { LoginUserMutation } from '../../queries/Query' 

// import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import InputAdornment from '@material-ui/core/InputAdornment'
import IconButton from '@material-ui/core/IconButton'
import AccountCircle from '@material-ui/icons/AccountCircle'
import Lock from '@material-ui/icons/LockRounded'
import Visibility from '@material-ui/icons/Visibility'
import VisibilityOff from '@material-ui/icons/VisibilityOff'
import { withStyles, createStyles } from '@material-ui/core/styles'
import { Paper } from '@material-ui/core'

// import Snackbar component
import MySnackbarContentWrapper from '../Snackbar/MySnackbarContent'

const styles = (theme : any) => createStyles({
    margin: {
        margin: theme.spacing.unit,
    },
    button : {
        paddingTop : 25,
        paddingBottom : 25
    },
    snackbar : {
        width : '50%',
        marginLeft : 150
    }
})

interface IProps {
    username : string
    password : string
    submitUserLogin : any
    classes : any
    showPassword : boolean
    changeTextField : any
    handleChangeShowPassword : any
    handleLoggedIn : any
    history : any
    loginUser : any
}

const LoginPage = (props : IProps) => {
    const { classes, showPassword } = props
    return(
        <Paper>
            <div className={classes.margin}>
                    <Mutation
                        mutation={LoginUserMutation}
                    >
                        {(userLogin, { data }) => {
                            const SubmitLogin = () => {
                                props.submitUserLogin(userLogin)
                            }
                            return(
                                <Grid
                                    container={true} 
                                    spacing={8} 
                                    alignItems="flex-end"
                                >
                                {/* cek apakah user gagal login */}
                                { data && data.userLogin === null ? 
                                    <Grid item={true} xs={12}>
                                        <MySnackbarContentWrapper
                                            variant='error'
                                            message='Username or Password salah!'
                                            className={classes.snackbar}
                                        />
                                    </Grid>
                                    : ''
                                }
                                    

                                    <Grid item={true} xs={1}>
                                        <AccountCircle />
                                    </Grid>
                                    <Grid item={true} xs={11}>
                                        <TextField 
                                            label="Username" 
                                            fullWidth={true}
                                            name='username'
                                            value={props.username}
                                            onChange={props.changeTextField}
                                        />
                                    </Grid>
                                    <Grid item={true} xs={1}>
                                        <Lock />
                                    </Grid>
                                    <Grid item={true} xs={11}>
                                        <TextField 
                                            id="input-with-icon-grid" 
                                            type={showPassword ? 'text' : 'password'} 
                                            label="Password"
                                            name='password'
                                            value={props.password} 
                                            onChange={props.changeTextField}
                                            fullWidth={true}
                                            InputProps={{
                                                endAdornment : (
                                                    <InputAdornment position='end' variant='filled'>
                                                        <IconButton
                                                            arial-label='Toogle Password Visibility'
                                                            onClick={props.handleChangeShowPassword}
                                                        >
                                                            { showPassword ? <VisibilityOff /> : <Visibility /> }
                                                        </IconButton>
                                                    </InputAdornment>
                                                )
                                            }}
                                        />
                                    </Grid>
                                    <Grid item={true} className={classes.button} xs={12}>
                                        <Button 
                                            variant='contained' 
                                            color='primary' 
                                            fullWidth={true}
                                            onClick={SubmitLogin}
                                        > 
                                        {/* { data && data.userLogin ? props.history.push('/user') : '' } */}
                                            LOGIN 
                                        </Button>
                                    </Grid>
                                </Grid>
                            )
                        }}
                    </Mutation>
            </div>
        </Paper>
        
    )
}

export default withStyles(styles, { withTheme : true })(LoginPage)