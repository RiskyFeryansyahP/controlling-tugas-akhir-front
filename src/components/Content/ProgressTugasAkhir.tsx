import * as React from 'react'

// import @material-ui/core component
import Stepper from '@material-ui/core/Stepper'
import Step from '@material-ui/core/Step'
import { StepButton } from '@material-ui/core';
import { withStyles, createStyles } from '@material-ui/core/styles'

const styles = (theme : any) => createStyles({
    root: {
        width: '100%',
    },
    button: {
        marginRight: theme.spacing.unit,
    },
    completed: {
        display: 'inline-block',
    },
    instructions: {
        marginTop: theme.spacing.unit,
        marginBottom: theme.spacing.unit,
    },
})

interface IProps {
    classes : any
}

interface IState {
    activeStep : number,
    completed : object
}

class ProgressTugasAkhir extends React.Component<IProps, IState> {
    constructor(props : any) {
        super(props)
        this.state = {
            activeStep : 0,
            completed : {}
        }
    }

    public render()
    {
        const { classes } = this.props
        const { activeStep } = this.state
        const steps = ['BAB 1', 'BAB 2', 'BAB 3', 'BAB 4', 'BAB 5']
        return(
            <div className={classes.root}>
                <Stepper nonLinear={true} activeStep={activeStep}>
                    {steps.map((label, index) => {
                        return(
                            <Step key={label}>
                                <StepButton
                                    completed={this.state.completed[index]}
                                >
                                    {label}
                                </StepButton>
                            </Step>
                        )
                    })}
                </Stepper>
            </div>
        )
    }
}

export default withStyles(styles)(ProgressTugasAkhir)