import React, {Component} from 'react'
import PropTypes from 'prop-types'
import withStyles from '@material-ui/core/styles/withStyles'
import { connect } from "react-redux";
import axios from 'axios'
import { getAllCourses } from "../actions";
import { Button, Snackbar, Tooltip } from "@material-ui/core";
import { Server } from '../settings'

const styles = {
    root: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        paddingTop: '30px',
        backgroundColor: '#fafafa',
        minHeight: `calc(100vh - 134px)`,
        paddingBottom: '40px'
    },
    title: {
        fontSize: 24,
        fontWeight: 600,
        margin: '10px 0',
    },
    titlebot: {
        height: 4,
        width: 50,
        backgroundColor: '#00bcd4',
        marginBottom: 30
    },
    video: {
        width: 868,
        height: 542
    },
    tlabel: {
        borderLeft: '4px solid #00bcd4',
        paddingLeft: 8,
        marginTop: 40,
        height: 28,
        display: 'flex',
        alignItems: 'center',
        fontSize: 20,
        fontWeight: 500,
        width: 868,
        position: 'relative',
        left: '6px'
    },
    intro: {
        backgroundColor: 'white',
        minHeight: 68,
        marginTop: 20,
        width: 868,
        display: 'flex',
        alignItems: 'center',
    },
    chapters: {
        width: 868,

    },
    chapter: {
        marginTop: 20,
        backgroundColor: 'white',
        width: '100%',
        height: 24,
        padding: '11px 0',
        display: 'flex',
        alignItems: 'center',
        textDecoration: 'none',
        color: "black"
    },
    svg: {
        width: 24,
        height: 24,
        fill: '#0000008a',
        marginRight: 32,
        paddingLeft: 24
    },
    introContent: {
        marginLeft: 24
    },
    btnBuy: {
        width: '160px',
        backgroundColor: '#00bcd4',
        color: 'white',
        marginTop:'32px',

    }
}

class Course extends Component{
    constructor(props){
        super(props)
        this.state={
            open: false
        }
        this.handleClick = this.handleClick.bind(this)
        this.handleClose = this.handleClose.bind(this)
        this.handleBuy = this.handleBuy.bind(this)
    }
    componentWillMount() {
        axios.get(`${Server}/course/getall`)
            .then(res => {
                this.props.getAllCourses(res.data.courses)
            })
            .catch(err=>{
                console.log(err)
            })
    }

    handleClick(link, isPurchased){
        return function (e) {
            e.preventDefault()
            if(isPurchased){
                return this.props.history.push(`/client/${window.location.hash.split('/')[2]}/${link}`)
            }
        }.bind(this)
    }

    handleClose(event, reason){
        if (reason === 'clickaway') {
            return;
        }

        this.setState({ open: false });
    }

    handleBuy(course){
        const { isLoggedIn, history, email } = this.props
        if(!isLoggedIn){
            return this.setState({
                open: true
            })
        }
        history.push(`/client/buy?email=${email}&course=${course.link}&price=${course.price}`)
    }

    render(){
        const {classes, match, courses, isLoggedIn, purchased } = this.props
        const link = match.params.course
        if(link === 'login' || link === 'signup' || link ==='buy')
            return (<div></div>)
        let course = courses.filter(course => (course.link===link))[0]||{}
        const isPurchased = purchased.indexOf(course.link)!==-1
        return (
            <div className={classes.root}>
                <div className={classes.title}>{course.title}</div>
                <div className={classes.titlebot}></div>
                <video className={classes.video}
                       controls
                       src={course.vintro}></video>
                <div className={classes.tlabel}>课程简介</div>
                <div className={classes.intro}><div className={classes.introContent}>{course.intro}</div></div>
                <div className={classes.tlabel}>课程内容</div>
                <div className={classes.chapters}>
                    {
                        course.chapters?
                            course.chapters.map(chapter => (

                                    isPurchased?
                                        <a key={chapter.link} className={classes.chapter} onClick={this.handleClick(chapter.link, isPurchased)} href={'#'}>
                                            <svg className={classes.svg} focusable="false" viewBox="0 0 24 24" aria-hidden="true"
                                                 role="presentation">
                                                <path d="M8 5v14l11-7z"></path>
                                                <path fill="none" d="M0 0h24v24H0z"></path>
                                            </svg>
                                            <div>{chapter.title}</div>
                                        </a>:
                                        <Tooltip title={'请购买后再阅读'} placement={'left'}>

                                            <a key={chapter.link} className={classes.chapter} onClick={this.handleClick(chapter.link, isPurchased)} href={'#'}>
                                                <svg className={classes.svg} focusable="false" viewBox="0 0 24 24" aria-hidden="true"
                                                     role="presentation">
                                                    <path d="M8 5v14l11-7z"></path>
                                                    <path fill="none" d="M0 0h24v24H0z"></path>
                                                </svg>
                                                <div>{chapter.title}</div>
                                            </a>
                                        </Tooltip>


                            )):''
                    }
                </div>
                {
                    isPurchased?'':
                        <Button onClick={()=>this.handleBuy(course)} className={classes.btnBuy}>{course.price}元</Button>
                }
                <Snackbar
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal:'center',
                    }}
                    open={this.state.open}
                    autoHideDuration={2000}
                    onClose={this.handleClose}
                    message={<span id="message-id">请登录后购买！</span>}
                />
            </div>
        )
    }
}

Course.propTypes = {
    classes: PropTypes.object.isRequired
}

export default connect(
    state => ({
        courses: state.courses,
        isLoggedIn: state.user.isLoggedIn,
        purchased: state.user.purchased,
        email: state.user.email
    }),
    dispatch => ({
        getAllCourses(courses) {
            dispatch(getAllCourses(courses))
        }
    })
)(withStyles(styles)(Course))