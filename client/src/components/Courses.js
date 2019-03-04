import React, {Component} from 'react'
import PropTypes from 'prop-types'
import withStyles from '@material-ui/core/styles/withStyles'
import { connect } from "react-redux";
import axios from 'axios'
import { getAllCourses } from "../actions";
import { Card, Typography} from "@material-ui/core";
import { Server } from '../settings'
const styles = theme => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: '#fafafa'
    },
    card: {
        display: 'flex',
        flexDirection: 'column',
        width: 334,
        height: 233,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: `calc((60vw - 340px*3)/2)`,
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.07)',

    },
    cardTitleWrapper: {
        display: 'flex',
        justifyContent: 'flex-end',
        width: 306,
        marginTop: 10,
    },
    cards: {
        display: 'flex',
        flexWrap: 'wrap',
        margin: '0 15% 30px 20%',
        alignContent: 'space-between',
    },
    cardImg: {
        width: 306,
        height: 172
    },
    header: {
        fontSize: 24,
        marginTop: 30
    },
    date: {
        fontSize: 12,
        color: '#aaa',
        margin: '10px 0 0 14px',
        width: '100%',
        fill: 'currentColor',
        display: 'flex',
        alignItems: 'center'
    },
    svg: {
        width: 12,
        height: 12,
        color: '#aaa',
        marginRight: 4,
    },
    cardWrapper: {
        marginBottom: 20,
    },
    acard: {
        textDecoration: 'none'
    }

})

class Courses extends Component{
    constructor(props){
        super(props)
        this.state={

        }
        this.handleClick = this. handleClick.bind(this)
    }

    componentWillMount() {
        axios.get(`${Server}/course/getall`)
            .then(res=>{
                this.props.getAllCourses(res.data.courses)
            })
            .catch(err=>{
                console.log(err)
            })
    }

    handleClick(link){
        return function(e){
            e.preventDefault()
            this.props.history.push(`/client/${link}`)
        }.bind(this)
    }

    render(){
        let { classes, courses, state } = this.props

        return (
            <div className={classes.root}>
                <p className={classes.header}>最新发布</p>
                <div className={classes.cards}>
                {
                    courses.map(course => (
                        <div  key={course.link} className={classes.cardWrapper}>
                            <a className={classes.acard} onClick={this.handleClick(course.link)} href="#">
                                <Card className={classes.card}>
                                    <img className={classes.cardImg} src={course.cover} alt={course.link}/>
                                    <div className={classes.cardTitleWrapper}>
                                        <Typography
                                            className={classes.cardTitle}
                                            color={'textSecondary'}
                                        >
                                            {course.title}
                                        </Typography>
                                    </div>

                                </Card>
                            </a>
                            <div className={classes.date}>
                                <svg className={classes.svg} focusable="false" viewBox="0 0 24 24" aria-hidden="true"
                                     role="presentation">
                                    <path fill="none" d="M0 0h24v24H0V0z"></path>
                                    <g>
                                        <path
                                            d="M20 3h-1V1h-2v2H7V1H5v2H4c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 18H4V10h16v11zm0-13H4V5h16v3z"></path>
                                    </g>
                                </svg>
                                <div>{course.date}</div>
                            </div>
                        </div>

                    ))
                }
                </div>

            </div>
        )
    }
}

Courses.propTypes = {
    classes: PropTypes.object.isRequired
}

export default connect(
    state => ({
        state: state,
        courses: state.courses
    }),
    dispatch => ({
        getAllCourses(courses){
            dispatch(getAllCourses(courses))
        }
    })
)(withStyles(styles)(Courses))