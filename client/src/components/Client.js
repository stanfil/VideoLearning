import React from 'react'
import PropTypes from 'prop-types'
import withStyles from '@material-ui/core/styles/withStyles'
import { Route } from 'react-router-dom'
import Navbar from './Navbar'
import SignIn from "./SignIn";
import SignUp from './SignUp'
import Courses from './Courses'
import Course from './Course'
import Chapter from './Chapter'
import Buy from './Buy'
const styles = {

}

function Client(props) {
    const { classes, history } = props
    return (
        <div className={classes.root}>
            <Navbar history={history} UorA={'User'} />
            <Route path={'/client/login'} render={props => <SignIn {...props} UorA={'User'}/>}/>
            <Route path={'/client/signup'} render={props => <SignUp {...props} />}/>
            <Route exact path ={'/client'} render={props => <Courses {...props} />} />
            <Route exact path={'/client/:course'} render={props => <Course {...props} />}/>
            <Route exact path={'/client/:course/:chapter'} render={props => <Chapter {...props} />}/>
            <Route path={'/client/buy'} component={Buy}/>
        </div>
    )
}

Client.propTypes = {
    classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(Client)