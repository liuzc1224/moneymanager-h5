import React, { Component } from 'react';
import PropTypes from 'prop-types';
import style from './tabItem.css';
import bottom from './images/bottom.png'
import right from './images/right.png'
class TabItem extends Component{
    constructor(){
        super();
        this.state={
            tabData:[],
            Index:[],
        };
    }
    target(index){
        let arr=this.state.Index;
        var num = arr.indexOf(index);
        if (num > -1) {
            arr.splice(num, 1);
        }else{
            arr.push(index)
        }
        this.setState({
            Index:arr
        })
    }
    initialization(index){
        this.setState({
            Index:[],
        });
        this.getData(index);
    }
    setImg(index){
        if(this.state.Index.indexOf(index)> -1){
            return bottom;
        }else{
            return right;
        }
    }
    getData(Index){
        this.props.getCenter(Index);
    }
    check_item_index(index){
        if(this.state.Index.indexOf(index)> -1){
            return style.show
        }else{
            return style.hidden
        }
        // return  ?  style.show : style.hidden ;
    }
    render(){
        let $this=this;
        const tabTitle = [];
        let itemData= this.props.itemData;
        let Length=itemData.length;
        for (let i=0;i<Length;i++) {
            tabTitle.push(
                <div key={i}>
                    <table className={style.item} >
                        <tbody>
                            <tr className={style.title} onClick={$this.target.bind(this,i)} >
                                <td style={{width:'95%'}}>
                                    {i+1}&nbsp;.&nbsp;
                                    {itemData[i]['textQuestion']}
                                </td>
                                <td style={{width:'5%'}}>
                                    <img src={$this.setImg(i) } style={{width:'15px',height:'15px'}} alt=""/>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <table className={style.item}  style={{borderBottom: '#E0E0E0 1px solid'}} >
                        <tbody>
                            <tr className={style.Center_Item+" "+$this.check_item_index(i)}>
                                <td>
                                    {itemData[i]['textAnswer']}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            )
        }
        return(
            <div className={style.main}>
                {tabTitle}
            </div>

        )


    }
}
TabItem.propTypes = {
    itemData: PropTypes.array,
    children: PropTypes.number,
    getCenter:PropTypes.func,
};

export default TabItem;