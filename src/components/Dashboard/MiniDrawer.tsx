import * as React from 'react'

// import redux connect
import { connect } from 'react-redux'
import { IUserType } from '../../reducers/UserType'

// import component reusable 
import Header from './Header'
import Menu from './Menu'

interface IProps {
    user : IUserType
}

interface IState {
    open : boolean
    anchorEl : any
    firstName : string
}

class MiniDrawer extends React.Component<IProps, IState> {

    constructor(props : IProps)
    {
        super(props as any)
        this.state = {
            open : false,
            anchorEl : null,
            firstName : ''
        }
    }

    public handleDrawerOpen = () => {
        this.setState({ open : true})
    }

    public handleDrawerClose = () => {
        this.setState({ open : false })
    }
    
    public handleClickOpenMenu = (event : React.FormEvent) => {
        this.setState({ anchorEl : event.currentTarget })
    }

    public handleClickCloseMenu = () => {
        this.setState({ anchorEl : null })
    }
    
    public render()
    {
        console.log("props", this.props.user)
        return(
            <React.Fragment>
                <Header 
                    open={this.state.open}
                    handleDrawerOpen={this.handleDrawerOpen}
                    handleClickCloseMenu={this.handleClickCloseMenu}
                    handleClickOpenMenu={this.handleClickOpenMenu}
                    anchorEl={this.state.anchorEl}
                    firstName={this.props.user.firstName}
                />
                <Menu 
                    handleDrawerClose={this.handleDrawerClose}
                    open={this.state.open}
                />
            </React.Fragment>
        )
    }
}

const mapStateToProps = (state : IUserType) => {
    return {
        user : state
    }
}

export default connect(mapStateToProps, {})(MiniDrawer)