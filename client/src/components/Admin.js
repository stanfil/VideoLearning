import React from 'react'
import PropTypes from 'prop-types'
import withStyles from '@material-ui/core/styles/withStyles'
import { Route } from 'react-router-dom'
import Navbar from './Navbar'
import SignIn from "./SignIn"
import CMS from './CMS'
import AdminUser from './AdminUser'
import AdminCourse from './AdminCourse'
const styles = {

}

function Admin(props) {
    const { classes, history } = props
    return (
        <div className={classes.root}>
            <Navbar history={history} UorA={'Admin'} />
            <Route path={'/admin/login'} render={props => <SignIn {...props} UorA={'Admin'}/>}/>
            <Route exact path={'/admin/cms'} render={props =>  <CMS {...props} />}/>
            <Route exact path={'/admin/user'} render={props =>  <AdminUser {...props} />}/>
            <Route path={'/admin/cms/course'} render={props =>  <AdminCourse {...props} />}/>

        </div>
    )
}

Admin.propTypes = {
    classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(Admin)