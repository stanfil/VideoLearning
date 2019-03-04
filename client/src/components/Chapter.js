import React, {Component} from 'react'
import PropTypes from 'prop-types'
import withStyles from '@material-ui/core/styles/withStyles'
import { connect } from "react-redux";
import axios from 'axios'
import { getAllCourses } from "../actions";
import { } from "@material-ui/core";
import { Server } from '../settings'
import marked from 'marked'
import './Chapter.css'
const styles = {
    root: {
        minHeight: 'calc(100vh - 64px)',
        backgroundColor: '#f8f8f8',
        position: 'relative',
        display:'flex',
        justifyContent:'center'
    },
    directory: {
        position: 'absolute',
        top: 80,
        left:'15%',
        display: 'flex',
        flexDirection: 'column',

    },
    video: {
        width: '100%',
        height: 'auto'
    },
    body: {
        width: 760,
        padding:'40px 64px',
        marginBottom: '100px',
        backgroundColor: 'white',
        boxShadow: '0 0 5px rgba(0,0,0,.02), 0 5px 22px -8px rgba(0, 0, 0, .1)'
    },
    tchapter: {
        display: 'flex',
        fontWeight: 600,
        fontSize: 24,
        justifyContent: 'center',
        marginBottom: 30,
    },
    adiractive: {
        color: '#00bcd4',
        display: 'block',
        fontSize: 16,
        fontWeight: 500,
        paddingBottom: 16,
        textDecoration: "none",
    },
    adir: {
        color: '#738a94',
        display: 'block',
        fontSize: 16,
        transition: 'all .3s ease',
        fontWeight: 500,
        paddingBottom: 16,
        textDecoration: "none",
        '&:hover': {
            color: '#0097a7'
        }
    }
}

class Chapter extends Component{
    constructor(props){
        super(props)
        this.state = {

        }
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

    render() {
        const { classes,  match } = this.props
        let link = match.params.course
        let sublink = match.params.chapter
        let courses = this.props.courses || []
        let course = courses.filter(i => i.link===link)[0]||{}
        let chapters = course.chapters || []
        let chapter = chapters.filter(i=>i.link===sublink)[0]||{}
        console.log(courses, match, course, chapter)
        let markdown = marked(chapter.markdown||'')
        return (
            <div className={classes.root}>
                <div className={classes.directory}>
                    {
                        chapters.map(chapter => (
                            chapter.link===sublink?
                                <a href={`/#/client/${link}/${chapter.link}`} key={chapter.link} className={classes.adiractive}>{chapter.title}</a>:
                                <a href={`/#/client/${link}/${chapter.link}`} key={chapter.link} className={classes.adir}>{chapter.title}</a>
                        ))
                    }
                </div>
                <div className={classes.body}>
                    <div className={classes.tchapter}>{chapter.title}</div>
                    <video className={classes.video} src={chapter.video} controls></video>
                    <div className={classes.markdown} dangerouslySetInnerHTML={{__html: markdown}}></div>
                </div>
            </div>
        )
    }
}

Chapter.propTypes = {
    classes: PropTypes.object.isRequired
}

export default connect(
    state => ({
        courses: state.courses
    }),
    dispatch => ({
        getAllCourses(courses){
            dispatch(getAllCourses(courses))
        }
    })
)(withStyles(styles)(Chapter))