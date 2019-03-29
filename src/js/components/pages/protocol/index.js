import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {FormattedMessage} from 'react-intl';
import style from './protocol.css';
class Btn extends Component{
    set(index){
        this.props.setTitle(index);
    }
    check_title_index( index ){
        return index === this.props.title_index ? style.active : ""
    }
    render(){
        return(
            <div>
                <h2></h2>
                <p></p>
            </div>
        )
    }
}
Btn.propTypes = {
    Text: PropTypes.string,
};

export default Btn;