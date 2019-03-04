import React, {Component} from 'react'
import PropTypes from 'prop-types'
import withStyles from '@material-ui/core/styles/withStyles'
import { connect } from "react-redux";
import axios from 'axios'
import {  } from "../actions";
import {TextField,Button } from "@material-ui/core";
import { Server } from '../settings'

const styles = {
    root: {
        backgroundColor: '#f8f8f8',
        minHeight: 'calc(100vh - 64px)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    title: {
        marginTop: 40,
        fontSize: 28,
        fontWeight: 400
    },
    btnAdd: {
        backgroundColor: "#00bcd4",
        color: 'white',
        width: '100',
        paddingLeft: 30,
        paddingRight: 30,
        '&:hover':{
            backgroundColor: "#03a4b9",
        }
    },
    textField: {
        marginBottom: 20
    }
}

class AdminUser extends Component {
    constructor(props) {
        super(props);
        this.state ={
            email: '',
            courses: ''
        }
    }

    handleChange = type => e => {
        this.setState({
            [type]:e.target.value
        })
    }

    handleAdd(){
        axios.post(`${Server}/admin/buycourse`,{
            email: this.state.email,
            courses: this.state.courses
        }).then(res => {
            alert('添加成功')
        }).catch(err=> {
            console.log(err)
        })
    }

    render() {
        const { classes, isLoggedIn } = this.props
        if(!isLoggedIn)
            return (<div></div>)
        return (
            <div className={classes.root}>
                <p className={classes.title}>为用户添加课程</p>
                <TextField
                    className={classes.textField}
                    label = 'email'
                    onChange={this.handleChange('email').bind(this)}
                    variant={'outlined'}
                />
                <TextField
                    className={classes.textField}
                    label = 'courses'
                    onChange={this.handleChange('courses').bind(this)}
                    variant={'outlined'}
                />
                <Button
                    className={classes.btnAdd}
                    onClick={this.handleAdd.bind(this)}
                >添加</Button>
            </div>
        )
    }
}

AdminUser.propTypes = {
    classes: PropTypes.object.isRequired
}

export default connect(
    state => ({
        isLoggedIn: state.user.isLoggedIn
    }),
    dispatch => ({

    })
)(withStyles(styles)(AdminUser))