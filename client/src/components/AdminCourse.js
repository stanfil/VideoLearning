import React, {Component} from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import withStyles from '@material-ui/core/styles/withStyles'
import { connect } from "react-redux";
import axios from 'axios'
import {  } from "../actions";
import {TextField, Button, Fab } from "@material-ui/core";
import AddIcon from '@material-ui/icons/Add';
import { Server } from '../settings'
import Editor from 'for-editor'
import './AdminCourse.css'
const styles = {
    root: {
        display: 'flex',
        minHeight: 'calc(100vh - 64px)',
        backgroundColor: '#fff',
        maxWidth: '100vw'
    },
    leftBar: {
        width: 'calc(40% + 8px)',
        minHeight: 'calc(100vh - 64px)',
        borderRight: '1px solid gray'
    },
    course: {
        display: 'flex',
        flexWrap: 'wrap',
        paddingTop: '30px',
        borderBottom: '1px solid gray'
    },
    btnSave: {
        marginLeft: 40,
        marginRight: 40,
        backgroundColor: '#00bcd4',
        '&:hover': {
            backgroundColor: '#049db1',
        },
        color: 'white',
        padding: '1px 40px',
        height: 46,
        marginTop: 4
    },
    cinfo: {
        marginBottom: 20,
        marginLeft: 20
    },
    cinfoIntro: {
        flexGrow: 1
    },
    fab: {

        backgroundColor: '#00bcd4',
        '&:hover': {
            backgroundColor: '#049DB1'
        },
        alignSelf: 'flex-end'
    },
    chapters: {
        display: 'flex',
        flexDirection: 'column',
        padding: '30px',
        backgroundColor: '#fff',
    },
    card: {
        position: 'relative',
        marginBottom: 30,
        backgroundColor: '#fff',
        transition: 'background-color 250ms ease',
        '&:hover': {
            backgroundColor: '#f0f0f0'
        },
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around',
        padding: '14px 0',
        borderRadius: 4,
        boxShadow: '0px 1px 5px 0px rgba(0,0,0,0.14), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 3px 1px -2px rgba(0,0,0,0.12)'
    },
    activeCard:{
        backgroundColor: '#f0f0f0'
    },
    cardItem: {

    },
    delete: {
        width: 40,
        height: 40,
        position: 'absolute',
        top:'-20px',
        right: '-20px',
        borderRadius: '50%',
        backgroundColor: 'f8f8f8',
        cursor: 'pointer'
    },
    markdown: {

    }

}

class AdminCourse extends Component {
    constructor(props) {
        super(props);
        this.state ={
            course: {
                chapters: [],
                title: '',
                link: '',
                date: '',
                price: '',
                vintro: '',
                intro: '',
                cover: ''
            },
            activeCard: 0,
            markdown: ''
        }
    }
    componentWillMount() {
        const link = window.location.hash.split("?")[1]
        if(link){
            axios.get(`${Server}/course?link=${link}`)
                .then(res => {
                    console.log(res.data)
                    const course = res.data.course
                    const chapter = course.chapters[0]||{}
                    this.setState({
                        course,
                        markdown: chapter.markdown||''
                    })
                })
                .catch(err=>{
                    console.log(err)
                })
        }
    }

    handleChange = type => e => {
        const arr = type.split('&')
        const course = this.state.course
        if(arr.length===2){
            const chapters = course.chapters.map((chapter, i)=>{
                if(i==arr[0]){
                    return {
                        ...chapter,
                        [arr[1]]: e.target.value
                    }
                }
                return chapter
            })
            return this.setState({
                course: {
                    ...course,
                    chapters
                }
            })
        }

        this.setState({
            course:{
                ...course,
                [type]: e.target.value
            }
        })
    }

    Save(){
        console.log(this.state.course)
        axios.post(`${Server}/course/save`,{
            course: this.state.course
        }).then(res=>{
            alert('保存成功')
        }).catch(err=>{
            alert('保存失败')
        })
    }
    addCard(){
        const course = this.state.course
        this.setState({
            course: {
                ...course,
                chapters: [
                    ...course.chapters,
                    {
                        title: '',
                        link: '',
                        video: '',
                        markdown: ''
                    }
                ]
            },
            activeCard: course.chapters.length
        })
    }
    clickCard = i => e => {
        this.setState({
            activeCard: i,
            markdown: this.state.course.chapters[i].markdown||''
        })
    }
    deleteCard = (i,link) => e => {
        e.stopPropagation()
        const course = this.state.course
        let active = this.state.activeCard
        active = active>i?active-1:active
        this.setState({
            course: {
                ...course,
                chapters: course.chapters.filter(chapter => chapter.link!==link)
            },
            activeCard: active,
            markdown: course.chapters[active].markdown
        })
    }

