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
import {changeUser, changeLoginStatus} from '../actions'
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

class SignIn extends Component{
    constructor(props){
        super(props)
        this.state={
            logintipOpen: false,

        }
        this.handleChange = this.handleChange.bind(this)
        this.handleClick = this.handleClick.bind(this)
        this.handleClose = this.handleClose.bind(this)
        this.handleKeypress = this.handleKeypress.bind(this)
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

    handleClose = (e, reason) => {
        if(reason === 'clickaway') return
        this.setState({logintipOpen: false})
    }

    handleClick = () => {
        const { UorA, user, history, changeLoginStatus, changeUser} = this.props
        switch (UorA) {
            case "User":
                axios.post(`${Server}/user/login`,{
                    email: user.email||'',
                    password: user.password||''
                })
                    .then(res => {
                        console.log(res.data.ret?'':'login success')
                        changeUser('username', res.data.username)
                        changeUser('purchased', res.data.purchased)
                        changeLoginStatus(true)
                        history.push('/client')
                    })
                    .catch(err=> {
                        console.log('login failed', err)
                        this.setState({
                            logintipOpen: true
                        })
                    })
                break
            case "Admin":
                axios.post(`${Server}/admin/login`,{
                    username: user.username||'',
                    password: user.password||''
                })
                    .then(res => {
                        console.log(res.data.ret?'':'login success')
                        changeLoginStatus(true)
                        history.push('/admin/cms')
                    })
                    .catch(err=> {
                        console.log('login failed', err)
                        this.setState({
                            logintipOpen: true
                        })
                    })
        }

    }

    handleChange = type => e => {
        this.props.changeUser(type, e.target.value)
    }

    render(){
        const { classes, UorA, changeUser, user, history} = this.props;
        return (
            <main className={classes.main}>
                <CssBaseline />
                <Paper className={classes.paper}>
                    <Typography component="h1" variant="h5">
                        登录
                    </Typography>
                    <form className={classes.form} >
                        {
                            UorA==='User'?
                                <FormControl margin="normal"  fullWidth>
                                    <InputLabel htmlFor="email">邮箱</InputLabel>
                                    <Input id="email" name="email" autoComplete="email" autoFocus onChange={this.handleChange('email')}/>
                                </FormControl>:
                                <FormControl margin="normal"  fullWidth>
                                    <InputLabel htmlFor="username">用户名</InputLabel>
                                    <Input id="username" name="username" autoComplete="username" autoFocus onChange={this.handleChange('username')}/>
                                </FormControl>
                        }

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
                            登录
                        </Button>
                    </form>
                </Paper>
                <Snackbar
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'center',
                    }}
                    open={this.state.logintipOpen}
                    autoHideDuration={2000}
                    onClose={this.handleClose}
                    ContentProps={{
                        'aria-describedby': 'message-id',
                    }}
                    message={<span id="message-id">{`${UorA==="User"?'邮箱':'用户名'}或密码错误`}</span>}
                />
            </main>
        );
    }
}

SignIn.propTypes = {
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
)(withStyles(styles)(SignIn));
