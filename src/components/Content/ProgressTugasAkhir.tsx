import * as React from 'react'
// import { Query } from 'react-apollo'

// import { getMahasiswaQuery } from '../../queries/Query'

// import @material-ui/core component
import Stepper from '@material-ui/core/Stepper'
import Step from '@material-ui/core/Step'
// import { StepButton } from '@material-ui/core';
import StepLabel from '@material-ui/core/StepLabel'
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
    id_mahasiswa : string
    tugas : any
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

    public componentWillMount()
    {
        if(this.props.tugas.bab1 === 'Done')
        {
            this.setState({ activeStep : this.state.activeStep+1 })
        }
    }

    public render()
    {
        // console.log("id_mahasiswa2 ", this.props.id_mahasiswa)
        const { classes } = this.props
        const { activeStep } = this.state
        const steps = ['BAB 1', 'BAB 2', 'BAB 3', 'BAB 4', 'BAB 5']
        return(
            <div className={classes.root}>
                <Stepper activeStep={activeStep} alternativeLabel={true}>
                    {steps.map((label, index) => {
                        return(
                            <Step key={label}>
                                {/* <StepButton
                                    completed={this.state.completed[index]}
                                >
                                    {label}
                                </StepButton> */}
                                 <StepLabel>{label}</StepLabel>
                            </Step>
                        )
                    })}
                </Stepper>
            </div>
        )
    }
}

export default withStyles(styles)(ProgressTugasAkhir)