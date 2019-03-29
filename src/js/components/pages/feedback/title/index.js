import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {injectIntl,intlShape } from 'react-intl';
import style from './title.css';
class Title extends Component{
    set(index){
        this.props.setTitle(index);
    }
    check_title_index( index ){
        return index === this.props.title_index ? style.active : ""
    }
    ImputChange(evet){
        this.props.fun(evet.target.value);
    }
    render(){
        let pl={id:this.props.placeholder};
        const {formatMessage} = this.props.intl;
        return(
            <input
                onChange={this.ImputChange.bind(this)}
                className={style.input}
                type={this.props.Type}
                maxLength={this.props.length}
                placeholder={formatMessage (pl)} />
            // <button className={style.btn} style={{height:"55px"}}>
            //     <FormattedMessage
            //         id={this.props.Text}
            //         description='按钮'
            //         defaultMessage=''
            //     />
            // </button>
        )
    }
}
Title.propTypes = {
    placeholder: PropTypes.string,
    Type:PropTypes.string,
    length:PropTypes.number,
    intl: intlShape.isRequired,
    fun:PropTypes.func
};

export default injectIntl(Title);