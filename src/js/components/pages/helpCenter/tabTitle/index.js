import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {FormattedMessage} from 'react-intl';
import style from './tabTitle.css';
class TabTitle extends Component{
    set(index){
        this.props.setTitle(index);
    }
    check_title_index( index ){
        return index === this.props.title_index ? style.active : ""
    }
    render(){
        const tabTitle = [];
        let __this=this;
        let ID="";
        for (let title of this.props.titles) {
            ID="HELPCENTER_TAB_TITLE_NAME"+title;
            tabTitle.push(
                <p key={title} className={this.check_title_index(title)} onClick={this.set.bind(this,title)} >
                    <FormattedMessage
                        id={ID}
                        description='tab菜单'
                        defaultMessage=''
                    />
                </p>
            )
        }
        return(
            <div className={style.tab_title} >
                {tabTitle}
            </div>
        )


    }
}
TabTitle.propTypes = {
    titles: PropTypes.array,
    setTitle:PropTypes.func,
    title_index: PropTypes.number,
};

export default TabTitle;