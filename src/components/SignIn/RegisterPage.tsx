import * as React from 'react'
import { Mutation } from 'react-apollo'

// import queries graphql
import { RegisterUserMutation } from '../../queries/Query'

// import @material-ui/core component
import Paper from '@material-ui/core/Paper'
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import AccountCircle from '@material-ui/icons/AccountCircle'
import Lock from '@material-ui/icons/LockRounded'
import AccessibilityNew from '@material-ui/icons/AccessibilityNew'
import Email from '@material-ui/icons/Email'
import School from '@material-ui/icons/School'
import List from '@material-ui/icons/List'
import { withStyles, createStyles } from '@material-ui/core/styles'


const styles = (theme : any) => createStyles({
    margin: {
        margin: theme.spacing.unit,
    },
    menu: {
        width: 200,
    },
    grid : {
        paddingBottom : 25
    },
    button: {
        margin: theme.spacing.unit,
    },
})

interface IProps {
        username : string
        password : string
        firstName : string
        lastName : string
        email : string
        kuliah : string
        status : string
        classes : any
        handleChange : any
        handleChangeStatus : any
        submitUserRegister : any
}

const RegisterPage = (props : IProps) => {
    const { classes } = props
    return(
        <Paper>
            <div className={classes.margin}>
                <Grid
                    container={true} 
                    alignItems="flex-end"
                    className={classes.grid}
                >
                    <Grid item={true} xs={1}>
                        <AccessibilityNew />
                    </Grid>
                    <Grid item={true} xs={4}>
                        <TextField 
                            id="input-nama-depan" 
                            label="Nama Depan" 
                            name='firstName'
                            fullWidth={true}
                            value={props.firstName}
                            onChange={props.handleChange}
                        />
                    </Grid>
                    <Grid item={true} xs={1} />

                    <Grid item={true} xs={1}>
                        <AccessibilityNew />
                    </Grid>
                    <Grid item={true} xs={4}>
                        <TextField 
                            id="input-nama-akhir" 
                            label="Nama Belakang" 
                            name='lastName'
                            fullWidth={true} 
                            value={props.lastName}
                            onChange={props.handleChange}
                        />
                    </Grid>
                    <Grid item={true} xs={1} />

                    <Grid item={true} xs={1}>
                        <AccountCircle />
                    </Grid>
                    <Grid item={true} xs={4}>
                        <TextField 
                            id="input-username" 
                            label="Username" 
                            name='username'
                            fullWidth={true} 
                            value={props.username}
                            onChange={props.handleChange}
                        />
                    </Grid>
                    <Grid item={true} xs={1} />

                    <Grid item={true} xs={1}>
                        <Lock />
                    </Grid>
                    <Grid item={true} xs={4}>
                        <TextField
                            type='password' 
                            id="input-password" 
                            label="Password" 
                            name='password'
                            fullWidth={true} 
                            value={props.password}
                            onChange={props.handleChange}
                        />
                    </Grid>
                    <Grid item={true} xs={1} />

                    <Grid item={true} xs={1}>
                        <Email />
                    </Grid>
                    <Grid item={true} xs={4}>
                        <TextField 
                            id="input-email" 
                            label="Email" 
                            name='email'
                            fullWidth={true} 
                            value={props.email}
                            onChange={props.handleChange}
                        />
                    </Grid>
                    <Grid item={true} xs={1} />

                    <Grid item={true} xs={1}>
                        <School />
                    </Grid>
                    <Grid item={true} xs={4}>
                        <TextField 
                            id="input-kuliah" 
                            label="Kuliah" 
                            name='kuliah'
                            fullWidth={true} 
                            value={props.kuliah}
                            onChange={props.handleChange}
                        />
                    </Grid>
                    <Grid item={true} xs={1} />

                    <Grid item={true} xs={1}>
                        <List />
                    </Grid>
                    <Grid item={true} xs={11}>
                        <TextField 
                            id="outlined-select-currency-native"
                            select={true}
                            SelectProps={{
                                native : true,
                                MenuProps : {
                                    className: classes.menu,
                                }
                            }}
                            onChange={props.handleChange}
                            name='status'
                            value={props.status}
                            helperText='Select Status'
                            fullWidth={true}
                        >
                            { ['Mahasiswa','Dosen'].map((text, index) => {
                                return(
                                    <option key={index} value={text}>
                                        {text}
                                    </option>
                                )
                            }) }
                        </TextField>
                    </Grid>
                    <Mutation 
                        mutation={RegisterUserMutation}
                    >
                        {(addUser, { data }) => {
                            const submitUser = () => props.submitUserRegister(addUser)
                            console.log(data)
                            return(
                                <Button 
                                    variant='contained' 
                                    color='primary' 
                                    onClick={submitUser} 
                                    className={classes.button} 
                                    fullWidth={true}
                                > 
                                    Register 
                                </Button>
                            )
                        }}
                    </Mutation>
                    
                </Grid>
            </div>
        </Paper>
    )
}

export default withStyles(styles)(RegisterPage)