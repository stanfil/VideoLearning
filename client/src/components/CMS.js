import React, {Component} from 'react'
import PropTypes from 'prop-types'
import withStyles from '@material-ui/core/styles/withStyles'
import { connect } from "react-redux";
import axios from 'axios'
import {  } from "../actions";
import AddIcon from '@material-ui/icons/Add';
import {TableBody,TextField,Table,Fab,TableCell, TableRow,Button,TableHead } from "@material-ui/core";
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { Server } from '../settings'


const styles = {
    root: {
        backgroundColor: '#fff',
        minHeight: 'calc(100vh - 64px)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        paddingBottom: 40
    },
    header: {
        position: 'relative',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f8f8f8',
        width: "100%",
        height: "200px"
    },
    searchInput: {
        width:400,
        fontSize: 20,

    },
    searchInputLabel: {
        color: "#00bcd4"
        // "&:focus": {
        //
        // }
    },
    addFab: {
        position: 'relative',
        left: 30,
        backgroundColor: '#00bcd4',
        '&:hover':{
            backgroundColor: '#04a1b5'
        },

    },
    table: {
        display: 'flex',
        justifyContent: 'center',
        marginTop: 40
    },
    edit: {
        color: 'red'
    }
}

class CMS extends Component {
    constructor(props) {
        super(props);
        this.state ={
            searchText : '',
            courses: [],
            showCourses: []
        }
    }

    handleChange(e){
        this.setState({
            searchText: e.target.value
        })
    }

    handleKeypress(e){
        let { searchText, courses} = this.state
        if(e.which===13){
            let course = courses.filter(i=>i.title.indexOf(searchText)!==-1)
            this.setState({
                showCourses: course
            })
        }
    }

    componentWillMount() {
        axios.get(`${Server}/course/getall`)
            .then(res=>{
                this.setState({
                    courses: res.data.courses,
                    showCourses: res.data.courses
                })
            })
            .catch(err=>{
                console.log(err)
            })
    }
    handleEdit = link => e => {
        this.props.history.push(`/admin/cms/course?${link}`)
    }

    addCourse(){
        this.props.history.push('/admin/cms/course')
    }

    render() {
        const { classes, isLoggedIn } = this.props
        if(!isLoggedIn) return (<div></div>)
        let courses = this.state.showCourses
        return (
            <div className={classes.root}>
                <div className={classes.header}>
                    <TextField
                        // className={classes.searchInput}
                        InputProps={{
                            classes: {
                                root: classes.searchInput,
                            },
                        }}
                        InputLabelProps={{
                            classes: {
                                root: classes.searchInputLabel
                            }
                        }}
                        placeholder={'搜索课程'}
                        margin="normal"
                        variant="outlined"
                        onChange={this.handleChange.bind(this)}
                        onKeyPress={this.handleKeypress.bind(this)}
                    />
                    <Fab onClick={this.addCourse.bind(this)} color="primary" aria-label="Add" className={classes.addFab}>
                        <AddIcon />
                    </Fab>
                </div>
                <div className={classes.table}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>link</TableCell>
                                <TableCell>title</TableCell>
                                <TableCell>date</TableCell>
                                <TableCell>price</TableCell>
                                <TableCell>option</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                        {
                            courses.map((course,i)=>(
                                <TableRow key={course.link+i}>
                                    <TableCell>{course.link}</TableCell>
                                    <TableCell>{course.title}</TableCell>
                                    <TableCell>{course.date}</TableCell>
                                    <TableCell>{course.price} 元</TableCell>
                                    <TableCell>
                                        <Button
                                            className={classes.edit}
                                            onClick={this.handleEdit(course.link).bind(this)}
                                        >编辑</Button>
                                    </TableCell>
                                </TableRow>
                            ))
                        }
                        </TableBody>

                    </Table>
                </div>
            </div>
        )
    }
}

CMS.propTypes = {
    classes: PropTypes.object.isRequired
}

export default connect(
    state => ({
        isLoggedIn: state.user.isLoggedIn
    }),
    dispatch => ({

    })
)(withStyles(styles)(CMS))