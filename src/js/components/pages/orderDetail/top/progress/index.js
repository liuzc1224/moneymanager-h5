import React, { Component } from 'react';
import PropTypes from 'prop-types';

import style from './progress.css';

class Progress extends Component {

    state = {
        num: 0
    }

    componentWillMount(){
        const { succ } = this.props;
        if (succ) {
            this.begin()
        }
    }

    componentWillReceiveProps(nextProps){
        if (!nextProps.succ) {
            clearInterval(this.timer)
            this.setState({
                num: 100
            })
        }
    }

    begin(){
        clearInterval(this.timer)
        this.timer = setInterval(()=>{
            let nextPer = this.state.num + 1;
            if (nextPer >= 90) {
                clearInterval(this.timer)
            }
            this.setState({
                num: nextPer
            })
        },50)
    }

    componentWillUnmount(){
        clearInterval(this.timer)
    }

    render() {
        return (
            <div className={style.progressWrap}>
                <p className={style.progressOut}>
                    <span className={style.progressInner} style={{width:`${this.state.num}%`}}></span>
                </p>
                <p>
                    {this.state.num}%
                </p>
            </div>
        );
    }
}

Progress.propTypes = {
    succ: PropTypes.bool.isRequired
};

export default Progress;