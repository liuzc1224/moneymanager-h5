
export class KeyboardUtil {

    static height;
    static visibleHeight;

    static FixAndroidKeyBoardHideInput(){
        window['heightChange'] = (height , visibleHeight)=>{
            KeyboardUtil.OnHeightChange(height,visibleHeight);
        }
    }

    static OnHeightChange(height , visibleHeight){
        const body = document.body;
        KeyboardUtil.height = body.clientHeight;
        KeyboardUtil.visibleHeight = visibleHeight * body.clientHeight /height;

        const active = document.activeElement ;

        if(height === visibleHeight){
            KeyboardUtil.SetElementScrollTop(body , 0);
            return;
        }

        let focusTopRelateWindow = KeyboardUtil.FindElementPositionRelateToWindow(active);
        let focusBottomRelateWindow = focusTopRelateWindow + active.clientHeight;
        const mindistince = 50;
        let bottom = focusBottomRelateWindow + mindistince;
        if(bottom > KeyboardUtil.height) bottom = KeyboardUtil.height;

        const offset = bottom - KeyboardUtil.visibleHeight;

        if(offset <=0){
            KeyboardUtil.SetElementScrollTop(body , 0);
            return;
        }

        KeyboardUtil.SetElementScrollTop(body , offset);

    }

    static SetElementScrollTop(e  , offset ){
        if(offset === 0){
            e.style.top = '0';
        }else{
            e.style.top = '-'+offset +'px';
        }
    }

    static FindElementPositionRelateToWindow(element) {
        let curtop = 0;
        let curtopscroll = 0;
        if (element.offsetParent) {
            do {
                curtop += element.offsetTop;
                curtopscroll += element.offsetParent ? element.offsetParent.scrollTop : 0;
            } while (element = element.offsetParent);


        }
        return curtop - curtopscroll;
    }
}