    mdChange(value){
        this.setState({
            markdown: value
        })
    }
    mdSave(){
        const course = this.state.course
        let chapters = course.chapters
        chapters[this.state.activeCard].markdown = this.state.markdown
        this.setState({
            course: {
                ...course,
                chapters
            }
        })
    }
    render() {
        const { classes } = this.props
        let course = this.state.course||{}
        let chapters = course.chapters||[]
        return (
            <div className={classes.root}>
                <div className={classes.leftBar}>
                    <div className={classes.course}>
                        <TextField
                            className={classes.cinfo}
                            variant={'outlined'}
                            label={'title'}
                            color={'default'}
                            onChange={this.handleChange('title').bind(this)}
                            required
                            value={course.title}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                        <TextField
                            className={classes.cinfo}
                            variant={'outlined'}
                            label={'link'}
                            color={'default'}
                            onChange={this.handleChange('link').bind(this)}
                            required
                            value={course.link}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                        <TextField
                            className={classes.cinfo}
                            variant={'outlined'}
                            label={'date'}
                            color={'default'}
                            onChange={this.handleChange('date').bind(this)}
                            required
                            value={course.date}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                        <TextField
                            className={classes.cinfo}
                            variant={'outlined'}
                            label={'price'}
                            color={'default'}
                            onChange={this.handleChange('price').bind(this)}
                            required
                            value={course.price}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                        <TextField
                            className={classes.cinfo}
                            variant={'outlined'}
                            label={'cover'}
                            color={'default'}
                            onChange={this.handleChange('cover').bind(this)}
                            required
                            value={course.cover}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                        <TextField
                            className={classes.cinfo}
                            variant={'outlined'}
                            label={'vintro'}
                            color={'default'}
                            onChange={this.handleChange('vintro').bind(this)}
                            required
                            value={course.vintro}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                        <TextField
                            className={classNames(classes.cinfo, classes.cinfoIntro)}
                            variant={'outlined'}
                            label={'intro'}
                            color={'default'}
                            onChange={this.handleChange('intro').bind(this)}
                            required
                            value={course.intro}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                        <Button
                            className={classes.btnSave}
                            onClick={this.Save.bind(this)}
                            variant={'contained'}
                        >保存课程</Button>
                    </div>
                    <div className={classes.chapters}>
                        {
                            chapters.map((chapter,i)=> (
                                <div onClick={this.clickCard(i).bind(this)} key={chapter.link+i} className={`${classes.card} ${this.state.activeCard===i?classes.activeCard:''}`}>
                                    <TextField
                                        className={classes.cardItem}
                                        variant={'outlined'}
                                        label={'title'}
                                        color={'default'}
                                        onChange={this.handleChange(`${i}&title`).bind(this)}
                                        required
                                        defaultValue={chapter.title}
                                    />
                                    <TextField
                                        className={classes.cardItem}
                                        variant={'outlined'}
                                        label={'link'}
                                        color={'default'}
                                        onChange={this.handleChange(`${i}&link`).bind(this)}
                                        required
                                        defaultValue={chapter.link}
                                    />
                                    <TextField
                                        className={classes.cardItem}
                                        variant={'outlined'}
                                        label={'video'}
                                        color={'default'}
                                        onChange={this.handleChange(`${i}&video`).bind(this)}
                                        required
                                        defaultValue={chapter.video}
                                    />
                                    <img onClick={this.deleteCard(i, chapter.link).bind(this)} className={classes.delete} src={require("../lib/delete.svg")} alt="delete"/>
                                </div>
                            ))
                        }

                        <Fab onClick={this.addCard.bind(this)} color="primary" aria-label="Add" className={classes.fab}>
                            <AddIcon />
                        </Fab>
                    </div>
                </div>
                <Editor
                    className={classes.markdown}
                    value={this.state.markdown}
                    onChange={this.mdChange.bind(this)}
                    onSave={this.mdSave.bind(this)}
                />
            </div>
        )
    }
}

AdminCourse.propTypes = {
    classes: PropTypes.object.isRequired
}

export default connect(
    state => ({

    }),
    dispatch => ({

    })
)(withStyles(styles)(AdminCourse))