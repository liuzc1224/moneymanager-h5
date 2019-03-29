import React, { Component } from 'react';
import PropTypes from 'prop-types';


class Wall extends Component {
    render() {
        const { height, styleObj } = this.props;
        const style = {
            "width": "100%",
            "height": `${height}px`,
            ...styleObj
        }
        return (
            <div style={style}></div>
        );
    }
}

Wall.propTypes = {
    height: PropTypes.number,
    styleObj: PropTypes.object
};
Wall.defaultProps = {
    height: 30
}

export default Wall;