import * as React from 'react'

// import component reusable 
import Header from './Header'
import Menu from './Menu'

class MiniDrawer extends React.Component {
    public state = {
        open : false,
        anchorEl : null
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
        return(
            <React.Fragment>
                <Header 
                    open={this.state.open}
                    handleDrawerOpen={this.handleDrawerOpen}
                    handleClickCloseMenu={this.handleClickCloseMenu}
                    handleClickOpenMenu={this.handleClickOpenMenu}
                    anchorEl={this.state.anchorEl}
                />
                <Menu 
                    handleDrawerClose={this.handleDrawerClose}
                    open={this.state.open}
                />
            </React.Fragment>
        )
    }
}

export default MiniDrawer