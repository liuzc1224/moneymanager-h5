import React, { Component } from 'react';
import img1 from './image/img1.png';
import img2 from './image/img2.png';
import img3 from './image/img3.png';
import img4 from './image/img4.png';
import img5 from './image/img5.png';
import left from './image/left.png';
import right from './image/right.png';
import style from './step.css';

class Step extends Component {

    constructor(props){
        super(props);
        this.state = {
            checkboxVal : false
        }
    }
    render() {
        return (
            <div style={{background:'#ffffff'}}>
                <img src={img1} className={style.IMG1} alt=""/>
                <img src={left} className={style.imgLeft1} alt=""/>
                <p className={style.text1}>1.Gerenciamento de Multi cartões de crédito, despede-se ao atraso.
                </p>
                <img src={img2} className={style.IMG2} alt=""/>
                <img src={right} className={style.imgRight1} alt=""/>
                <p className={style.text2}>2. Contabilidade no dia a dia, nota cada passo do seu consumo da vida.
                </p>
                <img src={img3} className={style.IMG3} alt=""/>
                <img src={left} className={style.imgLeft2} alt=""/>
                <p className={style.text3}>3. Consulta grátis de crédito, fornece o resultado mais autorizado do SPC.
                </p>
                <div className={style.bottom}>
                    <a href="https://play.google.com/store/apps/details?id=com.guiafatura.brazil"><img src={img4} className={style.IMG4} alt=""/></a>
                    <button>
                        <p>
                            <a href="https://play.google.com/store/apps/details?id=com.guiafatura.brazil">
                                <img src={img5} className={style.IMG5} alt=""/><span style={{marginLeft:'10px'}}>Baixar agora</span>
                            </a>
                        </p>
                    </button>

                </div>
            </div>
        );
    }
}


export default Step;