import React, {Component} from 'react'
import PropTypes from 'prop-types'
import withStyles from '@material-ui/core/styles/withStyles'
import { connect } from "react-redux";
import axios from 'axios'
import { } from "../actions";
import { } from "@material-ui/core";

const styles = {
    qrcode: {
        width: 250,
        height: 250,
        marginBottom: 40,
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.07)'
    },
    root: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: '#fafafa',
        paddingTop: '50px',
        minHeight: 'calc(100vh - 114px)'
    },
    message: {
        color: '#00bcd4'
    }
}

class Buy extends Component {

    render(){
        const { classes } = this.props
        const message = window.location.hash.split('?')[1]
        const price = message.split('=').pop()
        return (
            <div className={classes.root}>
                <img className={classes.qrcode} src={require("../lib/wechatqrcode.png")} alt="qrcode"/>
                <p>扫码添加微信号：stanfil</p>
                <p>复制下列信息，发送给该微信：</p>
                <p className={classes.message}>{message}</p>
                <p>微信支付本课程费用：{price} 元</p>
            </div>
        )
    }
}

Buy.propTypes = {
    classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Buy)