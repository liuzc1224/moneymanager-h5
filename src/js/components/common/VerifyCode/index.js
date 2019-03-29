import React,{Component} from 'react';
import PropTypes from 'prop-types';


const bthStyle = {
    fontSize: '18px',
    color : '#61A4EF',
    background : 'none',
    outline : "none",
    float : "right",
}

class SendVerifyCode extends Component{
    constructor(props){
        super(props)
        this.state={
            count:0,
            counting:false
        }
    }
    shouldComponentUpdate(nextProps, nextState){
        if (!nextState.counting && nextProps.isSend) {
            //根据父组件传过来的验证结果，判断是否启用倒计时
            this.send();
        }
        return true;
    }

    setInterval=() => {
        /*此处正是定时器运用的巧妙之处，以及对定时器返回值的理解程度体现
        定时器必须在一个函数中赋值给一个属性，在state中赋值就不行，定时器会自执行,
        因此必须在一个不会自动执行的函数中把定时器ID赋值给一个变量保存
        此ID可以作为clearInterval()的参数，用于清除定时器*/
        this.timer = setInterval(this.countDown, 1000)
    }
    send=()=>{
        this.setState( { counting: true, count: 60});
        this.setInterval();
    }
    countDown = () =>{
        const { count } = this.state;
        const { onSuccessSend } = this.props;
        if ( count === 1) {
            this.clearInterval();
            //倒计时结束回调
            onSuccessSend()
            this.setState( { counting: false });
        } else {
            this.setState( { counting: true, count: count - 1});
        }
    }
    clearInterval=() =>{
        clearInterval(this.timer)
    }
    phone =() => {
        //验证手机号是否符合规则,符合规则就设置props.isSend为true，启用定时器，否则提示错误信息
        this.props.onhandlePhone()
        //console.log('222')
    }
    componentWillUnmount() {
        this.clearInterval();
    }
    render(){
        // console.log(TimerMixin)
        // console.log(this.props.isSend)
        let {count,counting} = this.state;
        return(
              <button
                disabled={counting}
                className="verificationCode"
                onClick={this.phone}
                style={bthStyle}
                >{
                counting? `${count}s` :'Enviar'
                }</button>
        )

    }
}
SendVerifyCode.propTypes = {
    isSend: PropTypes.bool.isRequired,
    onhandlePhone: PropTypes.func.isRequired,
    onSuccessSend: PropTypes.func.isRequired
}

SendVerifyCode.defaultProps = {
    isSend: false
}
export default SendVerifyCode;