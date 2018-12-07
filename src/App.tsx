import * as React from 'react'

// import component
import MiniDrawer from './components/Dashboard/MiniDrawer'
// import Content from './components/Content/Content'
// import TabMenu from './components/SignIn/TabMenu'

// import cssbaseline
import CssBaseline from '@material-ui/core/CssBaseline'
import { createStyles, withStyles } from '@material-ui/core';



const styles = createStyles({
    root : {
        display : 'flex',
    }
})

interface IProps {
  classes : any
}

class App extends React.Component<IProps> {
  constructor(props : IProps)
  {
    super(props)
  }
  public render() {
    const { classes } = this.props
    return (
        <div className={classes.root}>
          <CssBaseline />
          {/* <TabMenu /> */}
          <MiniDrawer />
          { this.props.children }
          {/* <Content /> */}
        </div>
    );
  }
}

export default withStyles(styles)(App)
