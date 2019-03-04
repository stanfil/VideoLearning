import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import {connect} from "react-redux";
import { fade } from "@material-ui/core/styles/colorManipulator";
import {changeLoginStatus, changeUser} from '../actions'
import axios from 'axios'
import { Server } from '../settings'
import Snackbar from '@material-ui/core/Snackbar';

const styles = theme => ({
    main: {
        width: 'auto',
        display: 'block', // Fix IE 11 issue.
        marginLeft: theme.spacing.unit * 3,
        marginRight: theme.spacing.unit * 3,
        [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
            width: 400,
            marginLeft: 'auto',
            marginRight: 'auto',
        },
    },
    paper: {
        marginTop: theme.spacing.unit * 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing.unit,
    },
    submit: {
        marginTop: theme.spacing.unit * 3,
        // backgroundColor: '#00bcd4',
        color: 'white',
    },
    btnContained: {
        backgroundColor: '#00bcd4',
        '&:hover': {
            backgroundColor: '#0097a7',
        }
    }
});

class SignUp extends Component{
    constructor(props){
        super(props)
        this.state={
            signuptipOpen: false,
            tip: ''

        }
        this.handleChange = this.handleChange.bind(this)
        this.handleClick = this.handleClick.bind(this)
        this.handleClose = this.handleClose.bind(this)
        this.handleKeypress = this.handleKeypress.bind(this)
    }

    handleClose = (e, reason) => {
        if(reason === 'clickaway') return
        this.setState({signuptipOpen: false})
    }

    handleClick = () => {
        const { user, history,changeUser, changeLoginStatus} = this.props
        if(!user.username||!user.email||!user.password){
            return this.setState({
                tip: '请填写所有字段！',
                signuptipOpen: true

            })
        }
        axios.post(`${Server}/user/signup`,{
            username: user.username||'',
            email: user.email||'',
            password: user.password||''
        })
            .then(res => {
                console.log(res.data.ret?'':'signup success')
                changeLoginStatus(true)
                changeUser('purchased', res.data.purchased)
                history.push('/client')
            })
            .catch(err=> {
                console.log('signup failed', err)
                this.setState({
                    signuptipOpen: true,
                    tip: '该邮箱已被注册！'
                })
            })


    }

    handleChange = type => e => {
        this.props.changeUser(type, e.target.value)
    }

    componentDidMount() {
        window.addEventListener('keypress', this.handleKeypress)
    }

    componentWillUnmount() {
        window.removeEventListener('keypress', this.handleKeypress)
    }

    handleKeypress(e){
        (e.which===13) && (this.handleClick())
    }

    render(){
        const { classes } = this.props;
        return (
            <main className={classes.main}>
                <CssBaseline />
                <Paper className={classes.paper}>
                    <Typography component="h1" variant="h5">
                        注册
                    </Typography>
                    <form className={classes.form} >
                        <FormControl margin="normal"  fullWidth>
                            <InputLabel htmlFor="email">邮箱</InputLabel>
                            <Input id="email" name="email" autoComplete="email" autoFocus onChange={this.handleChange('email')}/>
                        </FormControl>
                        <FormControl margin="normal"  fullWidth>
                            <InputLabel htmlFor="username">用户名</InputLabel>
                            <Input id="username" name="username" autoComplete="username" autoFocus onChange={this.handleChange('username')}/>
                        </FormControl>

                        <FormControl margin="normal" fullWidth>
                            <InputLabel htmlFor="password">密码</InputLabel>
                            <Input name="password" type="password" id="password" autoComplete="current-password" onChange={this.handleChange('password')}/>
                        </FormControl>
                        <Button
                            classes={{
                                contained: classes.btnContained
                            }}
                            fullWidth
                            variant="contained"
                            className={classes.submit}
                            onClick={this.handleClick}
                        >
                            注册
                        </Button>
                    </form>
                </Paper>
                <Snackbar
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'center',
                    }}
                    open={this.state.signuptipOpen}
                    autoHideDuration={2000}
                    onClose={this.handleClose}
                    ContentProps={{
                        'aria-describedby': 'message-id',
                    }}
                    message={<span id="message-id">{this.state.tip}</span>}
                />
            </main>
        );
    }
}

SignUp.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default connect(
    state => ({
        user: state.user
    }),
    dispath => ({
        changeUser(type, value){
            dispath(changeUser(type, value))
        },
        changeLoginStatus(status){
            dispath(changeLoginStatus(status))
        }
    })
)(withStyles(styles)(SignUp));
