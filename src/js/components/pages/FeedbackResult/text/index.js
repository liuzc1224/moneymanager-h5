import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {FormattedMessage} from 'react-intl';
import style from './text.css';
class Text extends Component{
    set(index){
        this.props.setTitle(index);
    }
    check_title_index( index ){
        return index === this.props.title_index ? style.active : ""
    }
    render(){
        return(
            <div className={style.TEXT}>
                <p>
                    <FormattedMessage
                        id={this.props.Text}
                        description='文字内容'
                        defaultMessage=''
                    />
                </p>
            </div>
        )
    }
}
Text.propTypes = {
    Text: PropTypes.string,
};

export default Text;