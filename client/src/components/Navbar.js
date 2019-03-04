import React from 'react'
import PropTypes from 'prop-types'
import withStyles from '@material-ui/core/styles/withStyles'
import { Route } from 'react-router-dom'
import { connect } from "react-redux";
import { AppBar, Toolbar, Button,} from "@material-ui/core";
import { changeLoginStatus, changeUser} from "../actions";

const styles = {
    root: {
    },
    appbar: {
        backgroundColor: "#00bcd4",
    },
    divGrow: {
        flexGrow: 1
    },
    ahome: {
        textDecoration: 'none',
    },
    texthome: {
        fontSize: 24,
        color: "white",
        fontWeight: 500,
    },
    toolbar: {
        display: 'flex',
        margin: '0 20%',
        justifyContent: "center",

        paddingLeft: 0,
        paddingRight: 0
    },
    btnWrapper: {
        color: 'white',
        display: 'flex',
        flexDirection: 'row'
    },
    username: {
        position: 'relative',
        top: 6,
        color: 'black',
    },
    aadmin: {
        textDecoration: 'none',
        marginRight: '10px',
        marginLeft: '10px',
        color: 'white',

    },
    divadmin: {
        display: 'flex',
        alignItems: 'center',
        marginRight: 20,
        color: 'white',
        paddingBottom: 5
    }
}

function Navbar(props) {
    const { classes, history, UorA, user, changeLoginStatus, changeUser } = props
    const handleClick = option => ()=>{
        if(option === 'logout'){
            changeLoginStatus(false)
            changeUser('username', '')
            changeUser('email', '')
            changeUser('password', '')
            if(window.location.hash!==`#/client`){
                history.push(`/client`)
            }
            return
        }
        const path = UorA==='User'?'client':'admin'
        if(window.location.hash!==`#/${path}/${option}`){
            history.push(`/${path}/${option}`)
        }
    }

    return (
        <div className={`${classes.root} `}>
            <AppBar className={classes.appbar} position={"static"} >
                <Toolbar className={classes.toolbar}>
                    <a className={classes.ahome} href="/#/client">
                        <div className={classes.texthome}>微学视频</div>

                    </a>
                    <div className={classes.divGrow} />
                    {
                        user.isLoggedIn ?
                            <div className={classes.btnWrapper}>
                                {
                                    UorA==="Admin"?
                                        <div className={classes.divadmin}>
                                            <a className={classes.aadmin} href={'/#/admin/cms'}>课程管理</a>
                                            <span>|</span>
                                            <a className={classes.aadmin} href={'/#/admin/user'}>用户管理</a>
                                        </div>:""
                                }
                                <div className={classes.username}>{user.username}</div>
                                <Button onClick={handleClick('logout')} color="inherit" >退出</Button>
                            </div> :

                            <div className={classes.btnWrapper}>
                                <Button onClick={handleClick('login')} color="inherit">登录</Button>
                                {
                                    UorA==="User"?
                                        <Button onClick={handleClick('signup')} color="inherit">注册</Button>
                                        :''
                                }
                            </div>

                    }
                </Toolbar>
            </AppBar>
        </div>
    )
}

Navbar.propTypes = {
    classes: PropTypes.object.isRequired,
}

export default connect(
    state => ({
        user: state.user
    }),
    dispatch => ({
        changeLoginStatus(status){
            dispatch(changeLoginStatus(status))
        },
        changeUser(type, value){
            dispatch(changeUser(type, value))
        }
    })
)(withStyles(styles)(Navbar))