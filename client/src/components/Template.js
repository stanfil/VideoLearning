import React, {Component} from 'react'
import PropTypes from 'prop-types'
import withStyles from '@material-ui/core/styles/withStyles'
import { connect } from "react-redux";
import axios from 'axios'
import {  } from "../actions";
import { } from "@material-ui/core";
import { Server } from '../settings'

const styles = {

}

class Template extends Component {
    constructor(props) {
        super(props);
        this.state ={

        }
    }

    render() {
        const { classes } = this.props

        return (
            <div className={classes.root}>

            </div>
        )
    }
}

Template.propTypes = {
    classes: PropTypes.object.isRequired
}

export default connect(
    state => ({

    }),
    dispatch => ({

    })
)(withStyles(styles)(Template))